const validator = require('validator');
console.log(validator.isEmail('sandhika@gmail.com'));
console.log(validator.isMobilePhone('0878688607', 'id-ID'));
console.log(validator.isNumeric('0878688607'));
// Chalk

const chalk = require('chalk');
console.log(chalk.blue('Hello World'));
console.log(chalk.bgBlue.black('Hello World'));
console.log(chalk.italic.bgWhite.green('Hello World'));

// Use temmplate literal
const nama = 'sandhika';
const message = chalk`{green.strikethrough Lorem ipsum dolor} {bgRed.green sit amet} consectetur, {bold adipisicing elit.} {green.bgBlue Obcaecati}, {bgWhite perferendis}. ${nama}`;
console.log(message);
