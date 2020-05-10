<template>
  <el-card class="box-card">
    <el-button type="primary" @click="dialogFormVisible=true"><i class="el-icon-plus"></i>&nbsp;&nbsp;新增通知</el-button>
    <!--表格-->
    <el-tabs type="border-card" style="height: 100%;margin-top: 20px;">
      <el-table
        :data="tableData"
        stripe
        height="400"
        style="width: 1000px;margin-top: 20px">
        <el-table-column
          type="index"
          label="#"
          width="80">
        </el-table-column>
        <el-table-column
          label="ID"
          width="120">
          <template slot-scope="scope">
            {{scope.row.sysNotifyId}}
          </template>
        </el-table-column>
        <el-table-column
          prop="notifyContent"
          label="通知内容"
          width="600">
        </el-table-column>
        <el-table-column
          label="通知时间"
          prop="createTime"
          width="180">
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination
        @size-change="getSysNotify"
        @current-change="getSysNotify"
        :current-page.sync="page"
        :page-sizes="[5,10,15]"
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="margin-top: 10px">
      </el-pagination>
    </el-tabs>

    <!--新建通知对话框-->
    <el-dialog title="新建系统通知" :visible.sync="dialogFormVisible">
      <el-form :rules="notifyRules">
        <el-form-item label="通知内容：" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="5" placeholder='请输入内容(150字以内)'  maxlength='150' v-model="content" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSysNotify">确 定</el-button>
      </div>
    </el-dialog>

  </el-card>
</template>
<!--createTime: "2020-05-05 10:55:31"
notifyContent: "请大家文明使用贴吧，谢谢!"
sysNotifyId: 60-->
<script>
  import {reqGetSystemNotification, reqSystemNotification} from "../../api/system";

    export default {
      name: "notification",
      data(){
        return{
          dialogFormVisible:false,
          formLabelWidth: '120px',
          content:'',
          page:1,
          pageSize:5,
          total:0,
          tableData:[],
          notifyRules: {
            content: [
              { required: true, trigger: "blur", message: "通知内容不能为空" }
            ],
          },
        }
      },
      created() {
        this.getSysNotify()
      },
      methods:{
        //发送系统通知
        async addSysNotify(){
          if (this.content.trim().length===0){
            return this.$message.warning('内容不能为空')
          }
           const result=await reqSystemNotification(this.content)
           if (result.data===''){
             this.getSysNotify()
             this.$message.success('通知推送成功！')
             this.dialogFormVisible=false
           }else{
             this.$message.error('通知推送失败，请重试！')
           }
        },
        //获取发送的通知 历史记录
        //http://server.campus.com/console/system-center/sysNotify?page=1&pageSize=5
        //http://zhangjie:9000/system-center/sysNotify?page=1&pageSize=10&token=4b83d3a5-a51f-429b-bb89-978ac0322e5b
        async getSysNotify(){
          const rLoading = this.openLoading()
          const result=await reqGetSystemNotification(this.page,this.pageSize)
          rLoading.close()
          if (result.status===200){
            if(result.data.status===220000) {
              this.$message.error('加载数据失败，请重试！')
            }else{
              this.tableData = result.data.data
              this.total = result.data.totalRows
            }
          }else{
            this.$message.error('加载数据失败，请重试！')
          }
        }
      }
    }
</script>

<style scoped>
  .box-card{
    height: 100%;
  }
</style>
