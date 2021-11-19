// ==UserScript==
// @name  喜马拉雅直播助手无障碍优化
// @namespacehttps://accjs.org/
// @version  0.3
// @description  喜马拉雅直播助手无障碍优化脚本
// @author  杨永全
// @updated  2021-11-19 15:51:07
// @match  https://*.*
// @grant  none
// ==/UserScript==

(function() {
//copy from jQuery source
var preservedScriptAttributes = {
	type: true,
	src: true,
	nonce: true,
	noModule: true
};

function DOMEval( code, node, doc ) {
	doc = doc || document;

	var i, val,
		script = doc.createElement( "script" );

	script.text = code;
	if ( node ) {
		for ( i in preservedScriptAttributes ) {

			// Support: Firefox <=64 - 66+, Edge <=18+
			// Some browsers don't support the "nonce" property on scripts.
			// On the other hand, just using `getAttribute` is not enough as
			// the `nonce` attribute is reset to an empty string whenever it
			// becomes browsing-context connected.
			// See https://github.com/whatwg/html/issues/2369
			// See https://html.spec.whatwg.org/#nonce-attributes
			// The `node.getAttribute` check was added for the sake of
			// `jQuery.globalEval` so that it can fake a nonce-containing node
			// via an object.
			val = node[ i ] || node.getAttribute && node.getAttribute( i );
			if ( val ) {
				script.setAttribute( i, val );
			}
		}
	}
	doc.head.appendChild( script ).parentNode.removeChild( script );
}
function amo(proc, target, options) {
target = target || document.body;
options = options || {
'childList': true,
'subtree': true
};
let mo = new MutationObserver((records) => {proc();});
mo.observe(target, options);
return mo;
}

function isVisible(t) {
return !! (!t.hasAttribute('disabled') && t.getAttribute('aria-hidden') !== 'true' && t.offsetParent !== null);
}

function gi(i, len, op) {
let n = op == '+' ? +1 : -1;
i = i + n;
if (i >= len) {
i = 0;
}
if (i < 0) {
i = len - 1;
}
return i;
}

function _toFocus(el) {
let tagName = el.tagName.toLowerCase();
let tagNames = ['div', 'p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'form', 'img', 'nav', 'header', 'main', 'footer', 'section', 'aside'];
if (tagNames.includes(tagName) || (tagName == 'a' && !el.hasAttribute('href'))) {
if (!el.hasAttribute('tabindex')) {
el.setAttribute('tabindex', '-1');
}
}
el.focus();
}

function toFocus(focusSelector, op) {
let els = Array.prototype.slice.call(document.body.querySelectorAll('*'));
let len = els.length;
let aeIndex = Math.max(0, els.indexOf(document.activeElement));
let i = aeIndex == 0 ? 0 : gi(aeIndex, len, op);
do {
if (els[i].matches(focusSelector) && isVisible(els[i])) {
_toFocus(els[i]);
break;
}
i = gi(i, len, op);
} while ( i != aeIndex );
}

function nextFocus(selector) {
toFocus(selector, '+');
}

function previousFocus(selector) {
toFocus(selector, '-');
}

function getLabel(labels, src) {
let label = '';
if(typeof src != 'string' || src == '') {
return label;
}
label = src;
for(let key in labels) {
if(src.includes(key)) {
label = labels[key];
break;
}
}
return label;
}

function q(selector, ele) {
ele = ele || document.body;
return ele.querySelectorAll(selector);
}

function addClass(el, className) {
if(el && className) {
className.split(' ').forEach((a) => {el.classList.add(a);});
}
}
function tabindex(el, n) {
if(el) {
n = n || '0';
el.setAttribute('tabindex', n);
}
}
function button(el, label) {
if(el) {
el.setAttribute('role', 'button');
tabindex(el);
setLabel(el, label);
addClass(el, 'accjs-has');
}
}

function setLabel(el, label) {
if(el && label) {
el.setAttribute('aria-label', label);
}
}
const labels = {
"window-minimize": "最小化",
"window-maximize": "最大化",
"window-close": "关闭",
"帮助": "帮助",
"更多": "更多",
"分享": "分享",
"设置": "设置",
"返回": "返回",
"connect": "连线",
"普通PK": "普通PK",
"PK排位赛": "PK排位赛",
"随机Pk": "随机Pk",
"指定Pk": "指定Pk",
"pk-rule": "PK规则"
};
function proc() {
//buttons
q('.window-icon:not(.accjs-has)').forEach((el) => {
button(el, getLabel(labels, el.getAttribute('class')));
});

q('img.title-button:not(.accjs-has), img.button:not(.accjs-has), div.button:not(.accjs-has)').forEach((el) => {
button(el, getLabel(labels, (el.getAttribute('data-ubt-params') || el.innerText)));
});

//tools
q('.operation-item .name:not(.accjs-has)').forEach((el) => {
button(el);
});

//send-msg textarea
q('textarea.send-input:not(.accjs-has)').forEach((el) => {
el.setAttribute('accesskey', 's');
addClass(el, 'accjs-has');
});

q('.send-msg img[alt]:not(.accjs-has)').forEach((el) => {
button(el, '表情');
});

q('iframe:not(.accjs-has)').forEach((el) => {
tabindex(el, '-1');
addClass(el, 'accjs-has');
});

q('.mute img:not(.accjs-has)').forEach((el) => {
button(el, '静音');
});

q('.live-timer:not(.accjs-has)').forEach((el) => {
tabindex(el);
addClass(el, 'accjs-has');
});

//dialog
q('.rc-dialog-wrap').forEach((el) => {
//remove aria-hidden and tabindex attribute from role=dialog
q('[role="dialog"] [aria-hidden="true"][tabindex="0"]:not(.accjs-has)', el).forEach((el) => {
el.removeAttribute('tabindex');
el.removeAttribute('aria-hidden');
addClass(el, 'accjs-has');
});
//remove role=dialog and role=document
q('[role="dialog"]:not(.accjs-has), [role="document"]:not(.accjs-has)', el).forEach((el) => {
el.removeAttribute('role');
addClass(el, 'accjs-has');
});
q('.toolbox-button:not(.accjs-has)', el).forEach((el) => {
button(el, '连线设置');
});
q('.pk-mode-selection .mode-item .mode-image:not(.accjs-has), .noraml-pk-item:not(.accjs-has)', el).forEach((el) => {
button(el, getLabel(labels, el.getAttribute('data-ubt-params')));
});
});

//audience notification
audienceNotification();

//gift notification
giftNotification();

//msg  notification
msgNotification();

//end proc
}
function audienceNotification() {
let as = [];
q('.online-list-item .audience-name:not(.accjs-has)').forEach((el) => {
as.push(el.innerText);
addClass(el, 'accjs-has');
});
if(as.length) {
let div = document.createElement('div');
div.classList.add('chat-msg-item');
div.innerHTML = '<div class="system-msg"><div class="system-msg-title">' + as.join('和') + '进入了直播间</div></div>';
let container = document.querySelector('.chat-scroll-content');
if(container) {
container.appendChild(div);
}
}
}
function giftNotification() {
let as = [];
q('.gift-msg-item:not(.accjs-has)').forEach((el) => {
as.push(el.innerText);
addClass(el, 'accjs-has');
});
if(as.length) {
let div = document.createElement('div');
div.classList.add('chat-msg-item');
div.innerHTML = '<div class="system-msg"><div class="system-msg-title">' + as.join('和') + '</div></div>';
let container = document.querySelector('.chat-scroll-content');
if(container) {
container.appendChild(div);
}
}
}
function msgNotification() {
let msg = [];
q('.chat-msg-item:not(.accjs-has)').forEach((el) => {
msg.push(el.innerText);
addClass(el, 'accjs-has');
});
if(msg.length) {
setLabel(document.querySelector('#al'), msg.join(''));
}
}
function elementFocus(selector) {
els = q(selector);
if(els.length) {
_toFocus(els[0]);
}
}
function operation(name) {
let els = q('.operation-item .name');
for(let i = 0; i < els.length; i++) {
if(els[i].innerText.includes(name)) {
els[i].click();
setTimeout(function() {elementFocus('.rc-dialog-wrap');}, 200);
break;
}
}
}
function addDebug() {
if(document.querySelector('#eval-code-container') !== null) {
return false;
}
let div = document.createElement('div');
div.id = 'eval-code-container';
div.innerHTML = '<textarea id="exec-code" name="exec-code" placeholder="输入js代码"></textarea><button type="button" id="exec-btn">执行</button>';
document.body.appendChild(div);
document.querySelector('#exec-btn').addEventListener('click', function(e) {
let code = document.querySelector('#exec-code').value;
DOMEval(code);
}, null);
}
function removeDebug() {
let div = document.querySelector('#eval-code-container');
if(div !== null) {
document.body.removeChild(div);
}
}

function createNotificationElement() {
if(document.querySelector('#al') !== null) {
return false;
}
let div = document.createElement('div');
div.id = 'al';
div.setAttribute('tabindex', '0');
div.setAttribute('aria-description', '请用争渡读屏监视这里');
div.setAttribute('aria-label', '');
div.innerHTML = '';
document.body.appendChild(div);
}
document.addEventListener('keydown', function(e) {
if(!e.key || !e.target) {
return false;
}
let key = e.key.toLowerCase();
let t = e.target;
let xSelector = '.chat-msg-item';
let zSelector = '.room-left-container, .room-center-container, .room-right-container, .pkPanel-container';
let space = e.keyCode == 32;
let enter = e.keyCode == 13;
if(e.altKey && e.shiftKey && key == 'q') {
e.preventDefault();
removeDebug();
} else if(e.altKey && key == 'q') {
e.preventDefault();
addDebug();
} else if (e.altKey && e.shiftKey && key == 'x' || e.altKey && key == 'arrowup') {
e.preventDefault();
previousFocus(xSelector);
} else if (e.altKey && key == 'x' || e.altKey && key == 'arrowdown') {
e.preventDefault();
nextFocus(xSelector);
} else if(e.altKey && key == 'arrowleft') {
e.preventDefault();
els = q(xSelector);
if(els.length) {
_toFocus(els[0]);
}
} else if(e.altKey && key == 'arrowright') {
e.preventDefault();
let els = q(xSelector);
if(els.length) {
let index = els.length - 1;
_toFocus(els[index]);
}
 } else if (e.altKey && e.shiftKey && key == 'z' || e.shiftKey && key == 'f6') {
e.preventDefault();
previousFocus(zSelector);
} else if (e.altKey && key == 'z' || key == 'f6') {
e.preventDefault();
nextFocus(zSelector);
} else if(e.altKey && key == 'd') {
e.preventDefault();
elementFocus('.rc-dialog-wrap');
} else if(e.altKey && key == 'a') {
e.preventDefault();
elementFocus('.online-list-container');
} else if(e.altKey && key == 'g') {
e.preventDefault();
elementFocus('.gift-container');
} else if(e.altKey && key == 'p') {
e.preventDefault();
elementFocus('.pkPanel-container');
} else if(e.altKey && key == 'm') {
let el = document.querySelector('.mute img');
if(el !== null) {
e.preventDefault();
el.click();
}
} else if(key == 'f1') {
e.preventDefault();
operation('PK');
} else if(key == 'f2') {
e.preventDefault();
operation('连线');
} else if((space || enter) && t.matches('[role="checkbox"], [role="button"], [role="link"]')) {
e.preventDefault();
t.click();
}
}, null);
createNotificationElement();
amo(proc);
proc();
//setInterval(function() {proc();}, 1000);
})();
