var highFrequency = {
	createNode: function(movie) {
		var _this = this
		var template = `<a class="item" href="">
						<img class="cover" src="" alt="cover">
						<div class="intro">
							<h2 class="title"></h2>
							<p><span class="score"></span>分 / <span class="collect"></span>收藏</p>
							<p><span class="year"></span> / <span class="genres"></span></p>
							<p>导演: <span class="director"></span></p>
							<p>主演: <span class="actors"></span></p>
						</div>
					</a>`
		var $node = $(template)
		$node.attr('href',movie.alt)
		$node.find('.cover').attr('src',movie.images.medium)
		$node.find('.title').text(movie.title)
		$node.find('.score').text(movie.rating.average)
		$node.find('.collect').text(movie.collect_count)
		$node.find('.year').text(movie.year)
		$node.find('.genres').text(movie.genres.join('/'))
		$node.find('.director').text(_this.getStaff(movie.directors))
		$node.find('.actors').text(_this.getStaff(movie.casts))
		return $node
	},
	getStaff: function(staffArr){
		var TempArr= []
		$.each(staffArr,function(index,staff){
			TempArr.push(staff.name)
		})
		return TempArr.join('、')
	},
}


var top250 = {
	init: function(){
		this.index = 0
		this.isloading = false
		this.isFinish = false
		this.$element = $('#top250')
		this.bind()
		this.start()
	},

	bind: function(){	
		var _this = this
		var timer
		_this.$element.on('scroll',function(){
			clearTimeout(timer)
			timer = setTimeout(function(){
				if(!_this.isFinish && (_this.$element.height() + _this.$element.scrollTop() + 30 >= _this.$element.find('section').height())){
					_this.start()
				}
			},100)
		})
	},

	start: function(){
		var _this = this
		this.getMovies(function(ret){
			_this.renderMovies(ret)
		})
	},

	getMovies: function(callback){
		var _this = this
		if (_this.isloading){
			return
		}
		_this.isloading = true
		_this.$element.find('.loading').show()

		$.ajax({
			url: 'https://api.douban.com/v2/movie/top250',
			method: 'GET',
			dataType: 'jsonp',
			data: {
				start: _this.index,
				count:20
			}
		})
		.done(function(ret){
			callback(ret)
			_this.index += 20
			if (_this.index > 250){
				_this.isFinish = true
			}
			_this.$element.find('.loading').hide()
		}).fail(function(){
			console.log('error')
		}).always(function(){
			_this.isloading = false
		})		
	},

	renderMovies: function(ret) {
		var _this = this
		$fragment = $(document.createDocumentFragment())
		$.each(ret.subjects,function(index,movie){
			$fragment.append(highFrequency.createNode(movie))
		})
		_this.$element.find('section').append($fragment)
	},
}

var USBox = {
	init: function(){
		this.$element = $('#usbox')
		this.start()
	},

	start: function(){
		var _this = this
		this.getMovies(function(ret){
			_this.renderMovies(ret)
		})
	},

	getMovies: function(callback){
		var _this = this
		_this.$element.find('.loading').show()
		$.ajax({
			url: 'https://api.douban.com/v2/movie/us_box',
			method: 'GET',
			dataType: 'jsonp',
		}).done(function(ret){
			console.log(ret)
			callback(ret)
			_this.$element.find('.loading').hide()
		}).fail(function(){
			console.log('error')
		})	
	},

	renderMovies: function(ret) {
		var _this = this
		$fragment = $(document.createDocumentFragment())
		$.each(ret.subjects,function(index,movie){
			$fragment.append(highFrequency.createNode(movie.subject))
		})
		_this.$element.find('section').append($fragment)
	},
}

var search = {
	init: function(){
		this.$element = $('#search')
		this.$btn = this.$element.find('.submit-btn')
		this.$input = this.$element.find('.search-bar')
		this.$section = this.$element.find('section')
		this.bind()
	},

	bind: function() {
		var _this = this
		_this.$btn.on('click',function(){
			_this.keyword = _this.$input.val()
			_this.getMovies(function(ret){
				_this.renderMovies(ret)
			})
		})
	},

	getMovies: function(callback){
		var _this = this
		_this.$element.find('.loading').show()
		$.ajax({
			url: 'https://api.douban.com/v2/movie/search',
			method: 'GET',
			dataType: 'jsonp',
			data: {
				q: _this.keyword
			}
		}).done(function(ret){
			console.log(ret)
			callback(ret)
			_this.$element.find('.loading').hide()
		}).fail(function(){
			console.log('error')
		})	
	},

	renderMovies: function(ret) {
		var _this = this
		$fragment = $(document.createDocumentFragment())
		$.each(ret.subjects,function(index,movie){
			$fragment.append(highFrequency.createNode(movie))
		})
		_this.$element.find('section').append($fragment)
	},
}





var app = {
	init: function(){
		this.bind()
		top250.init()
		USBox.init()
		search.init()
	},

	bind: function(){
		$('.tabs .tab').on('click',function(){
			$(this).addClass('active').siblings().removeClass('active')
			$('.ct>div').hide().eq($(this).index()).fadeIn()
		})
	}
	
}

app.init()
