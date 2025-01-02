#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { printHelp, printSuccess, printError } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';
import { getWeather } from './services/api.service.js';
import { AxiosError } from 'axios';

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

const getForcast = async () => {
  try {
    const weather = await getWeather('krasnod');
    console.log(weather);
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
    printHelp();
  }
  if (args.s) {
    // await getForcast(args.s);
  }
  if (args.t) {
    return saveToken(args.t);
  }
  getForcast();
  // Weather
};

initCLI();
