<template>
  <el-card class="box-card">
    <el-steps :active="0" finish-status="success" simple style="margin-top: 20px">
      <el-step title="采集数量" ></el-step>
      <el-step title="路线选择" ></el-step>
      <el-step title="车辆类型" ></el-step>
      <el-step title="确认" ></el-step>
    </el-steps>
       <h2>时间设置</h2>
    <el-form :inline="true" :model="formInline" ref="carsetform" class="demo-form-inline">
     <el-form-item label="采集时长（s）:" prop="col_time" :rules="[ { required: true, message: '请填写'}]">
        <el-input v-model="formInline.col_time"></el-input>
      </el-form-item>
      <el-form-item label="采集间隔（s）：" prop="col_interval" :rules="[ { required: true, message: '请填写'}]">
        <el-input v-model="formInline.col_interval"></el-input>
      </el-form-item>
      <el-form-item label="起始时间（s）："  prop="col_start_time" :rules="[ { required: true, message: '请填写'}]">
        <el-input v-model="formInline.col_start_time" ></el-input>
      </el-form-item>
      <h2>批次设置</h2>
      <el-form-item label="采集批次：" prop="col_batch" :rules="[ { required: true, message: '请填写'}]">
        <el-input v-model="formInline.col_batch"></el-input>
      </el-form-item>
      <el-form-item label="采集数据描述：" prop="app_description" :rules="[ { required: true, message: '请填写'}]">
        <el-input v-model="formInline.app_description" style="width: 400px"></el-input>
      </el-form-item>
      <h3></h3>
      <el-form-item>
      <el-button type="primary"  round @click="createBtn">下一步</el-button>
      </el-form-item>
    </el-form>


    </el-card >
</template>

<script>
    export default {
      name: "carset",//页面1，时间设置和批次设置
      data() {
        return {
          formInline: {
            col_time: '',
            col_batch:'',
            col_interval: '',
            col_start_time:'',
            app_description:'',
            index:'1',
          }
        }
      },
      methods: {
        //提交
        createBtn(){
          this.$refs['carsetform'].validate((valid) => {
            if(valid){
              this.$axios.post('api/set_params/next', {
                account:sessionStorage.getItem('username'),
                col_batch:this.formInline.col_batch,
                index:"1",
                app_description:this.formInline.app_description,
                col_time:this.formInline.col_time,
                col_interval:this.formInline.col_interval,
                col_start_time:this.formInline.col_start_time,

              }).then(res => {
                console.log(res.data);
                if(res.data.data.state ==='T') {
                  this.$message({
                    message: '记录成功',
                    type: 'success'
                  });
                  sessionStorage.setItem('col_batch',this.formInline.col_batch);
                  this.$router.push('/routeselect');
                }
                else{
                  this.$message.error('采集批次重复或其他错误，请重新设置！');
                }
              });

            }
          });


        }
      }
    }
</script>

<style scoped>

</style>
