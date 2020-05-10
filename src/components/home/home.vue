<template>
  <el-container class="container">
    <!--侧面菜单栏-->
    <el-aside width="220px" class="aside">
      <el-menu default-active="/"
         class="el-menu-vertical-demo menu"
         :router=true
         :collapse="isCollapse"
         background-color="#545c64"
         text-color="#fff"
         active-text-color="#ffd04b"
         :unique-opened="true"
      >
        <div class="aside_header">
          <h2 style="color:#ffffff;" v-if="!isCollapse">校园贴吧管理系统</h2>
          <div class="aside_img" v-else></div>
        </div>
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            <span slot="title">用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="users"><i class="el-icon-user"></i> 用户管理</el-menu-item>
            <el-menu-item index="barHost"><i class="el-icon-user-solid"></i> 吧主管理</el-menu-item>
            <el-menu-item index="assistant"><i class="el-icon-s-help"></i> 助手管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">贴吧中心</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="postBar"><i class="el-icon-mouse"></i>贴吧管理</el-menu-item>
            <el-menu-item index="material"><i class="el-icon-files"></i>资料管理</el-menu-item>
            <el-menu-item index="post"><i class="el-icon-notebook-1"></i>贴子管理</el-menu-item>
            <el-menu-item index="notice"><i class="el-icon-alarm-clock"></i> 公告管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-monitor"></i>
            <span slot="title">系统中心</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="notification"><i class="el-icon-bell" ></i>系统通知</el-menu-item>
            <el-menu-item index="feedback"><i class="el-icon-news"></i>用户反馈</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="setting">
          <i class="el-icon-setting"></i>
          <span slot="title">设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container :class="{container1:isCollapse}">
      <!--头部-->
      <el-header  class="header" >
        <div class="top">
          <el-row :gutter="10">
            <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
              <el-radio-group v-model="isCollapse" style="font-size: 30px;line-height: 60px;"><!--margin-left:-10px-->
                <i v-show="!isCollapse" class="el-icon-s-fold expandBtn" @click="isCollapse=true"></i>
                <i v-show="isCollapse" class="el-icon-s-unfold shrinkBtn" @click="isCollapse=false"></i>
              </el-radio-group>
            </el-col>
            <el-col :xs="20" :sm="18" :md="16" :lg="18" :xl="19">
              <div style="line-height: 60px"><Breadcrumb/></div>
            </el-col>

            <el-col :md="6" :lg="5" :xl="4" class="head_right hidden-md-and-down" >
              <div class="layout hidden-md-and-down">欢迎您，{{adminInfo.adminName}}&nbsp;|&nbsp;<span @click="Logout" style="cursor:pointer;">退出</span></div>
            </el-col>
          </el-row>
          <div class="openTip">

          </div>
        </div>
      </el-header>
      <!--内容-->
      <el-main  class="main">
        <keep-alive><router-view/></keep-alive>
        <div v-if="$route.path==='/' ">
          <el-card class="box-card">
            <el-row :gutter="20">
              <el-col :span="24" style="display: flex">
                <h2 style="font-family: 楷体;margin-top: 0" >{{postBarDetail.postBarName}}</h2>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24" style="margin-top: 10px">
                <el-carousel :interval="4000" type="card" height="200px">
                  <el-carousel-item>
                    <h3 class="medium">{{ postBarDetail.postBarName }}</h3>
                  </el-carousel-item>
                  <el-carousel-item>
                    <h3 class="medium">简介：{{ postBarDetail.postBarIntroduction }}</h3>
                  </el-carousel-item>
                  <el-carousel-item>
                    <h3 class="medium">贴吧类型：{{ this.postBarDetail.postBarType===1?'普通贴吧':this.postBarDetail.postBarType===2?'校园官方贴吧':'' }}</h3>
                  </el-carousel-item>
                  <el-carousel-item>
                    <h3 class="medium">所属学校：{{ postBarDetail.campusName }}</h3>
                  </el-carousel-item>
                  <el-carousel-item>
                    <h3 class="medium">关注数：{{ postBarDetail.attentionNum }}人</h3>
                  </el-carousel-item>
                  <el-carousel-item>
                    <h3 class="medium">贴子数：{{ postBarDetail.postNum }}条</h3>
                  </el-carousel-item>
                </el-carousel>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <div id='myChart'  ref="chart" style='width: 600px;height: 300px;text-align: center !important;'></div>
              </el-col>

            </el-row>
          </el-card>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import {mapActions, mapState} from "vuex";
  import Breadcrumb from './breadcrumb'
  import HeadPath from './headPath'
    export default {
      data() {
        return {
          isCollapse: false,
          activeName: 'first',
          screenWidth: '',
          screenHeight: '',
        }
      },
      components: {
        Breadcrumb,
        HeadPath
      },
      computed: {
        ...mapState(['adminInfo', 'url', 'postBarDetail','fileNum']),
      },
      mounted() {
        setInterval(() => {
          this.drawLine()
        }, 1000)

        this.screenWidth = document.body.clientWidth;
        this.screenHeight = document.body.clientHeight;

        window.onresize = () => {
          return (() => {
            this.screenWidth = document.body.clientWidth;
            this.screenHeight = document.body.clientHeight;
            if (this.screenWidth < 750) {
              this.isCollapse = true
            }
          })();
        };

      },
      created() {
        this.getAdminInfo()
        this.getUrl()
        this.getFilesList()
      },
      methods: {
        ...mapActions(['getAdminInfo', 'getUrl','getFilesList']),

        //处理数字显示
        numberShow(number) {
          if (number / 100000000 >= 1) {
            return number = (number / 100000000).toFixed(2) + '亿'
          } else if (number / 100000000 < 1 && number / 10000 >= 1) {
            return number = (number / 10000).toFixed(2) + '万'
          } else if (number / 10000 < 1) {
            return number = number / 1
          }
        },
        Logout() {
          this.$confirm('确认退出吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error'
          }).then(() => {
            //请求退出
            this.$store.dispatch('logout')
            this.$router.push('/login')
            this.$message({
              type: 'success',
              message: '退出登录!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消退出'
            });
          });
        },
        drawLine() {
          // 基于准备好的dom，初始化echarts实例
          let bar_dv = this.$refs.chart;
          //let myChart = this.$echarts.init(document.getElementById('myChart'))

          // 绘制图表
          if (bar_dv){
            let myChart = this.$echarts.init(bar_dv)
            myChart.setOption({
              title: {
                text: '贴吧动态统计',
                subtext: '',
                left: 'center'
              },
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
              },
              series: [
                {
                  type: 'pie',
                  radius: '65%',
                  center: ['50%', '50%'],
                  selectedMode: 'single',
                  data: [
                    {
                      value: this.postBarDetail.postNum,
                      name: '贴子',
                      label: {
                        backgroundColor: '#eee',
                      }
                    },
                    {value:this.fileNum, name: '文件'},

                  ],
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            })
          }else{
            return false
          }

        }
      }
    }
