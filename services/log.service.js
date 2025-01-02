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
    -s [CITY,CITY,CITY,...] для установки города/ов
    -h для вывода помощи
    -t [API_KEY] для сохранения токена
    `,
  );
};

export const printWeather = (res, icon, lang = 'ru') => {
  lang === 'en'
    ? console.log(
        dedent`${chalk.bgCyan('WEATHER:')} Weather in city ${res.data.name}
    ${icon} ${res.data.weather[0].description}
    Temperature: ${res.data.main.temp} (feels like ${res.data.main.feels_like})
    Humidity: ${res.data.main.humidity} %
    Wind speed: ${res.data.wind.speed}
    `,
      )
    : console.log(
        dedent`${chalk.bgCyan('WEATHER:')} Погода в городе ${res.data.name}
    ${icon} ${res.data.weather[0].description}
    Температура: ${res.data.main.temp} (ощущается как ${
          res.data.main.feels_like
        })
    Влажность: ${res.data.main.humidity} %
    Скорость ветра: ${res.data.wind.speed}
    `,
      );
};
