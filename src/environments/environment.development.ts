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

import {EnvironmentInterface} from "./environment-interface";

// noinspection JSUnusedGlobalSymbols,SpellCheckingInspection
/**
 * Environment variables for development.
 * Use these values specifically for development purposes.
 */
export const environment: EnvironmentInterface = {

  production: false,

  apiUrl: '',

  mapbox: {
    accessToken: '' // required
  },

  yandex: {
    rasp: {
      api: {
        key: '', // required
        url: 'https://api.rasp.yandex.net/v3.0/search/?',
      },
      suggests: {
        url: 'https://suggests.rasp.yandex.net/all_suggests?format=old&part='
      }
    }
  },

  proxy: {
    url: 'https://corsproxy.io/?'
  }

};
