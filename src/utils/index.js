function isString(source) {
  return '[object String]' === Object.prototype.toString.call(source);
};

function isFunction(source) {
  return '[object Function]' === Object.prototype.toString.call(source);
};

function isObject(source) {
  return '[object Object]' === Object.prototype.toString.call(source);
};

module.exports = {
  isString,
  isFunction,
  isObject
}