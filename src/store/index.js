import Vue from 'vue';
import Vuex from 'vuex';
import {reqAdminInfo, reqAdminLogout} from "../api/login";
import router from '@/router/index.js'
import {reqBarFiles, reqPostBarInfo} from "../api/bar";
import axios from 'axios'
Vue.use(Vuex);


export const RECEIVE_ADMININFO='receive_adminInfo'//管理员信息
export const RESET_ADMININFO='reset_adminInfo'//重置管理员信息
export const RECEIVE_POSTBAR='receive_postBar'//贴吧
export const RECEIVE_URL='receive_url'//根路径
export const RECEIVE_FILENUM='receive_fileNum'//根路径
const store = new Vuex.Store({
  state:{
    adminInfo:{},//管理员信息
    postBarDetail: {},//贴吧详情
    url:'',
    fileNum:0
  },
  getters:{

  },
  actions:{
    //同步记录用户信息
    recordAdmin({commit},adminInfo){
      commit(RECEIVE_ADMININFO,{adminInfo})
    },
    //异步获取用户信息
    async getAdminInfo({commit}){
      const result=await reqAdminInfo()
      if(result.data.success===false){
        router.replace('/login')
      }else{
        const adminInfo=result.data
        const myPostBarId=result.data.postBarId
        //异步获取贴吧信息
        const res=await reqPostBarInfo(myPostBarId)
        if (res.status===200){
          const postBarDetail=res.data
          commit(RECEIVE_ADMININFO,{adminInfo})
          commit(RECEIVE_POSTBAR,{postBarDetail})
        }else{
          this.$message.error('数据加载失败,请重试！')
        }
      }
    },
    async  getFilesList({commit}) {
      const result = await reqBarFiles('', '', '', '', 1, 1)
      if (result.status === 200) {
       const fileNum = result.data.totalRows
       commit (RECEIVE_FILENUM,fileNum)
      }
    },
    //同步记录贴吧
    recordFileNum({commit},fileNum){
      commit(RECEIVE_FILENUM,fileNum)
    },
    //同步记录贴吧
    recordPostBarId({commit},postBarDetail){
      commit(RECEIVE_POSTBAR,{postBarDetail})
    },
    //异步获取url
    getUrl({commit}){
      axios.get(`http://server.campus.com/fcs/file/baseUrl`).then((result)=>{
        if (result.status===200){
          const url=result.data
          commit(RECEIVE_URL,{url})
        }
      })
    },
    //同步
    recordUrl({commit},url){
      commit(RECEIVE_URL,{url})
    },
    //异步登出
    async logout({commit}){
      const result=await reqAdminLogout()
      if(result.data===''){
        commit(RESET_ADMININFO)
      }else{
        this.$message.error('退出失败，请重试！')
      }
    }
  },
  mutations:{
    [RECEIVE_ADMININFO](state,{adminInfo}){
      state.adminInfo=adminInfo
    },
    [RECEIVE_POSTBAR](state,{postBarDetail}){
      state.postBarDetail=postBarDetail
    },
    [RECEIVE_URL](state,{url}){
      state.url=url
    },
    [RECEIVE_FILENUM](state,fileNum){
      state.fileNum=fileNum
    },
    [RESET_ADMININFO](state){
      state.adminInfo={}
    },
  },
});
export default store;
