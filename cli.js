#!/usr/bin/env node
const meow = require('meow');
const chalk = require('chalk');
const { sync: readFilePathFromClipboard } = require('./index');

const cli = meow(chalk.whiteBright(`
  Usage
      Copy files and execute below command.
      $ read-filepath-from-clipboard
`));

console.log(chalk.whiteBright(readFilePathFromClipboard().join('\n')));