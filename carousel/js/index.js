$(function () {
    // app = {
    //     init: function ($container) {
    //         this.index = 0
    //         this.$container = $('.carousel')
    //         this.$imgs = this.$container.find('.img-ct>a')
    //         this.$imgCt = this.$container.find('.img-ct')
    //         this.imgsCount = this.$imgs.length
    //         this.imgWidth = this.$imgs.width()
    //         this.$imgCt.width(this.imgWidth * (this.imgsCount + 2))
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
    //                     left: -_this.imgWidth * _this.imgsCount
    //                 })
    //                 _this.index = _this.imgsCount - 1
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
        init($container) {
            this.index = 0
            this.$container = $container
            this.$imgs = this.$container.find('.img-ct>a')
            this.$imgCt = this.$container.find('.img-ct')
            this.$indicator = this.$container.find('.indicators>li')
            this.imgsCount = this.$imgs.length
            this.imgWidth = this.$imgs.width()
            this.$imgCt.width(this.imgWidth * (this.imgsCount + 2))
            this.$imgCt.prepend(this.$imgs.last().clone()).append(this.$imgs.first().clone())
            this.$imgCt.css({
                left: -this.imgWidth
            })
            this.bind()
        },
        bind() {
            this.$container.find('.icon-next').on('click', () => {
                this.playForward(1)
            })

            this.$container.find('.icon-pre').on('click', () => {
                this.playBackward(1)
            })

            this.$indicator.on('click', (ev) => {
                this.jump($(ev.target).index())
            })
        },

        playForward: function (len) {
            console.log(len)
            this.$imgCt.stop(true, true)
            this.$imgCt.animate({
                left: `-=${this.imgWidth * len}`
            }, 200, () => {
                this.index += len
                if (this.index >= 4) {
                    this.$imgCt.css({
                        left: -this.imgWidth
                    })
                    this.index = 0
                }
                this.setIndicator()
            })

        },
        playBackward: function (len) {
            console.log(len)
            this.$imgCt.stop(false, true)
            this.$imgCt.animate({
                left: `+=${this.imgWidth * len}`
            }, 200, () => {
                this.index -= len
                if (this.index <= -1) {
                    this.$imgCt.css({
                        left: -this.imgWidth * this.imgsCount
                    })
                    this.index = this.imgsCount - 1
                }
                this.setIndicator()
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
            this.$indicator
                .eq(this.index)
                .addClass('active')
                .siblings()
                .removeClass('active')
        }
    }

    new Carousel($('.carousel').eq(0))
    new Carousel($('.carousel').eq(1))


//insert dom
    // function Carousel($container) {
    //     this.init($container)
    // }
    //
    // Carousel.prototype = {
    //     constructor: Carousel,
    //     init($container) {
    //         this.$container = $container
    //         this.$imgCt = this.$container.find('.img-ct')
    //         this.$imgs = this.$imgCt.children()
    //         this.$imgWidth = this.$imgs.width()
    //         this.$indicators = this.$container.find('.indicators>li')
    //         this.imgsCount = this.$imgs.length
    //         this.$imgCt.width(this.imgsCount * this.$imgWidth)
    //         this.$imgCt.prepend(this.$imgs.last())
    //         this.$imgCt.css({left: -this.$imgWidth})
    //         this.index = 0
    //         this.bind()
    //     },
    //
    //     bind() {
    //         this.$container.find('.icon-next').on('click', () => {
    //             this.playNext()
    //         })
    //
    //         this.$container.find('.icon-pre').on('click', () => {
    //             this.playPre()
    //         })
    //
    //         this.$indicators.on('click', () => {
    //             this.jump()
    //         })
    //     },
    //
    //     playNext() {
    //         this.$imgCt.stop(true, true)
    //         this.$imgCt.animate({left: `-=${this.$imgWidth}`}, 200, () => {
    //             this.$imgCt.append(this.$imgCt.children().first())
    //             this.$imgCt.css({left: -this.$imgWidth})
    //             this.index += 1
    //             if (this.index >= this.imgsCount) {
    //                 this.index = 0
    //             }
    //             console.log(this.index)
    //         })
    //     },
    //
    //     playPre() {
    //         this.$imgCt.stop(true, true)
    //         this.$imgCt.animate({left: `+=${this.$imgWidth}`}, 200, () => {
    //             this.$imgCt.prepend(this.$imgCt.children().last())
    //             this.$imgCt.css({left: -this.$imgWidth})
    //             this.index -= 1
    //             if (this.index <= -1) {
    //                 this.index = this.imgsCount - 1
    //             }
    //             console.log(this.index)
    //         })
    //     },
    //
    //     jump() {
    //
    //     }
    // }
    //
    //  new Carousel($('.carousel').eq(0))
})


