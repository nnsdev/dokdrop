import request from 'request'
import fs from 'fs'
const irsdk = require('node-irsdk')
const iracing = irsdk.getInstance()
var url = require('../env.json').prod_url + 'dokfast/upload'

export function getSetup () {
  var sessionInfo = iracing.sessionInfo.data

  if (!sessionInfo) {
    return false
  }

  return {
    track: sessionInfo.WeekendInfo.TrackDisplayName,
    setup_name: sessionInfo.DriverInfo.DriverSetupName,
    car: sessionInfo.DriverInfo.Drivers.find(o => o.UserID === sessionInfo.DriverInfo.DriverUserID).CarPath
  }
}

export function uploadSetup (path, info) {
  var formData = {
    car: info.car,
    track: info.track,
    setup_name: info.setup_name,
    delete_type: info.delete_type,
    setup: fs.createReadStream(path)
  }
  return new Promise(function (resolve, reject) {
    request.post({url: url, formData: formData}, function (error, response, body) {
      if (error) {
        return reject(error)
      }
      return resolve(body)
    })
  })
}
