<template>
  <el-card class="box-card">
    <!--搜索框-->
    <el-form :inline="true">
      <el-form-item label="文件ID">
        <el-input v-model='fileId' placeholder="请输入文件ID"></el-input>
      </el-form-item>
      <el-form-item label="文件名">
        <el-input v-model="fileName" placeholder="请输入文件名"></el-input>
      </el-form-item>
      <el-form-item label="用户ID" >
        <el-input v-model="userId" placeholder="请输入用户ID"></el-input>
      </el-form-item>
      <el-form-item label="用户名" >
        <el-input v-model="userNickname" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getFilesList"><i class="el-icon-search"></i>&nbsp;&nbsp;查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="default" @click="clearInput"><i class="el-icon-refresh"></i>&nbsp;&nbsp;重置</el-button>
      </el-form-item>
    </el-form>
    <el-tabs type="border-card" style="height: 100%;">
      <!--表格-->
      <el-table
        :data="tableData"
        stripe
        height="350"
        style="width: 100%;margin-top: 20px">
        <el-table-column
          label="ID"
          width="80">
          <template slot-scope="scope">
            {{scope.row.fileId}}
          </template>
        </el-table-column>
        <el-table-column
          prop="fileName"
          label="文件名"
          width="180">
        </el-table-column>
        <el-table-column
          label="用户ID"
          width="80">
          <template slot-scope="scope">
            {{scope.row.uploadUserId}}
          </template>
        </el-table-column>
        <el-table-column
          prop="uploadUserName"
          label="上传者"
          width="160">
        </el-table-column>
        <el-table-column
          label="文件大小"
          width="120">
          <template slot-scope="scope">
            {{changeSize(scope.row.fileSize)}}
          </template>
        </el-table-column>
        <el-table-column
          label="下载次数"
          width="120">
          <template slot-scope="scope">
            {{scope.row.downloadTimes}}&nbsp;次
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="上传时间"
          width="180">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200"
        >
          <!--查看，停用-->
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="下载查看" placement="bottom-start">
              <a :href="url+scope.row.fileUrl" :download="scope.row.fileName">
               <el-button size='small'  icon="el-icon-download"  plain type="primary"  circle ></el-button>
              </a>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="查看用户信息" placement="bottom-start">
              <el-button size='small' icon="el-icon-search"  plain type="success"  circle style="margin-left: 10px" @click="getUserInfo(scope.row.uploadUserId)" ></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="查看贴吧详情" placement="bottom-start">
              <el-button size='small' icon="el-icon-monitor"  plain type="success"  circle style="margin-left: 10px" @click="getPostBarInfo(scope.row)" ></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除文件" placement="bottom-start">
              <el-button size='small' icon="el-icon-delete"  plain type="danger"  circle style="margin-left: 10px" @click="deleteFile(scope.row)" ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>

      </el-table>
      <!--分页-->
      <el-pagination
        @size-change="getFilesList"
        @current-change="getFilesList"
        :current-page.sync="currentPage"
        :page-sizes="[5,10,15]"
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="margin-top: 10px">
      </el-pagination>

    </el-tabs>

    <!--对话框-->
   <!-- 用户详情-->
    <el-dialog
      title="用户信息"
      :visible.sync="dialogVisibleUser"
      width="40%">
      <div>
        <img class="headImg" :src="url+userInfo.headImgUrl">
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
    <!--贴吧详情-->
    <el-dialog title="贴吧信息" :visible.sync="dialogVisiblePostBar" width="40%">
      <div>
        <img class="headImg" :src="url+postBarInfo.postBarImg">
        <div class="userInfo">
          <p><b>贴吧名：</b>{{postBarInfo.postBarName}}</p>
          <p><b>贴吧简介：</b>{{postBarInfo.postBarIntroduction}}</p>
          <p><b>所属学校：</b>{{postBarInfo.campusName}}</p>
          <p><b>管理员：</b>{{postBarInfo.adminName}}</p>
          <p><b>贴吧状态：</b>{{postBarInfo.postBarState===0? '停用' : '启用'}}</p>
          <p><b>贴吧类型：</b>{{postBarInfo.postBarType===1? '普通贴吧' : '校园官方贴吧'}}</p><!--贴吧类型,1-普通贴吧,2-校园官方贴吧-->
          <p><b>贴子数：</b>{{postBarInfo.postNum}}</p>
          <p><b>关注数：</b>{{postBarInfo.attentionNum}}</p>
          <p><b>创建时间：</b>{{postBarInfo.createTime}}</p>

        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisiblePostBar = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisiblePostBar = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
    import {reqBarFiles,reqPostBarInfo,reqDeleteFile} from "../../api/bar";
    import {reqUserInfo} from "../../api/users";
    import {mapState} from "vuex";
    export default {
      name: "material",
      data(){
        return{
          fileId:'',
          fileName:'',
          userId:'',
          userNickname:'',
          currentPage:1,
          pageSize:5,
          total:0,
          tableData:[],
          userInfo:{},
          postBarInfo:{},
          dialogVisibleUser:false,
          dialogVisiblePostBar:false,
        }
      },
      computed: {
        ...mapState(['url']),
      },
      created() {
        this.getFilesList()
      },
      methods:{

        //获取文件列表
        async getFilesList(){
          const rLoading = this.openLoading()
          const result=await reqBarFiles(this.fileId,this.fileName,this.userId,this.userNickname,this.currentPage,this.pageSize)
          rLoading.close()
         if (result.status===200){
           result.data.data.forEach(el=>{
             el.fileUrl=el.fileUrl.split('_')[1]
           })
           this.tableData=result.data.data
           this.total = result.data.totalRows
         }else{
           this.$message.error('加载数据失败，请重试！')
         }
       },
        //用户详情
        async getUserInfo(index){
          const result=await reqUserInfo(index)
          if(result.data.status===220000){
            this.$message.error('数据加载失败，请重试！')
          }else{
            this.dialogVisibleUser = true
            this.userInfo=result.data
          }
        },
        //贴吧详情
        async getPostBarInfo(file){
          const result=await reqPostBarInfo(file.postBarId)
          if(result.data.status===220000){
            this.$message.error('数据加载失败，请重试！')
          }else{
            this.dialogVisiblePostBar = true
            this.postBarInfo=result.data
            //console.log(this.postBarInfo)
          }
        },
        //删除文件
       deleteFile(file){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
            const result=reqDeleteFile(file.fileId)
            if (result.data===undefined){
              this.tableData.splice(file,1)
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }else{
              this.$message({
                type: 'error',
                message: '删除失败，请重试!'
              });
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        //清空搜索框
        clearInput(){
          this.fileId=''
          this.fileName=''
          this.userId=''
          this.userNickname=''
          this.getFilesList()
        },

        changeSize(size) {
           if (!size)
             return "";

           let num = 1024.00; //byte

           if (size < num)
             return size + " B";
           if (size < Math.pow(num, 2))
             return (size / num).toFixed(2) + " K"; //kb
           if (size < Math.pow(num, 3))
             return (size / Math.pow(num, 2)).toFixed(2) + " M"; //M
           if (size < Math.pow(num, 4))
             return (size / Math.pow(num, 3)).toFixed(2) + " G"; //G
           return (size / Math.pow(num, 4)).toFixed(2) + " T"; //T
         }
       }
    }
</script>

<style scoped>
  .box-card{
    height: 100%;
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
