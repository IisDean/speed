//公共逻辑
(function ($, global) {
    global.isInvalid = function(date) {
        return !date || date == '0000-00-00 00:00:00';
    }

    global.isStarted = function(date) {
        if (global.isInvalid(date)) {
            return false;
        }
        return (new Date(date)).getTime() <= (new Date()).getTime();
    }

    global.isClosed = function(date) {
        if (global.isInvalid(date)) {
            return false;
        }
        if (!global.isStarted(date)) {
            return false;
        }
        return ((new Date(date)).getTime() + 3600 * 4 * 1000) < (new Date()).getTime();
    }

    global.isForecast = function(date) {
        if (global.isInvalid(date)) {
            return false;
        }
        var now = (new Date()).getTime();
        var start = (new Date(date)).getTime();
        return (start - 48 * 3600 * 1000) <= now && now <= (start - 15 * 60 * 1000);
    }

    //获取球员热度排行
    global.getHotPlayers = function(gender, page, size) {
        var def = $.Deferred();
        global.amsCfg_658690 = {
            '_everyRead': true,
            "iActivityId": 297493,
            "iFlowId": 658690,
            "sData": {"iGender": gender, "iOffset": (page-1)*size, "iLimit": size},
            "sNeedSubmitPopDiv": true,
            "fFlowSubmitEnd": function (res) {
                if (parseInt(res.iRet, 10)) {
                    return def.reject(res.sMsg);
                }
                return def.resolve(res.jData.jData);
            },
            "fFlowSubmitFailed": function (res) {
                return def.reject(res.sMsg);
            }
        };
        amsSubmit(297493, 658690);
        return def;
    }

    //点赞
    global.like = function (id) {
        global.amsCfg_658600 = {
            '_everyRead': true,
            "iActivityId": 297493,
            "iFlowId": 658600,
            "sData": {"iPlayerId": id},
            "sNeedSubmitPopDiv": true,
            "fFlowSubmitEnd": function (res) {
                if (parseInt(res.iRet, 10)) {
                    return alert(res.sMsg);
                }
                var box = $('[data-liked="' + id + '"]')
                if (box.length) {
                  box.text(parseInt(box.text(), 10) + 1);
                }
                return alert('操作成功');
            },
            "fFlowSubmitFailed": function (res) {
                return alert(res.sMsg);
            }
        };
        need("biz.login",function(LoginManager){
            LoginManager.checkLogin(function() {
                amsSubmit(297493, 658600);
            }, function() {
                LoginManager.login();
            });
        });
    }

    //查询赛事信息
    global.getContests = function () {
        var def = $.Deferred();
        global.amsCfg_657777 = {
            '_everyRead': true,
            "iActivityId": 297493,
            "iFlowId": 657777,
            "sData": {},
            "sNeedSubmitPopDiv": true,
            "fFlowSubmitEnd": function (res) {
                if (parseInt(res.iRet, 10)) {
                    return def.reject(res.sMsg);
                }
                return def.resolve(res.jData.jData);
            },
            "fFlowSubmitFailed": function (res) {
                return def.reject(res.sMsg);
            }
        };
        amsSubmit(297493, 657777);
        return def;
    }

    //查询球队榜
    global.getTeamsBoard = function () {
        var def = $.Deferred();
        global.amsCfg_657845 = {
            '_everyRead': true,
            "iActivityId": 297493,
            "sData": {},
            "iFlowId": 657845,
            "sNeedSubmitPopDiv": true,
            "fFlowSubmitEnd": function (res) {
                if (parseInt(res.iRet, 10)) {
                    return def.reject(res.sMsg);
                }
                return def.resolve(res.jData.jData);
            },
            "fFlowSubmitFailed": function (res) {
                return def.reject(res.sMsg);
            }
        };
        amsSubmit(297493, 657845);
        return def;
    }

    //查询球员榜
    global.getPlayersBoard = function (gender, season, page, size) {
        var def = $.Deferred();
        global.amsCfg_658121 = {
            '_everyRead':true,
            "iActivityId": 297493,
            "sData" : {"iGender": gender, "iSeasonId": season, "iOffset": (page-1)*size, "iLimit": size},
            "iFlowId":    658121,
            "sNeedSubmitPopDiv": true,
            "fFlowSubmitEnd": function(res){
                if (parseInt(res.iRet, 10)) {
                    return def.reject(res.sMsg);
                }
                return def.resolve(res.jData.iTotal ? res.jData.jData : []);
            },
            "fFlowSubmitFailed":function(res){
                return def.reject(res.sMsg);
            }
        };
        amsSubmit(297493, 658121);
        return def;
    }

    //查询球员列表
    global.getTeamPlayers = function (ids) {
        var def = $.Deferred();
        if (!ids.length) {
            def.resolve([]);
            return def; 
        }
        global.amsCfg_658122 = {
            '_everyRead': true,
            "iActivityId": 297493,
            "sData" : {"sTeamIds": ids.join(',')},
            "iFlowId":    658122,
            "sNeedSubmitPopDiv": true,
            "fFlowSubmitEnd": function(res){
                if (parseInt(res.iRet, 10)) {
                    return def.reject(res.sMsg);
                }
                return def.resolve(res.jData.iTotal ? res.jData.jData : []);
            },
            "fFlowSubmitFailed":function(res){
                return def.reject(res.sMsg);
            }
        };
        amsSubmit(297493, 658122);
        return def;
    }

    //查询球队列表
    global.getTeams = function() {
        var def = $.Deferred();
        global.amsCfg_658631 = {
            '_everyRead': true,
            "iActivityId": 297493,
            "sData" : {},
            "iFlowId":    658631,
            "sNeedSubmitPopDiv": true,
            "fFlowSubmitEnd": function(res){
                if (parseInt(res.iRet, 10)) {
                    return def.reject(res.sMsg);
                }
                return def.resolve(res.jData.jData);
            },
            "fFlowSubmitFailed":function(res){
                return def.reject(res.sMsg);
            }
        };
        amsSubmit(297493, 658631);
        return def;
    }

    //查询预测列表
    global.getForecast = function(page, size) {
        var def = $.Deferred();
        global.amsCfg_658886 = {
            '_everyRead': true,
            "iActivityId": 297493,
            "sData" : {iOffset: (page - 1) * size, iLimit: size},
            "iFlowId":    658886,
            "sNeedSubmitPopDiv": true,
            "fFlowSubmitEnd": function(res){
                if (parseInt(res.iRet, 10)) {
                    return def.reject(res.sMsg);
                }
                return def.resolve(res.jData.iTotal ? res.jData.jData : []);
            },
            "fFlowSubmitFailed":function(res){
                return def.reject(res.sMsg);
            }
        };
        amsSubmit(297493, 658886);
        return def;
    }

    //预测
    global.forecast = function(contest, team) {
        global.amsCfg_658973 = {
            '_everyRead': true,
            "iActivityId": 297493,
            "sData" : {iContestId: contest, iTeamId: team},
            "iFlowId":    658973,
            "sNeedSubmitPopDiv": true,
            "fFlowSubmitEnd": function(res){
                if (parseInt(res.iRet, 10)) {
                    return alert(res.sMsg);
                }
                return alert('提交成功！');
            },
            "fFlowSubmitFailed":function(res){
                return alert(res.sMsg);
            }
        };
        amsSubmit(297493, 658973);
    }

    //获取预测榜
    global.getForecastRank = function(page, size) {
        var def = $.Deferred();
        global.amsCfg_658983 = {
            '_everyRead': true,
            "iActivityId": 297493,
            "sData" : {iStart: (page-1)*size+1, iEnd: page*size},
            "iFlowId": 658983,
            "sNeedSubmitPopDiv": true,
            "fFlowSubmitEnd": function(res){
                if (parseInt(res.iRet, 10)) {
                    return def.reject(res.sMsg);
                }
                return def.resolve(res.jData.jData);
            },
            "fFlowSubmitFailed":function(res){
                return def.reject(res.sMsg);
            }
        };
        amsSubmit(297493, 658983);
        return def;
    }

    //查询个人竞猜信息
    global.getUserForecast = function() {
        var def = $.Deferred();
        global.amsCfg_658988 = {
            '_everyRead': true,
            "iActivityId": 297493,
            "iFlowId": 658988,
            "sNeedSubmitPopDiv": true,
            "fFlowSubmitEnd": function(res){
                if (parseInt(res.iRet, 10)) {
                    return def.reject(res.sMsg);
                }
                return def.resolve(res.jData.iTotal ? res.jData.jData[0] : null);
            },
            "fFlowSubmitFailed":function(res){
                return def.reject(res.sMsg);
            }
        };
        amsSubmit(297493, 658988);
        return def;
    }

})(window.jQuery || window.Zepto, window);


