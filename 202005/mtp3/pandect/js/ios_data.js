
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
		        name: 'iOS活跃量',
		        data: data1,
		        color : '#5fa6f2'
		    },{
		        name: 'iOS越狱量',
		        data: data2,
		        color : '#9ce882'
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
		        name: 'iOS活跃量',
		        data: data1,
		        color : '#5fa6f2'
		    },{
		        name: 'iOS越狱量',
		        data: data2,
		        color : '#9ce882'
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
			basisDataAdd( getAll(getDay(-8), getDay(0)) , data30.slice(0,8) , data30.slice(5,13) , data30.slice(0,8) , data30.slice(0,8));
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


	//变速器检测数据
	//timer : ['2018-08-10','2018-08-11','2018-08-12']
	//data1 : 变速器检测量 : ['1','1','1']
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
		        name: '变速器检测量',
		        data: data1,
		        color : '#5fa6f2'
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
		        name: '变速器检测量',
		        data: data1,
		        color : '#5fa6f2'
		    }]
		});
	}

	$('#featuresDay a').on('click',function(){
		var m = $(this).index();
		var si = $(this).parent().siblings('.data-timer');
		$(this).addClass('on').siblings().removeClass('on');
		si.hide().eq(m).show();
		if(m == 0){
			//变速器检测数据 默认展示8天
			featuresData( getAll(getDay(-8), getDay(0)) , data30.slice(0,8) , data30.slice(0,8) , data30.slice(0,8) , data30.slice(0,8));
		}
		if(m == 1){
			featuresRealTime('container2', toDayData , toDayData);
		}
		$('[features-day]').removeClass('check')
	}).eq(0).click();

	//变速器检测数据 30天切换
	$('[features-day]').on('click',function(){
		var da = $(this).attr('features-day');
		featuresData( getAll(getDay(-da), getDay(0)) , data30.slice(0,da) , data30.slice(0,da) , data30.slice(0,da) , data30.slice(0,da));
	})

	//变速器检测数据日期选择
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



	//可疑环境检测数据
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
		        name: '可疑环境检测量',
		        data: data1,
		        color : '#5fa6f2'
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
		        name: '可疑环境检测量',
		        data: data1,
		        color : '#5fa6f2'
		    }]
		});
	}


	$('#retreatDay a').on('click',function(){
		var m = $(this).index();
		var si = $(this).parent().siblings('.data-timer');
		$(this).addClass('on').siblings().removeClass('on');
		si.hide().eq(m).show();
		if(m == 0){
			//可疑环境检测数据 默认展示8天
			retreatData( getAll(getDay(-8), getDay(0)) , data30.slice(0,8) , data30.slice(0,8) , data30.slice(0,8) , data30.slice(0,8));
		}
		if(m == 1){
			retreatRealTime('container3', toDayData , toDayData);
		}
		$('[retreat-day]').removeClass('check')
	}).eq(0).click();


	//可疑环境检测数据 30天切换
	$('[retreat-day]').on('click',function(){
		var da = $(this).attr('retreat-day');
		retreatData( getAll(getDay(-da), getDay(0)) , data30.slice(0,da) , data30.slice(0,da) , data30.slice(0,da) , data30.slice(0,da));
	})

	//可疑环境检测数据日期选择
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
	});

	$('#startOneDate3').daterangepicker({
		singleDatePicker: true,
		startDate: moment().subtract(0, 'days'),
	    "locale": locale
    });

    //控制y轴字符长度
    function getDataY(arr){
        var newArr = [];
        arr.forEach(function(item, idx){
            if( item.length > 16 ){
                newArr[idx] = item.substring(15, 3) + "...";
            }else if( item.length < 16 ){
                var str = item;
                for( var i=0;i<16-item.length;i++){
                    str = " " + str;
                }
                newArr[idx] = str;
            }else {
                newArr[idx] = item;
            }
        });
        console.log(newArr);
        return newArr;
    }


    var chart3 = echarts.init(document.getElementById('chart3'));
    var data3 = [11200, 11300, 12600, 13600, 14400];
    var option3 = {
        tooltip: {
            show: true, // 必须引入 tooltip 组件
        },
        legend: {
            data: ['检测量'],
            bottom: 22,
            formatter:  (name)=>{
                    return '{a|可疑应用'+name+'}'
            },
            textStyle:{
                rich:{
                    a:{
                        color: '#717171',
                        fontSize:14,
                        verticalAlign:'text-bottom',
                        align:'center',
                        padding:[-1,0,0,0]
                    },
                }
            },
            itemWidth: 13,  // 设置宽度
            itemHeight: 13, // 设置高度
        },
        grid: {
            top: 76,
            left: 13,
            right: 60,
            bottom: 60,
            containLabel: true
        },
        xAxis: {
            type: 'value',
            // boundaryGap: ['10%', '10%'],
            min: function(value) {
                return 0;
            },
            max: function(value) {
                return value.max*1.65;
            },
            axisTick: {           //去掉坐标轴刻线
                show: false
            },
            splitNumber:12,
            splitLine:{show: false},//去除网格线
            axisLabel : {
                textStyle: {
                    color: '#717171'
                }
            },
            axisLine:{
                lineStyle: {
                    color: '#e4e4e4', // 颜色
                    width: 1 // 粗细
                },
            }
        },
        yAxis: {
            type: 'category',
            data: getDataY(['PandaSpaceStorePandaSpaceStore','GameMaster','GamePlayer','iGameGuardian','AutoTouch']),
            axisTick: {           //去掉坐标轴刻线
                show: false
            },
            axisLabel : {
                textStyle: {
                    color: '#717171',
                }
            },
            axisLine:{
                lineStyle: {
                    color: '#d1d7e9', // 颜色
                    width: 1 // 粗细
                },
            },
        },
        series: [
            {
                name: '123456',
                type: 'bar',
                data: data3,
                barWidth : 18,//柱图宽度
                itemStyle: {
                    normal:{
                        label:{
                            color:'#717171',
                            show: true,
                            position:'top',
                            formatter: function (params) {
                                var sum = eval(data3.join("+"))
                                return (params.value*100/sum).toFixed(1)+'%'
                            },
                        },
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 1,
                            colorStops: [{
                                offset: 0, color: 'rgb(133,211,229)' // 0% 处的颜色
                            }, {
                                offset: 1, color: 'rgb(91,122,249)' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        },
                    }
                },
                emphasis:{
                    label:{
                        color:'rgba(98, 151, 239, 1)',
                        fontWeight:'bold',
                        fontSize: 14
                    },
                    itemStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 1,
                            colorStops: [{
                                offset: 0, color: 'rgb(133,211,229)' // 0% 处的颜色
                            }, {
                                offset: 1, color: 'rgb(91,122,249)' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        },
                        shadowColor: 'rgba(98, 151, 239, 0.9)',
                        shadowBlur: 10,
                    }

                }
            }
        ]
    };
    chart3.setOption(option3);

    
    var chart4 = echarts.init(document.getElementById('chart4'));
    var data4 = [8000, 8500, 9000, 10000, 12000, 13000, 14000, 16000, 16500, 17500, 18000, 18200, 19000];
    var option4 = {
        tooltip: {
            show: true, // 必须引入 tooltip 组件
        },
        legend: {
            data: ['检测量'],
            bottom: 22,
            formatter:  (name)=>{
                    return '{a|可疑模块'+name+'}'
            },
            textStyle:{
                rich:{
                    a:{
                        color: '#717171',
                        fontSize: 14,
                        verticalAlign:'text-bottom',
                        align:'center',
                        padding:[-1,0,0,0]
                    },
                }
            },
            itemWidth: 13,  // 设置宽度
            itemHeight: 13, // 设置高度
        },
        grid: {
            top: 75,
            left: 13,
            right: 60,
            bottom: 60,
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 1.65],
            min: function(value) {
                return 0;
            },
            max: function(value) {
                return value.max*1.65;
            },
            axisTick: {           //去掉坐标轴刻线
                show: false
            },
            splitNumber: 12,
            splitLine:{show: false},//去除网格线
            axisLabel : {
                textStyle: {
                    color: '#717171'
                }
            },
            axisLine:{
                lineStyle: {
                    color: '#e4e4e4', // 颜色
                    width: 1 // 粗细
                },
            },
        },
        yAxis: {
            type: 'category',
            data: getDataY(['modular111','modular222','modular111','modular222','modular111','modular222','modular111','modular222','modular111','modular222']),
            axisTick: {           //去掉坐标轴刻线
                show: false
            },
            axisLabel : {
                textStyle: {
                    color: '#717171',
                }
            },
            axisLine:{
                lineStyle: {
                    color: '#d1d7e9', // 颜色
                    width: 1 // 粗细
                },
            },

        },
        series: [
            {
                name: '检测量',
                type: 'bar',
                data: data4,
                barWidth : 18,//柱图宽度
                itemStyle: {
                    normal:{
                        label:{
                            color:'#717171',
                            show: true,
                            position:'right',
                            formatter: function (params) {
                                var sum = eval(data4.join("+"))
                                return (params.value*100/sum).toFixed(1)+'%'
                            },
                        },

                        color: {
                            type: 'linear',
                            x: 0,
                            y: 1,
                            colorStops: [{
                                offset: 0, color: 'rgb(133,211,229)' // 0% 处的颜色
                            }, {
                                offset: 1, color: 'rgb(91,122,249)' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        },
                    }
                },
                emphasis:{
                    label:{
                        color:'rgba(98, 151, 239, 1)',
                        fontWeight:'bold',
                        fontSize: 14
                    },
                    itemStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 1,
                            colorStops: [{
                                offset: 0, color: 'rgb(133,211,229)' // 0% 处的颜色
                            }, {
                                offset: 1, color: 'rgb(91,122,249)' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        },
                        shadowColor: 'rgba(98, 151, 239, 0.9)',
                        shadowBlur: 10,
                    }

                }
            }
        ]
    };
    chart4.setOption(option4);

    
    window.onresize = function(){
        chart3.resize();
        chart4.resize();//若有多个图表变动，可多写
    };