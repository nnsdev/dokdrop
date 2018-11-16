/* eslint-disable */
import axios from 'axios'
import request from 'request'
import fs from 'fs'
import * as saving from '../files/saving'
const env = require('../env.json')
export function getDownload (hash, data, folder, saving) {
  return new Promise((resolve, reject) => {
    console.log(data)
    import('../files/saving').then(module => {
      let req = request.get({
        uri: env.prod_url + 'dokfast/download/' + hash
      })
      let path = module.default(folder, saving, {
        car: data.car.folder_name,
        track: (!data.track) ? '' : data.track.folder_name,
        season: (!data.season) ? '' : data.season.name
      }) + '\\'
      req.on('response', (res) => {
        res.pipe(fs.createWriteStream(path + data.name))
        res.on('error', (err) => {
          return reject(err)
        })
        res.on('end', () => {
          return resolve(true)
        })
      })
    })
  })
}

export function getInformation (hash) {
  return new Promise(function (resolve, reject) {
    axios.get(env.prod_url + 'dokfast/information/' + hash).then(res => resolve(res)).catch(err => reject(err))
  })
}
/* eslint-enable */
