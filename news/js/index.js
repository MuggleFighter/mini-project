//var itemWidth = $('.ct .item').outerWidth(true)

getNews(renderNews)
$(window).on('scroll', throttle(loadMore, 150));
// $(window).on('scroll', throttle(lazyLoad, 500))
$(window).on('resize', throttle(waterFall2,150))


//getdata and render
var pageNum = 10
var isLoading = false
var total = 0
var count = 9
var isFinish = false
function getNews(callback) {
	if (isLoading) return
	if (isFinish) return
	isLoading = true
	$.ajax({
			url: 'http://platform.sina.com.cn/slide/album_tech',
			dataType: 'jsonp',
			jsonp: 'jsoncallback',
			data: {
				app_key: '1271687855',
				num: count,
				page: pageNum
			},
		})
		.done(function(ret) {
			callback(ret.data)
			pageNum += 1
			total += count
			if (total >= 900) {
				isFinish = true
				$('.loading').hide()
			}
		})
		.fail(function() {
			console.log("error")
		})
		.always(function() {
			isLoading = false
			console.log("complete")
		});
}

function renderNews(data) {
	var $node = $(document.createDocumentFragment())
	var itemArray = []
	data.forEach(function(news) {
		var $item = $(
			`<li class="item">
				<a href="#" class="cover"><img src="" data-src="" alt=""></a>
				<h2 class="title"></h2>
				<p class="intro"></p>
				<div class="meta">
					<div>点击 <span class="click"></span></div> 
					<div>创建时间 <span class="create-time"></span></div>
				</div>
			</li>`
		)
		$item.find('.cover').attr('href', news.url)
		$item.find('.cover img').attr('src', news.img_url)
		$item.find('.title').text(news.short_name)
		$item.find('.intro').text(news.short_intro)
		$item.find('.click').text(news.click)
		$item.find('.create-time').text(news.createtime.substr(0, 10))
		$node.append($item)
		itemArray.push($item)
	})
	$('.ct').append($node)
	// lazyLoad()
	waterFall()
}

//waterfall

var itemWidth = 320
var columns = Math.floor($('.ct').width() / itemWidth)
var columnHeightArray = []
for (var i = 0; i < columns; i++) {
	columnHeightArray.push(0)
}

function waterFall() {
	$('.item img').on('load', function() {
		var $item = $(this).parents('.item')
		var minHeight = columnHeightArray[0]
		var minIndex = 0
		columnHeightArray.forEach(function(height, index) {
			if (height < minHeight) {
				minHeight = height
				minIndex = index
			}
		})
		$item.css({
			left: itemWidth * minIndex,
			top: minHeight
		});
		columnHeightArray[minIndex] += $item.outerHeight(true)
		$('.ct').height(Math.max.apply(null, columnHeightArray));
	})
}

function waterFall2 () {
	var columns = Math.floor($('.ct').width() / itemWidth)
	var columnHeightArray = []
	for (var i = 0; i < columns; i++) {
		columnHeightArray.push(0)
	}
	$('.item').each(function(index, item) {
		$item = $(item)
		var minHeight = columnHeightArray[0]
		var minIndex = 0
		columnHeightArray.forEach(function(height, index) {
			if (height < minHeight) {
				minHeight = height
				minIndex = index
			}
		})
		$item.css({
			left: itemWidth * minIndex,
			top: minHeight
		});
		columnHeightArray[minIndex] += $item.outerHeight(true)
		$('.ct').height(Math.max.apply(null, columnHeightArray));
	})
}

//lazyload
// function lazyLoad() {
// 	$('.ct img').filter('[data-src]').each(function(index, img) {
// 		if (isShow($(img))) {
// 			loadImg($(img))
// 		}
// 	})

// }

// function isShow($img) {
// 	return $img.offset().top <= $(window).scrollTop() + $(window).height()
// }

// function loadImg($img) {
// 	$img.attr('src', $img.attr('data-src'))
// 	$img.removeAttr('data-src')
// }




function loadMore() {
	if ($(window).scrollTop() + $(window).height() >= $(document).height() - 300) {
		getNews(renderNews)
	}
}


function throttle(fn, delay) {
	var timer
	return function() {
		clearTimeout(timer)
		timer = setTimeout(fn, delay)
	}
}
