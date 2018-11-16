export function combine (path, options) {
  let step1 = require('../creators/year').create(path)
  return require('../creators/season').create(step1, options.season)
}
