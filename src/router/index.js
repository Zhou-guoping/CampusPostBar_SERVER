import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import ForgetPWD from '@/components/login/forgetPWD'
import Home from '@/components/home/home'
import Users from '@/components/users/users'
import BarHost from '@/components/users/barHost'
import Assistant from '@/components/users/assistant'
import PostBar from '@/components/bar/postBar'
import Material from '@/components/bar/material'
import Post from '@/components/bar/post'
import Notice from '@/components/bar/notice'
import Notification from '@/components/system/notification'
import Feedback from '@/components/system/feedback'
import Setting from '@/components/setting/setting'
import VueRouter from "vue-router";

Vue.use(Router)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  mode:'hash',
  routes: [
    {
      name:'login',
      path:'/login',
      component:Login
    },
    {
      name:'forgetPWD',
      path:'/forgetPWD',
      component:ForgetPWD
    },
    {
      name:'home',
      path:'/',
      component:Home,
      meta: { requiresAuth: true } ,// 添加表示需要验证
      children:[
        {
          name:'users',
          path:'users',
          component:Users
        },
        {
          name:'barHost',
          path:'barHost',
          component:BarHost
        },
        {
          name:'assistant',
          path:'assistant',
          component:Assistant
        },
        {
          name:'postBar',
          path:'postBar',
          component:PostBar
        },
        {
          name:'material',
          path:'material',
          component:Material
        },
        {
          name:'post',
          path:'post',
          component:Post
        },
        {
          name:'notice',
          path:'notice',
          component:Notice
        },
        {
          name:'notification',
          path:'notification',
          component:Notification
        },
        {
          name:'feedback',
          path:'feedback',
          component:Feedback
        },
        {
          name:'setting',
          path:'setting',
          component:Setting
        }

      ]
    }
  ]
})
