var mySwiper = new Swiper('.swiper-container', {
    effect: 'fade',
    initialSlide: 0,
    navigation: {
        nextEl: '.next-topic-btn'
    },
});

var answer = [{
    num: 1,
    current: 1,
    title: '1. 四川话讲的“丁丁猫儿、灰猫儿、油炸猫儿”哪个跟其他两个不是同一类？',
    options: [
        '丁丁猫儿',
        '灰猫儿',
        '油炸猫儿'
    ],
    select: null
}, {
    num: 2,
    current: 1,
    title: '2.请问酱婶儿的指示牌可能会出现在哪个省份的池塘边？',
    options: [
        '河北',
        '东北',
        '湖北'
    ],
    select: null
}, {
    num: 3,
    current: 1,
    title: '3.语言中表达的是什么意思？',
    options: [
        '夸你人见人爱',
        '说你是冤大头',
        '祝你咸鱼翻身'
    ],
    select: null
}, {
    num: 4,
    current: 2,
    title: '4.上海话讲"乌龟”叫“乌驹"“白乌驹”是萨意思？',
    options: [
        '白乌龟',
        '白龙马',
        '鹅'
    ],
    select: null
}, {
    num: 5,
    current: 0,
    title: '5.东北人玩成语接龙，<span>不舍昼夜</span>下一个会接什么？',
    options: [
        '热火朝天',
        '屹立不倒',
        '艳丽动人'
    ],
    select: null
}, {
    num: 6,
    current: 2,
    title: '6.这俩四川人出门前吃东西没？',
    options: [
        '吃了个粑粑',
        '吃了个串串',
        '什么都没有吃'
    ],
    select: null
}, {
    num: 7,
    current: 1,
    title: '7.这个苏州人讲了的食物里有几种是动物？',
    options: [
        '3种',
        '6种',
        '4种'
    ],
    select: null
}, {
    num: 8,
    current: 2,
    title: '8.小红去买早餐，煎饼果子老板叫她姐姐，东北饺子老板叫她老妹儿，下列哪项判断更为正确？',
    options: [
        '小红比东北饺子老板大，比煎饼果子老板小',
        '东北饺子老板比煎饼果子老板大',
        '无法判断谁大谁小'
    ],
    select: null
}, {
    num: 9,
    current: 1,
    title: '9.题中东北人说的是什么意思?',
    options: [
        '你下班去看一下',
        '你下班去拿一下',
        '你下班去说一下'
    ],
    select: null
}, {
    num: 10,
    current: 0,
    title: '10.长沙人说：“你要哦该咯！”另一个人一般会怎么回答？',
    options: [
        '你又要哦该咯',
        '克哪里咯',
        '下不得地'
    ],
    select: null
}];

//选择答案
$(".topic-list .topic-item").on("click", function () {
    var that = $(this),
        num = parseInt(that.parents('.swiper-slide').attr("data-num")) - 1,
        idx = that.index();
    if (answer[num].select != null) return;
    answer[num].select = idx;
    that.addClass('active');
    setTimeout(function () {
        isCurrent(num, idx, that);
    }, 800);
});
var sPlatId = milo.xss.filter(milo.request('platid'));  //用于存储手机系统  默认1
var sArea = milo.xss.filter(milo.request('areaid'));  //用于存储平台，微信为1，手Q为2，默认为手Q:2
var sPartition = milo.xss.filter(milo.request('partition'));
var sRoleId = milo.xss.filter(milo.request('roleid'));
var temp_appid = milo.xss.filter(milo.request('appid'));
var gameid = milo.xss.filter(milo.request('gameid'));
var itopencodeparam = milo.xss.filter(milo.request('itopencodeparam'));
var os = milo.xss.filter(milo.request('os'));
var channelid = milo.xss.filter(milo.request('channelid'));
var seq = milo.xss.filter(milo.request('seq'));
var ts = milo.xss.filter(milo.request('ts'));
var version = milo.xss.filter(milo.request('version'));
var source = milo.xss.filter(milo.request('source'));
var sig = milo.xss.filter(milo.request('sig'));
var isMsdk = true;
var msdk = milo.xss.filter(milo.request('itopencodeparam'));
var ua = window.navigator.userAgent.toLowerCase();
if(msdk == '' || msdk == undefined || msdk == 'undefined' || temp_appid == '' || sPlatId == '' || sArea == '' || sPartition == '' || sRoleId == ''){
    isMsdk = false;
}

function ismsdk() {
    if (ua.match(/msdk/i) || milo.request('itopencodeparam') != '') {
        return true;
    } else {
        return false;
    }
}
//判断选择正确与否
var current = 0; //回答正确题数
function isCurrent(num, idx, that) {
    that.removeClass('active');
    if (idx == answer[num].current) {
        //正确
        current++;
        that.addClass('current');
    } else {
        that.addClass('fail').parent().find('.topic-item').eq(answer[num].current).addClass('current');
    }

    //已答完所有题目
    if (num + 1 >= answer.length) {
        if (!isMsdk || !ismsdk()) {
            window.location.href = 'result_wqm.html?grade='+ current;
        } else {
            window.location.href = 'result_g.html?grade='+ current + '&platid='+ sPlatId + '&partition=' + sPartition + '&roleid=' + sRoleId
                + '&areaid=' + sArea + '&appid=' + temp_appid + '&os=' + os
                +'&gameid=' + gameid
                +  '&channelid=' + channelid + '&seq=' + seq + '&ts=' + ts
                + '&version=' + version + '&source=' + source + '&sig=' + sig + '&itopencodeparam=' + msdk;
        }
    } else {
        that.parent().next().css('display', 'block'); //放出下一题按钮
    }
}

//播放语音
var voice = $("#voice");
$(".voice-bubble").on("click", function () {
    var that = $(this),
        src = that.attr('data-voice');
    that.parent().addClass('play');
    voice.attr("src", src);
    voice[0].play();
    voice[0].onended = function () {
        that.parent().removeClass('play');
    }
});
$(".voice-icon").on("click", function () {
    $(this).siblings(".voice-bubble").click();
});

//长按翻译成文字
var setTimer = null;
$(".voice-bubble").on("touchstart", function () {
    var that = $(this);
    setTimer = setTimeout(function () {
        that.parent().addClass('active');
    }, 1000);
});
$(".voice-bubble").on("touchend", function () {
    clearTimeout(setTimer);
});