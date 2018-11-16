import fs from 'fs'

export function create (path, season) {
  let folder = path + '\\' + season
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder)
  }
  return folder
}
