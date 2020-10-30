const path = require('path');
const vfs = require('vinyl-fs');
const through = require('through2');
const istextorbinary = require('istextorbinary');
const chokidar = require('chokidar');
const { Signale } = require('signale');

const { isFunction, isObject } = require('./utils');
const {
  DEFAULT_TEMPLATE_PATH,
  DEFAULT_OUTPUT_PATH
} = require('./config');

function exec(expression, context) {
  with (context) {
    return eval(expression)
  }
}

function createPipeConfig({
  templatePath,
  outputPath,
  dirName
}) {
  return [
    {
      key: 'cube',
      src: [
        `${templatePath}/cube.json`
      ],
      dist: path.join(outputPath, dirName)
    },
    {
      key: 'api',
      src: [
        `${templatePath}/api.json`
      ],
      dist: path.join(outputPath, dirName)
    },
    {
      key: 'data',
      src: [
        `${templatePath}/src/**/*`,
        `!${templatePath}/node_modules/**/*`,
        `!${templatePath}/data.config.js`,
        `!${templatePath}/LICENSE`
      ],
      dist: path.join(outputPath, dirName, './src')
    }
  ]
}

function replaceBuffer (str, config, extname) {
  const matchVariableList = str.match(/__(.*)__/ig);
  if (!matchVariableList) {
    return str;
  }
  return matchVariableList.reduce(function(str, __key__) {
    const key = __key__.match(/__(.*)__/)[1];
    const value = exec(key, config)
    const valueIsObject = isObject(value) || isFunction(value)
    const search = valueIsObject ? new RegExp(`('|")__${key}__('|")`) : `__${key}__`;
    return str.replace(search, function() {
      return valueIsObject ? JSON.stringify(value) : value;
    })
  }, str);
}

function signaleHandle(pipeHandle) {
  return function(collectConfig) {
    const [ config ] = collectConfig;
    const dirName = config.project.dirName;
    const interactive = new Signale({ interactive: true, scope: dirName });

    interactive.scope(dirName).await(`building...`);
    const pipeConfigList = pipeHandle.call(null, collectConfig);
    interactive.scope(dirName).success(`${dirName} built successfully!\n`);

    return pipeConfigList
  }
}

function runTask (pipeLineHandle) {
  const pipeList = pipeLineHandle();
  return pipeList.map(signaleHandle(function(collectConfig) {
    const [ config, pipeConfig ] = collectConfig;
    return pipeConfig.map(function(pipe) {
      return vfs.src(pipe.src)
        .pipe(through.obj(function (file, enc, callback) {
          if (!file.stat.isFile()) {
            return callback();
          }
          this.push(file);
          return callback();
        }))
        .pipe(through.obj(function (file, enc, callback) {
          if (file.isNull()) {
            return callback(null, file);
          }
      
          function doReplace() {
            if (config[pipe.key] && file.isBuffer()) {
              const buf = replaceBuffer(String(file.contents), config[pipe.key], path.extname(file.path));
              file.contents = new Buffer(buf);
              return callback(null, file);
            }
            callback(null, file);
          }

          istextorbinary.isText(file.path, file.contents, function(err, result) {
            if (err) {
              return callback(err, file);
            }
  
            if (!result) {
              callback(null, file);
            } else {
              doReplace();
            }
          });

        }))
        .pipe(vfs.dest(pipe.dist))
        .on('end', function() {});
    })
  }))
}

function compile({
  templatePath,
  outputPath,
  config
}) {
  const dataConfig = isFunction(config) ? config({
    isProd: process.env.NODE_ENV === 'production'
  }) : config;

  return Promise.resolve(dataConfig).then(function(dataConfig) {
    runTask(function() {
      return dataConfig.map(function(config) {
        const dirName = config.project.dirName;
        const pipeConfig = createPipeConfig({
          templatePath,
          outputPath,
          dirName
        });
        return [ config, pipeConfig ];
      })
    })
  }).catch(function (error) { new Signale().fatal(new Error(error)) })
}

module.exports = function ({
  templatePath = DEFAULT_TEMPLATE_PATH,
  outputPath = DEFAULT_OUTPUT_PATH,
  watch = false,
  config
}) {
  if (watch) {
    chokidar
      .watch([ templatePath ])
      .on('change', function(_path) {
        new Signale().watch(`File: ${_path} has been changed\n`);
        compile({
          templatePath,
          outputPath,
          config
        })
      })
      .on('ready', function () {
        new Signale({
          types: {
            remind: {
              badge: '…',
              color: 'blue',
              label: '👍 👍 👍',
              logLevel: 'info'
            }
          }
        }).remind('Watching template directory...\n');
      })
      .on('error', function (error) {
        new Signale().fatal(new Error(error))
      });
  }

  return compile({
    templatePath,
    outputPath,
    config
  })
}