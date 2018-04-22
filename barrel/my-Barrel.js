$(function () {
    function Barrel($ct, baseHeight) {
        this.$ct = $ct
        this.baseHeight = baseHeight
        this.init()
    }

    Barrel.prototype = {
        constructor: Barrel,

        init() {
            this.imgList = [] //every img will be pushed in this list when it loaded
            this.rowWidth = 0
            this.containerWidth = this.$ct.width()

            let imgUrls = this.getImgUrls(50)
            imgUrls.forEach((url) => {
                let $img = $(`<img src="${url}">`)
                $img.on('load', () => {
                    this.imgList.push($img)
                    this.calcRowHeight($img)
                })
            })
        },

        calcRowHeight($img) {
            // let rowWidth = 0
            // this.imgList.forEach(($img) => {
            //     rowWidth += this.calcBaseWidth($img)
            //     if (rowWidth >this.containerWidth) {
            //         this.imgList.pop();
            //         rowWidth -= this.calcBaseWidth($img)
            //         let rowHeight = this.containerWidth * this.baseHeight / rowWidth;
            //         this.imgList.forEach(($img) => {
            //             $img.height(rowHeight);
            //         })
            //         this.render()
            //         this.imgList = []
            //         this.imgList.push($img);
            //     }
            // })
            //
            this.rowWidth += this.calcBaseWidth($img)
            if (this.rowWidth > this.containerWidth) {
                this.imgList.pop()
                this.rowWidth -= this.calcBaseWidth($img)
                let rowHeight = this.baseHeight * this.containerWidth / this.rowWidth
                this.imgList.forEach(($img) => {
                    $img.height(rowHeight);
                })
                this.render()
                this.resetImgList($img)
            }
        },

        render() {
            this.imgList.forEach(($img) => {
                $('.warp').append($img)
            })
        },

        getImgUrls(quantity) {
            let imgUrlsArray = []
            for (let i = 0; i < quantity; i++) {
                let width = Math.floor(Math.random() * 100 + 50)
                let height = Math.floor(Math.random() * 30 + 50)
                let color = Math.random().toString(16).slice(2, 8)
                let url = `http://placehold.it/${width}x${height}/${color}/fff`
                imgUrlsArray.push(url)
            }
            return imgUrlsArray
        },
        calcBaseWidth($img) {
            return $img.prop('width') * this.baseHeight / $img.prop('height')
        },
        resetImgList($img) {
            this.imgList = []
            this.imgList.push($img)
            this.rowWidth = this.calcBaseWidth($img)
        }
    }
    new Barrel($('.warp'), 50)
})



