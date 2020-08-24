function myPagination(_ref) {
    var pageSize = _ref.pageSize,
        pageTotal = _ref.pageTotal,
        curPage = _ref.curPage,
        dom = _ref.dom,
        getPage = _ref.getPage,
        showFirst = _ref.showFirst,
        showFinal = _ref.showFinal,
        showPageTotalFlag = _ref.showPageTotalFlag,
        showSkipInputFlag = _ref.showSkipInputFlag,
        pageAmount = _ref.pageAmount,
        dataTotal = _ref.dataTotal;

    this.pageSize = pageSize || 5; //分页个数
    this.pageTotal = pageTotal; //总共多少页
    this.pageAmount = pageAmount; //每页多少条
    this.dataTotal = dataTotal; //总共多少数据
    this.curPage = curPage || 1; //初始页码
    this.ul = document.createElement('ul');
    this.dom = dom
    this.getPage = getPage;
    this.showFirst = showFirst || false; //是否显示首页
    this.showFinal = showFinal || false; //是否显示尾页
    this.showPageTotalFlag = showPageTotalFlag || false; //是否显示数据统计
    this.showSkipInputFlag = showSkipInputFlag || false; //是否支持跳转
    this.init();
};

// 给实例对象添加公共属性和方法
myPagination.prototype = {
    init: function init() {
      // var pagination = document.getElementById(this.id);
      var pagination = this.dom;
      // console.log(pagination)
      pagination.innerHTML = '';
      this.ul.innerHTML = '';
      pagination.appendChild(this.ul);
      var that = this;
      if(that.showFirst){
        //首页
        that.firstPage();
      }

      //上一页
      that.lastPage();
      //分页
      that.getPages().forEach(function (item) {
        var li = document.createElement('li');
        li.className = ' page_code';
        if (item == that.curPage) {
          li.className = 'active page_code';
        } else {
          li.onclick = function () {
            that.curPage = parseInt(this.innerHTML);
            that.init();
            that.getPage(that.curPage);
          };
        }
        li.innerHTML = item;
        that.ul.appendChild(li);
      });
      //下一页
      that.nextPage();
      if(that.showFinal) {
        //尾页
        that.finalPage();
      }
      //是否支持跳转
      if (that.showSkipInputFlag) {
        that.showSkipInput();
      }
      //是否显示总页数,每页个数,数据
      if (that.showPageTotalFlag) {
        that.showPageTotal();
      }
    },
    //首页
    firstPage: function firstPage() {
        var that = this;
        var li = document.createElement('li');
        li.className = ' extreme';
        li.innerHTML = '首页';
        this.ul.appendChild(li);
        li.onclick = function () {
            var val = parseInt(1);
            that.curPage = val;
            that.getPage(that.curPage);
            that.init();
        };
    },
    //上一页
    lastPage: function lastPage() {
        var that = this;
        var li = document.createElement('li');
        li.innerHTML = '上一页';
        if (parseInt(that.curPage) > 1) {
            li.onclick = function () {
                that.curPage = parseInt(that.curPage) - 1;
                that.init();
                that.getPage(that.curPage);
            };
            li.className = ' page_btn';
        } else {
            li.className = 'disabled page_btn';
        }
        this.ul.appendChild(li);
    },
    //分页
    getPages: function getPages() {
        var pag = [];
        if (this.curPage <= this.pageTotal) {
            if (this.curPage < this.pageSize) {
                //当前页数小于显示条数
                var i = Math.min(this.pageSize, this.pageTotal);
                while (i) {
                    pag.unshift(i--);
                }
            } else {
                //当前页数大于显示条数
                var middle = this.curPage - Math.floor(this.pageSize / 2),
                    //从哪里开始
                    i = this.pageSize;
                if (middle > this.pageTotal - this.pageSize) {
                    middle = this.pageTotal - this.pageSize + 1;
                }
                while (i--) {
                    pag.push(middle++);
                }
            }
        } else {
            console.error('当前页数不能大于总页数');
        }
        if (!this.pageSize) {
            console.error('显示页数不能为空或者0');
        }
        return pag;
    },
    //下一页
    nextPage: function nextPage() {
        var that = this;
        var li = document.createElement('li');
        li.className="page_btn"
        li.innerHTML = '下一页';
        if (parseInt(that.curPage) < parseInt(that.pageTotal)) {
            li.onclick = function () {
                that.curPage = parseInt(that.curPage) + 1;
                that.init();
                that.getPage(that.curPage);
            };
        } else {
            li.className = 'disabled page_btn';
        }
        this.ul.appendChild(li);
    },
    //尾页
    finalPage: function finalPage() {
        var that = this;
        var li = document.createElement('li');
        li.className = 'extreme';
        li.innerHTML = '尾页';
        this.ul.appendChild(li);
        li.onclick = function () {
            var yyfinalPage = that.pageTotal;
            var val = parseInt(yyfinalPage);
            that.curPage = val;
            that.getPage(that.curPage);
            that.init();
        };
    },
    //是否支持跳转
    showSkipInput: function showSkipInput() {
      var that = this;
      var li = document.createElement('li');
      li.className = 'totalPage';
      var span1 = document.createElement('span');
      span1.innerHTML = '跳转至';
      li.appendChild(span1);
      var input = document.createElement('input');
      input.setAttribute("type", "number");
      input.onkeydown = function (e) {
        var oEvent = e || event;
        if (oEvent.keyCode == '13') {
          var val = parseInt(oEvent.target.value);
          if (typeof val === 'number' && val <= that.pageTotal) {
            that.curPage = val;
            that.getPage(that.curPage);
            oEvent.target.value = val;
          } else {
            alert("跳转页数不能大于总页数 !")
          }
          that.init();
        }
      };
      input.onchange = function(e){
        var oEvent = e || event;
        var val = parseInt(oEvent.target.value);
        if (typeof val === 'number' && val <= that.pageTotal) {
          if(isNaN(val) || val<1){
            val = 1;
            oEvent.target.value = val;
          }
          that.curPage = val;
          that.getPage(that.curPage);
          that.init();
        }
        else {
          //超过总页数
          return;
        }
      }
      input.value = that.curPage;
      li.appendChild(input);
      var span2 = document.createElement('span');
      span2.innerHTML = '页';
      li.appendChild(span2);

      var span3 = document.createElement('span');
      span3.innerHTML = '跳转';
      span3.className = 'btn-jump';
      span3.onclick = function (e) {
        var val = parseInt(input.value);
        if (typeof val === 'number' && val <= that.pageTotal) {
          that.curPage = val;
          that.getPage(that.curPage);
        } else if(isNaN(val)){
          alert('请输入正确的页数！')
        } else {
          alert("跳转页数不能大于总页数 !")
        }
        that.init();
      }
      li.appendChild(span3);
      this.ul.appendChild(li);
    },
    //是否显示总页数,每页个数,数据
    showPageTotal: function showPageTotal() {
        var that = this;
        var li = document.createElement('li');
        li.innerHTML = '共' + that.pageTotal + '页';
        li.className = 'totalPageInfo';
        this.ul.appendChild(li);
        // var li2 = document.createElement('li');
        // li2.innerHTML = '每页&nbsp' + that.pageAmount + '&nbsp条';
        // li2.className = 'totalPage';
        // this.ul.appendChild(li2);

        var li3 = document.createElement('li');
        li3.innerHTML = '共' + that.dataTotal + '条';
        li3.className = 'totalNum';
        // this.ul.appendChild(li3);
        this.ul.insertBefore(li3,this.ul.childNodes[0])
    }
};






















