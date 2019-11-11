// components/myDialog/myDialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {            // 属性名
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
    hideDialog:function () {
      console.log(1)
      this.setData({
        show: false
      })
    }
  }
})
