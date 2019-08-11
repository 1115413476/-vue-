<template>
  <div class="user-login" >
    <div class="user-login-bg" :style="{'background-image':`url(${backgroundImage})`}"></div>
    <div class="content-wrapper">
      <h2 class="slogan">
        欢迎使用 <br /> 车辆数据采集工具
      </h2>
      <div class="form-container">
        <h4 class="form-title">登录</h4>
        <el-form ref="form" :model="user" label-width="0">
          <div class="form-items">
            <el-row class="form-item">
              <el-col>
                <el-form-item prop="username" :rules="[ { required: true, message: '账户/邮箱不能为空'}]">
                  <div class="form-line">
                    <i class="el-icon-user-solid input-icon" ></i>
                    <el-input placeholder="账户/邮箱" v-model="user.username" ></el-input>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="form-item">
              <el-col>
                <el-form-item prop="password" :rules="[ { required: true, message: '密码不能为空'}]">
                  <div class="form-line" >
                    <i class="el-icon-lock input-icon"></i>
                    <el-input type="password" placeholder="密码" v-model="user.password" ></el-input>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="form-item">
              <el-button type="primary" class="submit-btn" size="small" @click="submitBtn">
                登 录
              </el-button>
            </el-row>
          </div>
          <el-row class="tips">
            <router-link class="link"  to="/register">
              立即注册
            </router-link>
            <router-link class="link"  to="/passfind">
              |忘记密码
            </router-link>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
 import axios from 'axios';
  const backgroundImage = 'https://img.alicdn.com/tfs/TB1zsNhXTtYBeNjy1XdXXXXyVXa-2252-1500.png';
  export default {
    data() {
      return {
        backgroundImage: backgroundImage,
        user: {
          username: '',
          password: '',
        },
      };
    },

    created() {},

    methods: {
      //登录
      submitBtn(){
       // let  loginObj={
        //  username:this.user.username,
          //password: this.user.password,
      //  };
        this.$refs['form'].validate((valid) => {
          if(valid){
       axios.post('api/lonreg/lon_on', {
           user:this.user.username,
          password:this.user.password,


        }).then(res => {
          console.log(res.data);
                if(res.data.data.state_code ===1)
                {
                  this.$message({
                    message: '登录成功',
                    type: 'success'
                  });
                  this.$store.state.username=this.user.username;
                 // localStorage.setItem('token','true');
                  sessionStorage.setItem('username',this.user.username);
                  //sessionStorage.setItem('data',JSON.stringify(res.data.data));
                  //console.log(sessionStorage.getItem('data'));
                  this.$router.push('/HelloWorld');
                }
                else if(res.data.data.state_code  ===-2)
                {
                  this.$message({
                    message: '账号未注册或密码错误',
                    type: 'warning'
                  });
                }
                else if(res.data.data.state_code === -1)
                {
                  this.$message({
                    message: '邮箱未激活或密码错误',
                    type: 'warning'
                  });
                }
                else
                {
                  this.$message.error('未知错误,请刷新重试！');
                }
              });
            }
         });
       },
     },
  };
</script>

<style lang="scss" scoped>
    @import './UserLogin.scss';
</style>
