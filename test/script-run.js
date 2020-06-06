const path = require('path');
const cubeMacro = require('../src/index.js');
const config = require('../tpl/data.config.js');

cubeMacro({
  templatePath: path.resolve(__dirname, '../tpl'),
  outputPath: path.resolve(__dirname, '../dist'),
  config
}).then(() => console.log('Finished'));