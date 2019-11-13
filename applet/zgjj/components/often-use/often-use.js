// components/often-use/often-use.js
Component({
    options: {
        addGlobalClass: true
    },
    /**
     * 组件的属性列表
     */
    properties: {
        assets: {
            type: String,
            value: 'assets'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        currentIndex: 1
    },

    /**
     * 组件的方法列表
     */
    methods: {
        cutTitle(e) {
            this.setData({
                //拿到当前索引并动态改变
                currentIndex: e.currentTarget.dataset.idx
            })
        }
    }
})
