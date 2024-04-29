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

/**
 * Interface representing the response format from api.rasp.yandex.net.
 * This interface defines the structure of the response object returned by the API.
 * @interface TransportScheduleResponseInterface
 */
export interface TransportScheduleResponseInterface {
  pagination: {
    total: number;
    limit: number;
    offset: number;
  };
  interval_segments: {
    from: {
      code: string;
      title: string;
      popular_title: string;
      short_title: string;
      transport_type: string;
      type: string;
      station_type: string;
      station_type_name: string;
    };
    thread: {
      uid: string;
      title: string;
      interval: {
        density: string;
        end_time: string;
        begin_time: string;
      };
      number: string;
      short_title: string;
      thread_method_link: string;
      carrier: {
        code: number;
        contacts: string;
        url: string;
        logo_svg: any;
        title: string;
        phone: string;
        codes: {
          icao: any;
          sirena: string;
          iata: string;
        };
        address: string;
        logo: string;
        email: string;
      };
      transport_type: string;
      vehicle: string;
      transport_subtype: {
        color: string;
        code: string;
        title: string;
      };
      express_type: any;
    };
    departure_platform: string;
    stops: string;
    departure_terminal: any;
    to: {
      code: string;
      title: string;
      popular_title: string;
      short_title: string;
      transport_type: string;
      type: string;
      station_type: string;
      station_type_name: string;
    };
    has_transfers: boolean;
    tickets_info: {
      et_marker: boolean;
      places: {
        currency: string;
        price: {
          cents: number;
          whole: number;
        };
        name: string;
      }[];
    };
    duration: number;
    arrival_terminal: string;
    start_date: string;
    arrival_platform: string;
  }[];
  segments: {
    arrival: string;
    from: {
      code: string;
      title: string;
      popular_title: string;
      short_title: string;
      transport_type: string;
      station_type: string;
      station_type_name: string;
      type: string;
    };
    thread: {
      uid: string;
      title: string;
      number: string;
      short_title: string;
      thread_method_link: string;
      carrier: {
        code: number;
        contacts: string;
        url: string;
        logo_svg: any;
        title: string;
        phone: string;
        codes: {
          icao: any;
          sirena: string;
          iata: string;
        };
        address: string;
        logo: string;
        email: string;
      };
      transport_type: string;
      vehicle: string;
      transport_subtype: {
        color: string;
        code: string;
        title: string;
      };
      express_type: any;
    };
    departure_platform: string;
    departure: string;
    stops: string;
    departure_terminal: any;
    to: {
      code: string;
      title: string;
      popular_title: string;
      short_title: string;
      transport_type: string;
      station_type: string;
      station_type_name: string;
      type: string;
    };
    has_transfers: boolean;
    tickets_info: {
      et_marker: boolean;
      places: {
        currency: string;
        price: {
          cents: number;
          whole: number;
        };
        name: string;
      }[];
    };
    duration: number;
    arrival_terminal: string;
    start_date: string;
    arrival_platform: string;
  }[];
  search: {
    date: string;
    to: {
      code: string;
      type: string;
      popular_title: string;
      short_title: string;
      title: string;
    };
    from: {
      code: string;
      type: string;
      popular_title: string;
      short_title: string;
      title: string;
    };
  };
}
