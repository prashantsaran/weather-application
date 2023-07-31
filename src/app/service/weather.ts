import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) { }

  getWeatherForCity(city: string): Observable<any> {
    const path3 = `${environment.url}` + `${city}` + `${environment.url2}`;
    return this.http.get(path3);
  }


}

