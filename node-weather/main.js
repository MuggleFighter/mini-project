let axios = require('axios')

function getWeather(location) {
    return new Promise((resolve,reject) => {
        let params = {
            key: 'study_javascript_in_jirengu.com'
        }
        if (location) {
            params.location = location
        }
        let validateStatus = function (status) {
            return status >= 200 && status < 300 || status === 304
        }
        axios.get('https://weixin.jirengu.com/weather',{params: params,validateStatus: validateStatus})
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                reject(error)
            });
    })
}


module.exports = getWeather