/**
 * Copyright 2024 Anton Kuzmin (https://github.com/antonkuzmn1)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component } from '@angular/core';
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatOptionModule, MatRippleModule, ThemePalette, provideNativeDateAdapter } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { DatePipe, NgForOf, NgIf } from "@angular/common";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { TransportScheduleRequestInterface } from "./transport-schedule-request-interface";
import { TransportScheduleService } from "./transport-schedule.service";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { TransportScheduleResponseInterface } from "./transport-schedule-response-interface";

/**
 * Interface representing a task with subtasks.
 */
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

/**
 * Angular component for displaying and interacting with transport schedule information.
 */
@Component({
  selector: 'app-transport-schedule',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    NgIf,
    MatCheckboxModule,
    MatRippleModule,
    MatProgressBarModule,
    NgForOf,
    DatePipe,
  ],
  templateUrl: './transport-schedule.component.html',
  styleUrl: './transport-schedule.component.sass'
})
export class TransportScheduleComponent {
  /**
   * Flag indicating whether a search operation is in progress.
   */
  isSearching: boolean = false;

  /**
   * Form data for the transport schedule request.
   */
  form: TransportScheduleRequestInterface = {
    apikey: '',
    format: 'json',
    lang: 'ru_RU',
    from: 's9600191', // require
    to: 'c213', // require
    date: '', // require
    transport_types: ['plane', 'train', 'suburban', 'bus', 'water', 'helicopter'], // require
    system: 'yandex',
    show_systems: 'yandex',
    offset: 0,
    limit: 100,
    add_days_mask: false,
    result_timezone: 'Europe/Moscow',
    transfers: false
  };

  /**
   * Departure point for the transport route.
   */
  from: string = '';

  /**
   * Destination point for the transport route.
   */
  to: string = '';

  /**
   * Date selected for the transport schedule.
   */
  date: Date = new Date();

  /**
   * Initializes the component and sets the current date as the default date.
   * @param service Instance of TransportScheduleService for accessing transport schedule data.
   */
  constructor(
    private service: TransportScheduleService,
  ) {
    this.setToday();
  }

  /**
   * Task object representing the types of transport with their completion status.
   */
  task: Task = {
    name: 'any',
    completed: true,
    color: 'primary',
    subtasks: [
      { name: 'plane', completed: true, color: 'primary' },
      { name: 'train', completed: true, color: 'primary' },
      { name: 'suburban', completed: true, color: 'primary' },
      { name: 'bus', completed: true, color: 'primary' },
      { name: 'water', completed: true, color: 'primary' },
      { name: 'helicopter', completed: true, color: 'primary' },
    ],
  };

  /**
   * Flag indicating whether all subtasks are completed.
   */
  allComplete: boolean = true;

  /**
   * Updates the allComplete flag based on the completion status of subtasks.
   */
  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
    if (this.allComplete) {
      this.form.transport_types = ['plane', 'train', 'suburban', 'bus', 'water', 'helicopter'];
    }
    this.syncFormByTasks();
  }

  /**
   * Checks if any subtask is completed.
   * @returns True if any subtask is completed; otherwise, false.
   */
  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  /**
   * Sets all subtasks to the specified completion status.
   * @param completed Whether to mark all subtasks as completed or not.
   */
  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
    this.syncFormByTasks();
  }

  /**
   * Synchronizes the form's transport types based on the completion status of subtasks.
   */
  syncFormByTasks(): void {
    if (this.task.subtasks) {
      this.form.transport_types = [];
      this.task.subtasks.forEach((subtask) => {
        if (subtask.completed &&
          (subtask.name === 'plane' || subtask.name === 'train' || subtask.name === 'suburban' ||
            subtask.name === 'bus' || subtask.name === 'water' || subtask.name === 'helicopter')) {
          this.form.transport_types.push(subtask.name);
        }
      });
    }
  }

  /**
   * Swaps the departure and destination points.
   */
  swap(): void {
    const temp: string = this.form.from;
    this.form.from = this.form.to;
    this.form.to = temp;
    const temp2: string = this.from;
    this.from = this.to;
    this.to = temp2;
  }

  /**
   * Initiates a search operation for transport schedules based on the provided criteria.
   */
  search(): void {
    this.isSearching = true;
    if (this.from !== '' && this.to !== '' && this.form.transport_types.length > 0) {
      this.service.search(this.form).subscribe({
        next: (data: TransportScheduleResponseInterface) => {
          this.segments = data.segments;
          this.isSearching = false;
        },
        error: (error: any) => {
          console.error(error);
          this.isSearching = false;
        }
      });
    } else {
      console.error('missed some params');
      this.isSearching = false;
    }
  }

  /**
   * Sets the current date as the selected date for the transport schedule.
   */
  setToday(): void {
    this.date = new Date();
    this.setDate();
  }

  /**
   * Sets tomorrow's date as the selected date for the transport schedule.
   */
  setTomorrow(): void {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.date = tomorrow;
    this.setDate();
  }

  /**
   * Sets the provided date as the selected date for the transport schedule.
   * @param date The date to set as the selected date.
   */
  setDate(date: Date = this.date): void {
    if (this.date === null || this.date === undefined) return;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    this.form.date = `${year}-${month}-${day}`;
  }

  /**
   * Sets the departure city code based on the entered city name.
   */
  setFromCode(): void {
    const cityName = this.from;
    this.service.getCityCode(cityName).subscribe({
      next: (data: any[]) => {
        this.from = data[1][0][1];
        this.form.from = data[1][0][0];
      }
    });
  }

  /**
   * Sets the destination city code based on the entered city name.
   */
  setToCode(): void {
    const cityName = this.to;
    this.service.getCityCode(cityName).subscribe({
      next: (data: any[]) => {
        this.to = data[1][0][1];
        this.form.to = data[1][0][0];
      }
    });
  }

  /**
   * Array containing the segments of the transport schedule.
   */
  segments: any[] = [];

}

