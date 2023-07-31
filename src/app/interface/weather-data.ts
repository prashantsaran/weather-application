export interface WeatherData {
    
    Date:Date,
    Temprature:string,
    dt_txt:string,
    Icon:string,
    main:{temp:string,feels_like:string,humidity:number,temp_min:number,temp_max:number},
    weather:[{description:string,icon:string}],
    wind:{speed :string}

}
