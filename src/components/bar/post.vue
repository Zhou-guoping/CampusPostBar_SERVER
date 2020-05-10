<template>
    <el-card class="box-card" minheight="100%">
      <!--搜索框-->
      <el-form :inline="true">
        <el-form-item label="贴子ID">
          <el-input v-model='postId' placeholder="请输入贴子ID"></el-input>
        </el-form-item>
        <el-form-item label="贴子内容">
          <el-input v-model="postContent" placeholder="请输入贴子内容"></el-input>
        </el-form-item>
        <el-form-item label="用户ID" >
          <el-input v-model="userId" placeholder="请输入用户ID"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" >
          <el-input v-model="userNickname" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getPostList"><i class="el-icon-search"></i>&nbsp;&nbsp;查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="default" @click="clearInput"><i class="el-icon-refresh"></i>&nbsp;&nbsp;重置</el-button>
        </el-form-item>
      </el-form>
      <!--贴子-->
      <div>
        <el-row >
          <el-col :span="24" v-for="(item,i) in postsList" :key="i" style="margin-top: 10px">
            <el-card :body-style="{ padding: '10px',margin:'10px 10px'}">
              <!--标题-->
              <el-row>
                <el-col :span="24"><h2 style="margin-top: 0px;">{{item.postTittle}}</h2></el-col>
              </el-row>
              <!--图片+内容-->
              <!--阅读全文-->
              <el-row :gutter="20" v-model="item.postId" v-show="item.showState===true">
                <!--图片-->
                <div  v-show="item.postContentImg[0]!==''" @click="showContent(i)">
                  <el-col :span="6"  >
                    <div style="display: flex;width: 100%;" v-if="item.postContentImg[0]!==item.videoUrl">
                      <viewer :images="item.postContentImg">
                        <el-image  style="width:100%;height:180px;padding:10px 0px;" fit="fill" v-show="item.videoUrl!==item.postContentImg[0]" lazy :src="url+item.postContentImg[0]"></el-image>
                      </viewer>
                    </div>
                    <div style="display: flex;width: 100%;" v-if="item.postContentImg[0]===item.videoUrl">
                      <!--视频-->
                      <video style="width:100%;max-height:180px;padding:10px 0px;" :src="url+item.videoUrl"></video>
                    </div>
                  </el-col>


                  <el-col :span="12">
                    <div style="width:100%;padding: 10px 0px;font-size: 18px;line-height: 24px;">
                      {{item.userNickname}}:&nbsp;{{item.postContent|capitalize}}
                    </div>
                  </el-col>
                </div>
                <div v-show="item.postContentImg[0]===''">
                  <el-col :span="18">
                    <div style="width:100%;padding: 10px 0px;font-size: 18px;line-height: 24px;">
                      {{item.userNickname}}:&nbsp;{{item.postContent|capitalize}}
                    </div>
                  </el-col>
                </div>
              </el-row>
              <!--收起-->
              <el-row :gutter="20" v-show="item.showState===false">
                <!--头像+用户名--><!--贴子类型,1-普通,2-精贴-->
                <el-col :span="24">
                  <div style="display: flex" >
                    <el-image  style="width:40px;height:40px;padding:10px 0px;border-radius: 10px" fit="fill" v-if="item.userHeadImgUrl!==undefined" lazy :src="url+item.userHeadImgUrl"></el-image>
                    <h3 style="margin-left: 10px">{{item.userNickname}}</h3>
                    <h4 style="margin-left: 20px">{{item.postType===1?'普通贴子':'精贴'}}</h4>
                  </div>
                </el-col>
                <!--点赞人数-->
                <el-col :span="24"><div style="height: 30px;color: #929292;line-height: 30px;">{{numberShow(item.likeNum)}}人喜欢该贴子</div></el-col>
                <!--内容-->
                <el-col :span="18"><div style="line-height: 30px;">{{item.postContent}}</div></el-col>
                <!--图片-->
                <el-col :span="18">
                  <div style="width: 100%;margin-top: 10px;"  v-if="item.postContentImg!==''&&item.postContentImg[0]!==item.videoUrl">
                    <viewer :images="item.postContentImg" >
                      <img  style="width:90%;max-height:400px;margin: 10px 0px;" v-for="(imgUrl,i) in item.postContentImg"  :key="i" lazy :src="url+imgUrl">
                    </viewer>
                  </div>
                  <div style="width: 100%;margin-top: 10px;" v-if="item.postContentImg[0]===item.videoUrl">
                    <!--视频-->
                    <a style='text-decoration: none;' :href="url+item.videoUrl"><video style="width:90%;max-height:400px;margin:10px 0px;"  :src="url+item.videoUrl"></video></a>
                  </div>
                </el-col>
                <!--时间-->
                <el-col :span="24">
                  <div>发布于&nbsp;&nbsp;{{item.createTime|formatTime}}</div>
                </el-col>
              </el-row>
              <!--底部评论点赞-->
              <el-row style="margin-top: 10px">
                <el-col :span="16">
                  <el-tag size="medium" style="height: 30px;font-size: 16px;text-align: center;margin-right: 20px"><i class="el-icon-thumb" style="margin-right: 10px;transform:rotate(90deg); "></i>{{numberShow(item.likeNum)}}</el-tag>
                  <el-tag size="medium" style="height: 30px;font-size: 16px;text-align: center" v-if="item.showComment===false" @click.prevent="getPostComment(i,item)">
                    <i class="el-icon-chat-line-round" style="margin-right: 10px;"></i><span>{{numberShow(item.commentNum)}}</span>
                  </el-tag>
                  <el-tag size="medium" style="height: 30px;font-size: 16px;text-align: center" v-else @click.prevent="closeComment(i)">
                    <i class="el-icon-chat-line-round" style="margin-right: 10px;"></i><span>收起评论</span>
                  </el-tag>
                  <!--删除贴子-->
                  <el-tag size="medium" type="danger" style="width:60px;height: 30px;font-size: 16px;text-align: center;margin-left: 20px"  @click.prevent="deletePost(i,item)"><i class="el-icon-delete"></i></el-tag>
                </el-col>
                <el-col :span="4" v-show="item.showState===false">
                  <el-tag size="medium" style="height: 30px;font-size: 16px;text-align: center;margin-left: 20px;cursor:pointer;" @click="showClose(i)">点我收起<i class="el-icon-arrow-up" style="margin-left: 10px;"></i></el-tag>
                </el-col>
                <el-col :span="4" v-show="item.showState===true">
                  <el-tag size="medium" style="height: 30px;font-size: 16px;text-align: center;margin-left: 20px;cursor:pointer;" @click="showContent(i)">阅读全文<i class="el-icon-arrow-down" style="margin-left: 10px;"></i></el-tag>
                </el-col>
              </el-row>
              <!--评论-->
              <el-card class="box-card"  style="margin-top: 20px" v-if="item.showComment"><!--&&item.commentNum!=0-->
                <div slot="header" class="clearfix">
                  <span>{{numberShow(item.commentNum)}}条评论</span>
                </div>
                <div v-for="(it,j) in item.commentList" :key="it.commentId">
                  <!--头像，昵称，时间-->
                  <el-row :gutter="20">
                    <el-col :span="16">
                      <div style="display: flex" >
                        <el-image  style="width:40px;height:40px;padding:10px 0px;border-radius: 10px" fit="fill" v-if="it.userHeadImgUrl!==undefined" lazy :src="url+it.userHeadImgUrl"></el-image>
                        <h3 style="margin-left: 10px">{{it.userNickname}}</h3>
                        <h5 style="margin-left: 10px;font-weight: normal;">第&nbsp;{{it.floorNum}}&nbsp;楼</h5>
                      </div>
                    </el-col>
                    <el-col :span="4"><h4 style="margin-left: 20px;font-weight: normal">{{it.createTime|formatTime}}</h4></el-col>
                  </el-row>
                  <!--评论内容-->
                  <el-row :gutter="20">
                    <el-col :span="20" style="padding-left: 60px"><div style="line-height: 28px">{{it.commentContent}}</div></el-col>
                  </el-row>
                  <!--评论底部  评论点赞数，查看更多回复，删除-->
                  <el-row style="margin-top: 20px;padding-bottom:10px;border-bottom: 1px solid #e4e4e4;">
                    <el-col :span="16">
                      <el-button type="text"  style="height: 30px;font-size: 16px;text-align: center;padding-left:10px;margin-right: 20px"><i class="el-icon-thumb" style="margin-right: 10px;transform:rotate(90deg); "></i>{{numberShow(it.likeNum)}}</el-button>
                      <el-button type="text" style="height: 30px;font-size: 16px;text-align: center;cursor:pointer;" v-if="it.replyNum!==0" @click.prevent="getCommentReply(j,it)">查看&nbsp;{{numberShow(it.replyNum)}}&nbsp;条回复</el-button>
                      <el-button type="text" style="height: 30px;font-size: 16px;text-align: center" v-else>无回复</el-button>
                      <!--删除评论-->
                      <el-button type="text " style="height: 30px;font-size: 16px;text-align: center;margin-left: 20px;color: #ff3366;cursor:pointer;"  @click.prevent="deleteComment(j,it)"><i class="el-icon-delete"></i></el-button>
                    </el-col>
                  </el-row>
                  <!--更多回复-->
                  <el-dialog
                    title="更多回复"
                    :visible.sync="dialogVisible"
                    width="60%">
                    <el-card class="box-card">
                      <div>
                        <!--头像，昵称，时间-->
                        <el-row :gutter="20">
                          <el-col :span="16">
                            <div style="display: flex" >
                              <el-image  style="width:40px;height:40px;padding:10px 0px;border-radius: 10px" fit="fill" v-if="commentContent.userHeadImgUrl!==undefined" lazy :src="url+commentContent.userHeadImgUrl"></el-image>
                              <h3 style="margin-left: 10px">{{commentContent.userNickname}}</h3>
                            </div>
                          </el-col>
                          <el-col :span="8"><h4 style="margin-left: 20px;font-weight: normal">{{commentContent.createTime|formatTime}}</h4></el-col>
                        </el-row>
                        <!--评论内容-->
                        <el-row :gutter="20">
                          <el-col :span="20" style="padding-left: 60px"><div style="line-height: 20px">{{commentContent.commentContent}}</div></el-col>
                        </el-row>
                        <!--评论底部  评论点赞数，删除-->
                        <el-row style="padding-bottom:10px;border-bottom: 10px solid #e4e4e4;">
                          <el-col :span="16">
                            <el-button type="text"  style="height: 30px;font-size: 16px;text-align: center;padding-left:10px;margin-right: 20px">
                              <i class="el-icon-thumb" style="margin-right: 10px;transform:rotate(90deg); "></i>{{numberShow(it.likeNum)}}
                            </el-button>
                          </el-col>
                        </el-row>
                      </div>
                      <div v-for="(one,k) in replyList" :key="one.replyId">
                        <el-row :gutter="20">
                          <el-col :span="16">
                            <div style="display: flex" >
                              <el-image  style="width:40px;height:40px;padding:10px 0px;border-radius: 10px" fit="fill" v-if="one.userHeadImgUrl!==undefined" lazy :src="url+one.userHeadImgUrl"></el-image>
                              <h3 style="margin-left: 10px">{{one.userNickname}}<span v-if="one.originUserNickname!==null&&one.userNickname!=one.originUserNickname"><span>&nbsp;回复&nbsp;</span>{{one.originUserNickname}}</span></h3>
                            </div>
                          </el-col>
                          <el-col :span="4"><h4 style="margin-left: 20px;font-weight: normal">{{one.createTime|formatTime}}</h4></el-col>
                        </el-row>
                        <!--评论内容-->
                        <el-row :gutter="20">
                          <el-col :span="20" style="padding-left: 60px"><div style="line-height: 28px">{{one.replyContent}}</div></el-col>
                        </el-row>
                        <!--评论底部  评论点赞数，查看更多回复，删除-->
                        <el-row style="padding-bottom:10px;border-bottom: 1px solid #e4e4e4;">
                          <el-col :span="16">
                            <el-button type="text"  style="height: 30px;font-size: 16px;text-align: center;padding-left:10px;margin-right: 20px">
                              <i class="el-icon-thumb" style="margin-right: 10px;transform:rotate(90deg); "></i>{{numberShow(one.likeNum)}}
                            </el-button>
                            <!--删除回复-->
                            <el-button type="text " style="height: 30px;font-size: 16px;text-align: center;margin-left: 20px;color: #ff3366"  @click.prevent="deleteCommentReply(k,one)"><i class="el-icon-delete"></i></el-button>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="footer_hint" @click.prevent="getMoreReply">{{footerText3}}</div>
                    </el-card>
                  </el-dialog>
                </div>
                <div class="footer_hint" @click.prevent="getMoreComment">{{footerText2}}</div>
              </el-card>
            </el-card>
          </el-col>
        </el-row>
        <div class="footer_hint" @click.prevent="getMorePost">{{footerText}}</div>
      </div>


    </el-card>
