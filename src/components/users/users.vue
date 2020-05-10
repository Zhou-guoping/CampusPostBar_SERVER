<template>
  <el-card class="box-card">
    <div class="el-col-xs-24" style="padding-left: 10px; padding-right: 10px;">
    <!--<div class="el-col el-col-20 el-col-xs-24" style="padding-left: 10px; padding-right: 10px;">-->
      <!--搜索-->
      <el-form :inline="true">
        <el-form-item label="用户ID">
          <el-input v-model='userId' placeholder="请输入用户ID"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="userNickname" placeholder="请输入用户昵称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchUserList"><i class="el-icon-search"></i>&nbsp;查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="default" @click="clearInput"><i class="el-icon-refresh"></i>&nbsp;重置</el-button>
        </el-form-item>
      </el-form>
      <!--表格-->
      <el-tabs type="border-card" style="height: 100%;">
        <el-button type="primary" :disabled="Index===1" @click="showList(1)">启用用户</el-button>
        <el-button type="danger" :disabled="Index===2" @click="showList(2)">停用用户</el-button>
        <div v-if="Index===1">
          <el-table
            :data="tableData"
            stripe
            height="380"
            style="width: 100%;margin-top: 20px">
            <el-table-column
              label="ID"
              width="100">
              <template slot-scope="scope">
                {{scope.row.userId}}
              </template>
            </el-table-column>
            <el-table-column
              prop="userName"
              label="用户名"
              width="140">
            </el-table-column>
            <el-table-column
              prop="userNickname"
              label="昵称"
              width="140">
            </el-table-column>
            <el-table-column
              label="性别"
              width="100">
              <template slot-scope="scope">
                {{ scope.row.userSex === 0 ? '男' : '女' }}
              </template>
            </el-table-column>
            <el-table-column
              prop="userPhone"
              label="电话号码"
              width="160">
            </el-table-column>
            <el-table-column
              prop="levelName"
              label="等级"
              width="100">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
              width="200">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="200">
              <!--查看，停用-->
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="停用用户" placement="bottom-start">
                  <el-switch
                    v-model="scope.row.userState"
                    @change="userDisable(scope.row)"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    :active-value="true"
                    :inactive-value="false">
                  </el-switch>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="查看申请人信息" placement="bottom-start">
                  <el-button size='small' icon="el-icon-search"  plain type="primary"  circle style="margin-left: 10px" @click="getUserInfo(scope.row.userId)"></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <el-pagination
            @size-change="getUserList"
            @current-change="getUserList"
            :current-page.sync="currentPage"
            :page-sizes="[5,10,15]"
            :page-size.sync="size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            style="margin-top: 10px">
          </el-pagination>
        </div>
        <div v-if="Index===2">
          <el-table
            :data="tableData2"
            stripe
            height="380"
            style="width: 100%;margin-top: 20px">
            <el-table-column
              label="ID"
              width="100">
              <template slot-scope="scope">
                {{scope.row.userId}}
              </template>
            </el-table-column>
            <el-table-column
              prop="userName"
              label="用户名"
              width="140">
            </el-table-column>
            <el-table-column
              prop="userNickname"
              label="昵称"
              width="140">
            </el-table-column>
            <el-table-column
              label="性别"
              width="100">
              <template slot-scope="scope">
                {{ scope.row.userSex === 0 ? '男' : '女' }}
              </template>
            </el-table-column>
            <el-table-column
              prop="userPhone"
              label="电话号码"
              width="160">
            </el-table-column>
            <el-table-column
              prop="levelName"
              label="等级"
              width="100">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
              width="200">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="200">
              <!--查看，启用-->
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="启用用户" placement="bottom-start">
                  <el-switch
                    v-model="scope.row.userState"
                    @change="userEnable(scope.row)"
                    active-color="#13ce66"
                    inactive-color="#ff4949 ">
                  </el-switch>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="查看用户信息" placement="bottom-start">
                  <el-button size='small' icon="el-icon-search"  plain type="primary"  circle style="margin-left: 10px" @click="getUserInfo(scope.row.userId)"></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <el-pagination
            @size-change="getUserList2"
            @current-change="getUserList2"
            :current-page.sync="currentPage"
            :page-sizes="[5,10,15]"
            :page-size.sync="size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>

        </div>
      </el-tabs>
      <!--对话框-->
      <el-dialog
        title="用户信息"
        :visible.sync="dialogVisibleUser"
        width="40%">
        <div>
          <img class="headImg" :src="url+userInfo.headImgUrl"></img>
          <div class="userInfo">
            <p><b>用户名：</b>{{userInfo.userName}}</p>
            <p><b>昵称：</b>{{userInfo.userNickname}}</p>
            <p><b>电话：</b>{{userInfo.userPhone}}</p>
            <p><b>邮件：</b>{{userInfo.userEmail!==null?userInfo.userEmail:'暂无'}}</p>
            <p><b>学校--专业：</b>{{userInfo.campusName}}--{{userInfo.majorName}}</p>
            <p><b>等级：</b>{{userInfo.levelName}} &nbsp;&nbsp;<b>经验值：</b>{{userInfo.userExp}}</p>
            <p><b>性别：</b>{{ userInfo.userSex === 0 ? '男' : '女' }}</p>
            <p><b>状态：</b>{{ userInfo.userState === 0 ? '停用' : '启用' }}</p>
            <p><b>上次登录时间：</b>{{userInfo.lastLoginTime}}</p>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisibleUser = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisibleUser = false">确 定</el-button>
            </span>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
    import {reqGetUserList,reqUserInfo,reqUserStatus} from "../../api/users";
    import {mapState} from "vuex";
    export default {
      name:'users',
      data(){
        return{
          input:'',
          activeName: 'first',
          tableData: [],
          tableData2: [],
          userId:'',
          userName:'',
          userNickname:'',
          currentPage: 1,
          size:5,
          total:0,
          Index:1,
          dialogVisibleUser: false,//显示用户信息弹框
          userInfo:{},
        }
      },
      computed: {
        ...mapState(['url']),
      },
      created() {
        this.getUserList()
      },
      methods: {
        showList(index) {
          this.clearInput()
          if (index === 1) {
            this.Index = 1
          } else if (index === 2) {
            this.Index = 2
          }
        },
        clearInput(){
          this.userId='',
          this.userName='',
          this.userNickname=''
          if(this.Index === 1){
            this.getUserList()
          }
          if(this.Index === 2){
            this.getUserList2()
          }
        },
        //搜索用户
        searchUserList(){
          if(this.Index===1){
            this.getUserList()
          }
          if(this.Index===2){
            this.getUserList2()
          }
        },
        async getUserList(){
          const rLoading = this.openLoading()
          const result=await reqGetUserList(this.userId,this.userName,this.userNickname,1,this.currentPage,this.size)
          rLoading.close()
          result.data.data.forEach(el=>{
            el.userState=true
          })
          this.tableData= result.data.data
          this.total = result.data.totalRows

        },
        async getUserList2(){
          const rLoading = this.openLoading()
          const result=await reqGetUserList(this.userId,this.userName,this.userNickname,0,this.currentPage,this.size)
          rLoading.close()
          result.data.data.forEach(el=>{
            el.userState=false
          })
          this.tableData2= result.data.data
          this.total = result.data.totalRows
        },
        async getUserInfo(index){
          const result=await reqUserInfo(index)
          if(result.data.status===220000){
            this.$message.error('数据加载失败，请重试！')
          }else{
            this.dialogVisibleUser = true
            this.userInfo=result.data
          }
        },
        //停用用户
        userDisable(user){
          let flag = user.userState //保存点击之后v-modeld的值(true，false)
          user.userState = !user.userState //保持switch点击前的状态
          this.$prompt('请输入原因（不超过15个字）', '停用原因', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /^.{1,15}$/,
            inputErrorMessage: '输入字数长度1~15'
          }).then(({ value }) => {
            const result= reqUserStatus(user.userId,value)
            user.userState = false
            this.tableData.splice(user,1)
            this.$message({
              type: 'success',
              message: '停用成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消停用用户操作'
            });
          });
        },
        //启用用户
        userEnable(user){
          let flag = user.userState //保存点击之后v-modeld的值(true，false)
          user.userState = !user.userState //保持switch点击前的状态
          this.$confirm('确定启用该用户吗, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const result=reqUserStatus(user.userId,'')
            user.userState = true
            this.tableData2.splice(user,1)
            this.$message({
              type: 'success',
              message: '启用成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消启用'
            });
          });
        }
      }
    }
</script>

<style scoped>
.box-card{
  height: 100% !important;
}
.headImg{
  position: relative;
  left: 50%;
  top:0;
  transform: translateX(-50%);
  width: 70px;
  height: 70px;
  border-radius: 50% 50%;
 /* background: url("../../assets/img/bg1.jpg");*/
  background-size: 100% 100%;
  border: 1px solid #e4e4e4;
}
.userInfo{
  padding:0 20px;
  font-size: 16px;
}
</style>
