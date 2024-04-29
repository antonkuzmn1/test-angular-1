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
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw"
import {environment} from "../../environments/environment";

/**
 * The PolygonEditorComponent handles the functionality related to editing polygons on a Mapbox map.
 */
@Component({
  selector: 'app-polygon-editor',
  standalone: true,
  imports: [],
  templateUrl: './polygon-editor.component.html',
  styleUrl: './polygon-editor.component.sass'
})
export class PolygonEditorComponent implements OnInit {
  /**
   * The Mapbox map instance.
   */
  map!: mapboxgl.Map;

  /**
   * The Mapbox Draw control instance for drawing and editing features on the map.
   */
  draw: any;

  /**
   * The Mapbox map style URL.
   * Default value is 'mapbox://styles/mapbox/streets-v11'.
   */
  style: string = 'mapbox://styles/mapbox/streets-v11';

  /**
   * The initial zoom level of the map.
   * Default value is 8.
   */
  zoom: number = 8;

  /**
   * The initial latitude coordinate of the map center.
   * Default value is 55.75 (Moscow).
   */
  lat: number = 55.75;

  /**
   * The initial longitude coordinate of the map center.
   * Default value is 37.62 (Moscow).
   */
  lng: number = 37.62;

  /**
   * Constructs the PolygonEditorComponent and sets the Mapbox access token.
   */
  constructor() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  /**
   * Lifecycle hook called after Angular has initialized all data-bound properties of the component.
   * Initializes the map.
   */
  ngOnInit() {
    this.initializeMap();
  }

  /**
   * Initializes the Mapbox map instance with specified options and adds Draw control.
   */
  private initializeMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      center: [this.lng, this.lat],
      zoom: this.zoom,
      attributionControl: false,
    });

    // Event listener for when the map is loaded
    this.map.on('load', () => {
      this.addDrawControl();
    });
  }

  /**
   * Adds the Mapbox Draw control to the map instance for drawing and editing features.
   */
  private addDrawControl() {
    this.draw = new MapboxDraw({
      displayControlsDefault: true,
    });
    this.map.addControl(this.draw, 'top-left');
  }
}
