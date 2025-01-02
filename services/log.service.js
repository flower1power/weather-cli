import chalk from 'chalk';
import dedent from 'dedent-js';

export const printError = (err) => {
  console.log(chalk.bgRed('ERROR:') + ' ' + `${err}`);
};

export const printSuccess = (msg) => {
  console.log(chalk.bgGreen('SUCCESS:') + ' ' + `${msg}`);
};

export const printHelp = () => {
  console.log(
    dedent`${chalk.bgYellow('HELP:')}
    Без параметров - вывод погоды
    -s [CITY] для установки города
    -h для вывода помощи
    -t [API_KEY] для сохранения токена
    `,
  );
};

export const printWeather = (res, icon) => {
  console.log(
    dedent`${chalk.bgCyan('WEATHER:')} Погода в городе ${res.name}
    ${icon} ${res.weather[0].description}
    Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
    Влажность: ${res.main.humidity} %
    Скорость ветра: ${res.wind.speed} м.c
    `,
  );
};
