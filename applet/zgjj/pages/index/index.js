//index.js
//获取应用实例
const app = getApp();

Page({
    data: {
        currentIndex: 1,
        assets: app.globalData.assets,
        overviewData: [
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
    openHeight(e) {
        let tabIdx = e.currentTarget.dataset.tabIdx;
        this.setData({

        });
    }
})