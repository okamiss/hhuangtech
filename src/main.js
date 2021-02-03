import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



import axios from 'axios'
import { post, get } from './utils/http'
//定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$get = get;


import cookies from 'vue-cookies'
Vue.prototype.$cookies = cookies; 
//配置cookies生命周期，单位不区分大小写

require('@/assets/css/index.css');
