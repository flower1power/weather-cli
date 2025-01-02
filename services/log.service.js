import chalk from 'chalk';
import dedent from 'dedent-js';

export const printError = (err) => {
  console.log(chalk.bgRed('ERROR:') + ' '`${err}`);
};

export const printSuccess = (msg) => {
  console.log(chalk.bgGreen('SUCCESS:') + ' '`${msg}`);
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
