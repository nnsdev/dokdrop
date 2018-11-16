import fs from 'fs'

export function create (path) {
  let folder = path + '\\' + (new Date().getFullYear().toString().substr(-2))
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder)
  }
  return folder
}
