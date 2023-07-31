import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) { }

  getWeatherForCity(city:string): Observable<any>{
    const path3=`${environment.url}`+`${city}`+`${environment.url2}`;
    return this.http.get(path3);
  }



  
  getWeatherForCity2(city: string): Observable<any> {


    const path = `${environment.cityWeatherData1}` + `${city}` + `${environment.cityWeatherData2}`;
    return this.http.get(path).pipe(
      map((data: any) => {
        if (data && data.weather && Array.isArray(data.weather) && data.weather.length > 0 && data.weather[0].icon) {
          return {
            ...data,
            image: `${environment.cloudIconUrl1}` + `${data.weather[0].icon}` + `${environment.cloudIconUrl2}`// added the image url to this Json data by creating it
          };
        } else {
          // If the expected structure is not present in the API response, return the data as it is
          return data;
        }
      }),

      catchError((error) => {
        // Handle API error here if needed
        console.error('API Error:', error);

        return of(error);
      })
    );
    this.getWeatherForCity2(city).subscribe();

  }

}

