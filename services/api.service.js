import axios, { Axios, AxiosError } from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

const getGeoCoodiantes = async (city, token) => {
  const url = new URL('http://api.openweathermap.org/geo/1.0/direct');
  try {
    const { data } = await axios.get(`${url}`, {
      params: {
        q: city,
        limit: 1,
        appid: token,
      },
    });
    return { lat: data[0].lat, lon: data[0].lon };
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.message);
    }
  }
};

export const getWeather = async (city) => {
  const token = await getKeyValue(TOKEN_DICTIONARY.token);

  if (!token) {
    throw new Error('Не указан токен, задайте его через команду -t [API_KEY]');
  }

  const coordinates = await getGeoCoodiantes(city, token);

  try {
    const url = new URL('https://api.openweathermap.org/data/2.5/weather');
    const { data } = await axios.get(
      `${url}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${token}&units=metric&lang=ru`,
      {
        params: {
          lat: coordinates.lat,
          lon: coordinates.lon,
          appid: token,
          units: 'metric',
          lang: 'ru',
        },
      },
    );
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.message);
    }
  }
};
