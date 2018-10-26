export interface WeatherForecast {
  id: string;
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

export interface IState {
  forecasts: WeatherForecast[];
  pending: Boolean;
}
