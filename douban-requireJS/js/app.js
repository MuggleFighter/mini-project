define(['top250','USBox','search','jquery'],function (top250,USBox,search,$) {
    const app = {
        init: function () {
            this.bind()
            top250.init()
            USBox.init()
            search.init()
        },

        bind: function () {
            $('.tabs .tab').on('click', function () {
                $(this).addClass('active').siblings().removeClass('active')
                $('.ct>div').hide().eq($(this).index()).fadeIn()
            })
        }

    }
    return app
})
