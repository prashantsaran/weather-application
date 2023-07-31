import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../service/weather';
import { ActivatedRoute } from '@angular/router';
import { Observable, concatMap, filter, map } from 'rxjs';
import { of } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-weather-report',
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.css']
})

export class WeatherReportComponent implements OnInit {
  today: Date;
  data$: Observable<any> | undefined;
  

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute,
   
  ){
 
    this.today = new Date();
   
  }

  ngOnInit()
   {
    console.log('##',this.weatherService.getWeatherForCity('Paris'))
    // Subscribe to the route parameter changes to get the 'locationName' value
    this.data$ = this.route.params.pipe(
      map((params) => params["locationName"]),
      filter((name) => !!name),
      tap(() => {
        // Show loading indicator when new data is being fetched
        
      }),
  
      
      // Use concatMap to chain API calls for the given 'locationName'
      concatMap((name) => this.weatherService.getWeatherForCity(name).pipe(
        catchError((error) => {
          // Handle API call errors gracefully
          console.error('Error in API call:', error.status);
          return of(null); // Returns a default value or handle the error
        })
    
        
      )),
      tap(() => {
        // Hide loading indicator after the API call completes
        
      }),
      delay(500) // Add a slight delay to the observable stream (500 milliseconds)
    );
  }

}
