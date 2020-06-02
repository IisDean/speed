    const mouseEvent = {
      wheel:function(opt){
        if(!opt){
          console.log(opt);
          console.log('什么都没有，还让我帮忙！');
          return;
        }


        //获取兼容事件
        var mouseWheel=(/Firefox/i.test(navigator.userAgent))?"DOMMouseScroll": "mousewheel";


        if(document.attachEvent){
            //IE
            document.body.attachEvent('on'+mouseWheel,function (e) {
                opt.callback(e, e.wheelDelta);
                return false;
            },false)
        }
        else{
            //FF、Chrome、Opera、safari
            document.body.addEventListener(mouseWheel,function (e) {
                e = e || window.event;
                var wheelDelta = (e.detail) ?
                    (e, e.detail * 40) :  //FF
                    (-e.wheelDelta);
                opt.callback(e, wheelDelta);
                return false;
            }, { passive: false })
        }


      }
    };
