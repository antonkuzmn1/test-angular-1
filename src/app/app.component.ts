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

import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {NgForOf} from "@angular/common";

/**
 * The AppComponent serves as the entry point for the Angular application.
 * It initializes navigation links and manages the active link based on route changes.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatTabNav,
    MatTabLink,
    NgForOf,
    RouterLink,
    RouterLinkActive,
    MatTabNavPanel
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent implements OnInit {
  /**
   * The title of the application.
   */
  title: string = 'test-angular-1';

  /**
   * Array containing navigation links for the application.
   * Each link consists of a label, a route link, and an index.
   */
  navLinks: any[];

  /**
   * Index of the currently active navigation link.
   * Initialized to -1 indicating no active link.
   */
  activeLinkIndex: number = -1;

  /**
   * Constructs the AppComponent with a Router instance.
   * Initializes the navigation links array.
   * @param router - Router instance for navigating between routes.
   */
  constructor(private router: Router) {
    this.navLinks = [
      {label: 'Polygon editor', link: './polygon-editor', index: 0},
      {label: 'Transport schedule', link: './transport-schedule', index: 1},
    ];
  }

  /**
   * Lifecycle hook called after Angular has initialized all data-bound properties of the component.
   * Subscribes to router events to update the activeLinkIndex based on route changes.
   */
  ngOnInit(): void {
    // Subscribe to router events
    this.router.events.subscribe(() => {
      // Find the index of the active link based on the current route
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find((tab) => tab.link === '.' + this.router.url)
      );
    });

  }

}
