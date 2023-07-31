

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
 // Array of countries with their respective cities
 countries = [
  {
    name: "India",
    cities: ['New Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Jaipur', 'Ahmedabad','Faridabad', 'Chandigarh']
  },
  {
    name: "United Kingdom",
    cities: ["London", "Manchester", "Birmingham", "Glasgow", "Edinburgh", "Liverpool", "Leeds", "Bristol", "Sheffield"]
  },
  {
    name: "United States",
    cities: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "Dallas", "San Francisco", "Miami", "Seattle"]
  },
  {
    name: "Australia",
    cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast", "Canberra", "Darwin", "Hobart"]
  },
  {
    name: "Canada",
    cities: ["Toronto", "Vancouver", "Montreal", "Calgary", "Edmonton", "Ottawa", "Quebec City", "Winnipeg", "Halifax"]
  },
  {
    name: "Japan",
    cities: ["Tokyo", "Osaka", "Nagoya", "Yokohama", "Kyoto", "Sapporo", "Kobe", "Fukuoka", "Hiroshima"]
  },
  {
    name: "Germany",
    cities: ["Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt", "Stuttgart", "Dusseldorf", "Leipzig", "Hannover"]
  },
  {
    name: "Brazil",
    cities: ["Sao Paulo", "Rio de Janeiro", "Brasilia", "Salvador", "Fortaleza", "Belo Horizonte", "Curitiba", "Manaus", "Recife"]
  },
  {
    name: "France",
    cities: ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Bordeaux", "Lille"]
  },
  {
    name: "Italy",
    cities: ["Rome", "Milan", "Naples", "Turin", "Florence", "Venice", "Bologna", "Genoa", "Palermo"]
  },
];


// FormControl to hold the selected country and city
countryControl: FormControl;
cityControl: FormControl;

// Observable to hold the list of cities based on the selected country
cities: Observable<string> | undefined;

// Flag to indicate loading state
loading: boolean = false;

constructor(private router: Router) {
  this.cityControl = new FormControl("");
  this.countryControl = new FormControl("");
}

ngOnInit() {
  // Sort the countries array based on country names in increasing order
  this.countries.sort((a, b) => a.name.localeCompare(b.name));

  // Sort each cities array inside the countries array in increasing order
  this.countries.forEach(country => {
    country.cities.sort((cityA, cityB) => cityA.localeCompare(cityB));
  });

  // Bind the list of cities based on the selected country using valueChanges and map operators
  this.cities = this.countryControl.valueChanges.pipe(
    map((country) => country.cities)
  );

  // Subscribe to valueChanges of cityControl to navigate to the selected city's weather page
  this.cityControl.valueChanges.subscribe((value) => {
    this.loading = true;

    // Simulate delay for 1 second to show the loading progress
    setTimeout(() => {
      this.router.navigate(['/Weather/City',value]);
      this.loading = false;
    }, 1000);
  });
}
searchWeather(city:string){
  this.loading = true;

  // Simulate delay for 1 second to show the loading progress
  setTimeout(() => {
    this.router.navigate(['/Weather/City',city]);
    this.loading = false;
  }, 1000);
}

}
