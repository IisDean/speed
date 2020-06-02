
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
			ti.push((new Date(parseInt(k))).format())
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

	$('.data-ri a').on('click',function(){
		$(this).addClass('check').siblings().removeClass('check');
	})


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

	//基础数据
	//timer : ['2018-08-10','2018-08-11','2018-08-12']
	//data1 : Android活跃量 : ['1','1','1']
	//data2 : Android Root量 : ['1','1','1']
	//data3 : iOS活跃量 : ['1','1','1']
	//data4 : iOS越狱量 : ['1','1','1']
	function basisDataAdd(timer,data1,data2,data3,data4){
		var chart = Highcharts.chart('container1', {
		    title: {
		        text: ''
		    },
		    xAxis: {
                crosshair: true,
		        categories: timer,
                labels: {
                    staggerLines: 1,
                    step : Math.ceil((timer.length - 1) / 8),
                }
		    },
		    yAxis: {
		        title: {
		            text: ''
		        },
		    },
		    tooltip: {
		        crosshairs: true,
		        shared: true
		    },
			credits: {
				enabled: false
			},
		    series: [{
		        name: 'Android活跃量',
		        data: data1,
		        color : '#3ca7f9'
		    },{
		        name: 'Android Root量',
		        data: data2,
		        color : '#7dec74'
		    },{
		        name: 'iOS活跃量',
		        data: data3,
		        color : '#8f92e3'
		    },{
		        name: 'iOS越狱量',
		        data: data4,
		        color : '#f55e69'
		    }]
		});
	}
	
	//实时
	function basisRealTime(id,data1,data2,data3,data4){
		var chart = Highcharts.chart(id, {
		    title: {
		        text: ''
		    },
		    xAxis: {
		        categories: toDay(),
                labels: {
                    staggerLines: 1,
                    step : 10,
                    overflow : 'justify',
                }
		    },
		    yAxis: {
		        title: {
		            text: ''
		        },
		    },
		    tooltip: {
		        crosshairs: true,
		        shared: true
		    },
			credits: {
				enabled: false
			},
		    series: [{
		        name: 'Android活跃量',
		        data: data1,
		        color : '#3ca7f9'
		    },{
		        name: 'Android Root量',
		        data: data2,
		        color : '#7dec74'
		    },{
		        name: 'iOS活跃量',
		        data: data3,
		        color : '#8f92e3'
		    },{
		        name: 'iOS越狱量',
		        data: data4,
		        color : '#f55e69'
		    }]
		});
	}

	var toDayData = [] //实时24小时数组
	function toDay(){
		var arr = []
		toDayData = []
		for(var m =0 ; m < 1440;m +=10){
			if(m % 13 == 0){
				arr.push(Math.floor(m/60) + ':' + m % 60);
			}else{
				arr.push(Math.floor(m/60) + ':' + m % 60);
			}
			//测试传3
			toDayData.push(3);
		}
		return arr;
	}toDay();

	$('#basisDay a').on('click',function(){
		var m = $(this).index();
		var si = $(this).parent().siblings('.data-timer');
		$(this).addClass('on').siblings().removeClass('on');
		si.hide().eq(m).show();
		if(m == 0){
			//基础数据 默认展示8天
			basisDataAdd( getAll(getDay(-8), getDay(0)) , data30.slice(0,8) , data30.slice(0,8) , data30.slice(0,8) , data30.slice(0,8));
		}
		if(m == 1){
			basisRealTime('container1', toDayData , toDayData , toDayData, toDayData);
		}
		$('[basis-day]').removeClass('check');
	}).eq(0).click();

	//基础数据7天 30天切换
	$('[basis-day]').on('click',function(){
		var da = $(this).attr('basis-day');
		basisDataAdd( getAll(getDay(-da), getDay(0)) , data30.slice(0,da) , data30.slice(0,da) , data30.slice(0,da) , data30.slice(0,da));
	})

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

		var m = []
		//生成选中日期数据
		for(var c in da){
			m.push(3);
		}
		basisDataAdd( da , m , m , m , m);
		$('[basis-day]').removeClass('check');

		console.log(start.format())
		console.log(end.format())
	});

	$('#startOneDate1').daterangepicker({
		singleDatePicker: true,
		startDate: moment().subtract(0, 'days'),
	    "locale": locale
    });


	//二选一功能数据
	//timer : ['2018-08-10','2018-08-11','2018-08-12']
	//data1 : 二选一检测量 : ['1','1','1']
	//data2 : 二选一打击量 : ['1','1','1']
	function featuresData(timer,data1,data2){
		var chart = Highcharts.chart('container2', {
		    title: {
		        text: ''
		    },
		    xAxis: {
                crosshair: true,
		        categories: timer,
                labels: {
                    staggerLines: 1,
                    step : Math.ceil((timer.length - 1) / 8),
                }
		    },
		    yAxis: {
		        title: {
		            text: ''
		        },
		    },
		    tooltip: {
		        crosshairs: true,
		        shared: true
		    },
			credits: {
				enabled: false
			},
		    series: [{
		        name: '二选一检测量',
		        data: data1,
		        color : '#3ca7f9'
		    },{
		        name: '二选一打击量',
		        data: data2,
		        color : '#7dec74'
		    }]
		});
	}

	//实时
	function featuresRealTime(id,data1,data2){
		var chart = Highcharts.chart(id, {
		    title: {
		        text: ''
		    },
		    xAxis: {
		        categories: toDay(),
                labels: {
                    staggerLines: 1,
                    step : 10,
                    overflow : 'justify',
                }
		    },
		    yAxis: {
		        title: {
		            text: ''
		        },
		    },
		    tooltip: {
		        crosshairs: true,
		        shared: true
		    },
			credits: {
				enabled: false
			},
		    series: [{
		        name: '二选一检测量',
		        data: data1,
		        color : '#3ca7f9'
		    },{
		        name: '二选一打击量',
		        data: data2,
		        color : '#7dec74'
		    }]
		});
	}

	$('#featuresDay a').on('click',function(){
		var m = $(this).index();
		var si = $(this).parent().siblings('.data-timer');
		$(this).addClass('on').siblings().removeClass('on');
		si.hide().eq(m).show();
		if(m == 0){
			//二选一功能数据 默认展示8天
			featuresData( getAll(getDay(-8), getDay(0)) , data30.slice(0,8) , data30.slice(0,8) , data30.slice(0,8) , data30.slice(0,8));
		}
		if(m == 1){
			featuresRealTime('container2', toDayData , toDayData);
		}
		$('[features-day]').removeClass('check')
	}).eq(0).click();

	//二选一功能数据 30天切换
	$('[features-day]').on('click',function(){
		var da = $(this).attr('features-day');
		featuresData( getAll(getDay(-da), getDay(0)) , data30.slice(0,da) , data30.slice(0,da) , data30.slice(0,da) , data30.slice(0,da));
	})

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
		$('#config-demo2').val(st + ' - ' + en);

		var m = []
		//生成选中日期数据
		for(var c in da){
			m.push(3);
		}
		featuresData( da , m , m , m , m);
		$('[features-day]').removeClass('check');
		console.log(start.format())
		console.log(end.format())
	});

	$('#startOneDate2').daterangepicker({
		singleDatePicker: true,
		startDate: moment().subtract(0, 'days'),
	    "locale": locale
    });



	//虚拟机闪退数据
	//timer : ['2018-08-10','2018-08-11','2018-08-12']
	//data1 : 虚拟机检测量 : ['1','1','1']
	//data2 : 虚拟机打击量 : ['1','1','1']
	function retreatData(timer,data1,data2){
		var chart = Highcharts.chart('container3', {
		    title: {
		        text: ''
		    },
		    xAxis: {
                crosshair: true,
		        categories: timer,
                labels: {
                    staggerLines: 1,
                    step : Math.ceil((timer.length - 1) / 8),
                }
		    },
		    yAxis: {
		        title: {
		            text: ''
		        },
		    },
		    tooltip: {
		        crosshairs: true,
		        shared: true
		    },
			credits: {
				enabled: false
			},
		    series: [{
		        name: '虚拟机检测量',
		        data: data1,
		        color : '#3ca7f9'
		    },{
		        name: '虚拟机打击量',
		        data: data2,
		        color : '#7dec74'
		    }]
		});
	}

	//实时
	function retreatRealTime(id,data1,data2){
		var chart = Highcharts.chart(id, {
		    title: {
		        text: ''
		    },
		    xAxis: {
		        categories: toDay(),
                labels: {
                    staggerLines: 1,
                    step : 10,
                    overflow : 'justify',
                }
		    },
		    yAxis: {
		        title: {
		            text: ''
		        },
		    },
		    tooltip: {
		        crosshairs: true,
		        shared: true
		    },
			credits: {
				enabled: false
			},
		    series: [{
		        name: '虚拟机检测量',
		        data: data1,
		        color : '#3ca7f9'
		    },{
		        name: '虚拟机打击量',
		        data: data2,
		        color : '#7dec74'
		    }]
		});
	}


	$('#retreatDay a').on('click',function(){
		var m = $(this).index();
		var si = $(this).parent().siblings('.data-timer');
		$(this).addClass('on').siblings().removeClass('on');
		si.hide().eq(m).show();
		if(m == 0){
			//二选一功能数据 默认展示8天
			retreatData( getAll(getDay(-8), getDay(0)) , data30.slice(0,8) , data30.slice(0,8) , data30.slice(0,8) , data30.slice(0,8));
		}
		if(m == 1){
			retreatRealTime('container3', toDayData , toDayData);
		}
		$('[retreat-day]').removeClass('check')
	}).eq(0).click();


	//虚拟机闪退数据 30天切换
	$('[retreat-day]').on('click',function(){
		var da = $(this).attr('retreat-day');
		retreatData( getAll(getDay(-da), getDay(0)) , data30.slice(0,da) , data30.slice(0,da) , data30.slice(0,da) , data30.slice(0,da));
	})

	//二选一功能数据日期选择
	$('#config-demo3').daterangepicker({
		"maxDate" : getDay(-1),
	    "startDate": getDay(-8),
	    "endDate": getDay(-1),
	    "locale": locale
	}, function(start, end, label) {
		var st = start.format().substring(0,10);
		var en = end.format().substring(0,10);
		var da = getAll(st,en);
		$('#config-demo3').val(st + ' - ' + en);

		var m = []
		//生成选中日期数据
		for(var c in da){
			m.push(3);
		}
		retreatData( da , m , m , m , m);
		$('[features-day]').removeClass('check');
		console.log(start.format())
		console.log(end.format())
	});

	$('#startOneDate3').daterangepicker({
		singleDatePicker: true,
		startDate: moment().subtract(0, 'days'),
	    "locale": locale
    });





	//修改器闪退数据
	//timer : ['2018-08-10','2018-08-11','2018-08-12']
	//data1 : 修改器检测量 : ['1','1','1']
	//data2 : 修改器打击量 : ['1','1','1']
	function modifyData(timer,data1,data2){
		var chart = Highcharts.chart('container4', {
		    title: {
		        text: ''
		    },
		    xAxis: {
                crosshair: true,
		        categories: timer,
                labels: {
                    staggerLines: 1,
                    step : Math.ceil((timer.length - 1) / 8),
                }
		    },
		    yAxis: {
		        title: {
		            text: ''
		        },
		    },
		    tooltip: {
		        crosshairs: true,
		        shared: true
		    },
			credits: {
				enabled: false
			},
		    series: [{
		        name: '修改器检测量',
		        data: data1,
		        color : '#3ca7f9'
		    },{
		        name: '修改器打击量',
		        data: data2,
		        color : '#7dec74'
		    }]
		});
	}

	//实时
	function modifyRealTime(id,data1,data2){
		var chart = Highcharts.chart(id, {
		    title: {
		        text: ''
		    },
		    xAxis: {
		        categories: toDay(),
                labels: {
                    staggerLines: 1,
                    step : 10,
                    overflow : 'justify',
                }
		    },
		    yAxis: {
		        title: {
		            text: ''
		        },
		    },
		    tooltip: {
		        crosshairs: true,
		        shared: true
		    },
			credits: {
				enabled: false
			},
		    series: [{
		        name: '修改器检测量',
		        data: data1,
		        color : '#3ca7f9'
		    },{
		        name: '修改器打击量',
		        data: data2,
		        color : '#7dec74'
		    }]
		});
	}

	$('#modifyDay a').on('click',function(){
		var m = $(this).index();
		var si = $(this).parent().siblings('.data-timer');
		$(this).addClass('on').siblings().removeClass('on');
		si.hide().eq(m).show();
		if(m == 0){
			//二选一功能数据 默认展示8天
			modifyData( getAll(getDay(-8), getDay(0)) , data30.slice(0,8) , data30.slice(0,8) , data30.slice(0,8) , data30.slice(0,8));
		}
		if(m == 1){
			modifyRealTime('container4', toDayData , toDayData);
		}
		$('[modify-day]').removeClass('check')
	}).eq(0).click();


	//虚拟机闪退数据 30天切换
	$('[modify-day]').on('click',function(){
		var da = $(this).attr('modify-day');
		modifyData( getAll(getDay(-da), getDay(0)) , data30.slice(0,da) , data30.slice(0,da) , data30.slice(0,da) , data30.slice(0,da));
	})
	//二选一功能数据日期选择
	$('#config-demo4').daterangepicker({
		"maxDate" : getDay(-1),
	    "startDate": getDay(-8),
	    "endDate": getDay(-1),
	    "locale": locale
	}, function(start, end, label) {
		var st = start.format().substring(0,10);
		var en = end.format().substring(0,10);
		var da = getAll(st,en);
		$('#config-demo4').val(st + ' - ' + en);
		var m = []
		//生成选中日期数据
		for(var c in da){
			m.push(3);
		}
		modifyData( da , m , m , m , m);
		$('[modify-day]').removeClass('check');
		console.log(start.format())
		console.log(end.format())
	});

	$('#startOneDate4').daterangepicker({
		singleDatePicker: true,
		startDate: moment().subtract(0, 'days'),
	    "locale": locale
    });

	//变速器闪退数据
	//timer : ['2018-08-10','2018-08-11','2018-08-12']
	//data1 : 修改器检测量 : ['1','1','1']
	//data2 : 修改器打击量 : ['1','1','1']
	function changeData(timer,data1,data2){
		var chart = Highcharts.chart('container5', {
		    title: {
		        text: ''
		    },
		    xAxis: {
                crosshair: true,
		        categories: timer,
                labels: {
                    staggerLines: 1,
                    step : Math.ceil((timer.length - 1) / 8),
                }
		    },
		    yAxis: {
		        title: {
		            text: ''
		        },
		    },
		    tooltip: {
		        crosshairs: true,
		        shared: true
		    },
			credits: {
				enabled: false
			},
		    series: [{
		        name: '变速器检测量',
		        data: data1,
		        color : '#3ca7f9'
		    },{
		        name: '变速器打击量',
		        data: data2,
		        color : '#7dec74'
		    }]
		});
	}

	//实时
	function changeRealTime(id,data1,data2){
		var chart = Highcharts.chart(id, {
		    title: {
		        text: ''
		    },
		    xAxis: {
		        categories: toDay(),
                labels: {
                    staggerLines: 1,
                    step : 10,
                    overflow : 'justify',
                }
		    },
		    yAxis: {
		        title: {
		            text: ''
		        },
		    },
		    tooltip: {
		        crosshairs: true,
		        shared: true
		    },
			credits: {
				enabled: false
			},
		    series: [{
		        name: '变速器检测量',
		        data: data1,
		        color : '#3ca7f9'
		    },{
		        name: '变速器打击量',
		        data: data2,
		        color : '#7dec74'
		    }]
		});
	}

	$('#changeDay a').on('click',function(){
		var m = $(this).index();
		var si = $(this).parent().siblings('.data-timer');
		$(this).addClass('on').siblings().removeClass('on');
		si.hide().eq(m).show();
		if(m == 0){
			//二选一功能数据 默认展示8天
			changeData( getAll(getDay(-8), getDay(0)) , data30.slice(0,8) , data30.slice(0,8) , data30.slice(0,8) , data30.slice(0,8));
		}
		if(m == 1){
			changeRealTime('container5', toDayData , toDayData);
		}
		$('[change-day]').removeClass('check')
	}).eq(0).click();


	//变速器闪退数据 30天切换
	$('[change-day]').on('click',function(){
		var da = $(this).attr('change-day');
		changeData( getAll(getDay(-da), getDay(0)) , data30.slice(0,da) , data30.slice(0,da) , data30.slice(0,da) , data30.slice(0,da));
	})
	//二选一功能数据日期选择
	$('#config-demo5').daterangepicker({
		"maxDate" : getDay(-1),
	    "startDate": getDay(-8),
	    "endDate": getDay(-1),
	    "locale": locale
	}, function(start, end, label) {
		var st = start.format().substring(0,10);
		var en = end.format().substring(0,10);
		var da = getAll(st,en);
		$('#config-demo5').val(st + ' - ' + en);
		var m = []
		//生成选中日期数据
		for(var c in da){
			m.push(3);
		}
		changeData( da , m , m , m , m);
		$('[change-day]').removeClass('check');
		console.log(start.format())
		console.log(end.format())
	});

	$('#startOneDate5').daterangepicker({
		singleDatePicker: true,
		startDate: moment().subtract(0, 'days'),
	    "locale": locale
    });