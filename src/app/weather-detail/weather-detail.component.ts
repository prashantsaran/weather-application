import { Component } from '@angular/core';
import { WeatherService } from '../service/weather';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs';
import { switchMap, } from 'rxjs/operators';
import { WeatherData } from '../interface/weather-data';
import { DatePipe } from '@angular/common';
import { CityData } from '../interface/city-data';
@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.css'],
  providers: [DatePipe]
})
export class WeatherDetailComponent {



  forecastData: WeatherData[] = []; //list to store the weather data 
  cityName: string = "";
  today: string = "";


  
  formattedSunrise: string = "";
  formattedSunset: string = "";
  minTemprature: number = 0;
  maxTemprature: number = 0;
  cityData: CityData = {} as CityData;
  constructor(private weatherService: WeatherService,
    private route: ActivatedRoute, private datePipe: DatePipe) {


  }

  convertTimestampToTime(timestamp: number): string {
    const date = new Date(timestamp * 1000); // Convert the timestamp to milliseconds
    return this.datePipe.transform(date, 'h:mm a') || '';
  }
  ngOnInit() {
    this.today = new Date().toLocaleString();
    this.route.params
      .pipe(
        map((params) => params["locationName"]),
        filter((name) => !!name),
        switchMap((name) => this.weatherService.getWeatherForCity(name))

      )
      .subscribe(
        (data) => {
          this.cityData = data;


          this.formattedSunrise = this.convertTimestampToTime( this.cityData.city.sunrise);
          this.formattedSunset = this.convertTimestampToTime(this.cityData.city.sunset);
         
      
          this.processForecastData();
        },
        (error) => {
          console.error('Error in API call:', error);

        }
      );
  }

  processForecastData() {
    if (this.cityData.list) {
      this.forecastData = [];
      const groupedData = new Map<string, WeatherData>();
      for (const item of this.cityData.list) {
        const forecastDate = new Date(item.dt_txt).toLocaleDateString(); // Get the date string
        if (!groupedData.has(forecastDate)) {
          groupedData.set(forecastDate, item); // Stored the first item of each date in the Map
        }
      }


      this.forecastData = Array.from(groupedData.values());

    }
  }



}
