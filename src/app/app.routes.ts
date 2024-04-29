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

import {Routes} from '@angular/router';
import {PolygonEditorComponent} from "./polygon-editor/polygon-editor.component";
import {TransportScheduleComponent} from "./transport-schedule/transport-schedule.component";

/**
 * Defines the routes configuration for the Angular application.
 * Each route object consists of a path and the component to render for that path.
 * Additionally, redirects are defined for the default path and any other unmatched paths.
 */
export const routes: Routes = [
  {path: 'polygon-editor', component: PolygonEditorComponent},
  {path: 'transport-schedule', component: TransportScheduleComponent},
  {path: '**', redirectTo: 'polygon-editor', pathMatch: 'full'},
  {path: '', redirectTo: 'polygon-editor', pathMatch: 'full'},
];
