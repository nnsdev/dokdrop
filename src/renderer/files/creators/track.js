import fs from 'fs'

export function create (path, track) {
  let folder = path + '\\' + track
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder)
  }
  return folder
}
