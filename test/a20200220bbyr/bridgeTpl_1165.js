/*
                    iBtnGraySwitch:是否开启按钮置灰功能 修改CSS样式名称进行覆盖 btn-zhih 
                    willQHoldFlow:是否开启用资格查询，用于显示剩余资格数 以上两者只要有一个开启，就查询资格流程
                    iGameType:游戏类型 1 端游 2 手游
                    iQualType:资格类型 到openid/qq取1  其他都算2
                    qZigeFlow:查询资格的流程号
                    qJfFlow:查询积分的流程号
                    qDsFlow:查询条件数据的流程号
                    iSighQueryFlow:查询签到信息的流程号
                    iMyAddressId:收货地址填写的提交流程号
                    iDecryptFlow:解密邀请码的提交流程号
                    iInviteFlow:快速邀请的提交流程号
                    needAddress=1:是否需要收货地址填写功能
                    iActivityId:ams活动id
                    iBindAreaId:大区提交绑定流程
                    iInitAreaId:大区查询流程
                    iLotteryId:抽奖模块id，若有多个取一个
                    iMyListId:我的礼包查询流程号
                    iGiftArea:我的礼包是否显示大区一列
                    iMrmsBind:是否绑定礼包单
                    sService:业务名称
*/
window.iWillMergeCode =1;
window.iBtnGraySwitch =1;
window.willQHoldFlow =0;
window.iGameType =2;
window.iQualType =2;
window.qZigeFlow =644619;
window.qJfFlow =644620;
window.qDsFlow =0;
window.iSighQueryFlow=0;
window.iMyAddressId=644613;
window.iDecryptFlow=0;
window.iInviteFlow=0;
window.needAddress=0;
window.iActivityId=287812;
window.iBindAreaId = 644262;
window.iInitAreaId = iBindAreaId + 1;
window.iLotteryId = 333391;
window.iMyListId = 644610;
window.iGiftArea = 1;
window.sService = 'cfm';
window.gLubanId = 1632;
window.iMrmsBind = 1;
var gLogCfg = {"iLoginTypeSwitch":3,"iBindZoneSwitch":1,"iMyGiftBagSwitch":1,"iMyAddressSwitch":1,"iMyOrderlstSwitch":1,"iOpenlink":0,"iZoneShowType":0,"sZoneIdsToHide":""};