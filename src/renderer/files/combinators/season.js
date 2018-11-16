export function combine (path, options) {
  let step1 = require('../creators/track').create(path, options.track)
  return require('../creators/season').create(step1, options.season)
}
