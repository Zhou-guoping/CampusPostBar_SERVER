<template>
  <div>
    <el-tag type='success' effect="dark" closable v-model="$route.path==='/'">首页</el-tag>
    <el-tag type='success' effect="dark"  v-model="$route.path==='/'">用户管理</el-tag>
    <el-tag type='success' effect="dark"  v-model="$route.path==='/'">吧主管理</el-tag>
    <el-tag type='success' effect="dark"  v-model="$route.path==='/'">助手管理</el-tag>
    <el-tag type='success' effect="dark"  v-model="$route.path==='/'">贴吧管理</el-tag>
    <el-tag type='success' effect="dark"  v-model="$route.path==='/'">资料管理</el-tag>
    <el-tag type='success' effect="dark"  v-model="$route.path==='/'">贴子管理</el-tag>
    <el-tag type='success' effect="dark"  v-model="$route.path==='/'">公告管理</el-tag>
    <el-tag type='success' effect="dark"  v-model="$route.path==='/'">系统通知</el-tag>
    <el-tag type='success' effect="dark"  v-model="$route.path==='/'">用户反馈</el-tag>
    <el-tag type='success' effect="dark"  v-model="$route.path==='/'">设置</el-tag>
  </div>

</template>

<script>
    export default {
        name: "headPath"
    }
</script>

<style scoped>

</style>
