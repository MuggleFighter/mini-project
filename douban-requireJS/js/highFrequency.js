define(['jquery'],function ($) {
    const highFrequency = {
        createNode: function (movie) {
            const _this = this;
            const template = `<a class="item" href="">
						<img class="cover" src="" alt="cover">
						<div class="intro">
							<h2 class="title"></h2>
							<p><span class="score"></span>分 / <span class="collect"></span>收藏</p>
							<p><span class="year"></span> / <span class="genres"></span></p>
							<p>导演: <span class="director"></span></p>
							<p>主演: <span class="actors"></span></p>
						</div>
					</a>`;
            const $node = $(template);
            $node.attr('href', movie.alt)
            $node.find('.cover').attr('src', movie.images.medium)
            $node.find('.title').text(movie.title)
            $node.find('.score').text(movie.rating.average)
            $node.find('.collect').text(movie.collect_count)
            $node.find('.year').text(movie.year)
            $node.find('.genres').text(movie.genres.join('/'))
            $node.find('.director').text(_this.getStaff(movie.directors))
            $node.find('.actors').text(_this.getStaff(movie.casts))
            return $node
        },
        getStaff: function (staffArr) {
            const TempArr = [];
            $.each(staffArr, function (index, staff) {
                TempArr.push(staff.name)
            })
            return TempArr.join('、')
        },
    }

    return highFrequency
})