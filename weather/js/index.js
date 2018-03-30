var app = {

	init: function() {
		this.start()
		this.bind()
	},

	start: function() {
		var _this = this
		this.getData(function(data) {
			_this.renderData(data)
		})
	},

	bind: function() {
		$$('.tabs-group .tab').forEach((tab, index) => {
			tab.onclick = () => {
				$$('.tabs-group .tab').forEach((tab, index) => {
					tab.classList.remove ('active')
				})
				$$('.panels-group .panel').forEach((panel, index) => {
					panel.classList.remove('active')
				})
				tab.classList.add('active')
				$$('.panels-group .panel')[index].classList.add('active')
			}
		})
	},

	getData: function(callback) {
		var xhr = new XMLHttpRequest()
		xhr.open('GET', 'https://free-api.heweather.com/s6/weather?location=auto_ip&key=bd2ed51099b748d5b261525ef7cf6006', true)
		xhr.onload = function() {
			callback(JSON.parse(xhr.responseText))
		}
		xhr.send()
	},

	renderData: function(data) {
		console.log(data)
		var data = data.HeWeather6[0]
		$('.extra .city').innerText = data.basic.location
		$('.extra .time').innerText = getTime()
		$('.extra .update').innerText = getTime(new Date(data.update.loc))
		$('.today .weather-pic img').src = 'images/icon-weather/' + data.now.cond_code + '.png'
		$('.today .temprature').innerText = data.now.tmp + '°'
		$('.today .description').innerText = data.now.cond_txt
		$('.today .feel-temprature').innerText = data.now.fl + '°'
		$('.today .precipitation').innerText = data.now.pcpn
		$$('.today .lifestyle .panel').forEach((panel,index) => {
			panel.innerText = data.lifestyle[index].txt
		})
		$$('.forecast li').forEach((forecast,index) => {
			forecast.querySelector('.day').innerText = getDay(data.daily_forecast[index].date)
			forecast.querySelector('.weather-pic img').src = 'images/icon-weather/' + data.daily_forecast[index].cond_code_d + '.png'
			forecast.querySelector('.high-temperature').innerText = data.daily_forecast[index].tmp_max + '°'
			forecast.querySelector('.low-temperature').innerText = data.daily_forecast[index].tmp_min + '°'
			forecast.querySelector('.description').innerText = data.daily_forecast[index].cond_txt_d
			forecast.querySelector('.pop').innerText = data.daily_forecast[index].pop
		})
	}

}

function $(selector) {
	return document.querySelector(selector)
}

function $$(selector) {
	return document.querySelectorAll(selector)
}

function getTime(dateObj) {
	var date = dateObj || new Date()
	var hours = date.getHours().toString().length === 1 ? '0' + date.getHours() : date.getHours()
	var minutes = date.getMinutes().toString().length === 1 ? '0' + date.getMinutes() : date.getMinutes()
	return hours + ' : ' + minutes
}

function getDay(dateStr) {
	var date = new Date(dateStr)
	var dict = ['周日','周一','周二','周三','周四','周五','周六']
	return dict[date.getDay()]
}

app.init()