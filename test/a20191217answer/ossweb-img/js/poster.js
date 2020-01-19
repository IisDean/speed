//������hidpi-canvas.min.js�ļ�
var drawPoster = {
    canvas: null, //canvas����
    cWidth: 0, //�������
    cHeight: 0, //�����߶�
    ctx: null,
    ratio: null,
    imgLoad: 0, //ͼƬ���ؽ���
    imgList: [], //ͼƬ�б�
    textList: [], //�ı�
    qrcode: null, //������ά���ַ
    callback: null, //�ص������غ���ͼƬ
    init: function (options) {
        for (var item in options) {
            this[item] = options[item];
        }
        var that = this;
        that.ctx = that.canvas.getContext('2d');
        that.canvas.style.width = that.cWidth + 'px';
        that.canvas.style.height = that.cHeight + 'px';
        // polyfill �ṩ���������������ȡ�豸�� pixel ratio
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
            // console.log('ִ�л��Ʋ���');
            that.drawImg();
        });
    },
    drawImg: function () {
        var that = this,
            ratio = that.ratio;
        // ע�⣬����� width �� height ����� width * ratio �� height * ratio
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
        img.setAttribute("crossOrigin", 'anonymous');
        img.src = that.canvas.toDataURL('image/jpg');
        img.onload = function () {
            if (that.callback) that.callback(this);
        }
    },
    loadImg: function (callback) {
        var that = this;
        that.imgList.forEach(function (ev, index) {
            var img = new Image();
            img.setAttribute("crossOrigin", 'anonymous');
            img.src = ev.src;
            img.idx = index;
            img.onload = function () {
                that.imgList[this.idx].obj = this;
                that.imgLoad++;
                if (that.imgLoad >= that.imgList.length) {
                    // console.log('ͼƬ�������');
                    if (callback) callback();
                }
            }
        });
    }
}
