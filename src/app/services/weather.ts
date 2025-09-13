import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Weather {
  constructor(private http: HttpClient) {}

  /**
   * Retrieves weather information from the given API URL.
   * @param apiUrl The API endpoint to fetch weather data from.
   */
  getWeather(apiUrl: string): Observable<any> {
    return this.http.get(apiUrl);
  }
}
