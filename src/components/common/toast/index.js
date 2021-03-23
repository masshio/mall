import Vue from 'vue'
import Toast from './Toast'

const obj = {}

obj.install = function(){
    //创建组件构造器
    const toastContrustor = Vue.extend(Toast)
    //用new创建出组件对象
    const toast = new toastContrustor
    //将组件对象手动挂载到某一个元素上
    toast.$mount(document.createElement('div'))
    //toast.$el对应的就是div
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast
}

export default obj