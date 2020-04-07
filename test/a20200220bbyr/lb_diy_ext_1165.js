/* 此文件开发可针对一些参数及回调方法来对openlinkid、登录后回调、大区绑定回调及ams提交回调等进行自定义 */

// 通过微信OpenLink唤起微信时传递的noticeId
var gLubanOpenLinkId = 0;

// 登录后回调
function lbCallBackAfterLogin(LoginManager){
    console.log(LoginManager);
}

// 绑定大区成功及失败的回调：
// resType
// 1- query_success:    有绑定信息
// 2- query_failed :    查无绑信息
// 3- comit_success:    提交绑定信息成功
// 4- comit_failed :    提交绑定信息失败
// parms
// success则对应：bindedInfo
// failed则对应:''
function lbCallBackOfAreaHandle(resType, parms){
    console.log(resType, parms);
}

// ams提交回调
// resType: success=成功，failed=失败
// iFlowId: 提交对应的流程号
// parms  : 参数列表与原方法一致
function lbCallBackOfAmsSubmit(resType, iFlowId, parms){
    console.log(resType, iFlowId, parms);
}
