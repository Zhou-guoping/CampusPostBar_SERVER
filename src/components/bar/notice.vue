<template>
  <el-card class="box-card">
    <!--搜索框-->
    <el-form :inline="true">
      <el-form-item label="公告ID">
        <el-input v-model='noticeId' placeholder="请输入公告ID"></el-input>
      </el-form-item>
      <el-form-item label="公告标题">
        <el-input v-model="noticeTitle" placeholder="请输入公告标题"></el-input>
      </el-form-item>
      <el-form-item label="公告内容" >
        <el-input v-model="noticeContent" placeholder="请输入公告内容"></el-input>
      </el-form-item>
      <el-form-item label="公告类型">
        <el-select  v-model="noticeType" placeholder="请选择公告类型">
          <el-option label="全部" value=''></el-option>
          <el-option label="一般" value="1"></el-option>
          <el-option label="重要" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchNotice"><i class="el-icon-search"></i>&nbsp;&nbsp;查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="default" @click="clearInput"><i class="el-icon-refresh"></i>&nbsp;&nbsp;重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="dialogFormVisible=true"><i class="el-icon-plus"></i>&nbsp;&nbsp;新增</el-button>
      </el-form-item>
    </el-form>
    <!--列表展示公告，共有2个tab页，已发布，待发布-->
    <!--表格-->
    <el-tabs type="border-card" style="height: 100%;">
      <el-button type="success" :disabled="Index===1" @click="showList(1)">已发布</el-button>
      <el-button type="primary" :disabled="Index===2" @click="showList(2)">待发布</el-button>
      <div v-if="Index===1">
        <el-table
          :data="tableData"
          stripe
          height="310"
          style="width: 100%;margin-top: 20px">
          <el-table-column
            key="1"
            label="ID"
            width="100">
            <template slot-scope="scope">
              {{scope.row.noticeId}}
            </template>
          </el-table-column>
          <el-table-column
            prop="noticeTitle"
            key="2"
            label="公告标题"
            width="180">
          </el-table-column>
          <el-table-column
            label="公告内容"
            key="3"
            width="180">
            <template slot-scope="scope">
              {{scope.row.noticeContent|ellipsis}}
            </template>
          </el-table-column>
          <el-table-column
            label="公告类型"
            key="4"
            width="160">
            <template slot-scope="scope">
              {{scope.row.noticeType===1?'一般':'重要'}}
            </template>
          </el-table-column>
          <el-table-column
            key="5"
            prop="createTime"
            label="创建时间"
            width="180">
          </el-table-column>
          <el-table-column
            key="7"
            prop="publishTime"
            label="发布时间"
            width="180">
          </el-table-column>
          <el-table-column
            key="6"
            fixed="right"
            label="操作"
            width="140">
            <!--发布，删除-->
            <template slot-scope="scope">
           <!--   <el-tooltip class="item" effect="dark" content="发布公告" placement="bottom-start">
                <el-button size='small' icon="el-icon-check"  plain type="success"  circle  @click="postNotice(scope.row)"></el-button>
              </el-tooltip>-->
              <el-tooltip class="item" effect="dark" content="删除公告" placement="bottom-start">
                <el-button size='small' icon="el-icon-delete"  plain type="danger"  circle  @click="deleteNotice(scope.row)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
          @size-change="getNoticeList"
          @current-change="getNoticeList"
          :current-page.sync="page"
          :page-sizes="[5,10,15]"
          :page-size.sync="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          style="margin-top: 10px">
        </el-pagination>
      </div>
      <div v-if="Index===2">
        <el-table
          :data="tableData2"
          stripe
          height="310"
          style="width: 100%;margin-top: 20px">
          <el-table-column
            key="10"
            label="ID"
            width="100">
            <template slot-scope="scope">
              {{scope.row.noticeId}}
            </template>
          </el-table-column>
          <el-table-column
            key="11"
            prop="noticeTitle"
            label="公告标题"
            width="180">
          </el-table-column>
          <el-table-column
            key="12"
            label="公告内容"
            width="180">
            <template slot-scope="scope">
              {{scope.row.noticeContent|ellipsis}}
            </template>
          </el-table-column>
          <el-table-column
            label="公告类型"
            key="13"
            width="160">
            <template slot-scope="scope">
              {{scope.row.noticeType===1?'一般':'重要'}}
            </template>
          </el-table-column>
          <el-table-column
            key="14"
            prop="createTime"
            label="创建时间"
            width="180">
          </el-table-column>
          <el-table-column
            key="15"
            fixed="right"
            label="操作"
            width="200">
            <!--发布，删除-->
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="发布公告" placement="bottom-start">
                <el-button size='small' icon="el-icon-check"  plain type="success"  circle  @click="postNotice(scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除公告" placement="bottom-start">
                <el-button size='small' icon="el-icon-delete"  plain type="danger"  circle style="margin-left: 10px" @click="deleteNotice(scope.row)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
          @size-change="getNoticeListWait"
          @current-change="getNoticeListWait"
          :current-page.sync="page"
          :page-sizes="[5,10,15]"
          :page-size.sync="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total2"
          style="margin-top: 10px">
        </el-pagination>

      </div>
    </el-tabs>
    <!--新建公告对话框-->
    <el-dialog title="新建贴吧公告" :visible.sync="dialogFormVisible">
      <el-form :rules="noticeRules">
        <el-form-item label="公告标题" :label-width="formLabelWidth">
          <el-input placeholder='请输入公告标题(15字以内)' maxlength='15' v-model="addNoticeTitle" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="公告内容" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="5" placeholder='请输入公告内容(150字以内)'  maxlength='150' v-model="addNoticeContent" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="公告类型" :label-width="formLabelWidth">
          <el-radio v-model="addNoticeType" label="1" border>一般</el-radio>
          <el-radio v-model="addNoticeType" label="2" border>重要</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createNotice">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
  import {reqCreateNotice, reqDeleteNotice, reqGetNotice, reqNoticePut} from "../../api/bar";

    export default {
      name: "notice",
      data(){
        return{
          Index:1,
          page:1,
          pageSize:5,
          total:0,
          total2:0,
          noticeId:'',
          noticeTitle:'',
          noticeContent:'',
          addNoticeTitle:'',
          addNoticeContent:'',
          addNoticeType:'1',//公告类型：1-一般，2-重要
          noticeState:'',//发布状态，0-待发布，1=已发布
          noticeType:'',//公告类型：1-一般，2-重要
          tableData:[],
          tableData2:[],
          dialogFormVisible:false,
          formLabelWidth: '120px',
          noticeRules: {
            noticeTitle: [
              { required: true, trigger: "blur", message: "标题不能为空" }
            ],
            noticeContent : [
              { required: true, trigger: "blur", message: "内容不能为空" }
            ],
          },
        }
      },
      created() {
        this.getNoticeList()
        this.getNoticeListWait()
      },
      filters: {
        ellipsis(value) {
          if (!value) return "";
          if (value.length > 20) {
            return value.slice(0, 20) + "...";
          }
          return value;
        }
      },
      methods:{
        showList(index) {
          this.clearInput()
          if (index === 1) {
            this.Index = 1
          } else if (index === 2) {
            this.Index = 2
          }
        },
        //清空
        clearInput(){
          this.noticeId=''
          this.noticeTitle=''
          this.noticeContent=''
          this.noticeType=''
          if(this.Index===1){
            this.getNoticeList()
          }else if(this.Index===2) {
            this.getNoticeListWait()
          }
        },
        //noticeId,noticeTitle,noticeContent,noticeState,noticeType,page,pageSize
        //获取吧内公告 已发布  noticeState 0-待发布，1=已发布
        async getNoticeList(){
          const rLoading = this.openLoading()
          const result=await reqGetNotice(this.noticeId,this.noticeTitle,this.noticeContent,1,this.noticeType,this.page,this.pageSize)
          rLoading.close()
          if (result.status===200){
            this.tableData=result.data.data
            this.total = result.data.totalRows
          }else{
            this.$message.error('加载数据失败，请重试！')
          }
        },
        //获取吧内公告 待发布  noticeState 0-待发布，1=已发布
        async getNoticeListWait(){
          const rLoading = this.openLoading()
          const result=await reqGetNotice(this.noticeId,this.noticeTitle,this.noticeContent,0,this.noticeType,this.page,this.pageSize)
          rLoading.close()
          //console.log(result);
          if (result.status===200){
            this.tableData2=result.data.data
            this.total2 = result.data.totalRows
          }else{
            this.$message.error('加载数据失败，请重试！')
          }
        },
        //新建公告
        async createNotice(){
          if (this.addNoticeContent.trim().length===0){
            return this.$message.warning('内容不能为空')
          }
          if (this.addNoticeTitle.trim().length===0){
            return this.$message.warning('标题不能为空')
          }
          const result=await reqCreateNotice(this.addNoticeContent.trim(),this.addNoticeTitle.trim(),this.addNoticeType)
          if (result.data===''){
            this.$message.success('公告创建成功！')
            this.dialogFormVisible=false
            this.Index=2
          }else{
            this.$message.error('公告创建失败，请重试！')
          }
        },
        //发布公告
         postNotice(notice){
           this.$confirm('此操作将发布该公告, 是否继续?', '提示', {
             confirmButtonText: '确定',
             cancelButtonText: '取消',
             type: 'warning'
           }).then(() => {
             const result=reqNoticePut(notice.noticeId)
            if(result.data===undefined){
              this.$message({
                type: 'success',
                message: '发布成功!'
              });
              this.tableData2.splice(notice,1)
            }else{
              this.$message.error('发布失败，请重试！')
            }

           }).catch(() => {
             this.$message({
               type: 'info',
               message: '已取消发布'
             });
           });
        },
        //删除公告
        deleteNotice(notice){
          this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const result=reqDeleteNotice(notice.noticeId)
            if(result.data===undefined) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              if(this.Index===1){
                this.tableData.splice(notice, 1)
              }else if(this.Index===2){
                this.tableData2.splice(notice, 1)
              }
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }else{
              this.$message.error('删除失败，请重试！')
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });

        },

        //搜索
        searchNotice(){
          if(this.Index===1){
            this.getNoticeList()
          }else if(this.Index===2) {
            this.getNoticeListWait()
          }
        }
      }
    }
</script>

<style scoped>
  .box-card{
    height: 100% !important;
  }
</style>
