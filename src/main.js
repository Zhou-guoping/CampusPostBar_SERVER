// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/reset.css'
import './assets/icons'
import  axios from 'axios'
import md5 from 'js-md5'
import store from "./store";
import lazyload from 'vue-lazyload'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import echarts from 'echarts'
import VideoPlayer from 'vue-video-player'
require('vue-video-player/node_modules/video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
Vue.prototype.$echarts = echarts


Vue.use(lazyload, {
  error: require('../src/assets/img/bg1.jpg'),
  loading: require('../src/assets/logo.png')

})
axios.defaults.withCredentials=true
axios.defaults.headers.post['Content-Type']='application/json;charset=UTF-8'
Vue.prototype.$axios=axios
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$md5=md5

Vue.directive('down', {
  inserted: (el, binding) => {
    el.style.cssText = 'cursor: pointer;color:red;'
    el.addEventListener('click', () => {
      console.log(binding.value)
      let link = document.createElement('a')  // 创建a标签
      link.style.display = 'none'
      link.href =  binding.value // 设置下载地址
      link.setAttribute('download', '') // 添加downLoad属性
      document.body.appendChild(link)
      link.click()
    })
  }
})
Vue.prototype.openLoading = function() {
  const loading = this.$loading({           // 声明一个loading对象
    lock: true,                             // 是否锁屏
    text: '正在加载...',                     // 加载动画的文字
    spinner: 'el-icon-loading',             // 引入的loading图标
    background: 'rgba(0, 0, 0, 0.3)',       // 背景颜色
    target: '.sub-main',                    // 需要遮罩的区域
    body: true,
    customClass: 'mask'                     // 遮罩层新增类名
  })
  setTimeout(function () {                  // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
    loading.close();                        // 关闭遮罩层
  },5000)
  return loading;
}
Vue.use(Viewer, {

  defaultOptions: {

    zIndex:9999,

    inline:false,

    button:true,

    navbar:false,

    title:true,

    toolbar:true,

    tooltip:true,

    movable:true,

    zoomable:true,

    rotatable:true,

    scalable:true,

    transition:true,

    fullscreen:true,

    keyboard:false,

    loop:false,
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

/*
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //这里判断用户是否登录，验证本地存储是否有token
    if (this.$store.state.adminInfo==={}) { // 判断当前的token是否存在
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
*/
