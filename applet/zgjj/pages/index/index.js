//index.js
//获取应用实例
const app = getApp();

Page({
    data: {
        currentIndex: 1,
        assets: app.globalData.assets,
        overviewData: [//战绩概览数据
            {
                name: '经典',
                isOpen: false,
                dataList: [
                    {
                        name: '总对局',
                        value: '74'
                    },{
                        name: '夺冠数',
                        value: '7'
                    },{
                        name: '夺冠率',
                        value: '10%'
                    },{
                        name: '平均排名',
                        value: '2.9'
                    },{
                        name: '前三数',
                        value: '22'
                    },{
                        name: '前三率',
                        value: '30%'
                    },{
                        name: '游戏天数',
                        value: '21'
                    },{
                        name: '最多连胜',
                        value: '14'
                    },
                ],
                recentRecord: {
                    average: 2,
                    data: [5, 6, 7, 4, 1, 7, 8, 5, 7, 2, 3, 8, 1, 2, 1, 1, 7, 5, 1, 6]
                }
            },{
                name: '极速',
                isOpen: false,
                dataList: [
                    {
                        name: '总对局',
                        value: '88'
                    }, {
                        name: '夺冠数',
                        value: '56'
                    }, {
                        name: '夺冠率',
                        value: '58%'
                    }, {
                        name: '平均排名',
                        value: '2'
                    }, {
                        name: '前三数',
                        value: '75'
                    }, {
                        name: '前三率',
                        value: '85%'
                    }, {
                        name: '游戏天数',
                        value: '14'
                    }, {
                        name: '最多连胜',
                        value: '20'
                    },
                ],
                recentRecord: {
                    average: 2,
                    data: [5, 6, 3, 8, 1, 2, 1, 1, 7, 5, 1, 6, 7, 4, 1, 7, 8, 5, 7, 2]
                } 
            }, {
                name: '军团',
                isOpen: false,
                dataList: [
                    {
                        name: '总对局',
                        value: '74'
                    }, {
                        name: '夺冠数',
                        value: '7'
                    }, {
                        name: '夺冠率',
                        value: '10%'
                    }, {
                        name: '平均排名',
                        value: '2.9'
                    }, {
                        name: '胜方王牌',
                        value: '22'
                    }, {
                        name: '败方王牌',
                        value: '14'
                    }, {
                        name: '游戏天数',
                        value: '14'
                    }, {
                        name: '最多连胜',
                        value: '14'
                    },
                ],
                recentRecord:{
                    average: 2,
                    data: [7, 2, 3, 5, 6, 7, 4, 1, 7, 8, 5, 8, 1, 2, 1, 1, 7, 5, 1, 6]
                }
            }, {
                name: '娱乐',
                isOpen: false,
                dataList: [
                    {
                        name: '总对局',
                        value: '74'
                    }, {
                        name: '夺冠数',
                        value: '7'
                    }, {
                        name: '夺冠率',
                        value: '10%'
                    }, {
                        name: '平均排名',
                        value: '2.9'
                    }, {
                        name: '合作',
                        isThreeMenu: true,
                        threeDataList: [
                            {
                                name: '对局',
                                value: '22'
                            }, {
                                name: '夺冠数',
                                value: '20'
                            }, {
                                name: '夺冠率',
                                value: '10%'
                            }, {
                                name: '平均排名',
                                value: '20'
                            }
                        ]
                    }, {
                        name: '选秀',
                        isThreeMenu: true,
                        threeDataList: [
                            {
                                name: '对局',
                                value: '22'
                            }, {
                                name: '夺冠数',
                                value: '20'
                            }, {
                                name: '夺冠率',
                                value: '10%'
                            }, {
                                name: '平均排名',
                                value: '20'
                            }
                        ]
                    }, {
                        name: '夺宝',
                        isThreeMenu: true,
                        threeDataList: [
                            {
                                name: '对局',
                                value: '22'
                            }, {
                                name: '夺冠数',
                                value: '20'
                            }, {
                                name: '夺冠率',
                                value: '10%'
                            }, {
                                name: '平均排名',
                                value: '20'
                            }
                        ]
                    }
                ],
                recentRecord: {
                    average: 2,
                    data: [5, 6, 5, 7, 2, 3, 8, 1, 2, 7, 4, 1, 7, 8, 1, 1, 7, 5, 1, 6]
                }
            }
        ],
        lsRecordData: [//历史战绩数据
            {
                groupName: '极速对决',
                groupType: 1,
                rank: 1,
                time: '2019.09.18 19:12',
                caseList: [],
                fetter: ['4德鲁伊', '2野兽', '6骑士', '审判者']
            }, {
                groupName: '经典竞技',
                groupType: 2,
                rank: 3,
                time: '2019.09.18 19:12',
                caseList: [],
                fetter: ['4德鲁伊', '2野兽', '6骑士', '审判者']
            }, {
                groupName: '军团争霸',
                groupType: 3,
                rank: 3,
                time: '2019.09.18 19:12',
                caseList: [],
                fetter: ['4德鲁伊', '2野兽', '6骑士', '审判者']
            }, {
                groupName: '合作对抗',
                groupType: 4,
                rank: 1,
                time: '2019.09.18 19:12',
                caseList: [],
                fetter: ['4德鲁伊', '2野兽', '6骑士', '审判者']
            }
        ]
    },
    onLoad() {
        
    },
    clickTap(e) {
        this.setData({
            //拿到当前索引并动态改变
            currentIndex: e.currentTarget.dataset.idx
        })
    },
    openHeight(e) {//展开
        let tabIdx = e.currentTarget.dataset.idx;
        let obj = "overviewData["+tabIdx+"].isOpen";
        let val = !this.data.overviewData[tabIdx].isOpen;
        this.setData({
            [obj]: val
        });
    }
})