</script>

<style>
  .container{
    height: 100%;
  }
  .aside{
    transition: width .28s;
    height: 100%;
  }
  .container1{
    min-height: 100%;
    transition: margin-left .28s;
    margin-left: -156px;
    position: relative;
  }
  .aside_header{
    background: #3a3f4e;
    height: 60px;
    display: flex;
  }
  .aside h2{
    position: relative;
    left: 50%;
    transform: translate(-50%,-25%);
  }
  .aside_img{
    width: 50px;
    height: 50px;
    position: relative;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    background: url("../../assets/img/school.png");
    background-size: 100% 100%;
  }
  .menu{
    height: 100%;
    overflow: hidden;
  }
  .header{
    border-bottom: 1px solid #e4e4e4;
    height: 100px !important;
  }

  .pathBread{
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
    font-size: 18px;
  }
  .openTip{
    border-top: 1px solid #e4e4e4;
    width: 100%;
    height: 40px;
    line-height: 38px;
  }
  .layout{
    color: #2586eb;
    line-height: 60px;
    margin-left: 10px;
  }
  .main{
    background: #f8f8f8;
  }
  @media screen and (max-width: 1000px){
   .layout{
      display: none;
    }
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 1;
    line-height: 160px;
    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
    background-color:#21a675;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #c0ebd7;
  }
</style>

