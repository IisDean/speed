(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.wv = factory());
}(this, function () { 'use strict';

	var CHECK_WECHAT_INSTALLED = 'CHECK_WECHAT_INSTALLED';
	var APP_ORIGINAL_TOKEN = 'APP_ORIGINAL_TOKEN';
	var APP_SHARE_START = 'APP_SHARE_START';
	var APP_SHARE_SUCCESS = 'APP_SHARE_SUCCESS';
	var APP_SHARE_IMAGE = 'APP_SHARE_IMAGE';
	var APP_SHARE_WEBPAGE_DIRECTLY = 'APP_SHARE_WEBPAGE_DIRECTLY';
	var APP_CHANGE_SHARE_PARAM = 'APP_CHANGE_SHARE_PARAM';
	var GET_APP_USER_INFO = 'GET_APP_USER_INFO'; // personId ,passport

	var SJX_GET_TOKEN = 'SJX_GET_TOKEN';
	var SJX_SET_HEADER = 'SJX_SET_HEADER';
	var TINYMCE_EXEC_COMMAND = 'TINYMCE_EXEC_COMMAND';
	var TINYMCE_GET_CONTENT = 'TINYMCE_GET_CONTENT';
	var TINYMCE_ON_FOCUS = 'TINYMCE_ON_FOCUS';
	var TINYMCE_ON_MATCH_STYLE = 'TINYMCE_ON_MATCH_STYLE';
	var TINYMCE_TOOGLE_KEYBOARD = 'TINYMCE_TOOGLE_KEYBOARD';
	var WEB_PAGE_READY = 'WEB_PAGE_READY';
	var CLOSE_WEBPAGE = 'CLOSE_WEBPAGE';
	var ANNUAL_INVENTORY = 'ANNUAL_INVENTORY';
	var ANNUAL_SUMMARY = 'ANNUAL_SUMMARY';
	var LAND_SHARING = 'LAND_SHARING';

	var EventNames = /*#__PURE__*/Object.freeze({
		CHECK_WECHAT_INSTALLED: CHECK_WECHAT_INSTALLED,
		APP_ORIGINAL_TOKEN: APP_ORIGINAL_TOKEN,
		APP_SHARE_START: APP_SHARE_START,
		APP_SHARE_SUCCESS: APP_SHARE_SUCCESS,
		APP_SHARE_IMAGE: APP_SHARE_IMAGE,
		APP_SHARE_WEBPAGE_DIRECTLY: APP_SHARE_WEBPAGE_DIRECTLY,
		APP_CHANGE_SHARE_PARAM: APP_CHANGE_SHARE_PARAM,
		GET_APP_USER_INFO: GET_APP_USER_INFO,
		SJX_GET_TOKEN: SJX_GET_TOKEN,
		SJX_SET_HEADER: SJX_SET_HEADER,
		TINYMCE_EXEC_COMMAND: TINYMCE_EXEC_COMMAND,
		TINYMCE_GET_CONTENT: TINYMCE_GET_CONTENT,
		TINYMCE_ON_FOCUS: TINYMCE_ON_FOCUS,
		TINYMCE_ON_MATCH_STYLE: TINYMCE_ON_MATCH_STYLE,
		TINYMCE_TOOGLE_KEYBOARD: TINYMCE_TOOGLE_KEYBOARD,
		WEB_PAGE_READY: WEB_PAGE_READY,
		CLOSE_WEBPAGE: CLOSE_WEBPAGE,
		ANNUAL_INVENTORY: ANNUAL_INVENTORY,
		ANNUAL_SUMMARY: ANNUAL_SUMMARY,
		LAND_SHARING: LAND_SHARING
	});

	var handlers = {};
	var promises = {};
	var onMessage = function onMessage(message) {
	  if (!message) {
	    return;
	  }

	  try {
	    message = JSON.parse(message);
	    var data = message.data;
	    var id = data.id;
	    var hasPromise = promises.hasOwnProperty(id);

	    if (hasPromise) {
	      promises[id](data.data);

	      if (promises[id].timeRef) {
	        clearTimeout(promises[id].timeRef);
	      }

	      delete promises[id];
	      return;
	    }

	    var handler = handlers[message.eventName];

	    if (handler) {
	      handler.handle({
	        id: id,
	        data: data.data,
	        ts: data.ts
	      });
	    }
	  } catch (e) {
	    console.log(e);
	  }
	};
	var postMessage = function postMessage(scope, eventName, data) {
	  var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
	      _ref$timeout = _ref.timeout,
	      timeout = _ref$timeout === void 0 ? 10000 : _ref$timeout;

	  if (scope && scope.postMessage) {
	    var hasId = data.id;

	    if (!hasId) {
	      data.id = generateUUid();
	      data.ts = Date.now();
	    }

	    var p = new Promise(function (resolve, reject) {
	      resolve.timeRef = setTimeout(function () {
	        reject('timeout');
	        removePromiseById(data.id);
	      }, timeout);
	      promises[data.id] = resolve;
	    });
	    scope.postMessage(JSON.stringify({
	      eventName: eventName,
	      data: data
	    }));

	    if (hasId) {
	      return;
	    }

	    return p;
	  }
	};
	var registerEventHandler = function registerEventHandler(eventName, handle) {
	  var valid = EventNames[eventName] && typeof handle === 'function';

	  if (!valid) {
	    return;
	  }

	  handlers[eventName] = {
	    name: eventName,
	    handle: handle
	  };
	};
	var removeEventHandler = function removeEventHandler(eventName) {
	  if (eventName) {
	    delete handlers[eventName];
	    return true;
	  }

	  return false;
	};
	var removeAllEventHandler = function removeAllEventHandler() {
	  handlers = {};
	};
	var removePromiseById = function removePromiseById(id) {
	  if (id) {
	    delete promises[id];
	    return true;
	  }

	  return false;
	};
	var removeAllPromises = function removeAllPromises() {
	  promises = {};
	};
	function generateUUid() {
	  var s = [];
	  var hexDigits = '0123456789abcdef';

	  for (var i = 0; i < 36; i++) {
	    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	  }

	  s[14] = '4';
	  s[19] = hexDigits.substr(s[19] & 0x3 | 0x8, 1);
	  s[8] = s[13] = s[18] = s[23] = '-';
	  return s.join('');
	}

	var scope; // 因为 ios 和 android onMessage 的方式不一样，一个是基于 window,一个基于 document,lib 会都监听，谁先收到事件 block 另一个

	var mode;
	var postMessage$1 = function postMessage$1(eventName, data, id) {
	  return postMessage(scope, eventName, {
	    id: id,
	    data: data
	  }, {
	    timeout: scope.WVC_OPTIONS.timeout || 10000
	  });
	};
	var init = function init(wv) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  if (wv && wv.ReactNativeWebView) {
	    scope = wv.ReactNativeWebView;
	  } else {
	    scope = wv;
	  }

	  scope.WVC_OPTIONS = options;
	  wv.addEventListener('message', function (evt) {
	    if (!mode || mode === 'window') {
	      mode = 'window';
	      onMessage(evt && evt.data);
	    }
	  });
	  wv.document.addEventListener('message', function (evt) {
	    if (!mode || mode === 'document') {
	      mode = 'document';
	      onMessage(evt && evt.data);
	    }
	  });
	};
	var removeListener = function removeListener(name) {
	  return removeEventHandler(name);
	};
	var register = registerEventHandler;

	var web = /*#__PURE__*/Object.freeze({
		postMessage: postMessage$1,
		init: init,
		removeListener: removeListener,
		register: register
	});

	var webview;
	var init$1 = function init(wv) {
	  clear();

	  if (wv && wv.webView) {
	    webview = wv.webView;
	  } else {
	    webview = wv;
	  }
	};
	var postMessage$2 = function postMessage$1(eventName, data, id) {
	  if (webview && webview.postMessage) {
	    return postMessage(webview, eventName, {
	      id: id,
	      data: data
	    });
	  }
	};
	function onMessage$1(appEvent) {
	  var message = appEvent && appEvent.nativeEvent && appEvent.nativeEvent.data;
	  onMessage(message);
	}
	var clear = function clear() {
	  webview = null;
	  removeAllEventHandler();
	  removeAllPromises();
	};
	var removeListener$1 = function removeListener(name) {
	  return removeEventHandler(name);
	};
	var register$1 = registerEventHandler;

	var app = /*#__PURE__*/Object.freeze({
		init: init$1,
		postMessage: postMessage$2,
		onMessage: onMessage$1,
		clear: clear,
		removeListener: removeListener$1,
		register: register$1
	});

	var index = {
	  EventNames: EventNames,
	  web: web,
	  app: app
	};

	return index;

}));
//# sourceMappingURL=wv.umd.js.map
