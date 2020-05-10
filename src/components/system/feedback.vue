<template>
  <el-card class="box-card">
    <!--列表展示用户反馈问题，可以查看详情。   共有3个tab页 功能反馈，贴吧建议,举报-->
    <!--表格-->
    <el-tabs type="border-card" style="height: 100%; margin-top: 20px">
      <el-button type="success" :disabled="Index===1" @click="showList(1)">功能反馈</el-button>
      <el-button type="primary" :disabled="Index===2" @click="showList(2)">贴吧建议</el-button>
      <el-button type="danger" :disabled="Index===3" @click="showList(3)">举报</el-button>
      <div v-if="Index===1">
        <el-table
          :data="tableData"
          height="400"
          style="width: 100%;margin-top: 20px;">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left"  class="demo-table-expand moreInfo">
                <el-form-item label="反馈内容：">
                  <span>{{ props.row.feedbackDesc }}</span>
                </el-form-item>
                <el-form-item  label="反馈图片：" >
                  <div style="display: flex;width: 100%">
                    <viewer :images="props.row.feedbackImgUrl" >
                      <img  style="width:100px;height:100px;margin: 10px 10px;" v-if="imgUrl!==undefined" v-for="(imgUrl,i) in props.row.feedbackImgUrl"  :key="i" lazy :src="url+imgUrl">
                    </viewer>
                  </div>

                <!--  <span><el-image style="width:100px;height:100px;margin: 10px 10px;" v-for="(imgUrl,i) in props.row.feedbackImgUrl"  :key="i" :src="url+imgUrl" lazy></el-image></span>-->
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="反馈 ID"
            prop="feedbackId" width="100px">
          </el-table-column>
          <el-table-column
            label="反馈内容"
            prop="feedbackDesc"
            width="180px">
            <template slot-scope="scope">
              {{scope.row.feedbackDesc|ellipsis}}
            </template>
          </el-table-column>

          <el-table-column
            label="反馈人"
            prop="userNickname"
            width="180px">
          </el-table-column>
          <el-table-column
            label="联系方式"
            width="180px"
          >
            <template slot-scope="scope">
              {{scope.row.contactInfo}}
            </template>
          </el-table-column>
          <el-table-column
            label="反馈时间"
            prop="createTime"
          width="180">
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
          >
            <!--查看-->
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="用户信息" placement="bottom-start">
                <el-button size='small' icon="el-icon-user"  plain type="primary"  circle @click="getUserInfo(scope.row)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
          @size-change="getFunFeedback"
          @current-change="getFunFeedback"
          :current-page.sync="page"
          :page-sizes="[5,10,15]"
          :page-size.sync="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total1"
          style="margin-top: 10px">
        </el-pagination>
      </div>

      <div v-if="Index===2">
        <el-table
          :data="tableData2"
          height="400"
          style="width: 100%;margin-top: 20px;">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left"  class="demo-table-expand moreInfo">
                <el-form-item label="建议内容：">
                  <span>{{ props.row.feedbackDesc }}</span>
                </el-form-item>
                <el-form-item  label="图片：">
                  <div style="display: flex;width: 100%">
                    <viewer :images="props.row.feedbackImgUrl" >
                      <img  style="width:100px;height:100px;margin: 10px 10px;" v-if="imgUrl!==undefined" v-for="(imgUrl,i) in props.row.feedbackImgUrl"  :key="i" lazy :src="url+imgUrl">
                    </viewer>
                  </div>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="ID"
            prop="feedbackId" width="100px">
          </el-table-column>
          <el-table-column
            label="建议内容"
            prop="feedbackDesc"
            width="180px">
            <template slot-scope="scope">
              {{scope.row.feedbackDesc|ellipsis}}
            </template>
          </el-table-column>

          <el-table-column
            label="建议人"
            prop="userNickname"
            width="180px">
          </el-table-column>
          <el-table-column
            label="联系方式"
            width="180px"
          >
            <template slot-scope="scope">
              {{scope.row.contactInfo}}
            </template>
          </el-table-column>
          <el-table-column
            label="建议时间"
            prop="createTime"
            width="180">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="160"
          >
            <!--查看-->
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="用户信息" placement="bottom-start">
                <el-button size='small' icon="el-icon-user"  plain type="primary"  circle @click="getUserInfo(scope.row)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
          @size-change="getSuggestion"
          @current-change="getSuggestion"
          :current-page.sync="page"
          :page-sizes="[5,10,15]"
          :page-size.sync="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total2"
          style="margin-top: 10px">
        </el-pagination>
      </div>
      <div v-if="Index===3">
        <el-table
          :data="tableData3"
          height="400"
          style="width: 100%;margin-top: 20px;">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left"  class="demo-table-expand moreInfo">
                <el-form-item label="举报内容：">
                  <span>{{ props.row.feedbackDesc }}</span>
                </el-form-item>
                <el-form-item  label="图片：">
                  <div style="display: flex;width: 100%">
                    <viewer :images="props.row.feedbackImgUrl" >
                      <img  style="width:100px;height:100px;margin: 10px 10px;" v-if="imgUrl!==undefined" v-for="(imgUrl,i) in props.row.feedbackImgUrl"  :key="i" lazy :src="url+imgUrl">
                    </viewer>
                  </div>

                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="ID"
            prop="feedbackId" width="100px">
          </el-table-column>
          <el-table-column
            label="举报内容"
            prop="feedbackDesc"
            width="180px">
            <template slot-scope="scope">
              {{scope.row.feedbackDesc|ellipsis}}
            </template>
          </el-table-column>

          <el-table-column
            label="举报人"
            prop="userNickname"
            width="180px">
          </el-table-column>
          <el-table-column
            label="联系方式"
            width="180px"
          >
            <template slot-scope="scope">
              {{scope.row.contactInfo}}
            </template>
          </el-table-column>
          <el-table-column
            label="举报时间"
            prop="createTime"
            width="180">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="160"
          >
            <!--查看-->
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="用户信息" placement="bottom-start">
                <el-button size='small' icon="el-icon-user"  plain type="primary"  circle @click="getUserInfo(scope.row)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
          @size-change="getReport"
          @current-change="getReport"
          :current-page.sync="page"
          :page-sizes="[5,10,15]"
          :page-size.sync="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total3"
          style="margin-top: 10px">
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
  </el-card>
