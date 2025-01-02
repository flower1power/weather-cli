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

const saveCity = async (city) => {
  if (!city.length) {
    printError(`Не передан город`);
    return;
  }

  const token = await getKeyValue(TOKEN_DICTIONARY.token);
  const geo = await getGeoCoodiantes(city, token);

  if (geo.length === 0) {
    printError(`Не верно указан город`);
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess('Город сохранен');
  } catch (e) {
    printError(`Ошибка: ${e.message}`);
  }
};

const getForcast = async () => {
  try {
    const weather = await getWeather();
    printWeather(weather, getIcon(weather.weather[0].icon));
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
    return saveCity(args.s);
  }
  if (args.t) {
    return saveToken(args.t);
  }
  getForcast();
};

initCLI();
