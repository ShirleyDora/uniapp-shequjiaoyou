import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

//引入全局组件
import divider from './components/common/divider.vue';
Vue.component('divider',divider)
import noThing from './components/common/no-thing.vue';
Vue.component('no-thing',noThing)

//引入配置文件
import $C from './common/config.js';
Vue.prototype.$C = $C;

//挂载助手函数库
import $U from './common/util.js';
Vue.prototype.$U = $U;

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