</template>

<script>
  import {reqFeedback, reqFeedbackDetail} from "../../api/system";
    import {reqUserInfo} from "../../api/users";
  import {mapState} from "vuex";

    export default {
      name: "feedback",
      data(){
        return{
          Index:1,
          tableData:[],
          tableData2:[],
          tableData3:[],
          total1:0,
          total2:0,
          total3:0,
          page:1,
          pageSize:5,
          userInfo:{},
          feedbackInfo:{},
          dialogVisibleUser:false,
          dialogVisibleFeedback:false,
          imgUrls:''
        }
      },
      created() {
        this.getFunFeedback()
        this.getSuggestion()
        this.getReport()
      },
      computed: {
        ...mapState(['url']),
      },
      filters: {
        ellipsis(value) {
          if (!value) return "";
          if (value.length > 15) {
            return value.slice(0, 15) + "...";
          }
          return value;
        }
      },
      methods:{
        clearInput(){
          this.postBarId=''
          this.postBarName=''
          this.adminId=''
          this.postBarState=''
          if(this.Index===1){
            this.getFunFeedback()
          }else if(this.Index===2) {
            this.getSuggestion()
          }else if(this.Index===3){
            this.getReport()
          }
        },
        showList(index) {
          this.clearInput()
          if (index === 1) {
            this.Index = 1
          } else if (index === 2) {
            this.Index = 2
          }else if (index === 3) {
            this.Index = 3
          }
        },

        //获取反馈列表信息  feedbackType: 1-功能反馈 2-贴吧建议 3-举报
        async getFunFeedback(){
          const rLoading = this.openLoading()
          const result=await reqFeedback(1,this.page,this.pageSize)
          rLoading.close()
          if (result.status===200){
            if(result.data.status===220000) {
              let msg = result.data.message
              this.$message.error(msg.split('-')[0])
            }else{
              result.data.data.forEach(el=>{
                el.feedbackImgUrl=el.feedbackImgUrl.split(',')
                for (let i=0;i<el.feedbackImgUrl.length;i++){
                  el.feedbackImgUrl[i]=el.feedbackImgUrl[i].split('_')[1]
                }
              })
              this.tableData=result.data.data
              this.total1 = result.data.totalRows
            }
          }else{
            this.$message.error('加载数据失败，请重试！')
          }
        },
        async getSuggestion(){
          const rLoading = this.openLoading()
          const result=await reqFeedback(2,this.page,this.pageSize)
          rLoading.close()
          if (result.status===200){
            if(result.data.status===220000) {
              let msg = result.data.message
              this.$message.error(msg.split('-')[0])
            }else{
              result.data.data.forEach(el=>{
                el.feedbackImgUrl=el.feedbackImgUrl.split(',')
                for (let i=0;i<el.feedbackImgUrl.length;i++){
                  el.feedbackImgUrl[i]=el.feedbackImgUrl[i].split('_')[1]
                }
              })
              this.tableData2 = result.data.data
              this.total2 = result.data.totalRows
            }
          }else{
            this.$message.error('加载数据失败，请重试！')
          }
        },
        async getReport(){
          const rLoading = this.openLoading()
          const result=await reqFeedback(3,this.page,this.pageSize)
          rLoading.close()
          if (result.status===200){
            if(result.data.status===220000) {
              let msg = result.data.message
              this.$message.error(msg.split('-')[0])
            }else{
              result.data.data.forEach(el=>{
                el.feedbackImgUrl=el.feedbackImgUrl.split(',')
                for (let i=0;i<el.feedbackImgUrl.length;i++){
                  el.feedbackImgUrl[i]=el.feedbackImgUrl[i].split('_')[1]
                }
              })
              this.tableData3 = result.data.data
              this.total3 = result.data.totalRows
            }
          }else{
            this.$message.error('加载数据失败，请重试！')
          }
        },
        //反馈详情
        async getFeedbackDetail(feedback){
          const result=await reqFeedbackDetail(feedback.feedbackId)
          if(result.data.status===220000){
            this.$message.error('数据加载失败，请重试！')
          }else{
            this.feedbackInfo=result.data
          }
        },
        async getUserInfo(feedback){
          const result=await reqUserInfo(feedback.userId)
          if(result.data.status===220000){
            this.$message.error('数据加载失败，请重试！')
          }else{
            this.dialogVisibleUser = true
            this.userInfo=result.data
          }
        },
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
</style>
