<template>
    <div>
      <h1>
        {{count}}

      </h1>
      <button @click="testbtn1">333</button>
      <button @click="testbtn2">444</button>
      <button @click="testbtn3">555</button>
    </div>
</template>

<script>
  import axios from 'axios';
    export default {
        name: "son1",
      data(){
         return{
          count:11111,
         }
        },

      methods: {

        testbtn1(){
          console.log('333');
          this.count=this.$store.state.count;
        },

//post跨域不允许
        testbtn2() {
          console.log('444');
          axios.post('http://111.13.18.10:8090/lonreg/lon_on', {
              user: '1115413476@qq.com',
            password: 'qjy84592917',
            }
          )
            .then(res=>{
              console.log(res.data);
            })
        },

        testbtn3() {
          this.$router.push('/carset');
        },



      }
    }


/*
  {
    axios({
      method:'post',
      url:'http://111.13.18.10:8090/logon',
    })
      .then(function (res) {
        console.log(res.data) ;
      })
  }

 */
</script>

<style scoped>

</style>
