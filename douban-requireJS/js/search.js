define(['jquery', 'highFrequency'], function ($,highFrequency) {
    const search = {
        init: function () {
            this.$element = $('#search')
            this.$btn = this.$element.find('.submit-btn')
            this.$input = this.$element.find('.search-bar')
            this.$section = this.$element.find('section')
            this.bind()
        },

        bind: function () {
            const _this = this;
            _this.$btn.on('click', function () {
                _this.keyword = _this.$input.val()
                _this.getMovies(function (ret) {
                    _this.renderMovies(ret)
                })
            })
        },

        getMovies: function (callback) {
            const _this = this;
            _this.$element.find('.loading').show()
            $.ajax({
                url: 'https://api.douban.com/v2/movie/search',
                method: 'GET',
                dataType: 'jsonp',
                data: {
                    q: _this.keyword
                }
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
                $fragment.append(highFrequency.createNode(movie))
            })
            _this.$element.find('section').append($fragment)
        }
    };

    return search
})