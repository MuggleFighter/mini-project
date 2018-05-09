define(['jquery','highFrequency'],function ($,highFrequency) {
    const top250 = {
        init: function () {
            this.index = 0
            this.isloading = false
            this.isFinish = false
            this.$element = $('#top250')
            this.bind()
            this.start()
        },

        bind: function () {
            const _this = this;
            let timer;
            _this.$element.on('scroll', function () {
                clearTimeout(timer)
                timer = setTimeout(function () {
                    if (!_this.isFinish && (_this.$element.height() + _this.$element.scrollTop() + 30 >= _this.$element.find('section').height())) {
                        _this.start()
                    }
                }, 100)
            })
        },

        start: function () {
            const _this = this;
            this.getMovies(function (ret) {
                _this.renderMovies(ret)
            })
        },

        getMovies: function (callback) {
            const _this = this;
            if (_this.isloading) {
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
                    count: 20
                }
            })
                .done(function (ret) {
                    callback(ret)
                    _this.index += 20
                    if (_this.index > 250) {
                        _this.isFinish = true
                    }
                    _this.$element.find('.loading').hide()
                }).fail(function () {
                console.log('error')
            }).always(function () {
                _this.isloading = false
            })
        },

        renderMovies: function (ret) {
            const _this = this;
            $fragment = $(document.createDocumentFragment())
            $.each(ret.subjects, function (index, movie) {
                $fragment.append(highFrequency.createNode(movie))
            })
            _this.$element.find('section').append($fragment)
        },
    }
    return top250
})