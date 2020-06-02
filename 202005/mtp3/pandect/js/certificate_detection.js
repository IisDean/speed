

    var chart2 = echarts.init(document.getElementById('chart2'));
    var option2 = {
        grid:{
            top:-230
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)",
            extraCssText: "z-index:5",
            backgroundColor:'rgba(146,146,146,0.9)'
        },
        legend: {
            orient: 'vertical',  //'vertical'
            x: 'center',
            bottom: 3,
            formatter: '{name}',
            data:['总证书检测量','可疑证书检测量']
        },
        color:['#83d8e6','#5d7ef8'],
        series: [
            {
               // name:'昨日可疑证书检测量',
                type:'pie',
                radius: ['66.55%', '80%'],
                center: ["50%", "45%"],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:310, name:'总证书检测量'},
                    {value:335, name:'可疑证书检测量'},
                ]
            }
        ],

    };

    var data = [
        {
            name: "总证书检测量",
            value: 100
        },{
            name: "可疑证书检测量",
            value: 10
        },
    ];
    var legendData=[];
    function getData(data) {
        var sortData=data.sort((a,b)=>{
            return b.value-a.value
        });
        if(sortData[0].value===0){
            var maxNum = 0;
            sortData = [{
                name: "昨日DAU",
                value: 0
            }];
        }


        var res = [];
        for (let i = 0; i < sortData.length; i++) {
            legendData.push(sortData[i].name);
            console.log(i)
            res.push({
                type: 'pie',
                clockWise: true, //顺时加载
                hoverAnimation: maxNum==0?false:true, //鼠标移入变大
                radius: [120 - 1 * 20, 120],
                // 　　　radius: [65 - 1 * 15 + '%', 57 - 1 * 15 + '%'],
                center: ['50%', '40%'],
                itemStyle: {
                    normal: {
                        label: {show:false},
                        labelLine: {show:false},
                        shadowBlur: 10,
                        shadowColor: 'rgba(40, 40, 40, 0.5)',
                    }
                },
                data: maxNum==0 ? [
                    {
                        value: sortData[i].value,
                        name: sortData[i].name,
                        itemStyle:{
                            normal : {
                                color:'#ccc',
                                shadowBlur: 0,
                                shadowColor: 'rgba(40, 40, 40, 0.5)',
                            }
                        }
                    }
                ]:

                [
                    {
                        value: sortData[i].value,
                        name: sortData[i].name,
                        itemStyle:{
                            normal : {
                                color:option2.color[i]
                            }
                        }
                    },
                    {
                        value: sortData[0].value-sortData[i].value,
                        name:sortData[i].name,
                        itemStyle: {
                            normal : {
                                color: 'rgba(0,0,0,0)',
                                label: {show:false},
                                labelLine: {show:false}
                            },
                            emphasis : {
                                color: 'rgba(0,0,0,0)'
                            }
                        },
                    },
                ]
            });
        }
        return res;
    }
    var option2 = {
        color: ['#83d8e6','#5d7ef8'],
        tooltip : {
            show: true,
            formatter: function(d){
                console.log(d.dataIndex)
                // "{b} : {c} ({d}%)"
                var ret = '';
                if(d.dataIndex==0){
                    ret = d.name + ' : ' + d.value + '('+d.percent+'%)'
                }else{
                    console.log(data)
                    ret = data[0].name + ' : ' + data[0].value + '(100%)'
                }
                return ret;
            }
        },
        legend: {
            itemGap:12,
            orient: 'horizontal',  //'vertical'
            x: 'center',
            bottom: 3,
            data:legendData
        },
        series : getData(data)
    };
    console.log(option2)
    chart2.setOption(option2);



    var chart3 = echarts.init(document.getElementById('chart3'));
    var data3 = [20, 30, 100, 200, 300, 400, 500, 600, 680, 890];
    var data3Y = ['XXX','XXX','XXX','XXX','XXX','XXX','XXX','XXX','Nginx','Tomcat'];
    function getDataY(arr){
        var newArr = []
        arr.forEach(function(item,index){
            var newItem = '';
            //判断字符长度
            newItem = (item.length > 6) ? item.substring(0,3)+'...' : item;
            newArr.push(newItem)
        })
        return newArr
    }
    option3 = {
        title: {
            text: '可疑证书检测TOP排行',
            left: 'center'
        },
        tooltip: {
            show: true, // 必须引入 tooltip 组件
        },
        legend: {
            data: ['检测量'],
            bottom:26,
            formatter:  (name)=>{
                return '{a|证书'+name+'}'
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
            top:100,
            left: '5%',
            right: '5%',
            bottom: 70,
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
            },
        },
        yAxis: {
            type: 'category',
            boundaryGap: ['10%', '10%'],
            data: getDataY(data3Y),
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
                data: data3,
                barWidth : 18,//柱图宽度
                itemStyle: {
                    normal:{
                        label:{
                            color:'#717171',
                            show: true,
                            position:'right',
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

    window.onresize = function(){
        chart2.resize();
        chart3.resize();//若有多个图表变动，可多写
    };

    function chartLoading(){

        chart2.showLoading({
            text : '正在加载数据'
        })
        chart3.showLoading({
            text : '正在加载数据'
        })
    }
    function chartHideLoading(){

        chart2.hideLoading();
        chart3.hideLoading();
    }

    chartLoading();

    $(function () {
        chartHideLoading()
    });

    chart3.on('click', function (params) {
        var activeIndex = params.dataIndex
        console.log(activeIndex)
    });
