define(['jquery','highFrequency'], function ($,highFrequency) {
    const USBox = {
        init: function () {
            this.$element = $('#usbox')
            this.start()
        },

        start: function () {
            const _this = this;
            this.getMovies(function (ret) {
                _this.renderMovies(ret)
            })
        },

        getMovies: function (callback) {
            const _this = this;
            _this.$element.find('.loading').show()
            $.ajax({
                url: 'https://api.douban.com/v2/movie/us_box',
                method: 'GET',
                dataType: 'jsonp',
            }).done(function (ret) {
                console.log(ret)
                callback(ret)
                _this.$element.find('.loading').hide()
            }).fail(function () {
                console.log('error')
            })
        },

        renderMovies: function (ret) {
            const _this = this;
            $fragment = $(document.createDocumentFragment())
            $.each(ret.subjects, function (index, movie) {
                $fragment.append(highFrequency.createNode(movie.subject))
            })
            _this.$element.find('section').append($fragment)
        },
    }

    return USBox
})