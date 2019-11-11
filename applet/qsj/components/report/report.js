// components/report/report.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    more: {            // 属性名
      type: Boolean,   // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: false,     // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer(newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
      }
    },
    showReport: {            // 属性名
      type: Boolean,   // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: false     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    showChose: {            // 属性名
      type: Boolean,   // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: true     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    showLahei: {            // 属性名
      type: Boolean,   // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: false     // 属性初始值（可选），如果未指定则会根据类型选择一个
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

    cancelFn: function (e) {
      wx.showTabBar({})
      this.setData({
        more: false,
        chooseIdx: 0
      })
      setTimeout(() => {
        this.setData({
          showReport: false,
          showChose: true,
          showLahei: false,
          chooseIdx: 0
        })
      }, 500)
    },
    //显示举报
    showReportFn: function () {
      this.setData({
        more: true,
        showReport: true,
        showChose: false,
        showLahei: false
      })
    },
    //显示拉黑
    showLaheiFn: function () {
      this.setData({
        more: false,
        showReport: false,
        showLahei: true
      })
      setTimeout(() => {
        this.setData({
          showChose: true
        })
      }, 500)
    },
    hideLahei: function () {
      this.setData({
        showLahei: false
      })
    }
  }
})
