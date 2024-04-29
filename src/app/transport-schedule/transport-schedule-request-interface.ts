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
 * Interface representing the request structure for querying the Yandex Transport Schedule API.
 * For detailed information on each parameter, refer to the official Yandex documentation:
 * {@link https://yandex.ru/dev/rasp/doc/ru/reference/schedule-point-point}
 */
export interface TransportScheduleRequestInterface {

  /**
   * API key required for accessing the Yandex Transport Schedule API.
   */
  apikey: string,

  /**
   * Desired format of the response data. Can be either 'json' or 'xml'.
   */
  format: 'json' | 'xml',

  /**
   * Language preference for response data. Can be 'ru_RU' for Russian or 'uk_UA' for Ukrainian.
   */
  lang: 'ru_RU' | 'uk_UA',

  /**
   * Departure point for the transport route.
   */
  from: string,

  /**
   * Destination point for the transport route.
   */
  to: string,

  /**
   * Date for which the schedule is requested (in the format 'YYYY-MM-DD').
   */
  date: string,

  /**
   * Array of transport types to include in the search.
   * Options include: 'plane', 'train', 'suburban', 'bus', 'water', 'helicopter'.
   */
  transport_types: ('plane' | 'train' | 'suburban' | 'bus' | 'water' | 'helicopter')[],

  /**
   * System identifier for the transport schedule provider.
   * Supported options: 'yandex', 'iata', 'sirena', 'express', 'esr'.
   */
  system: 'yandex' | 'iata' | 'sirena' | 'express' | 'esr',

  /**
   * System identifier for the transport schedule provider to include in the response.
   * Supported options: 'yandex', 'esr'.
   */
  show_systems: 'yandex' | 'esr',

  /**
   * Offset for pagination. Specifies the number of results to skip.
   */
  offset: number,

  /**
   * Maximum number of results to return in a single response.
   */
  limit: number,

  /**
   * Flag indicating whether to include additional days in the search results.
   */
  add_days_mask: boolean,

  /**
   * Timezone for the returned results.
   * Supported options: 'Europe/Moscow', 'Asia/Novosibirsk'.
   */
  result_timezone: 'Europe/Moscow' | 'Asia/Novosibirsk',

  /**
   * Flag indicating whether to include transfers in the search results.
   */
  transfers: boolean
}