</template>

<script>
    import {mapState} from "vuex";
    import {
      reqDeleteCommentReply,
      reqDeletePost,
      reqDeletePostComment,
      reqGetCommentsReply,
      reqGetPosts,
      reqPostComments
    } from "../../api/bar";
    export default {
      name: "post",
      data(){
        return{
          postId:'',
          postContent:'',
          userId:'',
          userNickname:'',
          total:0,
          total2:0,
          total3:0,
          page:1,
          page2:1,
          page3:1,
          pageSize:10,
          postsList:[],
          commentList:[],
          replyList:[],
          footerText:'',
          footerText2:'',
          footerText3:'',
          index:0,
          index2:0,
          dialogVisible:false,
          commentContent:{},
          post:{},
          videoUrl:'',
          playerOptions : {
            playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
            autoplay: false, //如果true,浏览器准备好时开始回放。
            muted: false, // 默认情况下将会消除任何音频。
            loop: false, // 导致视频一结束就重新开始。
            preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
            language: 'zh-CN',
            aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
            fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
            sources: [{
              type: "video/mp4",//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
              src: "" //url地址
            }],
            poster: "", //你的封面地址
            // width: document.documentElement.clientWidth, //播放器宽度
            notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
            controlBar: {
              timeDivider: true,
              durationDisplay: true,
              remainingTimeDisplay: false,
              fullscreenToggle: true  //全屏按钮
            }
          }
        }
      },
      computed: {
        ...mapState(['url']),
      },
      filters: {
        capitalize: function (value) {
          if (!value) return '';
          value = value.toString();
          if (value.length > 200) {
            return value.substr(0, 200) + '...';
          } else {
            return value;
          }
        },
        formatTime: function (timeStamp) {
          let dateTime = new Date(timeStamp);
          let no1new = dateTime.valueOf();
          let year = dateTime.getFullYear();
          let month = dateTime.getMonth() + 1;
          let day = dateTime.getDate();
          let hour = dateTime.getHours();
          let minute = dateTime.getMinutes();
          let second = dateTime.getSeconds();
          let now = new Date();
          let now_new = now.valueOf();
          let milliseconds = 0;
          let timeSpanStr;
          milliseconds = now_new - no1new;
          if (milliseconds <= 1000 * 60 * 1) {
            timeSpanStr = '刚刚';
          }else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
            timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
          }else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
            timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
          }else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
            timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
          }else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
            // timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
            timeSpanStr =  month + '-' + day
          }else {
            // timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
            timeSpanStr = year + '-' + month + '-' + day
          }
          return timeSpanStr;

        },
      },
      created() {
        this.getPostList()
      },
      methods:{
        showContent(item){
          this.postsList[item].showState=false
        },
        showClose(item){
          this.postsList[item].showState=true
        },
        showComment(item){
          this.postsList[item].showComment=true
        },
        closeComment(item){
          this.postsList[item].showComment=false
        },
        clearInput(){
          this.postId=''
          this.postContent=''
          this.userId=''
          this.userNickname=''
          this.getPostList()
        },
        //处理数字显示
        numberShow(number){
          if (number/100000000>=1){
            return number=(number/100000000).toFixed(2)+'亿'
          }else if (number/100000000<1&&number/10000>=1){
            return number=(number/10000).toFixed(2)+'万'
          }else if (number/10000<1){
            return number=number/1
          }
        },
        //postContentImg: "pic_group1/M00/00/02/wKgBhV6vdveABiY7AAVCfk40tSw135.jpg,pic_group1/M00/00/02/wKgBhV6vdv2AdsuLAAluHSeLRjM619.jpg"
        //获取贴子列表
        async getPostList(){
          const rLoading = this.openLoading();
          const result=await reqGetPosts(this.postId,this.postContent,this.userId,this.userNickname,this.page,this.pageSize)
          if (result.status===200){
            this.total=result.data.totalRows
            result.data.data.forEach(el=>{
              el.showState=true
              el.showComment=false
              el.commentList=[]
              el.postContentImg=el.postContentImg.split(',')
              for (let i=0;i<el.postContentImg.length;i++){
                if (el.postContentImg[i].split('_')[0]==='pic'){
                  el.postContentImg[i]=el.postContentImg[i].split('_')[1]
                }else if (el.postContentImg[i].split('_')[0]==='file'){
                  el.postContentImg[i]=el.postContentImg[i].split('_')[1]
                  el.videoUrl=el.postContentImg[i]
                  this.playerOptions['sources'][0]['src'] =  el.videoUrl;
                }
              }
            })
            if (this.postId===''&&this.postContent===''&this.userId===''&this.userNickname===''){
              this.postsList=this.postsList.concat(result.data.data)
            }else{
              this.postsList=result.data.data
            }
            if(result.data.data.length===0||result.data.data.length<this.pageSize){
              this.footerText='暂无更多内容'
            }else{
              this.footerText='加载更多'
            }
            rLoading.close()
          }else{
            this.$notify({
              title: '错误',
              message: '数据加载失败，请重试！',
              type: 'error'
            });
          }

        },
        //获取更多贴子
        getMorePost(){
          if(this.footerText==='加载更多'){
            this.page++
            this.getPostList()
          }

        },
        //获取贴子评论列表 commentList
        async getPostComment(index,post){
          this.index=index
          this.post=post
          const result=await reqPostComments(post.postId,this.page2,this.pageSize)
          if (result.status===200){
            this.postsList[index].commentList=this.postsList[index].commentList.concat(result.data.data)
            this.postsList[index].showComment=true
            this.postsList[index].commentList.forEach(item=>{
              item.replyList=[]
            })
            this.total2=result.data.totalRows
             if(result.data.data.length===0||result.data.data.length<this.pageSize){
               this.footerText2='暂无更多内容'
             }else{
               this.footerText2='加载更多'
             }
          }else{
            this.$notify({
              title: '错误',
              message: '数据加载失败，请重试！',
              type: 'error'
            });
          }
        },
        //加载更多评论
        getMoreComment(){
          if(this.footerText2==='加载更多'){
            this.page2++
            this.getPostComment(this.index,this.post)
          }
        },
        //获取评论回复列表  replyList commentId,page,pageSize
        async getCommentReply(index2,comment){
          this.index2=index2
          this.commentContent=comment
          this.dialogVisible=true
          const result=await reqGetCommentsReply(comment.commentId,this.page3,this.pageSize)
          if (result.status===200){
            this.postsList[this.index].commentList[index2].replyList=this.postsList[this.index].commentList[index2].replyList.concat(result.data.data)
            this.replyList=this.postsList[this.index].commentList[index2].replyList
           // console.log(this.replyList);
            this.total3=comment.replyNum;
            if(result.data.data.length===0||result.data.data.length<3){
              this.footerText3='暂无更多内容'
            }else{
              this.footerText3='加载更多'
            }

          }else{
            this.$notify({
              title: '错误',
              message: '数据加载失败，请重试！',
              type: 'error'
            });
          }
        },
        getMoreReply(){
          if(this.footerText3==='加载更多'){
            this.page3++
            this.getCommentReply(this.index2,this.commentContent)
          }
        },
        //删除贴子
        deletePost(index,post) {
          console.log(post)
          this.$confirm('此操作将永久删除该贴子, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const result = reqDeletePost(post.postId)
            if (result.data === undefined) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.postsList.splice(index,1)
            }else{
              this.$message({
                type: 'error',
                message: '删除失败，请重试！'
              });
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        //删除评论
        deleteComment(index,comment){
          this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const result = reqDeletePostComment(comment.commentId)
            if (result.data === undefined) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.postsList[this.index].commentList.splice(index, 1)
              this.postsList[this.index].commentNum=this.postsList[this.index].commentNum-1
            }else{
              this.$message({
                type: 'error',
                message: '删除失败，请重试！'
              });
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        //删除评论回复
        deleteCommentReply(index,reply){
          this.$confirm('此操作将永久删除该回复, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const result = reqDeleteCommentReply(reply.replyId)
            console.log(result);
            if (result.data === undefined) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.replyList.splice(index,1)
              this.replyList[this.index2].replyNum--
              this.postsList[this.index].commentList[this.index2].replyList.splice(index,1)
              this.postsList[this.index].commentList[this.index2].replyList.replyNum= this.postsList[this.index].commentList[this.index2].replyList.replyNum-1
            }else{
              this.$message({
                type: 'error',
                message: '删除失败，请重试！'
              });
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      }
    }
</script>

<style scoped>
  .box-card{
    overflow-y: scroll;
  }
  .footer_hint{
    height: 30px;
    width: 100%;
    text-align: center;
    line-height: 50px;
    color: #707070;
  }
</style>
