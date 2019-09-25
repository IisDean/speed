function topAdd() {
    document.writeln(
        '<style> ' +
            'body{padding-top: 42px;}' +
            '.w-1000{width: 1000px; margin: 0 auto; position: relative;}' +
            '.mod-header{ width: 100%; height: 41px; border-bottom: 1px solid #c9c9c9;  background: #fff; position: absolute;  left: 0; top: 0!important; z-index: 8000;}' +
            '.mod-head:after{content:"\0020";height:0;display:block;clear:both;}' +
            '.mod-head{zoom: 1; overflow: hidden;}' +
            '.mod-head a{float: left; display: block;}' +
            '.mod-head .bor{ float: left; width: 1px; height: 20px; display: block; background: #dce0e9; margin-top: 8px; }' +
            '.mod-header .aw-logo{margin-left: 121px; width: 112px; }' +
            '.mod-header .hd-logo{ width: 192px; margin-left: 2px;}' +
            '.mod-header .fh-logo{ width: 96px; float: right; margin:10px 64px 0 0;}' +
        '</style> ' +
        '<div class="mod-header">'+
            '<div class="mod-head w-1000">'+
            '<a href="//www.awgames.com/index.shtml" target="_blank" class="aw-logo"><img src="images/aw-logo.png" width="112" height="40" alt="爱玩游戏" /> </a>'+
            '<span class="bor"></span>'+
            '<a href="https://store.steampowered.com/app/976800/_NINE_TRIALS/" target="_blank" class="hd-logo"><img src="images/hd-logo.png" width="192" height="40" alt="黑夜降临" /> </a>'+
            '<a href="//www.awgames.com/index.shtml" target="_blank" class="fh-logo"><img src="images/fh-logo.jpg" width="96" height="21" alt="返回官网首页" /> </a>'+
            '</div>'+
        '</div>'
    );
}
topAdd();