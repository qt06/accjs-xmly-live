// ==UserScript==
// @name  喜马拉雅直播助手无障碍优化
// @namespace    https://accjs.org/
// @version      0.2
// @description  喜马拉雅直播助手无障碍优化脚本
// @author  杨永全
// @updated  2021-11-16 11:51:07
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

function proc() {
let labels = {
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

//buttons
document.querySelectorAll('.window-icon').forEach((el) => {
el.setAttribute('role', 'button');
el.setAttribute('tabindex', '0');
el.setAttribute('aria-label', getLabel(labels, el.getAttribute('class')));
});
document.querySelectorAll('img.title-button, img.button, div.button').forEach((el) => {
el.setAttribute('role', 'button');
el.setAttribute('tabindex', '0');
el.setAttribute('aria-label', getLabel(labels, (el.getAttribute('data-ubt-params') || el.innerText)));
});

//tools
document.querySelectorAll('.operation-item .name').forEach((el) => {
el.setAttribute('role', 'button');
el.setAttribute('tabindex', '0');
});

document.querySelectorAll('textarea.send-input').forEach((el) => {
el.setAttribute('accesskey', 's');
});
document.querySelectorAll('.send-msg img[alt]').forEach((el) => {
el.setAttribute('role', 'button');
el.setAttribute('tabindex', '0');
el.setAttribute('aria-label', '表情');
});

//remove aria-hidden and tabindex attribute from role=dialog
document.querySelectorAll('[role="dialog"] [aria-hidden="true"][tabindex="0"]').forEach((el) => {
el.removeAttribute('tabindex');
el.removeAttribute('aria-hidden');
});
//remove role=dialog and role=document
document.querySelectorAll('[role="dialog"], [role="document"]').forEach((el) => {
el.removeAttribute('role');
});
document.querySelectorAll('.toolbox-button').forEach((el) => {
el.setAttribute('role', 'button');
el.setAttribute('tabindex', '0');
el.setAttribute('aria-label', '设置');
});
document.querySelectorAll('.pk-mode-selection .mode-item .mode-image, .noraml-pk-item').forEach((el) => {
el.setAttribute('role', 'button');
el.setAttribute('tabindex', '0');
el.setAttribute('aria-label', getLabel(labels, el.getAttribute('data-ubt-params')));
});
document.querySelectorAll('iframe').forEach((el) => {
el.setAttribute('tabindex', '-1');
});
document.querySelectorAll('.mute img').forEach((el) => {
el.setAttribute('role', 'button');
el.setAttribute('tabindex', '0');
el.setAttribute('aria-label', '静音');
});
document.querySelectorAll('.live-timer').forEach((el) => {
el.setAttribute('tabindex', '0');
});


//msg 
let els = document.querySelectorAll('.chat-msg-item');
let al = document.querySelector('#al');
let index = els.length - 1;
if(els[index].innerText != al.innerText) {
al.innerText = els[index].innerText;
}
//end proc
}
function dialogFocus() {
els = document.querySelectorAll('.rc-dialog-wrap');
if(els.length) {
_toFocus(els[0]);
}
}
let div = document.createElement('div');
div.id = 'al';
div.setAttribute('tabindex', '0');
div.setAttribute('aria-description', '请用争渡读屏监视这里');
div.innerHTML = '';
document.body.appendChild(div);
document.addEventListener('keydown', function(e) {
        if(!e.key || !e.target) {
            return false;
        }
        let key = e.key.toLowerCase();
let t = e.target;
let xSelector = '.chat-msg-item';
let zSelector = '.room-left-container, .room-center-container, .room-right-container, .pkPanel-container';
/**
let qKey = e.keyCode == 81;
let xKey = e.keyCode == 88;
let zKey = e.keyCode == 90;
let left = e.keyCode == 37;
let right = e.keyCode == 39;
let up = e.keyCode == 38;
let down = e.keyCode == 40;
let f6 = e.keyCode == 117;
*/
let space = e.keyCode == 32;
let enter = e.keyCode == 13;
if(e.altKey && e.shiftKey && key == 'q') {
let div = document.querySelector('#eval-code-container');
if(div !== null) {
document.body.removeChild(div);
}
} else if(e.altKey && key == 'q') {
let div = document.createElement('div');
div.id = 'eval-code-container';
div.innerHTML = '<textarea id="exec-code" name="exec-code" placeholder="输入js代码"></textarea><button type="button" id="exec-btn">执行</button>';
document.body.appendChild(div);
document.querySelector('#exec-btn').addEventListener('click', function(e) {
let code = document.querySelector('#exec-code').value;
DOMEval(code);
}, null);
        } else if (e.altKey && e.shiftKey && key == 'x' || e.altKey && key == 'arrowup') {
          e.preventDefault();
          previousFocus(xSelector);
        } else if (e.altKey && key == 'x' || e.altKey && key == 'arrowdown') {
          e.preventDefault();
          nextFocus(xSelector);
} else if(e.altKey && key == 'arrowleft') {
          e.preventDefault();
els = document.querySelectorAll(xSelector);
if(els.length) {
_toFocus(els[0]);
}
} else if(e.altKey && key == 'arrowright') {
          e.preventDefault();
let els = document.querySelectorAll(xSelector);
if(els.length) {
let index = els.length - 1;
_toFocus(els[index]);
}
         } else         if (e.altKey && e.shiftKey && key == 'z' || e.shiftKey && key == 'f6') {
          e.preventDefault();
          previousFocus(zSelector);
        } else if (e.altKey && key == 'z' || key == 'f6') {
          e.preventDefault();
          nextFocus(zSelector);
} else if(e.altKey && key == 'd') {
          e.preventDefault();
dialogFocus();
} else if(e.altKey && key == 'm') {
let el = document.querySelector('.mute img');
if(el !== null) {
          e.preventDefault();
el.click();
}
} else if(key == 'f1') {
let els = document.querySelectorAll('.operation-item .name');
for(let i = 0; i < els.length; i++) {
if(els[i].innerText.includes('PK')) {
els[i].click();
setTimeout(function() {dialogFocus();}, 200);
break;
}
}
} else if(key == 'f2') {
let els = document.querySelectorAll('.operation-item .name');
for(let i = 0; i < els.length; i++) {
if(els[i].innerText.includes('连线')) {
els[i].click();
setTimeout(function() {dialogFocus();}, 200);
break;
}
}
        } else if(space || enter) {
if(t.matches('[role="checkbox"], [role="button"], [role="link"]')) {
t.click();
}
}
}, null);
amo(proc);
proc();
})();
