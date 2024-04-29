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

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { TransportScheduleRequestInterface } from "./transport-schedule-request-interface";
import { TransportScheduleResponseInterface } from "./transport-schedule-response-interface";
import { environment } from "../../environments/environment";

/**
 * Service for interacting with the Yandex Transport Schedule API.
 */
@Injectable({
  providedIn: 'root'
})
export class TransportScheduleService {

  /**
   * Initializes the TransportScheduleService.
   * @param http Instance of HttpClient for making HTTP requests.
   */
  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Performs a search for transport schedules based on the provided request data.
   * @param requestForm The request data for the transport schedule search.
   * @returns An Observable emitting the response data for the transport schedule search.
   */
  search(requestForm: TransportScheduleRequestInterface): Observable<TransportScheduleResponseInterface> {
    const queryParams: HttpParams = new HttpParams({
      fromObject: {
        apikey: environment.yandex.rasp.api.key,
        from: requestForm.from,
        to: requestForm.to,
        format: requestForm.format,
        lang: requestForm.lang,
        date: requestForm.date,
        transport_types: requestForm.transport_types.join(','),
        system: requestForm.system,
        show_systems: requestForm.show_systems,
        offset: requestForm.offset.toString(),
        limit: requestForm.limit.toString(),
        add_days_mask: requestForm.add_days_mask.toString(),
        result_timezone: requestForm.result_timezone,
        transfers: requestForm.transfers.toString()
      }
    });
    const url: string = `${environment.yandex.rasp.api.url}${queryParams.toString()}`
    const forSend: string = `${environment.proxy.url}${url}`
    return this.http.get<TransportScheduleResponseInterface>(forSend)
  }

  /**
   * Retrieves the city code for the given city name.
   * @param cityName The name of the city for which the code is requested.
   * @returns An Observable emitting the city code data.
   */
  getCityCode(cityName: string): Observable<any[]> {
    const url: string = `${environment.yandex.rasp.suggests.url}${encodeURIComponent(cityName)}`
    const forSend: string = `${environment.proxy.url}${url}`
    return this.http.get<any[]>(forSend)
  }
}

