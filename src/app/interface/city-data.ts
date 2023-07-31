import { WeatherData } from "./weather-data";

export interface CityData {
    city:{name:string,sunrise:number,sunset:number};
    list:[WeatherData];
}
