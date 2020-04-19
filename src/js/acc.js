$(document).ready(function() {
function addDebug() {
$('body').append('<div id="acc_debug_container"><textarea id="jscode" name="jscode"></textarea><button type="button" id="execbtn">exec</button></div>');
$('#execbtn').on('click', function(e) {
var code = $('#jscode').val();
$.globalEval(code);
});
}
function removeDebug() {
$('#execbtn').off();
$('#acc_debug_container').remove();
}

// ximalaya access script
function getAlt(src) {
var alt = '';
var faceData={
"呵呵":"/css/img/face/d_hehe",
"嘻嘻":"/css/img/face/d_xixi",
"哈哈":"/css/img/face/d_haha",
"太开心":"/css/img/face/d_taikaixin",
"亲亲":"/css/img/face/d_qinqin",
"酷":"/css/img/face/d_ku",
"拜拜":"/css/img/face/d_baibai",
"可爱":"/css/img/face/d_keai",
"馋嘴":"/css/img/face/d_chanzui",
"花心":"/css/img/face/d_huaxin",
"爱你":"/css/img/face/d_aini",
"汗":"/css/img/face/d_han",
"鄙视":"/css/img/face/d_bishi",
"怒":"/css/img/face/d_nu",
"失望":"/css/img/face/d_shiwang",
"害羞":"/css/img/face/d_haixiu",
"可怜":"/css/img/face/d_kelian",
"悲伤":"/css/img/face/d_beishang",
"泪":"/css/img/face/d_lei",
"闭嘴":"/css/img/face/d_bizui",
"委屈":"/css/img/face/d_weiqu",
"挖鼻屎":"/css/img/face/d_wabishi",
"思考":"/css/img/face/d_sikao",
"疑问":"/css/img/face/d_yiwen",
"嘘":"/css/img/face/d_xu",
"晕":"/css/img/face/d_yun",
"书呆子":"/css/img/face/d_shudaizi",
"阴险":"/css/img/face/d_yinxian",
"做鬼脸":"/css/img/face/d_zuoguilian",
"黑线":"/css/img/face/d_heixian",
"吃惊":"/css/img/face/d_chijing",
"衰":"/css/img/face/d_shuai",
"怒骂":"/css/img/face/d_numa",
"愤怒":"/css/img/face/d_fennu",
"左哼哼":"/css/img/face/d_zuohengheng",
"右哼哼":"/css/img/face/d_youhengheng",
"哼":"/css/img/face/d_heng",
"懒得理你":"/css/img/face/d_landelini",
"打哈气":"/css/img/face/d_dahaqi",
"钱":"/css/img/face/d_qian",
"偷笑":"/css/img/face/d_touxiao",
"鼓掌":"/css/img/face/d_guzhang",
"生病":"/css/img/face/d_shengbing",
"感冒":"/css/img/face/d_ganmao",
"困":"/css/img/face/d_kun",
"睡觉":"/css/img/face/d_shuijiao",
"抓狂":"/css/img/face/d_zhuakuang",
"吐":"/css/img/face/d_tu",
"顶":"/css/img/face/d_ding",
"男孩儿":"/css/img/face/d_nanhaier",
"女孩儿":"/css/img/face/d_nvhaier",
"兔子":"/css/img/face/d_tuzi",
"熊猫":"/css/img/face/d_xiongmao",
"猪头":"/css/img/face/d_zhutou",
"奥特曼":"/css/img/face/d_aoteman",
"互粉":"/css/img/face/f_hufen",
"神马":"/css/img/face/f_shenma",
"萌":"/css/img/face/f_meng",
"囧":"/css/img/face/f_jiong",
"给力":"/css/img/face/f_geili",
"心":"/css/img/face/l_xin",
"爱心传递":"/css/img/face/l_aixinchuandi",
"伤心":"/css/img/face/l_shangxin",
"帅":"/css/img/face/f_shuai",
"威武":"/css/img/face/f_v5",
"喜":"/css/img/face/f_xi",
"发红包":"/css/img/face/o_fahongbao",
"握手":"/css/img/face/h_woshou",
"耶":"/css/img/face/h_ye",
"赞":"/css/img/face/h_zan",ok:"/css/img/face/h_ok",good:"/css/img/face/h_good",
"弱":"/css/img/face/h_ruo",
"最差":"/css/img/face/h_zuicha",
"来":"/css/img/face/h_lai",
"不要":"/css/img/face/h_buyao",
"拳头":"/css/img/face/h_quantou",haha:"/css/img/face/h_haha",
"太阳":"/css/img/face/w_taiyang",
"月亮":"/css/img/face/w_yueliang",
"蛋糕":"/css/img/face/o_dangao",
"咖啡":"/css/img/face/o_kafei",
"干杯":"/css/img/face/o_ganbei",
"冰棍":"/css/img/face/o_binggun",
"西瓜":"/css/img/face/o_xigua",
"礼物":"/css/img/face/o_liwu",
"蜡烛":"/css/img/face/o_lazhu",
"鲜花":"/css/img/face/w_xianhua",
"落叶":"/css/img/face/w_luoye",
"绿丝带":"/css/img/face/o_lvsidai",
"红丝带":"/css/img/face/o_hongsidai",
"围观":"/css/img/face/o_weiguan",
"雪人":"/css/img/face/w_xueren",
"钟":"/css/img/face/o_zhong",
"微风":"/css/img/face/w_weifeng",
"下雨":"/css/img/face/w_xiayu",
"雪":"/css/img/face/w_xue",
"沙尘暴":"/css/img/face/w_shachenbao",
"浮云":"/css/img/face/w_fuyun",
"足球":"/css/img/face/o_zuqiu",
"手套":"/css/img/face/o_shoutao",
"围脖":"/css/img/face/o_weibo",
"温暖帽子":"/css/img/face/o_wennuanmaozi",
"自行车":"/css/img/face/o_zixingche",
"汽车":"/css/img/face/o_qiche",
"飞机":"/css/img/face/o_feiji",
"手机":"/css/img/face/o_shouji",
"音乐":"/css/img/face/o_yinyue",
"话筒":"/css/img/face/o_huatong",
"照相机":"/css/img/face/o_zhaoxiangji",
"电影":"/css/img/face/o_dianying",
"风扇":"/css/img/face/o_fengshan",
"实习":"/css/img/face/o_shixi"};
if(typeof src != 'string' || src == '') {
return alt;
}
for(var key in faceData) {
if(src.indexOf(faceData[key]) >= 0) {
alt = key;
break;
}
}
return alt;
}
function toFocus(selector, op) {
var els = $(selector);
var len = els.length;
var fs = $(document.activeElement);
var index = fs.length > 0 ?els.index(fs) : -1;
if(op == '+') {
index++;
if(index >= len) {
index = 0;
}
} else if(op == '-') {
index--;
if(index < 0) {
index = len - 1;
}
}
setFocus(els[index]);
/**
$('.chat-item-container .content img', els[index]).attr('alt', function() { return getAlt($(this).attr('src')); });
els[index].setAttribute('tabindex', '-1');
els[index].setAttribute("role", "group");
els[index].setAttribute("aria-label", els[index].innerText.replace('头像', ''));
els[index].focus();
*/
}
function setFocus(el) {
$('.content img', el).attr('alt', function() {return getAlt($(this).attr('src')); });
el.setAttribute("tabindex", "-1");
el.setAttribute("role", "group");
var alts = [];
$('.content img', el).each(function() {
alts.push(this.alt);
});
el.setAttribute('aria-label', el.innerText + alts.join(' '));
el.focus();
}

var acci = -1;
$(document).on('keydown', function(e) {
//var chatItems = $('.chat-item-container .message-user-join-room, .chat-item-container .content, .nobel-join-room-container, .barrage-container .barrage-content');
var chatItems = $('.gift-item-container, .chat-item-container');
var len = chatItems.length;
if(e.altKey && e.keyCode == 37) {
setFocus(chatItems[0]);
acci = 0;
return false;
}
if(e.altKey && e.keyCode == 39) {
setFocus(chatItems[len -1]);
acci = len -1;
return false;

}

if(e.altKey && e.keyCode == 38 && acci > 0) {
acci--;
setFocus(chatItems[acci]);
return false;

}

if(e.altKey && e.keyCode == 40 && acci <= len-2) {
acci++;
setFocus(chatItems[acci]);
return false;

}

});
$(document).on('keydown', function(e) {
var chatSelector = '.chat-item-container';
if(e.altKey && e.shiftKey && e.keyCode == 88) {
toFocus(chatSelector, '-');
return false;
}
if(e.altKey && e.keyCode == 88) {
toFocus(chatSelector, '+');
return false;
}
if(e.altKey && e.shiftKey && e.keyCode == 81) {
removeDebug();
return false;
}
if(e.altKey && e.keyCode == 81) {
addDebug();
return false;
}
});
//f6 切换区域
var acc_hotkey_f6_i = 0;
$(document).on('keydown', function(e) {
// f6, toggle ui-view
if(e.altKey && e.keyCode == 90 || e.which == 117) {
var us = $('.room-left-container, .room-center-container, .pk-voice-container, .room-right-container, .sound-container');
var len = us.length;
if(acc_hotkey_f6_i >= len) {
acc_hotkey_f6_i = 0;
}
us[acc_hotkey_f6_i].focus();
acc_hotkey_f6_i++;
if(acc_hotkey_f6_i >= len) {
acc_hotkey_f6_i = 0;
}
}
});
$('body').append('<div id="msaa_message" role="button" tabindex="0">请用争渡读屏监视这个按钮(消息)</div><div id="msaa_gift" role="button" tabindex="0">请用争渡读屏监视这个按钮(礼物)</div><div id="msaa_barrage" role="button" tabindex="0">请用争渡读屏监视这个按钮(弹幕)</div>');

$(document).on('click', 'span.switch-btn', function() {
$(this).attr('aria-label', function() {return $(this).parents('.switch').text();});
});
$(document).on('keydown', 'span.switch-btn', function(e) {
if(e.keyCode == 32 || e.keyCode == 13) {
$(this).click();
return false;
}
});
$(document).on('keydown', '.sounds-item', function(e) {
if(e.keycode == 32 || e.keyCode == 13) {
$(this).click();
return false;
}
});
$(document).on('keydown', '.modal-header-close-icon', function(e) {
if(e.keyCode == 32 || e.keyCode == 13) {
$(this).click();
return false;
}
});
$(document).on('click', '.start-live, .stop-btn, .save-btn, .btn-group button, .income-ranking, .line button, .avatar, .edit-chat .red-env-btn, .edit-chat .sen-hot-btn, .edit-chat .pk-btn', function(e) {
setTimeout(function() {
$('.modal-container').attr({
"role": "dialog",
"tabindex": "-1"
});
$('.modal-container:last').focus();
}, 500);
});

setInterval(function() {
var gift_html = $('.gift-item-container:last').html();
if(typeof gift_html != 'undefined') {
$('#msaa_gift').html(gift_html.replace('头像', ''));
}
var barrage_html = $('.barrage-item-container:last, .nobel-join-room-container').html();
if(typeof barrage_html != 'undefined') {
$('#msaa_barrage').html(barrage_html.replace('头像', ''));
}
var message_html = $('.chat-item-container:last').html();
if(typeof message_html != 'undefined') {
$('#msaa_message').html(message_html.replace('头像', ''));
}
}, 300);
setInterval(function() {
$('.chat-text-input').attr('accesskey', 's').data('hasacc', 'ok');
$('.time, .people-number, .pk-voice-content .header, .pk-voice-content .user-msg .left, .pk-voice-content .user-msg .right, .pk-voice-content .score').attr('tabindex','0').attr('role', 'text');
$('.carousel-pendant-contaienr').hide();
$('.edit-chat .face-group-btn').attr('role', 'button').attr('tabindex', '0').attr('aria-label', '表情');
$('.edit-chat label').attr('role', 'button').attr('tabindex', '0').attr('aria-label', '图片');
$('.edit-chat .red-env-btn').attr('role', 'button').attr('tabindex','0').attr('aria-label', '红包');
$('.edit-chat .sen-hot-btn').attr('role', 'button').attr('tabindex','0').attr('aria-label', '热门');
$('.edit-chat .pk-btn').attr('role', 'button').attr('tabindex','0').attr('aria-label', 'PK');
$('.sounds-item').attr('tabindex','-1').attr('role', 'button');
$('span.switch-btn').attr('aria-label', function() {return $(this).parents('.switch').text();}).attr('role', 'button');
$('.upload-content .rc-upload').attr('aria-label', '选择封面图');
$('.room-left-container, .room-center-container, .pk-voice-container, .room-right-container, .sound-container').attr('tabindex', '-1').attr('role', 'group');
$('.room-left-container').attr('aria-label', '左侧');
$('.room-center-container').attr('aria-label', '中间');
$('.pk-voice-container').attr('aria-label', 'PK').attr('role', 'group');
$('.room-right-container').attr('aria-label', '右侧');
$('.sound-container').attr('aria-label', '音效');
$('.modal-header-close-icon').attr('aria-label', '关闭').attr('tabindex','0').attr('role','button');
$('.pk-mode-selection .mode-item .mode-image').attr('aria-label', function() {return $(this).parents('.mode-item').text();}).attr('role', 'button').attr('tabindex','0');
$('.chat-item-container .content img, .face-item img').attr('alt', function() { return getAlt($(this).attr('src')); });
$('.album-list .album-container').attr('role','button').attr('tabindex','-1');
}, 1000);
});
