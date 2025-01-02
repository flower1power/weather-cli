#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import {
  printHelp,
  printSuccess,
  printError,
  printWeather,
} from './services/log.service.js';
import {
  saveKeyValue,
  TOKEN_DICTIONARY,
  getKeyValue,
} from './services/storage.service.js';
import {
  getWeather,
  getGeoCoodiantes,
  getIcon,
} from './services/api.service.js';

const saveToken = async (token) => {
  if (!token.length) {
    printError(`Не передан токен`);
    return;
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess('Токен сохранен');
  } catch (e) {
    printError(`Ошибка: ${e.message}`);
  }
};

const saveCity = async (cities) => {
  if (!cities || cities.length === 0) {
    printError(`Не переданы города`);
    return;
  }
  const token = await getKeyValue(TOKEN_DICTIONARY.token);

  if (!token) {
    printError('Не указан токен, задайте его через команду -t [API_KEY]');
    return;
  }
  const validCities = [];

  for (const city of cities) {
    try {
      const geo = await getGeoCoodiantes(city, token);

      if (geo.lat && geo.lon) {
        validCities.push(city);
      }
    } catch (e) {
      printError(`Город "${city}" не найден или указан некорректно`);
    }
  }

  if (validCities.length > 0) {
    try {
      await saveKeyValue(TOKEN_DICTIONARY.city, validCities);
      printSuccess(`Города сохранены: ${validCities.join(', ')}`);
    } catch (e) {
      printError(`Ошибка сохранения городов: ${e.message}`);
    }
  } else {
    printError('Ни один из переданных городов не был найден');
  }
};

const getForcast = async (lang) => {
  try {
    const weathers = await getWeather(lang);

    for (const el of weathers) {
      printWeather(el, getIcon(el.data.weather[0].icon), lang);
    }
  } catch (e) {
    if (e?.response?.status === 401) {
      printError('Не верно указан токен');
    } else {
      printError(e.message);
    }
  }
};

const initCLI = async () => {
  const args = getArgs(process.argv);

  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    const cities = Array.isArray(args.s) ? args.s : [args.s];
    return saveCity(cities);
  }
  if (args.t) {
    return saveToken(args.t);
  }
  getForcast(args.l);
};

initCLI();
