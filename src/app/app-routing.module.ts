import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherReportComponent } from './weather-report/weather-report.component';
import { WeatherDetailComponent } from './weather-detail/weather-detail.component';
const routes: Routes = [
  {
    path: "",
    component: WeatherDetailComponent,
  },
  {
    path: "Weather/:locationName",
    component: WeatherReportComponent,
  },
  {
    path:"Weather/City/:locationName",
    component:WeatherDetailComponent
  }
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
