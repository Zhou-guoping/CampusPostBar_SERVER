<template>
  <el-card class="box-card">
    <h3 style="margin-top: 0px"><em>我的贴吧详情</em></h3>
    <div class="demo-type">
      <div class="imgEdit">

        <viewer :image="postBarDetail.postBarImg" >
          <img  style="border: 2px solid #e4e4e4;margin:10px 20px; width: 80px;height: 80px;border-radius: 50% 50%" fit='fill' v-if="postBarDetail.postBarImg!==undefined"  v-lazy="url+postBarDetail.postBarImg"/>
        </viewer>
        <div class="imgIcon">
          <el-tooltip class="item" effect="dark" content="更改头像" placement="bottom-start" style="margin-left: 8px;">
            <i style="margin-left: 8px;color:#21a675;font-size: 25px;cursor:pointer;" class="el-icon-picture-outline" @click="dialogFormVisibleImg=true"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="修改密码" placement="bottom-start" style="margin-left: 10px;">
            <i style="margin-left: 90px;color:#21a675;font-size: 25px;cursor:pointer;" class="el-icon-lock" @click="dialogFormVisiblePWD=true"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="更换手机号" placement="bottom-start" style="margin-left: 10px;">
            <i style="margin-left: 8px;color: #21a675;font-size: 20px;cursor:pointer;" class="el-icon-mobile-phone" @click="dialogFormVisiblePhone=true"></i>
          </el-tooltip>
        </div>

      </div>
      <div class="detail"><!--贴吧类型,1-普通贴吧,2-校园官方贴吧 post_bar_type-->
        <div class="detail_data"><b>贴吧名称：</b><div class="dataShow">{{postBarDetail.postBarName}}</div></div>

        <div class="detail_data"><b>简介：</b>
          <div class="dataShow"  v-show="!edit">
            {{postBarDetail.postBarIntroduction!==''?postBarDetail.postBarIntroduction:'暂无简介'}}
            <el-tooltip class="item" effect="dark" content="编辑" placement="bottom-start" style="margin-left: 10px;">
              <i style="margin-left: 8px;color: #21a675;font-size: 20px;cursor:pointer;" class="el-icon-edit" @click="edit=true"></i>
            </el-tooltip>
          </div>
          <div v-show="edit">
            <el-input class="dataShow" style="width: 200px;" autofocus  v-model="introduce"></el-input>
            <el-tooltip class="item" effect="dark" content="取消" placement="bottom-start" style="margin-left: 10px;">
              <el-button size='medium' icon="el-icon-close"  plain type="primary"  circle @click="cancelEditIntro"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="提交" placement="bottom-start" style="margin-left: 10px;">
              <el-button size='medium' icon="el-icon-check"  plain type="success"  circle @click="editIntroduction"></el-button>
            </el-tooltip>
          </div>
        </div>

        <div class="detail_data"><b>贴吧类型：</b><div class="dataShow">{{postBarDetail.postBarType===1?'普通贴吧':postBarDetail.postBarType===2?'校园官方贴吧':''}}</div></div>

        <div class="detail_data"><b>学校：</b><div class="dataShow">{{postBarDetail.campusName}}</div></div>

        <div class="detail_data"><b>管理员：</b><div class="dataShow">{{postBarDetail.adminName}}</div></div>

        <div class="detail_data" ><b>联系电话：</b><div class="dataShow">{{adminInfo.adminPhone}}</div></div>

        <div class="detail_data" v-if="postBarDetail.checkComment!==''"><b>审核意见：</b><div class="dataShow">{{postBarDetail.checkComment}}</div></div>

        <div class="detail_data"><b>贴子数：</b><div class="dataShow">{{postBarDetail.postNum}}</div></div>

        <div class="detail_data"><b>关注数：</b><div class="dataShow">{{postBarDetail.attentionNum}}</div></div>

        <div class="detail_data"><b>创建时间：</b><div class="dataShow">{{postBarDetail.createTime}}</div></div>
      </div>

      <!--对话框-->
      <el-dialog title="修改密码" :visible.sync="dialogFormVisiblePWD">
        <el-form>
          <el-form-item label="旧密码" :label-width="formLabelWidth">
            <el-input v-model="newPassword" maxlength='16' type='password' placeholder="请输入旧密码" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" :label-width="formLabelWidth">
            <el-input v-model="oldPassword"  maxlength='16' placeholder="请输入新密码(6~16字符)" type='password' autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelEditPWD">取 消</el-button>
          <el-button type="primary" @click="editPassword">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="修改手机号" :visible.sync="dialogFormVisiblePhone">
        <el-form>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="password" maxlength='16' type='password' placeholder="请输入密码" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input v-model="phone" placeholder="请输入新手机号"  maxlength='11' autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelEditPhone">取 消</el-button>
          <el-button type="primary" @click="editPhone">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="修改头像" :visible.sync="dialogFormVisibleImg">
        <el-form><!--http://server.campus.com/fcs/file/upload-->
          <el-upload
            class="avatar-uploader"
            action="http://server.campus.com/fcs/file/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            accept="image/*"
            :on-error="upLoadError"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleImg = false">取 消</el-button>
          <el-button type="primary" @click.prevent.once="editHeadImg">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </el-card>
</template>

<script>
  import {mapActions, mapState} from "vuex";
  import {reqChangeHeadImg, reqChangeIntro} from "../../api/bar";
  import {reqChangePhone, reqChangePWD} from "../../api/system";
  import axios from 'axios'

  export default {
      name: "setting",
      data(){
        return{
          edit:false,
          edit1:false,
          introduce:'',
          dialogFormVisiblePWD:false,
          dialogFormVisiblePhone:false,
          dialogFormVisibleImg:false,
          formLabelWidth: '120px',
          oldPassword:'',
          newPassword:'',
          phone:'',
          password:'',
          imageUrl:'',
          dialogVisible: false,
          disabled: false,
          imgArr:[],
          allowAddImg: true,   // 上传达到限制后隐藏上传按钮
          fileInfo:{}
        }
      },

    computed: {
      ...mapState(['adminInfo','postBarDetail','url'])

    },
    created() {

    },

    mounted() {
      this.introduce=this.postBarDetail.postBarIntroduction

    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.fileInfo=res
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return  isLt2M;
      },
      upLoadError(){
        this.$message.error('图片上传失败,请重试！')
      },

      //取消
      cancelEditIntro(){
        this.edit=false
        this.introduce=this.postBarDetail.postBarIntroduction
      },
      cancelEditPhone(){
        this.phone=''
        this.password=''
        this.dialogFormVisiblePhone=false
      },
      cancelEditPWD(){
        this.oldPassword=''
        this.newPassword=''
        this.dialogFormVisiblePWD=false
      },
      //修改简介 reqChangeIntro
      async editIntroduction(){
        if (this.introduce.trim()===this.postBarDetail.postBarIntroduction){
          return this.$message.error('简介与原来一致')
        }
        const result=await reqChangeIntro(this.postBarDetail.postBarId,this.introduce.trim())
        if (result.data===''){
          this.$message.success('贴吧简介更改成功！')
          this.postBarDetail.postBarIntroduction=this.introduce
          this.edit=false
        }else{
          this.$message.error('修改失败，请重试！')
        }
      },
      //修改贴吧头像 reqChangeHeadImg
      async editHeadImg(){
        const result=await reqChangeHeadImg(this.postBarDetail.postBarId,this.fileInfo.fileUrl)
        if (result.data===''){
          this.$message.success('贴吧头像上传成功！')
          this.postBarDetail.postBarImg=this.fileInfo.fileUrl
          this.dialogFormVisibleImg=false
        }else{
          this.$message.error('贴吧头像上传失败，请重试！')
        }
      },
      //修改密码  reqChangePWD
      async editPassword(){
        if (this.newPassword.length<6){
          return this.$message.error('密码长度小于六位！')
        }
        if(this.$md5(this.oldPassword)===this.$md5(this.newPassword)){
          return this.$message.error('新密码与旧密码一致！')
        }
        const result=await reqChangePWD(this.$md5(this.oldPassword),this.$md5(this.newPassword))
        if (result.data===''){
          this.$message.success('密码修改成功,请重新登录！')
          this.dialogFormVisiblePWD=false
          this.oldPassword=''
          this.newPassword=''
          this.$router.push('/login')
        }else if(result.data.status === 220000){
          let msg = result.data.message
          this.$message.error(msg.split('-')[0])
        }else{
          this.$message.error('修改失败，请重试！')
        }
      },
      //更改绑定手机号 reqChangePhone
      async editPhone(){
        if(!(/^1[3456789]\d{9}$/.test(this.phone))){

          return this.$message.error("手机号码有误，请重填");
        }
        if (this.phone.trim()===this.adminInfo.adminPhone){
          return this.$message.error('联系电话与原来一致')
        }
        const result=await reqChangePhone(this.$md5(this.password),this.phone.trim())
        console.log(result);
        if (result.data===''){
          this.$message.success('手机号更改成功！')

        }else if(result.data.status === 220000){
          let msg = result.data.message
          this.$message.error(msg.split('-')[0])
        }else{
          this.$message.error('修改失败，请重试！')
        }
      }

    }
  }
</script>

<style scoped>
  .box-card{
    height: 100%;
  }

  .demo-type{
    width: 100%;
    height: 100%;
  }
  .imgEdit{
    display:flex;
    position: relative;
  }
  .imgIcon{
    position: absolute;
    bottom: 10px;
    left: 110px;
    font-size: 30px !important;
  }
  .detail{
    margin:10px 20px;
  }
  .detail_data{
    height: 40px !important;
    margin-top: 4px;
    display: flex;
    line-height: 40px;
  }
  .dataShow{
    margin-left: 10px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 50px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
