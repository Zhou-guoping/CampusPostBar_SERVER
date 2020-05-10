<template>
  <el-card class="box-card">
    <!--搜索框-->
    <el-form :inline="true">
      <el-form-item label="吧主ID">
        <el-input v-model='adminId' placeholder="请输入吧主ID"></el-input>
      </el-form-item>
      <el-form-item label="吧主名称">
        <el-input v-model="adminName" placeholder="请输入吧主名称"></el-input>
      </el-form-item>
      <el-form-item label="吧主状态" v-show="Index===1">
        <el-select  v-model="adminState" placeholder="请选择吧主状态">
          <el-option label="全部" value=''></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="停用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchBarHostList" ><i class="el-icon-search"></i>&nbsp;&nbsp;查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="default" @click="clearInput"><i class="el-icon-refresh"></i>&nbsp;&nbsp;重置</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->

    <el-tabs type="border-card" style="height: 100%;">
      <el-button type="success" :disabled="Index===1" @click="showList(1)">审核通过</el-button>
      <el-button type="primary" :disabled="Index===2" @click="showList(2)">待审核</el-button>
      <el-button type="danger" :disabled="Index===3" @click="showList(3)">审核拒绝</el-button>
      <div v-if="Index===1">
        <el-table
          :data="tableData"
          height="380"
          style="width: 100%;margin-top: 20px;">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left"  inline class="demo-table-expand moreInfo">
                <el-form-item label="管理员：">
                  <span>{{ props.row.adminName }}</span>
                </el-form-item>
                <el-form-item label="管理员类型：">
                  <span>{{ props.row.adminType }}</span>
                </el-form-item>
                <el-form-item label="管理员状态：">
                  <span>{{ props.row.adminState===true?'启用状态':'停用状态' }}</span>
                </el-form-item>
                <el-form-item label="审核意见：">
                  <span>{{ props.row.checkComment }}</span>
                </el-form-item>
                <el-form-item label="停用原因：" v-if="props.row.adminState===false">
                  <span>{{ props.row.remark }}</span>
                </el-form-item>
                <el-form-item label="创建时间：">
                  <span>{{ props.row.createTime }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="管理员 ID"
            width="140">
            <template slot-scope="scope">
              {{scope.row.adminId}}
            </template>
          </el-table-column>
          <el-table-column
            label="管理员名称"
            prop="adminName"
            width="180">
          </el-table-column>
          <el-table-column
            label="管理员类型"
            prop="adminType"
            width="160">
          </el-table-column>
          <el-table-column
            label="电话"
            prop="adminPhone"
            width="160">
          </el-table-column>
          <el-table-column
            label="管理员状态">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.adminState"
                @change="adminDisable(scope.row)"
                active-color="#13ce66"
                inactive-color="#ff4949 ">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
          >
            <!--查看-->
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="查看创建人信息" placement="bottom-start">
                <el-button size='small' icon="el-icon-search"  plain type="primary"  circle style="margin-left: 10px" @click="getUserInfo(scope.row.createId)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
         <!-- <el-table-column
            fixed="right"
            label="操作"
          >
            &lt;!&ndash;查看，停用&ndash;&gt;
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="查看创建人信息" placement="bottom-start">
                <el-button size='small' icon="el-icon-search"  plain type="primary"  circle style="margin-left: 10px" @click="getUserInfo(scope.row.createId)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>-->
        </el-table>
        <!--分页-->
        <el-pagination
          @size-change="getAdminListPass"
          @current-change="getAdminListPass"
          :current-page.sync="currentPage"
          :page-sizes="[5,10,15]"
          :page-size.sync="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total1"
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
            key="1"
            label="管理员ID"
            width="160">
            <template slot-scope="scope">
              {{scope.row.adminId}}
            </template>
          </el-table-column>
          <el-table-column
            key="2"
            prop="adminName"
            label="管理员名称"
            width="180">
          </el-table-column>
          <el-table-column
            key="3"
            prop="adminPhone"
            label="电话"
            width="180">
          </el-table-column>
          <el-table-column
            key="4"
            label="管理员类型"
            width="180">
            <template slot-scope="scope">
              {{ scope.row.adminType}}
            </template>
          </el-table-column>
          <el-table-column
            key="5"
            fixed="right"
            label="操作"
          >
            <!--查看，停用-->
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="审核管理员申请" placement="bottom-start">
                <el-button  size='small' type="success" plain icon="el-icon-check"  circle @click="getAdminApply(scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="查看创建人信息" placement="bottom-start">
                <el-button size='small' icon="el-icon-search"  plain type="primary"  circle style="margin-left: 10px" @click="getUserInfo(scope.row.createId)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="getAdminListWait"
          @current-change="getAdminListWait"
          :current-page.sync="currentPage"
          :page-sizes="[5,10,15]"
          :page-size.sync="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total2"
          style="margin-top: 10px">
        </el-pagination>
        <el-dialog title="管理员审核" :visible.sync="dialogFormVisible">
          <el-form>
            <el-form-item label="审核意见" :label-width="formLabelWidth">
              <el-input v-model="comments" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="审核结果" :label-width="formLabelWidth">
              <el-switch
                style="display: block;margin-top: 9px;"
                v-model="value"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="通过"
                inactive-text="拒绝">
              </el-switch>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="checkOperation">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div v-if="Index===3">
        <el-table
          :data="tableData3"
          height="380"
          style="width: 100%;margin-top: 20px"
        >
          <el-table-column
            key="8"
            label="管理员ID"
            width="100">
            <template slot-scope="scope">
              {{scope.row.adminId}}
            </template>
          </el-table-column>
          <el-table-column
            key="9"
            prop="adminName"
            label="管理员名称"
            width="160">
          </el-table-column>
          <el-table-column
            key="10"
            prop="adminPhone"
            label="电话"
            width="160">
          </el-table-column>
          <el-table-column
            key="11"
            label="管理员类型"
            width="160">
            <template slot-scope="scope">
              {{ scope.row.adminType}}
            </template>
          </el-table-column>
          <el-table-column
            key="12"
            prop="checkComment"
            label="审核意见"
            width="180">
          </el-table-column>
          <el-table-column
            key="13"
            prop="createTime"
            label="创建时间"
            width="180">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
          >
            <!--查看-->
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="查看创建人信息" placement="bottom-start">
                <el-button size='small' icon="el-icon-search"  plain type="primary"  circle style="margin-left: 10px" @click="getUserInfo(scope.row.createId)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
          @size-change="getAdminListRefuse"
          @current-change="getAdminListRefuse"
          :current-page.sync="currentPage"
          :page-sizes="[5,10,15]"
          :page-size.sync="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total3"
          style="margin-top: 10px">
        </el-pagination>
      </div>
    </el-tabs>
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

  </el-card>

</template>

<script>
  import {
    reqGetHostList,
    reqHostState,
    reqCheck,
    reqUserInfo
  } from "../../api/users";
  import {mapState} from "vuex";
  export default {
    name:'barHost',
    data(){
      return{
        adminId:'',
        adminName:'',
        adminState:'',
        checkState:'',
        Index:1,
        currentPage: 1,
        size:5,
        total1:0,
        total2:0,
        total3:0,
        tableData:[],//审核通过
        tableData2:[],//待审核
        tableData3:[],//审核拒绝
        comments:'',
        formLabelWidth:'120px',
        dialogFormVisible:false,
        value:true,
        applyInfo:{},
        userInfo:{},
        dialogVisibleUser:false,
      }
    },
    computed: {
      ...mapState(['url']),
    },
    created() {
      this.getAdminListPass()
      this.getAdminListWait()
      this.getAdminListRefuse()
    },
    methods:{
      clearInput(){
        this.adminId='',
        this.adminName='',
        this.adminState=''
        if (this.Index===1){
          this.getAdminListPass()
        }else if (this.Index===2){
          this.getAdminListWait()
        }else{
          this.getAdminListRefuse()
        }
      },
      showList(index) {
        this.clearInput()
        if (index === 1) {
          this.Index = 1
        } else if (index === 2) {
          this.Index = 2
        }else if (index === 3) {
          this.Index = 3}
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
      //管理员类型，1-贴吧管理员 2-贴吧助手 3-校园贴吧管理员 4-校园贴吧助手  adminType
      //管理员状态, 1-启用 2-停用 adminState
      //审核状态,0-待审核,1-审核通过,2-审核拒绝 checkState
      /*获取吧主列表 审核通过的*/
      async getAdminListPass(){
        const rLoading = this.openLoading()
        const result=await reqGetHostList(this.adminId,this.adminName,this.adminState,1,this.currentPage,this.size)
        rLoading.close()
        result.data.data.forEach(el=>{
          if(el.adminType===1){
            el.adminType='贴吧管理员'
          }else if(el.adminType===2){
            el.adminType='贴吧助手'
          } else if(el.adminType===3){
            el.adminType='校园贴吧管理员'
          }else if(el.adminType===4){
            el.adminType='校园贴吧助手'
          }
          if(el.adminState===0){
            el.adminState=false
          }else if(el.adminState===1){
            el.adminState=true
          }
        })
        if (result.status===200){
          this.tableData=result.data.data
          this.total1 = result.data.totalRows
        }else{
          this.$message.error('加载数据失败，请重试！')
        }
      },
      /*获取吧主列表 待审核的*/
      async getAdminListWait(){
        const rLoading = this.openLoading()
        const result=await reqGetHostList(this.adminId,this.adminName,this.adminState,0,this.currentPage,this.size)
        rLoading.close()
        result.data.data.forEach(el=>{
          if(el.adminType===1){
            el.adminType='贴吧管理员'
          }else if(el.adminType===2){
            el.adminType='贴吧助手'
          } else if(el.adminType===3){
            el.adminType='校园贴吧管理员'
          }else if(el.adminType===4){
            el.adminType='校园贴吧助手'
          }
        })
        if (result.status===200){
          this.tableData2=result.data.data
          this.total2 = result.data.totalRows
        }else{
          this.$message.error('加载数据失败，请重试！')
        }
      },
      /*获取吧主列表 审核拒绝的*/
      async getAdminListRefuse(){
        const rLoading = this.openLoading()
        const result=await reqGetHostList(this.adminId,this.adminName,this.adminState,2,this.currentPage,this.size)
        rLoading.close()
        result.data.data.forEach(el=>{
          if(el.adminType===1){
            el.adminType='贴吧管理员'
          }else if(el.adminType===2){
            el.adminType='贴吧助手'
          } else if(el.adminType===3){
            el.adminType='校园贴吧管理员'
          }else if(el.adminType===4){
            el.adminType='校园贴吧助手'
          }
        })
        if (result.status===200){
          this.tableData3=result.data.data
          this.total3 = result.data.totalRows
        }else{
          this.$message.error('加载数据失败，请重试！')
        }
      },

      getAdminApply(applyInfo){
        this.dialogFormVisible = true
        this.adminId=applyInfo.adminId
        this.applyInfo=applyInfo
      },
      //审核管理员
      async checkOperation(){
        if(this.comments.trim()===''){
          return this.$message.error('审核标记不能为空！')
        }
        if(this.value===true){//通过  /*通过审核*/
          const result=await reqCheck(this.adminId,1,this.comments.trim())
          if(result.data===''){
            this.$message.success('同意创建管理员操作成功！')
            this.tableData2.splice(this.applyInfo,1)
          }else  if(result.data.status === 220000) {
            //失败，提示失败
            let msg = result.data.message
            this.$message.error(msg.split('-')[0])
          }
        }else if (this.value===false){//拒绝   /*未通过审核*/
          const result=await reqCheck(this.adminId,2,this.comments.trim())
          if(result.data===''){
            this.$message.success('拒绝创建管理员操作成功！')
            this.tableData2.splice(this.applyInfo,1)
          }else  if(result.data.status === 220000) {
            //失败，提示失败
            let msg = result.data.message
            this.$message.error(msg.split('-')[0])
          }
        }
        this.dialogFormVisible=false
      },
      /*搜索功能*/
      searchBarHostList(){
        if(this.Index===1){
          this.getAdminListPass()
        }
        if(this.Index===2){
          this.getAdminListWait()
        }
        if(this.Index===3){
          this.getAdminListRefuse()
        }
      },
      //管理员停用，启用
      adminDisable(admin){
        let flag = admin.adminState //保存点击之后v-modeld的值(true，false)
        admin.adminState = !admin.adminState //保持switch点击前的状态
        if (admin.adminState===true){//停用,
          this.$prompt('请输入原因（不超过15个字）', '停用原因', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /^.{1,15}$/,
            inputErrorMessage: '输入字数长度1~15'
          }).then(({ value }) => {
            const result= reqHostState(admin.adminId,value)
            if(result.data===undefined){
              admin.adminState =false
              admin.remark=value
              // this.tableData.splice(postBar,1)
              this.$message({
                type: 'success',
                message: '停用贴吧成功!'
              });
            }else {
              this.$message({
                type: 'error',
                message: '操作失败，请重试！!'
              });
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消贴吧停用操作'
            });
          });
        }else if (admin.adminState===false){//启用
          this.$confirm('确定启用该贴吧吗, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const result=reqHostState(admin.adminId,'')
            if(result.data===undefined){
              admin.adminState = true
              this.$message({
                type: 'success',
                message: '贴吧启用成功!'
              });
            }else{
              this.$message({
                type: 'error',
                message: '操作失败，请重试！!'
              });
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消启用'
            });
          });
        }

      },
    }
  }
</script>

<style scoped>
.box-card{
  height: 100%;
}
.demo-table-expand {
  font-size: 0;
}
.moreInfo {
  color: #99a9bf !important;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
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
