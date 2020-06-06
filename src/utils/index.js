function isString(source) {
  return '[object String]' === Object.prototype.toString.call(source);
};

function isFunction(source) {
  return '[object Function]' === Object.prototype.toString.call(source);
};

module.exports = {
  isString,
  isFunction
}