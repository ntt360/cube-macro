#!/usr/bin/env node
const path = require('path');
const program = require('commander');
const CFonts = require('cfonts');
const cubeMacro = require('../src/index.js');

const {
  DEFAULT_TEMPLATE_PATH,
  DEFAULT_OUTPUT_PATH,
  DEFAULT_CONFIG_PATH
} = require('../src/config');

const LOGO = CFonts.render('cube-macro', {
  font: 'block',
  align: 'left',
  colors: ["#00ce41", "#ffffff"],
  env: 'node'
}).string

program
  .version(`${LOGO}v1.0.0`, '-V, --version', '查看版本')
  .helpOption('-h, --help', '帮助')
  .option('-t, --template <path>', '指定模板路径', DEFAULT_TEMPLATE_PATH)
  .option('-o, --out <path>', '指定输出路径', DEFAULT_OUTPUT_PATH)
  .option('-w, --watch', '监测模板更改', false)
  .parse(process.argv);

const tplPath = path.resolve(program.template ? program.template : DEFAULT_TEMPLATE_PATH);
const outPath = path.resolve(program.out ? program.out : DEFAULT_OUTPUT_PATH);
const dataConfigPath = path.join(tplPath, DEFAULT_CONFIG_PATH);

cubeMacro({
  templatePath: tplPath,
  outputPath: outPath,
  watch: program.watch,
  config: require(dataConfigPath)
})