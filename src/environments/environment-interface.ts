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
 * Interface representing environment variables used in the application.
 */
export interface EnvironmentInterface {
  /**
   * Indicates whether the application is running in production mode.
   * Set to true for production, false for development.
   */
  production: boolean;

  /**
   * Base URL for the API endpoints.
   * Note: This field is currently unused and can be left empty.
   */
  apiUrl: string;

  /**
   * Access token for Mapbox SDK.
   * This token is used to authenticate requests to Mapbox APIs and services.
   * Obtain your Mapbox access token from the Mapbox account dashboard.
   */
  mapbox: {
    accessToken: string;
  }

  /**
   * Yandex APIs configuration.
   */
  yandex: {
    /**
     * Configuration for the Yandex.Rasp API.
     */
    rasp: {
      /**
       * Yandex.Rasp API key.
       * This key is used to authenticate requests to Yandex.Rasp APIs.
       * Obtain your Yandex.Rasp API key from the Yandex.Rasp account dashboard.
       */
      api: {
        key: string,
        /**
         * URL for Yandex.Rasp API.
         */
        url: string,
      },
      /**
       * Configuration for Yandex suggests API.
       */
      suggests: {
        /**
         * URL for Yandex suggests API.
         */
        url: string
      }
    }
  }

  /**
   * Configuration for the proxy server.
   */
  proxy: {
    /**
     * URL for the proxy server.
     * This URL is used to route requests through a proxy server for additional security or privacy measures.
     */
    url: string
  }

}
