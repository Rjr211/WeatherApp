const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/613560527af832f0d4de28328f91e8d9/' + lat + ',' + long
    request({url:url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.error){
            callback('Incorrect search term, try again', undefined)
        } else {
            callback(undefined, 'It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + ' chance of rain' + 
            
            body.currently.icon)
        }

    })

}




module.exports = forecast