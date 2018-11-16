import fs from 'fs'

export function create (path, car) {
  let folder = path + '\\' + car
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder)
  }
  return folder
}
