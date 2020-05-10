<template>
    <div style="line-height: 60px;">
      <div v-if="'/'===$route.path" style="line-height: 60px;">
        <el-breadcrumb separator="/" class="pathBread" style="line-height: 60px;">
          <el-breadcrumb-item :to="{ path: '/' }" style="line-height: 60px !important;">首页</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div v-if="'/users'===$route.path">
        <el-breadcrumb separator="/" class="pathBread">
          <el-breadcrumb-item :to="{ path: '/' }" style="line-height: 60px !important;">首页</el-breadcrumb-item>
          <el-breadcrumb-item  style="line-height: 60px !important;">用户管理</el-breadcrumb-item>
          <el-breadcrumb-item  style="line-height: 60px !important;"><a href="/users">用户列表</a></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div v-if="'/barHost'===$route.path">
        <el-breadcrumb separator="/" class="pathBread">
          <el-breadcrumb-item :to="{ path: '/' }" style="line-height: 60px !important;">首页</el-breadcrumb-item>
          <el-breadcrumb-item  style="line-height: 60px !important;">用户管理</el-breadcrumb-item>
          <el-breadcrumb-item  style="line-height: 60px !important;">吧主管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div v-if="'/assistant'===$route.path">
        <el-breadcrumb separator="/" class="pathBread">
          <el-breadcrumb-item :to="{ path: '/' }" style="line-height: 60px !important;">首页</el-breadcrumb-item>
          <el-breadcrumb-item  style="line-height: 60px !important;">用户管理</el-breadcrumb-item>
          <el-breadcrumb-item  style="line-height: 60px !important;">助手管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div v-if="'/postBar'===$route.path">
        <el-breadcrumb separator="/" class="pathBread">
          <el-breadcrumb-item :to="{ path: '/' }" style="line-height: 60px !important;">首页</el-breadcrumb-item>
          <el-breadcrumb-item style="line-height: 60px !important;">贴吧中心</el-breadcrumb-item>
          <el-breadcrumb-item  style="line-height: 60px !important;">贴吧管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div v-if="'/material'===$route.path">
        <el-breadcrumb separator="/" class="pathBread">
          <el-breadcrumb-item :to="{ path: '/' }"  style="line-height: 60px !important;">首页</el-breadcrumb-item>
          <el-breadcrumb-item style="line-height: 60px !important;">贴吧中心</el-breadcrumb-item>
          <el-breadcrumb-item  style="line-height: 60px !important;">资料管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div v-if="'/post'===$route.path">
        <el-breadcrumb separator="/" class="pathBread">
          <el-breadcrumb-item :to="{ path: '/' }"  style="line-height: 60px !important;">首页</el-breadcrumb-item>
          <el-breadcrumb-item  style="line-height: 60px !important;">贴吧中心</el-breadcrumb-item>
          <el-breadcrumb-item style="line-height: 60px !important;">贴子管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div v-if="'/notice'===$route.path">
        <el-breadcrumb separator="/" class="pathBread">
          <el-breadcrumb-item :to="{ path: '/' }" style="line-height: 60px !important;">首页</el-breadcrumb-item>
          <el-breadcrumb-item style="line-height: 60px !important;">贴吧中心</el-breadcrumb-item>
          <el-breadcrumb-item style="line-height: 60px !important;">公告管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div v-if="'/notification'===$route.path">
        <el-breadcrumb separator="/" class="pathBread">
          <el-breadcrumb-item :to="{ path: '/' }" style="line-height: 60px !important;">首页</el-breadcrumb-item>
          <el-breadcrumb-item style="line-height: 60px !important;">系统中心</el-breadcrumb-item>
          <el-breadcrumb-item style="line-height: 60px !important;">系统通知</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div v-if="'/feedback'===$route.path">
        <el-breadcrumb separator="/" class="pathBread">
          <el-breadcrumb-item :to="{ path: '/' }" style="line-height: 60px !important;">首页</el-breadcrumb-item>
          <el-breadcrumb-item style="line-height: 60px !important;">系统中心</el-breadcrumb-item>
          <el-breadcrumb-item style="line-height: 60px !important;">用户反馈</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div v-if="'/setting'===$route.path">
        <el-breadcrumb separator="/" class="pathBread">
          <el-breadcrumb-item :to="{ path: '/' }" style="line-height: 60px !important;">首页</el-breadcrumb-item>
          <el-breadcrumb-item style="line-height: 60px !important;">设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
</template>

<script>
    export default {
        name: "breadcrumb"
    }
</script>

<style scoped>

</style>
