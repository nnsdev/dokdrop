export default function (path, saving, options) {
  path = require('./creators/car').create(path, options.car)
  if (saving === 'track') {
    return require('./creators/track').create(path, options.track)
  } else if (saving === 'season') {
    return require('./combinators/season').combine(path, options)
  } else if (saving === 'seasonfirst') {
    return require('./combinators/seasonfirst').combine(path, options)
  } else if (saving === 'year') {
    return require('./combinators/year').combine(path, options)
  }
  return path
}
