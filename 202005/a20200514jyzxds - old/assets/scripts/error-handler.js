// noinspection SpellCheckingInspection
window.addEventListener('unhandledrejection', function (event) {
  var reason = event.reason;
  var code = reason.code;

  if (code === -10402) {
    window.XPASS.signin();
  } else {
    window.errorTips(reason.message);
  }

  /**
   * 忽略允许忽略的代码
   */
  // if (isOKErrorCode(code)) {
  //   event.preventDefault();
  //   return;
  // }

  // if (event && event.reason && isApiResponseShape(event.reason)) {
  //   const { message } = event.reason;
  //   alert(message);
  // }

  // noinspection JSUnresolvedVariable
  if (typeof window.Raven !== 'undefined') {
    event.preventDefault();
    window.Raven.captureException(event.reason, {
      mechanism: {
        type: 'onunhandledrejection',
        handled: false
      }
    });
  } else {
    throw event;
  }
});

window.addEventListener('error', function (event) {
  var error = event.error;


  if (error) {
    var code = error.code;

    /**
     * 忽略允许忽略的代码
     */
    // if (isOKErrorCode(code)) {
    //   event.preventDefault();
    //   return;
    // }

    // noinspection JSUnresolvedVariable

    if (typeof window.Raven !== 'undefined') {
      event.preventDefault();
      window.Raven.captureException(error);
    } else {
      throw event;
    }
  }
});