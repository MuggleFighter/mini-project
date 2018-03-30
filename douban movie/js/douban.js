var index = 0
var isloading = false

getMovies('https://api.douban.com/v2/movie/top250',renderMovies)

$('.tabs .tab').on('click',function(){
	$(this).addClass('active').siblings().removeClass('active')
	var index = $(this).index()
	$('section').hide().eq(index).fadeIn()
})


var timer
$('.ct').on('scroll',function(){
	clearTimeout(timer)
	timer = setTimeout(function(){
		console.log(1)
		if($('.ct').height() + $('.ct').scrollTop() + 50 >= $('section').eq(0).height()){
			getMovies('https://api.douban.com/v2/movie/top250',renderMovies)
		}
	},500)
})


function renderMovies(ret) {
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
	
	$fragment = $(document.createDocumentFragment())
	$.each(ret.subjects,function(index,movie){
		var $node = $(template)
		$node.attr('href',movie.alt)
		$node.find('.cover').attr('src',movie.images.medium)
		$node.find('.title').text(movie.title)
		$node.find('.score').text(movie.rating.average)
		$node.find('.collect').text(movie.collect_count)
		$node.find('.year').text(movie.year)
		$node.find('.genres').text(movie.genres.join('/'))
		$node.find('.director').text(getStaff(movie.directors))
		$node.find('.actors').text(getStaff(movie.casts))
		$fragment.append($node)
	})

	$('section').eq(0).append($fragment)
}

function getStaff(staffArr) {
	var TempArr= []
	$.each(staffArr,function(index,staff){
		TempArr.push(staff.name)
	})
	return TempArr.join('、')
}


function getMovies(url,callback) {

	if (isloading) return
	isloading = true
	$('.loading').show()

	$.ajax({
		url: url,
		method: 'GET',
		dataType: 'jsonp',
		data: {
			start: index,
			count:20
		}
	})
	.done(function(ret){
		renderMovies(ret)
		index += 20
	})
	.fail(function(){
		console.log('error')
	})
	.always(function(){
		isloading = false
		$('.loading').hide()
	})
}

function throttle(fn){
	var timer
 	return function () {
	 	clearTimeout(timer)
	 	timer = setTimeout(fn,300)
 	}
}