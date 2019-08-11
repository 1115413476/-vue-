<template>
  <div>
    <h3>{{username}}</h3>
        <button @click="getout">退出登录</button>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data(){
        return{
          username: sessionStorage.getItem('username'),
        }
    },
    methods:
      {
        getout(){
                this.$store.commit('del_username');//仅仅存储而已，路由钩子和显示都用的sessionStorage的数据
                sessionStorage.setItem('username','');
                this.$router.push('/');
        }
      }
  }
</script>
<style  lang="scss" scoped>

</style>
