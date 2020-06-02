
	"use strict"
	function getDay(day){
       var today = new Date();
       var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
       today.setTime(targetday_milliseconds); //注意，这行是关键代码
       var tYear = today.getFullYear();
       var tMonth = today.getMonth();
       var tDate = today.getDate();
       tMonth = doHandleMonth(tMonth + 1);
       tDate = doHandleMonth(tDate);
       return tYear+"-"+tMonth+"-"+tDate;
	}
	function doHandleMonth(month){
		var m = month;
		if(month.toString().length == 1){
			m = "0" + month;
		}
		return m;
	}

	function getAll(begin, end) {
		var ti = [];
		var ab = begin.split("-");
		var ae = end.split("-");
		var db = new Date();
		db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
		var de = new Date();
		de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
		var unixDb = db.getTime();
		var unixDe = de.getTime();
		for (var k = unixDb; k <= unixDe;) {
			ti.push((new Date(parseInt(k))).format());
			k = k + 24 * 60 * 60 * 1000;
		}
		return ti
	}
   	Date.prototype.format = function() {
       var s = '';
       var mouth = (this.getMonth() + 1)>=10?(this.getMonth() + 1):('0'+(this.getMonth() + 1));
       var day = this.getDate()>=10?this.getDate():('0'+this.getDate());
       s += this.getFullYear() + '-'; // 获取年份。
       s += mouth + "-"; // 获取月份。
       s += day; // 获取日。
       return (s); // 返回日期。
   };

	var locale = {
		    "format": 'YYYY-MM-DD',
		    "applyLabel": "确定",
		    "cancelLabel": "取消",
		    "fromLabel": "起始时间",
		    "toLabel": "结束时间'",
		    "customRangeLabel": "自定义",
		    "weekLabel": "W",
		    "daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
		    "monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		    "firstDay": 1
		};


	//基础数据日期选择
	$('#config-demo1').daterangepicker({
		"maxDate" : getDay(-1),
	    "startDate": getDay(-8),
	    "endDate": getDay(-1),
	    "locale": locale
	}, function(start, end, label) {
		var st = start.format().substring(0,10);
		var en = end.format().substring(0,10);
		var da = getAll(st,en);
		$('#config-demo1').val(st + ' - ' + en);

	});

    //$('#startOneDate1').daterangepicker({
		//singleDatePicker: true,
		//startDate: moment().subtract(0, 'days'),
	 //   "locale": locale
    //});

	//二选一功能数据日期选择
	$('#config-demo2').daterangepicker({
		"maxDate" : getDay(-1),
	    "startDate": getDay(-8),
	    "endDate": getDay(-1),
	    "locale": locale
	}, function(start, end, label) {
		var st = start.format().substring(0,10);
		var en = end.format().substring(0,10);
		var da = getAll(st,en);
		// console.log(st,en);
		$('#config-demo2').val(st + ' - ' + en);
	});

    //$('#startOneDate2').daterangepicker({
		//singleDatePicker: true,
		//startDate: moment().subtract(0, 'days'),
	 //   "locale": locale
    //});



