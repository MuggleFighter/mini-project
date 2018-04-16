$(function () {
    // app = {
    //     init: function ($container) {
    //         this.index = 0
    //         this.$container = $('.carousel')
    //         this.$imgs = this.$container.find('.img-ct>a')
    //         this.$imgCt = this.$container.find('.img-ct')
    //         this.$imgsCount = this.$imgs.length
    //         this.imgWidth = this.$imgs.width()
    //         this.$imgCt.width(this.imgWidth * (this.$imgsCount + 2))
    //         this.$imgCt.prepend(this.$imgs.last().clone()).append(this.$imgs.first().clone())
    //         this.$imgCt.css({
    //             left: -this.imgWidth
    //         })
    //         this.bind()
    //     },
    //     bind: function () {
    //         let _this = this
    //         $('.carousel .icon-next').on('click', function () {
    //             _this.playForward(1)
    //         })
    //
    //         $('.carousel .icon-pre').on('click', function () {
    //             _this.playBackward(1)
    //         })
    //         $('.carousel .indicators>li').on('click', function (ev) {
    //             _this.jump($(ev.target).index())
    //         })
    //     },
    //     playForward: function (len) {
    //         let _this = this
    //         this.$imgCt.stop(true, true)
    //         this.$imgCt.animate({
    //             left: '-=' + _this.imgWidth * len
    //         }, 200, function () {
    //             _this.index += len
    //             console.log(_this.index)
    //             if (_this.index >= 4) {
    //                 _this.$imgCt.css({
    //                     left: -_this.imgWidth
    //                 })
    //                 _this.index = 0
    //             }
    //             _this.setIndicator()
    //         })
    //
    //     },
    //     playBackward: function (len) {
    //         let _this = this
    //         this.$imgCt.stop(false, true)
    //         this.$imgCt.animate({
    //             left: '+=' + _this.imgWidth * len
    //         }, 200, function () {
    //             _this.index -= len
    //             if (_this.index <= -1) {
    //                 _this.$imgCt.css({
    //                     left: -_this.imgWidth * _this.$imgsCount
    //                 })
    //                 _this.index = _this.$imgsCount - 1
    //             }
    //             _this.setIndicator()
    //         })
    //     },
    //     jump: function (index) {
    //         if (index > this.index) {
    //             this.playForward(index - this.index)
    //         } else {
    //             this.playBackward(this.index - index)
    //         }
    //     },
    //     setIndicator: function () {
    //         $('.carousel .indicators>li').eq(this.index).addClass('active').siblings().removeClass('active')
    //     }
    // }
    //
    // app.init()

    function Carousel($container) {
        this.init($container)
    }

    Carousel.prototype = {
        constructor: Carousel,
        init: function ($container) {
            this.index = 0
            this.$container = $container
            this.$imgs = this.$container.find('.img-ct>a')
            this.$imgCt = this.$container.find('.img-ct')
            this.$indicator = this.$container.find('.indicators>li')
            this.$imgsCount = this.$imgs.length
            this.imgWidth = this.$imgs.width()
            this.$imgCt.width(this.imgWidth * (this.$imgsCount + 2))
            this.$imgCt.prepend(this.$imgs.last().clone()).append(this.$imgs.first().clone())
            this.$imgCt.css({
                left: -this.imgWidth
            })
            this.bind()
        },
        bind: function () {
            let _this = this
            this.$container.find('.icon-next').on('click', function () {
                _this.playForward(1)
            })

            this.$container.find('.icon-pre').on('click', function () {
                _this.playBackward(1)
            })

            this.$indicator.on('click', function (ev) {
                _this.jump($(ev.target).index())
            })
        },

        playForward: function (len) {
            let _this = this
            this.$imgCt.stop(true, true)
            this.$imgCt.animate({
                left: `-=${_this.imgWidth * len}`
            }, 200, () => {
                _this.index += len
                console.log(_this.index)
                if (_this.index >= 4) {
                    _this.$imgCt.css({
                        left: -_this.imgWidth
                    })
                    _this.index = 0
                }
                _this.setIndicator()
            })

        },
        playBackward: function (len) {
            let _this = this
            this.$imgCt.stop(false, true)
            this.$imgCt.animate({
                left: `+=${_this.imgWidth}`
            }, 200, function () {
                _this.index -= len
                if (_this.index <= -1) {
                    _this.$imgCt.css({
                        left: -_this.imgWidth * _this.$imgsCount
                    })
                    _this.index = _this.$imgsCount - 1
                }
                _this.setIndicator()
            })
        },
        jump: function (index) {
            if (index > this.index) {
                this.playForward(index - this.index)
            } else {
                this.playBackward(this.index - index)
            }
        },
        setIndicator: function () {
            this.$indicator.eq(this.index).addClass('active').siblings().removeClass('active')
        }
    }

    new Carousel($('.carousel').eq(0))
    new Carousel($('.carousel').eq(1))
})