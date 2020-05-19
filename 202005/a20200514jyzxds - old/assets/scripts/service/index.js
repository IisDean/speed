var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (root, factory) {
  if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && (typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object') module.exports = factory();else if (typeof define === 'function' && define.amd) define("serviceFactory", [], factory);else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') exports["serviceFactory"] = factory();else root["serviceFactory"] = factory();
})(this, function () {
  return function (request, reject, rootAddress) {
    var service = {};
    /**
    获取活动时间配置/登录玩家作品通知状态
    请求方法: GET, POST
    请求示例: http://<domain>/jx3/tongren190401/get_config
    响应示例: 
    {
      "code": 1,
      "status": 1,
      "msg": "",
      "message": "",
      "data": {
          "config": {
              "activity_begin_time": 1554566400,
              "activity_end_time": 1555948800,
              "like_end_time": false,
              "prize_start_time": 1554825600,
              "prize_end_time": 1556121600
          },
          "status": {
              "notice": [
                  14,
                  28
              ]
          },
          "session_id": "ed8fobq1OnW407NCyJ5TU2EC0bXR0BICrVsPgBcq",
          "request_id": "833b0dd7e7e877118fb1126d62d31b1dacc0bec8"
      }
    }
    */
    service.getConfig = function () {
      return request.jsonp(rootAddress + '/jx3/tongren190401/get_config', {}).then(function (response) {
        if (response.status === 1 /* 成功 */) {
            /**
            {
              "data{}": {
                "config": "活动时间设置 (时间戳格式)",
                "status": "当前登录账户是否存在作品状态变更"
              },
              "data{}.config{}": {
                "activity_begin_time": "活动开始时间 (作品上传开始时间)",
                "activity_end_time": "活动结束时间 (作品上传截止时间)",
                "like_end_time": "点赞截止时间",
                "prize_end_time": "获奖作品领奖截止时间",
                "prize_start_time": "获奖作品显示时间"
              },
              "data{}.status{}": {
                "notice": "需要通知的作品id数组 没有则为空"
              }
            }
            		*/
            return response.data;
          }
        /**
        [{
          "code": "0",
          "description": "系统错误"
        }, {
          "code": "-10151",
          "description": "活动未开启"
        }, {
          "code": "-10152",
          "description": "活动配置错误"
        }, {
          "code": "-10153",
          "description": "活动未开始"
        }, {
          "code": "-10154",
          "description": "活动已结束"
        }, {
          "code": "-10402",
          "description": "请先登录"
        }]
        		*/
        return reject(response);
      });
    };
    /**
    获取上传图片的token
    请求方法: GET, POST
    请求示例: http://<domain>/jx3/tongren190401/get_upload_token?id=1&file_type=1
    响应示例: 
    {
      "code": 1,
      "status": 1,
      "msg": "",
      "message": "",
      "data": {
          "action": "http://up.qiniup.com",
          "input_file_name": "file",
          "input_values": {
              "token": "AUsWmwjd0VwZJP8mIH7jlMlR0Iy-YwqRGivBrYfp:nrbcEVa-hqcLRgxZyAAHeWGHQxo=:eyJyZXR1cm5VcmwiOiIiLCJyZXR1cm5Cb2R5Ijoie30iLCJjYWxsYmFja0hvc3QiOiIiLCJjYWxsYmFja1VybCI6Imh0dHA6XC9cL3Rlc3Qud3MueG95by5jb21cL2NvcmVcL3VwbG9hZFwvcWluaXVfY2FsbGJhY2siLCJjYWxsYmFja0JvZHkiOiJidW5kbGU9angzenQmZmlsZV9pZD05Y2UyOTg2MTU1NTI4MTgwMDIyZjMwODcwOWIzYzI3MCZmaWxlX25hbWU9JChmbmFtZSkmZmlsZV9zaXplPSQoZnNpemUpJmZpbGVfbWltZV90eXBlPSQobWltZVR5cGUpJmZpbGVfaGFzaD0kKGV0YWcpIiwiaW5zZXJ0T25seSI6MSwiZGV0ZWN0TWltZSI6MSwiZnNpemVMaW1pdCI6MTA0ODU3NjAsIm1pbWVMaW1pdCI6ImltYWdlXC9qcGVnO2ltYWdlXC9wbmciLCJzY29wZSI6Inhzamd3Omp4M3p0XC9qeDNcL3RvbmdyZW4xOTA0MDFcLzBcLzFcLzFcL2U0XC80OVwvZTQ0OTY0M2JmZWUxODE0YTllZjI4MzFiZjAyMTFkY2QiLCJkZWFkbGluZSI6MTU1NDk1MDEyMH0=",
              "key": "jx3zt/jx3/tongren190401/0/1/1/e4/49/e449643bfee1814a9ef2831bf0211dcd",
              "domain": "http://7xq4h6.com1.z0.glb.clouddn.com"
          },
          "session_id": "ugPTcyeFXyj4ELTFyCYQWuPOMR7RXGJuFDL59W1K",
          "request_id": "d272b807c466338139af1ac67954b27d5c443713"
      }
    }
    */
    service.getUploadToken = function (id, file_type) {
      return request.jsonp(rootAddress + '/jx3/tongren190401/get_upload_token', {
        id: id /*  作品ID(作品+封面+附件)（1～23） */
        , file_type: file_type /*  文件类型（1封面，2作品，3附件，4证据） */
      }).then(function (response) {
        if (response.status === 1 /* 成功 */) {
            /**
            {
              "data{}": {
                "action": "上传地址",
                "input_file_name": "上传input:file的name名称",
                "input_values": "上传表单项"
              },
              "data{}.input_values{}": {
                "domain": "空间域名",
                "key": "上传文件KEY",
                "token": "上传文件TOKEN"
              }
            }
            		*/
            return response.data;
          }
        /**
        [{
          "code": "0",
          "description": "系统错误"
        }, {
          "code": "-10151",
          "description": "活动未开启"
        }, {
          "code": "-10152",
          "description": "活动配置错误"
        }, {
          "code": "-10153",
          "description": "活动未开始"
        }, {
          "code": "-10154",
          "description": "活动已结束"
        }, {
          "code": "-10201",
          "description": "系统处理中..."
        }, {
          "code": "-10402",
          "description": "请先登录"
        }, {
          "code": "-20101",
          "description": "上传图片id不合法"
        }, {
          "code": "-20102",
          "description": "上传文件类型不合法"
        }, {
          "code": "-20104",
          "description": "作品数量超出限制"
        }]
        		*/
        return reject(response);
      });
    };
    /**
    作品上传
    请求方法: GET, POST
    请求示例:
     http://<domain>/jx3/tongren190401/submit_works?works_type=9&works_status=1&works_name=测试&author=测试&idea=test&
     upload_items[0][type]=1&
     upload_items[0][file_id]=9ba9c096fbdc598971e0dfe745c9d778&
     upload_items[1][type]=2&
     upload_items[1][file_id]=9ba9c096fbdc598971e0dfe745c9d778&
     upload_items[2][type]=2&upload_items[2][file_id]=9ba9c096fbdc598971e0dfe745c9d778&
     upload_items[3][type]=3&upload_items[3][file_id]=9ba9c096fbdc598971e0dfe745c9d778&
     works_url=http://www.baidu.com&phone=15814871774&qq=1213432133
    响应示例: 
    {
      "code": 1,
      "status": 1,
      "msg": "",
      "message": "",
      "data": {
          "session_id": "ugPTcyeFXyj4ELTFyCYQWuPOMR7RXGJuFDL59W1K",
          "request_id": "a21c2ff6efd00f3defe28c8e433c5c7968cd0275"
      }
    }
    */
    service.submitWorks = function (params) {
      return request.jsonp(rootAddress + '/jx3/tongren190401/submit_works', _extends({}, params)).then(function (response) {
        if (response.status === 1 /* 成功 */) {
            /**
            {
              "data{}": []
            }
            		*/
            return response.data;
          }
        /**
        [{
          "code": "0",
          "description": "系统错误"
        }, {
          "code": "-10101",
          "description": "手机号码为空"
        }, {
          "code": "-10102",
          "description": "手机号码格式错误"
        }, {
          "code": "-10105",
          "description": "QQ号码为空"
        }, {
          "code": "-10106",
          "description": "QQ号码格式错误"
        }, {
          "code": "-10151",
          "description": "活动未开启"
        }, {
          "code": "-10152",
          "description": "活动配置错误"
        }, {
          "code": "-10153",
          "description": "活动未开始"
        }, {
          "code": "-10154",
          "description": "活动已结束"
        }, {
          "code": "-10201",
          "description": "系统处理中..."
        }, {
          "code": "-10402",
          "description": "请先登录"
        }, {
          "code": "-20103",
          "description": "封面数量超出限制"
        }, {
          "code": "-20104",
          "description": "作品数量超出限制"
        }, {
          "code": "-20105",
          "description": "数据文件数量超出限制"
        }, {
          "code": "-20106",
          "description": "请选择作品类型"
        }, {
          "code": "-20107",
          "description": "请选择作品状态"
        }, {
          "code": "-20108",
          "description": "请输入作品名称"
        }, {
          "code": "-20109",
          "description": "请输入作者名"
        }, {
          "code": "-20201",
          "description": "请输入设计理念"
        }, {
          "code": "-20202",
          "description": "请上传作品"
        }, {
          "code": "-20203",
          "description": "作品类型不合法"
        }, {
          "code": "-20204",
          "description": "超过作品上传最大数"
        }, {
          "code": "-20205",
          "description": "超出作品名称字数限制"
        }, {
          "code": "-20206",
          "description": "超出作者名称字数限制"
        }, {
          "code": "-20207",
          "description": "超出最大理念字数限制"
        }, {
          "code": "-20208",
          "description": "超出最大作品地址字数限制"
        }, {
          "code": "-20209",
          "description": "upload_items参数不合法"
        }, {
          "code": "-20301",
          "description": "请上传作品"
        }, {
          "code": "-20302",
          "description": "请上传封面"
        }]
        		*/
        return reject(response);
      });
    };
    /**
    获取作品展示列表
    请求方法: GET, POST
    请求示例: http://<domain>/jx3/tongren190401/get_works_list?works_type=1&page_num=1&page_size=3&order_by=2&change=1
    响应示例: 
    {
      "code": 1,
      "status": 1,
      "msg": "",
      "message": "",
      "data": {
          "total": 5,
          "list": [
              {
                  "id": 12,
                  "account": "15814871772",
                  "name": "测试4",
                  "idea": "test",
                  "author": "测试",
                  "works_type": "1",
                  "like": "55",
                  "create_time": "2019-04-09 15:51:32",
                  "pic_link": ""
              },
              {
                  "id": 10,
                  "account": "15814871772",
                  "name": "测试2",
                  "idea": "test",
                  "author": "测试",
                  "works_type": "1",
                  "like": "25",
                  "create_time": "2019-04-09 15:20:18",
                  "pic_link": ""
              },
              {
                  "id": 11,
                  "account": "15814871772",
                  "name": "测试3",
                  "idea": "test",
                  "author": "测试",
                  "works_type": "1",
                  "like": "10",
                  "create_time": "2019-04-09 15:51:11",
                  "pic_link": ""
              }
          ],
          "session_id": "ugPTcyeFXyj4ELTFyCYQWuPOMR7RXGJuFDL59W1K",
          "request_id": "da0f28f047b7bfa0fbe2fc2c46b58fc9ade1a6ec"
      }
    }
    */
    service.getWorksList = function (params) {
      return request.jsonp(rootAddress + '/jx3/tongren190401/get_works_list', _extends({}, params)).then(function (response) {
        if (response.status === 1 /* 成功 */) {
            /**
            {
              "data{}": {
                "list": "作品集列表",
                "total": "总条数"
              },
              "data{}.list[]": {
                "account": "账号",
                "author": "作者",
                "create_time": "创建时间",
                "id": "编号",
                "idea": "作品理念",
                "like": "点赞数",
                "name": "作品名称",
                "pic_link": "封面图片地址",
                "works_type": "作品类别 （1服饰 2日用家居 3文创用品 4手办模具 5毛绒公仔 6箱包收纳 7首饰类 8宠物类 9其他类）"
              }
            }
            		*/
            return response.data;
          }
        /**
        [{
          "code": "0",
          "description": "系统错误"
        }, {
          "code": "-10151",
          "description": "活动未开启"
        }, {
          "code": "-10152",
          "description": "活动配置错误"
        }, {
          "code": "-10153",
          "description": "活动未开始"
        }, {
          "code": "-10154",
          "description": "活动已结束"
        }, {
          "code": "-20203",
          "description": "作品类型不合法"
        }]
        		*/
        return reject(response);
      });
    };
    /**
    搜索作品集
    请求方法: GET, POST
    请求示例: http://<domain>/jx3/tongren190401/search_works?order_by=1&page_num=1&page_size=3&keyword=测试
    响应示例: 
    {
      "code": 1,
      "status": 1,
      "msg": "",
      "message": "",
      "data": {
          "total": 11,
          "search_list": [
              {
                  "id": 24,
                  "account": "15814871772",
                  "name": "测试",
                  "author": "测试",
                  "works_type": "9",
                  "like": "1",
                  "create_time": "2019-04-09 21:32:36",
                  "pic_link": ""
              },
              {
                  "id": 22,
                  "account": "15814871772",
                  "name": "测试",
                  "author": "测试",
                  "works_type": "9",
                  "like": "1",
                  "create_time": "2019-04-09 21:05:40",
                  "pic_link": ""
              },
              {
                  "id": 20,
                  "account": "15814871772",
                  "name": "测试",
                  "author": "测试",
                  "works_type": "9",
                  "like": "1",
                  "create_time": "2019-04-09 20:57:16",
                  "pic_link": ""
              }
          ],
          "session_id": "ugPTcyeFXyj4ELTFyCYQWuPOMR7RXGJuFDL59W1K",
          "request_id": "e0c345ae79e3abb694d04b166c76951ec0469061"
      }
    }
    */
    service.searchWorks = function (params) {
      return request.jsonp(rootAddress + '/jx3/tongren190401/search_works', _extends({}, params)).then(function (response) {
        if (response.status === 1 /* 成功 */) {
            /**
            {
              "data{}": {
                "search_list": "搜索结果列表",
                "total": "搜索结果总条数"
              },
              "data{}.search_list[]": {
                "account": "账号",
                "author": "作者",
                "create_time": "创建时间",
                "id": "作品编号",
                "like": "点赞数",
                "name": "作品名称",
                "pic_link": "封面图片链接",
                "works_type": "作品类别 （1服饰 2日用家居 3文创用品 4手办模具 5毛绒公仔 6箱包收纳 7首饰类 8宠物类 9其他类）"
              }
            }
            		*/
            return response.data;
          }
        /**
        [{
          "code": "0",
          "description": "系统错误"
        }, {
          "code": "-10151",
          "description": "活动未开启"
        }, {
          "code": "-10152",
          "description": "活动配置错误"
        }, {
          "code": "-10153",
          "description": "活动未开始"
        }, {
          "code": "-10154",
          "description": "活动已结束"
        }]
        		*/
        return reject(response);
      });
    };
    /**
    点赞
    请求方法: GET, POST
    请求示例: http://<domain>/jx3/tongren190401/like?works_id=21
    响应示例: 
    {
      "code": 1,
      "status": 1,
      "msg": "",
      "message": "",
      "data": {
          "session_id": "ugPTcyeFXyj4ELTFyCYQWuPOMR7RXGJuFDL59W1K",
          "request_id": "3943b663c328ce3e94d3cf231d09ae2a4b8d2b48"
      }
    }
    */
    service.like = function (param) {
      return request.jsonp(rootAddress + '/jx3/tongren190401/like', _extends({}, param)).then(function (response) {
        if (response.status === 1 /* 成功 */) {
            /**
            {
              "data{}": []
            }
            		*/
            return response.data;
          }
        /**
        [{
          "code": "0",
          "description": "系统错误"
        }, {
          "code": "-10151",
          "description": "活动未开启"
        }, {
          "code": "-10152",
          "description": "活动配置错误"
        }, {
          "code": "-10153",
          "description": "活动未开始"
        }, {
          "code": "-10154",
          "description": "活动已结束"
        }, {
          "code": "-10201",
          "description": "系统处理中..."
        }, {
          "code": "-10402",
          "description": "请先登录"
        }, {
          "code": "-20303",
          "description": "作品id为空"
        }, {
          "code": "-20304",
          "description": "作品不存在"
        }, {
          "code": "-20305",
          "description": "您今天的点赞次数(10次)已经用完"
        }]
        		*/
        return reject(response);
      });
    };
    /**
    根据作品id获取作品详细信息
    请求方法: GET, POST
    请求示例: http://<domain>/jx3/tongren190401/get_works_by_id?works_id=21
    响应示例: 
    {
      "code": 1,
      "status": 1,
      "msg": "",
      "message": "",
      "data": {
          "works_list": [
              {
                  "id": 15,
                  "name": "测试",
                  "author": "测试",
                  "idea": "test",
                  "like": "0",
                  "reason": "测试多个不通过，填写理由",
                  "create_time": "2019-04-09 19:45:19",
                  "pic_link": ""
              }
          ],
          "session_id": "NNEbsTLY9lVp40ni3Nyxm0x0CyUAgtmRz0XBK4N6",
          "request_id": "120b15ffa106fcbab81e533417c8031a4b661e18"
      }
    }
    */
    service.getWorksById = function (params) {
      return request.jsonp(rootAddress + '/jx3/tongren190401/get_works_by_id', _extends({}, params)).then(function (response) {
        if (response.status === 1 /* 成功 */) {
            /**
            {
              "data{}": {
                "works_list": "作品列表"
              },
              "data{}.works_list[]": {
                "author": "作者",
                "create_time": "创建时间",
                "id": "作品编号",
                "idea": "作品理念",
                "like": "点赞数",
                "name": "作品名称",
                "pic_link": "图片地址",
                "reason": "审核理由"
              }
            }
            		*/
            return response.data;
          }
        /**
        [{
          "code": "0",
          "description": "系统错误"
        }, {
          "code": "-10151",
          "description": "活动未开启"
        }, {
          "code": "-10152",
          "description": "活动配置错误"
        }, {
          "code": "-10153",
          "description": "活动未开始"
        }, {
          "code": "-10154",
          "description": "活动已结束"
        }, {
          "code": "-20303",
          "description": "作品id为空"
        }, {
          "code": "-20304",
          "description": "作品不存在"
        }]
        		*/
        return reject(response);
      });
    };
    /**
    提交举报
    请求方法: GET, POST
    请求示例: http://<domain>/jx3/tongren190401/submit_report?works_id=10&reason=测试举报原因&proof_file_ids[0]=9ba9c096fbdc598971e0dfe745c9d778&proof_file_ids[1]=9ba9c096fbdc598971e0dfe745c9d778&name=测试举报&phone=12345678&qq=12345
    响应示例: 
    {
      "code": 1,
      "status": 1,
      "msg": "",
      "message": "",
      "data": {
          "session_id": "ugPTcyeFXyj4ELTFyCYQWuPOMR7RXGJuFDL59W1K",
          "request_id": "8af09ddd2a54cec388810f9d167cdb06b0755aaa"
      }
    }
    */
    service.submitReport = function (params) {
      return request.jsonp(rootAddress + '/jx3/tongren190401/submit_report', _extends({}, params)).then(function (response) {
        if (response.status === 1 /* 成功 */) {
            /**
            {
              "data{}": []
            }
            		*/
            return response.data;
          }
        /**
        [{
          "code": "0",
          "description": "系统错误"
        }, {
          "code": "-10105",
          "description": "QQ号码为空"
        }, {
          "code": "-10106",
          "description": "QQ号码格式错误"
        }, {
          "code": "-10151",
          "description": "活动未开启"
        }, {
          "code": "-10152",
          "description": "活动配置错误"
        }, {
          "code": "-10153",
          "description": "活动未开始"
        }, {
          "code": "-10154",
          "description": "活动已结束"
        }, {
          "code": "-10402",
          "description": "请先登录"
        }, {
          "code": "-20303",
          "description": "作品id为空"
        }, {
          "code": "-20304",
          "description": "作品不存在"
        }, {
          "code": "-20306",
          "description": "证据PROOF_ITEMS参数不合法"
        }, {
          "code": "-20307",
          "description": "超过证据上传最大限制"
        }, {
          "code": "-20308",
          "description": "举报原因参数缺失"
        }, {
          "code": "-20309",
          "description": "证据PROOF_ITEMS参数缺失"
        }, {
          "code": "-20401",
          "description": "用户姓名信息缺失"
        }, {
          "code": "-20402",
          "description": "用户手机信息缺失"
        }, {
          "code": "-20403",
          "description": "用户QQ信息缺失"
        }]
        		*/
        return reject(response);
      });
    };
    /**
    删除作品
    请求方法: GET, POST
    请求示例: http://<domain>/jx3/tongren190401/delete_my_works?works_id=29
    响应示例: 
    {
      "code": 1,
      "status": 1,
      "msg": "",
      "message": "",
      "data": {
          "session_id": "pz0yO8l3nJNpORtgOPJjoF0ZhCSHKcVwHki4m0Cw",
          "request_id": "ce5818f86a210bfb894df8b2f1acb0b3a83dec3e"
      }
    }
    */
    service.deleteMyWorks = function (works_id) {
      return request.jsonp(rootAddress + '/jx3/tongren190401/delete_my_works', {
        works_id: works_id /*  作品id */
      }).then(function (response) {
        if (response.status === 1 /* 成功 */) {
            /**
            {
              "data{}": []
            }
            		*/
            return response.data;
          }
        /**
        [{
          "code": "0",
          "description": "系统错误"
        }, {
          "code": "-10151",
          "description": "活动未开启"
        }, {
          "code": "-10152",
          "description": "活动配置错误"
        }, {
          "code": "-10153",
          "description": "活动未开始"
        }, {
          "code": "-10154",
          "description": "活动已结束"
        }, {
          "code": "-10201",
          "description": "系统处理中..."
        }, {
          "code": "-10402",
          "description": "请先登录"
        }, {
          "code": "-20303",
          "description": "作品id为空"
        }, {
          "code": "-20304",
          "description": "作品不存在"
        }]
        		*/
        return reject(response);
      });
    };
    /**
    获奖作品列表
    请求方法: GET, POST
    请求示例: http://<domain>/jx3/tongren190401/get_prize_list?award_type=0&page_num=1&page_size=2
    响应示例: 
    {
      "code": 1,
      "status": 1,
      "msg": "",
      "message": "",
      "data": {
          "prize_list": [
              {
                  "id": 24,
                  "account": "15814871772",
                  "name": "测试",
                  "author": "测试",
                  "works_type": "9",
                  "like": "1",
                  "status": "1",
                  "award_type": "未获奖",
                  "create_time": "2019-04-09 21:32:36",
                  "pic_link": ""
              },
              {
                  "id": 22,
                  "account": "15814871772",
                  "name": "测试",
                  "author": "测试",
                  "works_type": "9",
                  "like": "1",
                  "status": "1",
                  "award_type": "万众瞩目",
                  "create_time": "2019-04-09 21:05:40",
                  "pic_link": ""
              }
          ],
          "session_id": "qqxK6MKPwRXEI6A8lqkSvXOKGYOxsOwfwqMwSgXU",
          "request_id": "491c911ad5d78af4a39db1078ddbd0cdcdbaf350"
      }
    }
    */
    service.getPrizeList = function (award_type, page_num, page_size) {
      return request.jsonp(rootAddress + '/jx3/tongren190401/get_prize_list', {
        award_type: award_type /*  获奖类型（可空）0所有 1一代宗师 2名满江湖 3锋芒毕露 4脱颖而出 5万众瞩目 */
        , page_num: page_num /*  当前页(默认1) */
        , page_size: page_size /*  页大小(最大不超过100) */
      }).then(function (response) {
        if (response.status === 1 /* 成功 */) {
            /**
            {
              "data{}": {
                "prize_list": "返回字段说明"
              },
              "data{}.prize_list[]": {
                "account": "账号",
                "author": "作者",
                "award_type": "获奖类型 1一代宗师 2名满江湖 3锋芒毕露 4脱颖而出 5万众瞩目",
                "create_time": "创建时间",
                "id": "作品编号",
                "like": "点赞数",
                "name": "作品名称",
                "pic_link": "作品图片地址",
                "status": "审核状态",
                "works_type": "作品类别 （1服饰 2日用家居 3文创用品 4手办模具 5毛绒公仔 6箱包收纳 7首饰类 8宠物类 9其他类）"
              }
            }
            		*/
            return response.data;
          }
        /**
        [{
          "code": "0",
          "description": "系统错误"
        }, {
          "code": "-10151",
          "description": "活动未开启"
        }, {
          "code": "-10152",
          "description": "活动配置错误"
        }, {
          "code": "-10153",
          "description": "活动未开始"
        }, {
          "code": "-10154",
          "description": "活动已结束"
        }, {
          "code": "-20504",
          "description": "缺少获奖作品显示开始时间配置"
        }, {
          "code": "-20505",
          "description": "未到获奖作品开放时间"
        }]
        		*/
        return reject(response);
      });
    };
    /**
    领取实物奖
    请求方法: GET, POST
    请求示例: http://<domain>/jx3/tongren190401/take_physical_gift?works_id=11&recipient=啊啊啊&phone=15814817177&province=广东&city=珠海&address=香洲唐家
    响应示例: 
    {
      "code": 1,
      "status": 1,
      "msg": "",
      "message": "",
      "data": {
          "session_id": "2HEKuRlPwZuxVFafjgxAvEdeLw84EaGMlmTyX6B1",
          "request_id": "703d837c43e04d9e691cacd23a87d1450629d18c"
      }
    }
    */
    service.takePhysicalGift = function (works_id, recipient, phone, province, city, address) {
      return request.jsonp(rootAddress + '/jx3/tongren190401/take_physical_gift', {
        works_id: works_id /*  作品id */
        , recipient: recipient /*  收件人 */
        , phone: phone /*  手机 */
        , province: province /*  省份 */
        , city: city /*  城市 */
        , address: address /*  详细地址 */
      }).then(function (response) {
        if (response.status === 1 /* 成功 */) {
            /**
            {
              "data{}": []
            }
            		*/
            return response.data;
          }
        /**
        [{
          "code": "0",
          "description": "系统错误"
        }, {
          "code": "-10101",
          "description": "手机号码为空"
        }, {
          "code": "-10102",
          "description": "手机号码格式错误"
        }, {
          "code": "-10151",
          "description": "活动未开启"
        }, {
          "code": "-10152",
          "description": "活动配置错误"
        }, {
          "code": "-10153",
          "description": "活动未开始"
        }, {
          "code": "-10154",
          "description": "活动已结束"
        }, {
          "code": "-10201",
          "description": "系统处理中..."
        }, {
          "code": "-10402",
          "description": "请先登录"
        }, {
          "code": "-20303",
          "description": "作品id为空"
        }, {
          "code": "-20304",
          "description": "作品不存在"
        }, {
          "code": "-20402",
          "description": "用户手机信息缺失"
        }, {
          "code": "-20406",
          "description": "收件人参数缺失"
        }, {
          "code": "-20407",
          "description": "省份参数缺失"
        }, {
          "code": "-20408",
          "description": "城市参数缺失"
        }, {
          "code": "-20409",
          "description": "详细地址参数缺失"
        }, {
          "code": "-20501",
          "description": "详细地址超出50字限制"
        }, {
          "code": "-20502",
          "description": "已经领取过奖品"
        }, {
          "code": "-20503",
          "description": "该作品没有获得对应奖项"
        }, {
          "code": "-20504",
          "description": "缺少获奖作品显示开始时间配置"
        }, {
          "code": "-20505",
          "description": "未到获奖作品开放时间"
        }, {
          "code": "-20506",
          "description": "缺少获奖作品领奖截止时间配置"
        }, {
          "code": "-20507",
          "description": "已过获奖作品领奖截止时间"
        }]
        		*/
        return reject(response);
      });
    };
    /**
    上传图片接口  (玩家身份证)
    请求方法: GET, POST
    请求示例: http://<domain>/jx3/tongren190401/upload_pic?pic=1
    响应示例: 
    eg:
    {
          status: 1,
          message: "",
          data: {
              "pic_info" : {
                 "pic_id" : 1,
                 "pic_url" : "http://local.ws.xoyo.com/jx3/master180301/show_pic?pic_id=1"
              },
              app_session: "9d5accc8f17f65cf2fe8733ca3e639ba182b7bcb"
          }
      }
    */
    service.uploadPic = function (pic) {
      return request.jsonp(rootAddress + '/jx3/tongren190401/upload_pic', {
        pic: pic /*  上传图片(form表单方式) */
      }).then(function (response) {
        if (response.status === 1 /* 成功 */) {
            /**
            {
              "data{}": {
                "pic_info": "图片信息"
              },
              "data{}.pic_info{}": {
                "pic_id": "图片id",
                "pic_url": "图片地址"
              }
            }
            		*/
            return response.data;
          }
        /**
        [{
          "code": "0",
          "description": "系统错误"
        }, {
          "code": "-10151",
          "description": "活动未开启"
        }, {
          "code": "-10152",
          "description": "活动配置错误"
        }, {
          "code": "-10153",
          "description": "活动未开始"
        }, {
          "code": "-10154",
          "description": "活动已结束"
        }, {
          "code": "-10201",
          "description": "系统处理中..."
        }, {
          "code": "-10402",
          "description": "请先登录"
        }, {
          "code": "-20508",
          "description": "图片压缩失败"
        }]
        		*/
        return reject(response);
      });
    };
    /**
    填写领取现金信息
    请求方法: GET, POST
    请求示例: http://<domain>/jx3/tongren190401/take_money?works_id=10&real_name=测试名字&bank=工商银行&bank_address=广东珠海&card_num=1234213412&id_front_pic=1&id_reverse_pic=2
    响应示例: 
    {
      "code": 1,
      "status": 1,
      "msg": "",
      "message": "",
      "data": {
          "session_id": "IQ97rVUD5yrlOJHtlN4xViTEwcAZkia1c0aNOdJf",
          "request_id": "8b3710819b79f0b1aac0e43fa7c0631ef9654f0f"
      }
    }
    */
    service.takeMoney = function (works_id, real_name, bank, bank_address, card_num, id_front_pic, id_reverse_pic) {
      return request.jsonp(rootAddress + '/jx3/tongren190401/take_money', {
        works_id: works_id /*  作品id */
        , real_name: real_name /*  真实姓名 */
        , bank: bank /*  开户银行 */
        , bank_address: bank_address /*  银行详细地址 */
        , card_num: card_num /*  银行卡号 */
        , id_front_pic: id_front_pic /*  正面证件照id (可执行‘上传图片接口’获取) */
        , id_reverse_pic: id_reverse_pic /*  反面证件照id (可执行‘上传图片接口’获取) */
      }).then(function (response) {
        if (response.status === 1 /* 成功 */) {
            /**
            {
              "data{}": []
            }
            		*/
            return response.data;
          }
        /**
        [{
          "code": "0",
          "description": "系统错误"
        }, {
          "code": "-10113",
          "description": "姓名为空"
        }, {
          "code": "-10114",
          "description": "姓名格式不合法"
        }, {
          "code": "-10151",
          "description": "活动未开启"
        }, {
          "code": "-10152",
          "description": "活动配置错误"
        }, {
          "code": "-10153",
          "description": "活动未开始"
        }, {
          "code": "-10154",
          "description": "活动已结束"
        }, {
          "code": "-10201",
          "description": "系统处理中..."
        }, {
          "code": "-10402",
          "description": "请先登录"
        }, {
          "code": "-20303",
          "description": "作品id为空"
        }, {
          "code": "-20304",
          "description": "作品不存在"
        }, {
          "code": "-20504",
          "description": "缺少获奖作品显示开始时间配置"
        }, {
          "code": "-20505",
          "description": "未到获奖作品开放时间"
        }, {
          "code": "-20506",
          "description": "缺少获奖作品领奖截止时间配置"
        }, {
          "code": "-20507",
          "description": "已过获奖作品领奖截止时间"
        }, {
          "code": "-20509",
          "description": "请输入真实姓名"
        }, {
          "code": "-20601",
          "description": "请输入开户银行信息"
        }, {
          "code": "-20602",
          "description": "请输入银行卡号"
        }, {
          "code": "-20603",
          "description": "请输入银行地址"
        }, {
          "code": "-20604",
          "description": "请输入正面证件照"
        }, {
          "code": "-20605",
          "description": "请输入反面证件照"
        }, {
          "code": "-20606",
          "description": "您已经领取过现金了"
        }, {
          "code": "-20607",
          "description": "该作品不能领取现金奖励"
        }, {
          "code": "-20608",
          "description": "图片不存在"
        }]
        		*/
        return reject(response);
      });
    };
    /**
    填写领取通宝信息
    请求方法: GET, POST
    请求示例: http://<domain>/jx3/tongren190401/take_coin?works_id=10&zone=测试区&server=测试服&role=角色
    响应示例: 
    {
      "code": 1,
      "status": 1,
      "msg": "",
      "message": "",
      "data": {
          "session_id": "IQ97rVUD5yrlOJHtlN4xViTEwcAZkia1c0aNOdJf",
          "request_id": "33af54c862e014060ce2e679d9a16d0e9a72ad3f"
      }
    }
    */
    service.takeCoin = function (works_id, zone, server, role) {
      return request.jsonp(rootAddress + '/jx3/tongren190401/take_coin', {
        works_id: works_id /*  作品id */
        , zone: zone /*  区 */
        , server: server /*  服 */
        , role: role /*  角色 */
      }).then(function (response) {
        if (response.status === 1 /* 成功 */) {
            /**
            {
              "data{}": []
            }
            		*/
            return response.data;
          }
        /**
        [{
          "code": "0",
          "description": "系统错误"
        }, {
          "code": "-10151",
          "description": "活动未开启"
        }, {
          "code": "-10152",
          "description": "活动配置错误"
        }, {
          "code": "-10153",
          "description": "活动未开始"
        }, {
          "code": "-10154",
          "description": "活动已结束"
        }, {
          "code": "-10201",
          "description": "系统处理中..."
        }, {
          "code": "-10402",
          "description": "请先登录"
        }, {
          "code": "-20303",
          "description": "作品id为空"
        }, {
          "code": "-20304",
          "description": "作品不存在"
        }, {
          "code": "-20504",
          "description": "缺少获奖作品显示开始时间配置"
        }, {
          "code": "-20505",
          "description": "未到获奖作品开放时间"
        }, {
          "code": "-20506",
          "description": "缺少获奖作品领奖截止时间配置"
        }, {
          "code": "-20507",
          "description": "已过获奖作品领奖截止时间"
        }, {
          "code": "-20609",
          "description": "区不是有效参数"
        }, {
          "code": "-20701",
          "description": "服不是有效参数"
        }, {
          "code": "-20702",
          "description": "角色不是有效参数"
        }]
        		*/
        return reject(response);
      });
    };
    /**
    获取作者全部作品列表
    请求方法: GET, POST
    请求示例: http://<domain>/jx3/tongren190401/get_author_works_list?author=测试&page_num=1&page_size=2
    响应示例: 
    {
      "code": 1,
      "status": 1,
      "msg": "",
      "message": "",
      "data": {
          "like": 101,
          "total": 14,
          "list": [
              {
                  "id": 28,
                  "account": "15814871772",
                  "name": "测试",
                  "idea": "test",
                  "author": "测试",
                  "works_type": "9",
                  "like": "0",
                  "create_time": "2019-04-11 17:57:13",
                  "pic_link": null
              },
              {
                  "id": 24,
                  "account": "15814871772",
                  "name": "测试",
                  "idea": "test",
                  "author": "测试",
                  "works_type": "9",
                  "like": "1",
                  "create_time": "2019-04-09 21:32:36",
                  "pic_link": ""
              }
          ],
          "session_id": "ed8fobq1OnW407NCyJ5TU2EC0bXR0BICrVsPgBcq",
          "request_id": "35a2dbff071eeaa75494bb0117c4d550cf08aa91"
      }
    }
    */
    service.getAuthorWorksList = function (author, page_num, page_size) {
      return request.jsonp(rootAddress + '/jx3/tongren190401/get_author_works_list', {
        author: author /*  作者名 */
        , page_num: page_num /*  当前页(默认1) */
        , page_size: page_size /*  页大小(最大不超过100) */
      }).then(function (response) {
        if (response.status === 1 /* 成功 */) {
            /**
            {
              "data{}": {
                "like": "点赞数",
                "list": "作品集列表",
                "total": "搜索结果总条数"
              },
              "data{}.list[]": {
                "account": "账号",
                "author": "作者",
                "create_time": "创建时间",
                "id": "作品编号",
                "idea": "作品理念",
                "like": "点赞数",
                "name": "作品名称",
                "pic_link": "作品图片地址",
                "works_type": "作品类别 （1服饰 2日用家居 3文创用品 4手办模具 5毛绒公仔 6箱包收纳 7首饰类 8宠物类 9其他类）"
              }
            }
            		*/
            return response.data;
          }
        /**
        [{
          "code": "0",
          "description": "系统错误"
        }, {
          "code": "-10151",
          "description": "活动未开启"
        }, {
          "code": "-10152",
          "description": "活动配置错误"
        }, {
          "code": "-10153",
          "description": "活动未开始"
        }, {
          "code": "-10154",
          "description": "活动已结束"
        }, {
          "code": "-20109",
          "description": "请输入作者名"
        }]
        		*/
        return reject(response);
      });
    };
    /**
    获取我的作品
    请求方法: GET, POST
    请求示例: http://<domain>/jx3/tongren190401/get_my_works?status=1&is_award=1
    响应示例: 
    {
      "code": 1,
      "status": 1,
      "msg": "",
      "message": "",
      "data": {
          "my_list": [
              {
                  "id": 23,
                  "account": "15814871772",
                  "name": "测试",
                  "author": "测试",
                  "works_type": "9",
                  "like": "0",
                  "status": "1",
                  "is_award": "0",
                  "award_type": "未获奖",
                  "reason": "",
                  "create_time": "2019-04-09 21:31:49",
                  "pic_link": "",
                  "get_coin": 0,
                  "get_physical": 0,
                  "get_money": 0
              },
              {
                  "id": 14,
                  "account": "15814871772",
                  "name": "测试",
                  "author": "测试",
                  "works_type": "3",
                  "like": "0",
                  "status": "1",
                  "is_award": "0",
                  "award_type": "未获奖",
                  "reason": "",
                  "create_time": "2019-04-09 19:45:15",
                  "pic_link": "",
                  "get_coin": 0,
                  "get_physical": 0,
                  "get_money": 0
              },
              {
                  "id": 13,
                  "account": "15814871772",
                  "name": "测试5",
                  "author": "测试",
                  "works_type": "1",
                  "like": "0",
                  "status": "1",
                  "is_award": "0",
                  "award_type": "未获奖",
                  "reason": "",
                  "create_time": "2019-04-09 15:51:58",
                  "pic_link": "",
                  "get_coin": 0,
                  "get_physical": 0,
                  "get_money": 0
              }
          ],
          "session_id": "NNEbsTLY9lVp40ni3Nyxm0x0CyUAgtmRz0XBK4N6",
          "request_id": "bfe0dd1594d87a2cdeebe2bd133860f0e354059d"
      }
    }
    */
    service.getMyWorks = function (status, is_award) {
      return request.jsonp(rootAddress + '/jx3/tongren190401/get_my_works', {
        status: status /*  状态 -1审核不通过 0审核中 1审核通过 */
        , is_award: is_award /*  是否获奖 0否 1是(组合查看后置说明) */
      }).then(function (response) {
        if (response.status === 1 /* 成功 */) {
            /**
            {
              "data{}": {
                "my_list": "我的作品集列表"
              },
              "data{}.my_list[]": {
                "account": "账号",
                "author": "作者",
                "award_type": "获奖类型 1一代宗师 2名满江湖 3锋芒毕露 4脱颖而出 5万众瞩目",
                "cdkey": "获奖作品对应激活码",
                "create_time": "创建时间",
                "get_coin": "是否已经领通宝 0可领奖 1已领奖",
                "get_money": "是否已经领现金 0可领奖 1已领奖",
                "get_physical": "是否已经领实物 0可领奖 1已领奖",
                "id": "作品编号",
                "is_award": "是否获奖 0否 1是",
                "like": "点赞数",
                "name": "作品名称",
                "pic_link": "作品图片地址",
                "reason": "审核理由",
                "status": "审核状态",
                "works_type": "作品类别 （1服饰 2日用家居 3文创用品 4手办模具 5毛绒公仔 6箱包收纳 7首饰类 8宠物类 9其他类）"
              }
            }
            		*/
            return response.data;
          }
        /**
        [{
          "code": "0",
          "description": "系统错误"
        }, {
          "code": "-10151",
          "description": "活动未开启"
        }, {
          "code": "-10152",
          "description": "活动配置错误"
        }, {
          "code": "-10153",
          "description": "活动未开始"
        }, {
          "code": "-10154",
          "description": "活动已结束"
        }, {
          "code": "-10402",
          "description": "请先登录"
        }, {
          "code": "-20404",
          "description": "审核状态不合法"
        }]
        		*/
        return reject(response);
      });
    };
    /**
    当前通行证每天点赞剩余次数
    请求方法: GET, POST
    请求示例: http://<domain>/jx3/tongren190401/get_remain_like
    响应示例: 
    {
      "code": 1,
      "status": 1,
      "msg": "",
      "message": "",
      "data": {
          "remain_like": 10,
          "account": "15814871772",
          "session_id": "GVgRm6BlwGHLe7ex2rsm6aCSsEbBQauKjCPj9R4K",
          "request_id": "be15eebc3f2bbe4a745259273233566f25d4245d"
      }
    }
    */
    service.getRemainLike = function () {
      return request.jsonp(rootAddress + '/jx3/tongren190401/get_remain_like', {}).then(function (response) {
        if (response.status === 1 /* 成功 */) {
            /**
            {
              "data{}": {
                "account": "账号",
                "remain_like": "剩余次数"
              }
            }
            		*/
            return response.data;
          }
        /**
        [{
          "code": "0",
          "description": "系统错误"
        }, {
          "code": "-10151",
          "description": "活动未开启"
        }, {
          "code": "-10152",
          "description": "活动配置错误"
        }, {
          "code": "-10153",
          "description": "活动未开始"
        }, {
          "code": "-10154",
          "description": "活动已结束"
        }, {
          "code": "-10402",
          "description": "请先登录"
        }]
        		*/
        return reject(response);
      });
    };
    return service;
  };
});