if (window.Zepto) {
    ;(function($){
        // Create a collection of callbacks to be fired in a sequence, with configurable behaviour
        // Option flags:
        //   - once: Callbacks fired at most one time.
        //   - memory: Remember the most recent context and arguments
        //   - stopOnFalse: Cease iterating over callback list
        //   - unique: Permit adding at most one instance of the same callback
        $.Callbacks = function(options) {
          options = $.extend({}, options)
      
          var memory, // Last fire value (for non-forgettable lists)
              fired,  // Flag to know if list was already fired
              firing, // Flag to know if list is currently firing
              firingStart, // First callback to fire (used internally by add and fireWith)
              firingLength, // End of the loop when firing
              firingIndex, // Index of currently firing callback (modified by remove if needed)
              list = [], // Actual callback list
              stack = !options.once && [], // Stack of fire calls for repeatable lists
              fire = function(data) {
                memory = options.memory && data
                fired = true
                firingIndex = firingStart || 0
                firingStart = 0
                firingLength = list.length
                firing = true
                for ( ; list && firingIndex < firingLength ; ++firingIndex ) {
                  if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
                    memory = false
                    break
                  }
                }
                firing = false
                if (list) {
                  if (stack) stack.length && fire(stack.shift())
                  else if (memory) list.length = 0
                  else Callbacks.disable()
                }
              },
      
              Callbacks = {
                add: function() {
                  if (list) {
                    var start = list.length,
                        add = function(args) {
                          $.each(args, function(_, arg){
                            if (typeof arg === "function") {
                              if (!options.unique || !Callbacks.has(arg)) list.push(arg)
                            }
                            else if (arg && arg.length && typeof arg !== 'string') add(arg)
                          })
                        }
                    add(arguments)
                    if (firing) firingLength = list.length
                    else if (memory) {
                      firingStart = start
                      fire(memory)
                    }
                  }
                  return this
                },
                remove: function() {
                  if (list) {
                    $.each(arguments, function(_, arg){
                      var index
                      while ((index = $.inArray(arg, list, index)) > -1) {
                        list.splice(index, 1)
                        // Handle firing indexes
                        if (firing) {
                          if (index <= firingLength) --firingLength
                          if (index <= firingIndex) --firingIndex
                        }
                      }
                    })
                  }
                  return this
                },
                has: function(fn) {
                  return !!(list && (fn ? $.inArray(fn, list) > -1 : list.length))
                },
                empty: function() {
                  firingLength = list.length = 0
                  return this
                },
                disable: function() {
                  list = stack = memory = undefined
                  return this
                },
                disabled: function() {
                  return !list
                },
                lock: function() {
                  stack = undefined
                  if (!memory) Callbacks.disable()
                  return this
                },
                locked: function() {
                  return !stack
                },
                fireWith: function(context, args) {
                  if (list && (!fired || stack)) {
                    args = args || []
                    args = [context, args.slice ? args.slice() : args]
                    if (firing) stack.push(args)
                    else fire(args)
                  }
                  return this
                },
                fire: function() {
                  return Callbacks.fireWith(this, arguments)
                },
                fired: function() {
                  return !!fired
                }
              }
      
          return Callbacks
        }
      })(Zepto);

    ;(function($){
        var slice = Array.prototype.slice
      
        function Deferred(func) {
          var tuples = [
                // action, add listener, listener list, final state
                [ "resolve", "done", $.Callbacks({once:1, memory:1}), "resolved" ],
                [ "reject", "fail", $.Callbacks({once:1, memory:1}), "rejected" ],
                [ "notify", "progress", $.Callbacks({memory:1}) ]
              ],
              state = "pending",
              promise = {
                state: function() {
                  return state
                },
                always: function() {
                  deferred.done(arguments).fail(arguments)
                  return this
                },
                then: function(/* fnDone [, fnFailed [, fnProgress]] */) {
                  var fns = arguments
                  return Deferred(function(defer){
                    $.each(tuples, function(i, tuple){
                      var fn = $.isFunction(fns[i]) && fns[i]
                      deferred[tuple[1]](function(){
                        var returned = fn && fn.apply(this, arguments)
                        if (returned && $.isFunction(returned.promise)) {
                          returned.promise()
                            .done(defer.resolve)
                            .fail(defer.reject)
                            .progress(defer.notify)
                        } else {
                          var context = this === promise ? defer.promise() : this,
                              values = fn ? [returned] : arguments
                          defer[tuple[0] + "With"](context, values)
                        }
                      })
                    })
                    fns = null
                  }).promise()
                },
      
                promise: function(obj) {
                  return obj != null ? $.extend( obj, promise ) : promise
                }
              },
              deferred = {}
      
          $.each(tuples, function(i, tuple){
            var list = tuple[2],
                stateString = tuple[3]
      
            promise[tuple[1]] = list.add
      
            if (stateString) {
              list.add(function(){
                state = stateString
              }, tuples[i^1][2].disable, tuples[2][2].lock)
            }
      
            deferred[tuple[0]] = function(){
              deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments)
              return this
            }
            deferred[tuple[0] + "With"] = list.fireWith
          })
      
          promise.promise(deferred)
          if (func) func.call(deferred, deferred)
          return deferred
        }
      
        $.when = function(sub) {
          var resolveValues = slice.call(arguments),
              len = resolveValues.length,
              i = 0,
              remain = len !== 1 || (sub && $.isFunction(sub.promise)) ? len : 0,
              deferred = remain === 1 ? sub : Deferred(),
              progressValues, progressContexts, resolveContexts,
              updateFn = function(i, ctx, val){
                return function(value){
                  ctx[i] = this
                  val[i] = arguments.length > 1 ? slice.call(arguments) : value
                  if (val === progressValues) {
                    deferred.notifyWith(ctx, val)
                  } else if (!(--remain)) {
                    deferred.resolveWith(ctx, val)
                  }
                }
              }
      
          if (len > 1) {
            progressValues = new Array(len)
            progressContexts = new Array(len)
            resolveContexts = new Array(len)
            for ( ; i < len; ++i ) {
              if (resolveValues[i] && $.isFunction(resolveValues[i].promise)) {
                resolveValues[i].promise()
                  .done(updateFn(i, resolveContexts, resolveValues))
                  .fail(deferred.reject)
                  .progress(updateFn(i, progressContexts, progressValues))
              } else {
                --remain
              }
            }
          }
          if (!remain) deferred.resolveWith(resolveContexts, resolveValues)
          return deferred.promise()
        }
      
        $.Deferred = Deferred
      })(Zepto);

}