<template>
  <el-row type="flex" justify="center">
    <el-col :span="6">
  <el-form label-width="100px">
    <el-form-item label="邮箱">
      <el-input v-model="useremail" placeholder="请输入你的邮箱"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">找回密码</el-button>
    </el-form-item>
  </el-form>
     </el-col>
    </el-row>
  </template>

  <script>
    import axios from 'axios';
    export default {
      data() {
        return {
          useremail: ''
        };
      },
      methods: {
        submitForm() {
          axios.post('api/lonreg//forget_password', {
            user:this.useremail,

          }).then(res => {
            console.log(this.useremail);
            if(res.data.data.is_send ==='T')
            {
              console.log(res.data);
              this.$message({
                message: '邮件已发送',
                type: 'success'
              });
              this.$router.push('/');
            }
            else
            {
              console.log(res.data);
              this.$message.error('邮件发送失败，请重试');
            }
         });
       }
     }
  }
  </script>


<style>

</style>
