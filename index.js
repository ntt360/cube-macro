const path = require('path');
const program = require('commander');
const vfs = require('vinyl-fs');
const through = require('through2');
const istextorbinary = require('istextorbinary');

const defaultTplPath = './tpl';
const defaultOutPath = './dist';
const defaultConfigPath = './data.config.js';

program
  .version('0.0.1', '-V, --version', '查看版本')
  .helpOption('-h, --help', '帮助')
  .option('-t, --template', '指定模板路径', defaultTplPath)
  .option('-o, --out', '指定输出路径', defaultOutPath)
  .parse(process.argv);

const tplPath = path.resolve(program.template ? program.template : defaultTplPath);
const outPath = path.resolve(program.out ? program.out : defaultOutPath);

const dataConfigPath= path.join(tplPath, defaultConfigPath);
const dataConfig = require(dataConfigPath)({});

function isString(source) {
  return '[object String]' === Object.prototype.toString.call(source);
};

function replaceBuffer (str, config) {
  return Object.keys(config).reduce(function(str, key) {
    const value = config[key];
    const valueIsString = isString(value)
    const search = new RegExp(valueIsString ? `__${key}__` : `('|")__${key}__('|")`, "gi");
    return str.replace(search, function() {
      return valueIsString ? value : JSON.stringify(value)
    })
  }, str);
}

function runTask (pipeLineHandle) {
  const pipeList = pipeLineHandle();
  return pipeList.map(function(collectConfig) {
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
            if (file.isBuffer()) {
              const buf = replaceBuffer(String(file.contents), config[pipe.key]);
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
        .pipe(vfs.dest(pipe.dist));
    })
  })
}

runTask(function() {
  return dataConfig.map(function(config) {
    const dirName = config.project.dirName;
    const pipeConfig = [
      {
        key: 'cube',
        src: [
          `${tplPath}/cube.json`
        ],
        dist: path.join(outPath, dirName)
      },
      {
        key: 'api',
        src: [
          `${tplPath}/api.json`
        ],
        dist: path.join(outPath, dirName)
      },
      {
        key: 'data',
        src: [
          `${tplPath}/src/**/*`,
          `!${tplPath}/node_modules/**/*`,
          `!${tplPath}/data.config.js`,
          `!${tplPath}/LICENSE`
        ],
        dist: path.join(outPath, dirName, './src')
      }
    ];
    return [ config, pipeConfig ];
  })
})