#! /usr/bin/env node
let getWeather = require('weatherforecast-china')
let process = require('process')

let city = process.argv[2]

getWeather(city).then((data) => {
    data = data.weather[0]
    console.log(data.city_name,data.now.text,data.now.temperature)
}).catch(() => {
    console.log('无法获取当前城市的天气')
})