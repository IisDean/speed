//需引入hidpi-canvas.min.js文件
var drawPoster = {
    canvas: null, //canvas容器
    cWidth: 0, //海报宽度
    cHeight: 0, //海报高度
    ctx: null,
    ratio: null,
    imgLoad: 0, //图片加载进度
    imgList: [], //图片列表
    textList: [], //文本
    qrcode: null, //海报二维码地址
    callback: null, //回调，传回海报图片
    init: function (options) {
        for (var item in options) {
            this[item] = options[item];
        }
        var that = this;
        that.ctx = that.canvas.getContext('2d');
        that.canvas.style.width = that.cWidth + 'px';
        that.canvas.style.height = that.cHeight + 'px';
        // polyfill 提供了这个方法用来获取设备的 pixel ratio
        var getPixelRatio = function (context) {
            var backingStore = context.backingStorePixelRatio ||
                context.webkitBackingStorePixelRatio ||
                context.mozBackingStorePixelRatio ||
                context.msBackingStorePixelRatio ||
                context.oBackingStorePixelRatio ||
                context.backingStorePixelRatio || 1;
            return (window.devicePixelRatio || 1) / backingStore;
        };
        that.ratio = getPixelRatio(that.ctx);
        that.loadImg(function () {
            // console.log('执行绘制操作');
            that.drawImg();
        });
    },
    drawImg: function () {
        var that = this,
            ratio = that.ratio;
        // 注意，这里的 width 和 height 变成了 width * ratio 和 height * ratio
        that.imgList.forEach(function (ev, idx) {
            that.ctx.drawImage(ev.obj, ratio * ev.x, ratio * ev.y, ratio * ev.w, ratio * ev.h);
        });
        if (that.qrcode) {
            that.ctx.drawImage(that.qrcode.obj, ratio * that.qrcode.x, ratio * that.qrcode.y, ratio * that.qrcode.w, ratio * that.qrcode.h);
        }
        that.fillText();
    },
    fillText: function () {
        var that = this;
        that.textList.forEach(function (ev, idx) {
            that.ctx.fillStyle = ev.nameTextColor;
            that.ctx.textAlign = ev.textAlign;
            that.ctx.textBaseline = ev.textBaseline;
            that.ctx.font = ev.font;
            that.ctx.fillText(ev.name, ev.x, ev.y);
        });
        that.toDataUrl();
    },
    toDataUrl: function () {
        var that = this,
            img = new Image();
        img.src = that.canvas.toDataURL('image/jpg');
        img.onload = function () {
            if (that.callback) that.callback(this);
        }
    },
    loadImg: function (callback) {
        var that = this;
        that.imgList.forEach(function (ev, index) {
            var img = new Image();
            img.src = ev.src;
            img.idx = index;
            img.onload = function () {
                that.imgList[this.idx].obj = this;
                that.imgLoad++;
                if (that.imgLoad >= that.imgList.length) {
                    // console.log('图片载入完成');
                    if (callback) callback();
                }
            }
        });
    }
}