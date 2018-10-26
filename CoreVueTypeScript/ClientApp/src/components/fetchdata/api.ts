import { WeatherForecast } from "./IFetchdata";

export function getForecasts(
  successCb: (data: WeatherForecast[]) => void,
  errorCb: (err: Error) => void
) {
  fetch("api/SampleData/WeatherForecasts")
    .then(response => response.json() as Promise<WeatherForecast[]>)
    .then(successCb)
    .catch(errorCb);
}
