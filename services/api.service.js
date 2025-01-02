import axios, { Axios, AxiosError } from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

export const getIcon = (icon) => {
  switch (icon.slice(0, -1)) {
    case '01':
      return '☀️';
    case '02':
      return '🌤️';
    case '03':
      return '☁️';
    case '04':
      return '☁️';
    case '09':
      return '🌧️';
    case '10':
      return '🌦️';
    case '11':
      return '🌩️';
    case '13':
      return '❄️';
    case '50':
      return '🌫️';
  }
};

export const getGeoCoodiantes = async (city, token) => {
  const url = new URL('http://api.openweathermap.org/geo/1.0/direct');
  const { data } = await axios.get(`${url}`, {
    params: {
      q: city,
      limit: 1,
      appid: token,
    },
  });

  if (data.length === 0) {
    throw new Error('Не верно указан город');
  }
  return { lat: data[0].lat, lon: data[0].lon };
};

export const getWeather = async () => {
  const token =
    process.env.TOKEN ?? (await getKeyValue(TOKEN_DICTIONARY.token));

  if (!token) {
    throw new Error('Не указан токен, задайте его через команду -t [API_KEY]');
  }

  const city = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city));

  if (!city) {
    throw new Error('Не указан город, задайте его через команду -s [CITY]');
  }

  const coordinates = await getGeoCoodiantes(city, token);

  const url = new URL('https://api.openweathermap.org/data/2.5/weather');
  const { data } = await axios.get(`${url}`, {
    params: {
      lat: coordinates.lat,
      lon: coordinates.lon,
      appid: token,
      units: 'metric',
      lang: 'ru',
    },
  });

  return data;
};
