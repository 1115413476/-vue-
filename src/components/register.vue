<template>
  <el-card class="box-card">
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <el-form
          label-position="left"
          label-width="80px"
          :model="formLogin"
          :rules="rules"
          ref="formLogin">
         <h3>注册</h3>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
            <el-form-item label="邮箱" prop="useremail">
              <el-input v-model="ruleForm.useremail"></el-input>
            </el-form-item>
          <el-form-item label="账号" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" placeholder="6-16位密码，区分大小写" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item>
              <el-input  placeholder="请输入验证码" v-model="ruleForm.checkCode" style="width: 130px"></el-input>
              <el-button  type="primary" @click="codeForm">获取验证码</el-button>
            </el-form-item>

            <el-form-item>
              <el-button  type="primary" @click="submitForm">立即注册</el-button>
              <el-link type="primary" :underline="false" href="/login">使用已有账户登录</el-link>
            </el-form-item>
          </el-form>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      //邮箱检查
      let checkUserEmail = (rule,value, callback) =>{
        if(value === ''){
          callback(new Error('邮箱不能为空!'));
        }
        callback();
      };
      //账号检查
      let checkUserName = (rule,value, callback) =>{
        if(value === ''){
          callback(new Error('账号不能为空!'));
        }
          callback();
      };
      //密码检查
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }
        else if(value.length<6)
        {
          callback(new Error('密码不得小于6位'));
        }
        else if(value.length>16)
        {
          callback(new Error('密码不得大于16位'));
        }
        else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      let checkCode= (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));
        }
      };
      return {
        //fromlogin
        formLogin:{
        },
        ruleForm:{
          useremail:'',
          username: '',
          pass: '',
          checkPass: '',
          checkCode:''
        },
        rules: {
          useremail:[
            {validator:checkUserEmail,trigger: 'blur'}
          ],
          username:[
            {validator:checkUserName,trigger: 'blur'}
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          checkCode: [
            { validator: checkCode, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      //发送验证码，还未导入接口

      codeForm(){
        axios.post('api/lonreg/register/dynamic_code',{
          email: this.ruleForm.useremail
          }
        )
          .then(res=>{
            if(res.data.data.is_send ==='T')
            {
              this.$message({
                message: '验证码已发送',
                type: 'success'
              });
            }
            else
            {
              this.$message.error('发生错误，请重试！');

            }
          })
      },

      //注册
  submitForm() {
    this.$refs['ruleForm'].validate((valid) => {
      if (valid) {
    axios.post('api/lonreg/register',{
        email: this.ruleForm.useremail,
        dynamicCode:this.ruleForm.checkCode,
        confirm_password:this.ruleForm.checkPass,
        account: this.ruleForm.username,
        password: this.ruleForm. pass,
      }
    )
      .then(res=>{
        if(res.data.data.is_succ ===true)
        {
          console.log(res.data);
          this.$message({
            message: '注册成功',
            type: 'success'
          });
          this.$router.push('/HelloWorld');
        }
        else
        {
          alert(res.data.data.explain);
          console.log(res.data);
        }
        })
        }
        });
     },
    }
  }
  /*重置
resetForm(formName) {
  this.$refs[formName].resetFields();
}
*/
  /*          axios.post('http://111.13.18.10:8090/logon','email=this.ruleForm.useremail&confirm_password=this.ruleForm.pass&account=this.ruleForm.username&password=this.ruleForm.checkPass')//跨域请求无法使用axios，vue-resouce应该更好
             .then((response) => {
               if (response.status ===true) {
                 console.log('true');
                 this.$store.commit('SET_TOKEN', response.data.token);
                 this.$store.commit('GET_USER', response.data.user);
                 this.$message({
                   message: '注册成功',
                   type: 'success'
                 });
                 this.$router.push({name: 'login'})
               }
             })
*/
</script>

<style lang="scss" scoped>

</style>
