


    var chart1 = echarts.init(document.getElementById("chart"));
    var option1 = {

        color: ['#5b7bf9'],

        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle : {
                    color : '#5b7bf9',
                    width:'2'
                }
            },
            backgroundColor:'rgba(146,146,146,0.9)'
        },

        grid: {
            left: '22px',
            right: '0px',
            top:'20px',
            bottom: '38px',
            containLabel: true
        },
        //图例
        legend: {
            //type: 'plain',
            icon: 'rect',
            data:['模拟器检测量'],
            bottom : 0,
            itemWidth:26,//图例的宽度
            itemHeight:2,//图例的高度
            textStyle: {
                fontSize: 14,//字体大小
                color: '#717171'//字体颜色
            }
        },

        //x轴
        xAxis: {
            type: 'category',

            //x轴颜色
            axisLine: {
                lineStyle: {
                    color: '#959595'
                }
            },
            axisLabel: {
                interval: 1
            },

            //数据
            data: [
                '2019-11-06', '2019-11-10', '2019-11-14', '2019-11-18', '2019-11-22', '2019-11-26', '2019-11-30', '2019-12-04',
                '2019-11-06', '2019-11-10', '2019-11-14', '2019-11-18', '2019-11-22', '2019-11-26', '2019-11-30', '2019-12-04','2019-12-04',
                '2019-11-06', '2019-11-10', '2019-11-14'
            ]
        },

        //轴
        yAxis: {
            type: 'value',

            //去掉刻度
            axisTick: {
                show: false
            },

            //y轴颜色
            axisLine: {
                lineStyle: {
                    color: '#959595',
                    width: 0

                }
            }
        },
        series: [
            {
                name:'模拟器检测量',
                type:'line',
                stack: '总量',
                data:[0,2,0,0,1,0,0,2,0,1,1,3,2,2,0,0,2,0,0,3.5,2,3,3,3,3,2],
                // 设置折点大小
                symbolSize: 0,
            }

        ]
    };
    chart1.setOption(option1);

    var chart2 = echarts.init(document.getElementById('chart2'));
    var option2 = {
        grid:{
            top:-130
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)",
            extraCssText: "z-index:5",
            backgroundColor:'rgba(146,146,146,0.9)'
        },
        legend: {
            orient: 'horizontal',  //'vertical'
            x: 'center',
            bottom: 3,
            formatter: '{name}',
            data:['昨日DAU','模拟器检测量']
        },
        color:['#83d8e6','#5d7ef8'],
        series: [
            {
                name:'昨日模拟器检测量',
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
                    {value:310, name:'模拟器检测量'},
                    {value:335, name:'昨日DAU'},
                ]
            }
        ],

    };

    var data = [
        {
            name: "昨日DAU",
            value: 100
        },{
            name: "模拟器检测量",
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
                center: ['50%', '45%'],
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
    chart2.setOption(option2);

    var chart3 = echarts.init(document.getElementById('chart3'));
    var data3 = [20, 30, 100, 200, 300, 400, 500, 600, 680, 890];
    option3 = {
        title: {
            text: '模拟器检测占比TOP10',
            left: 'center'
        },
        tooltip: {
            show: true, // 必须引入 tooltip 组件
        },
        legend: {
            data: ['检测量'],
            bottom:26,
            formatter:  (name)=>{
                return '{a|模拟'+name+'}'
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
            data: ['其他','moni_qi','weizhi','天天','靠谱','网易','逍遥','夜神','腾讯','雷电'],
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
        chart1.resize();
        chart2.resize();
        chart3.resize();
        //myChart1.resize();    //若有多个图表变动，可多写
    };

    function chartLoading(){
        chart1.showLoading({
            text : '正在加载数据'
        })
        chart2.showLoading({
            text : '正在加载数据'
        })
        chart3.showLoading({
            text : '正在加载数据'
        })
    }
    function chartHideLoading(){
        chart1.hideLoading();
        chart2.hideLoading();
        chart3.hideLoading();
    }

    chartLoading();

    $(function () {
        chartHideLoading()
    })


