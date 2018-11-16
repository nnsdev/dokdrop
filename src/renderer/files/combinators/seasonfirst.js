export function combine (path, options) {
  let step1 = require('../creators/season').create(path, options.season)
  return require('../creators/track').create(step1, options.track)
}
