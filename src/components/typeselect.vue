<template>
  <el-card class="box-card">
    <el-steps :active="2" finish-status="success" simple style="margin-top: 20px">
      <el-step title="采集数量" ></el-step>
      <el-step title="路线选择" ></el-step>
      <el-step title="车辆类型" ></el-step>
      <el-step title="确认" ></el-step>
    </el-steps>
    <h2>车辆类型</h2>
    <el-form  :inline="true" :model="form" ref="typeselectform">
      <el-form-item label="车辆类型："  prop="cartype" :rules="[ { required: true, message: '请选择车辆类型'}]">
        <el-select v-model="form.cartype"  placeholder="选择车辆类型">
          <el-option label="小型车" value="smallCar"></el-option>
          <el-option label="中型车" value="commonCar"></el-option>
          <el-option label="大型车" value="bigCar"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="车辆颜色：" prop="carcolor" :rules="[ { required: true, message: '请选择车辆颜色'}]">
        <el-select v-model="form.carcolor"  placeholder="选择车辆颜色">
          <el-option label="红色" value="红"></el-option>
          <el-option label="黑色" value="黑"></el-option>
          <el-option label="白色" value="白"></el-option>
          <el-option label="黄色" value="黄"></el-option>
          <el-option label="绿色" value="绿"></el-option>
          <el-option label="蓝色" value="蓝"></el-option>
          <el-option label="紫色" value="紫"></el-option>
          <el-option label="银色" value="银"></el-option>
        </el-select>
      </el-form-item>
      <h6></h6>
      <el-form-item label="初始速度：">
      <el-input-number v-model="form.departspeed" controls-position="right" @change="handleChange" :min="0" :max="10000"></el-input-number>
      </el-form-item >
      <el-form-item label="加速能力：">
        <el-input-number v-model="form.accle" controls-position="right" @change="handleChange" :min="0" :max="10000"></el-input-number>
      </el-form-item>
      <h6></h6>
      <el-form-item label="变道模型：" >
        <el-select v-model="form.laneChangeModel" placeholder="LC2013">
          <el-option label="LC2013" value="LC2013"></el-option>
          <el-option label="SublaneModel model" value="SublaneModel model"></el-option>
          <el-option label="空" value=""></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="模拟数量：">
        <el-input-number v-model="form.vehNum" controls-position="right" @change="handleChange" :min="1" ></el-input-number>
      </el-form-item>
      <h6></h6>
      <el-form-item label="最大速度：">
        <el-input-number v-model="form.maxSpeed" controls-position="right" @change="handleChange" :min="0" :max="10000"></el-input-number>
      </el-form-item >
      <el-form-item label="车辆分布：" >
        <el-select v-model="form.vehDistribution" placeholder="全路径">
          <el-option label="全路径" value="全路径"></el-option>
          <el-option label="随机分布" value="随机分布"></el-option>
        </el-select>
      </el-form-item>

      <h6></h6>
      <el-form-item>
        <el-button type="primary"  round @click="addcarBtn">继续添加车辆</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  round @click="lastBtn">上一步</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  round @click="nextBtn">下一步</el-button>
      </el-form-item>

    </el-form>
  </el-card >
</template>

<script>
    export default {
        name: "typeselect",
      data() {
          //data后6个设置了初值
        return {
          form: {
            cartype: '',
            carcolor: '',
            departspeed:'0',
            accle:'0',
            laneChangeModel:'LC2013',
            vehNum:'1',
            maxSpeed:'5',
            vehDistribution:'全路径',
          }
        }
      },
      methods:
      {
        //继续添加车辆
              addcarBtn(){
                this.$refs['typeselectform'].validate((valid) => {
                  if (valid) {
                    this.$axios.post('api/set_params/3_add',{
                      account:sessionStorage.getItem('username'),
                      col_batch:sessionStorage.getItem('col_batch'),
                      index:'3',
                      vType:this.form.cartype,//和后端命名不一，注意修改
                      vColor:this.form.carcolor,//和后端命名不一，注意修改
                      vDepartSpeed:this.form.departspeed,//和后端命名不一，注意修改
                      accle:this.form.accle,
                      laneChangeModel:this.form.laneChangeModel,
                      vehNum:this.form.vehNum,
                      maxSpeed:this.form.maxSpeed,
                      vehDistribution:this.form.vehDistribution,
                    }).then(res => {
                      if(res.data.data.state==='T') {
                        console.log(res.data);
                        this.$message({
                          message: '记录成功',
                          type: 'success'
                        });
                      }
                      else{
                        this.$message.error('未知错误，请重新设置！');
                      }
                    });
                  }
                });
              },
        //下一步（需要提交正确的数据，不能为空
              nextBtn(){
                this.$refs['typeselectform'].validate((valid) => {
                  if (valid) {
                this.$axios.post('api//set_params/next', {
                  account:sessionStorage.getItem('username'),
                  col_batch:sessionStorage.getItem('col_batch'),
                  index:'3',
                  vType:this.form.cartype,
                  vColor:this.form.carcolor,
                  vDepartSpeed:this.form.departspeed,
                  accle:this.form.accle,
                  laneChangeModel:this.form.laneChangeModel,
                  vehNum:this.form.vehNum,
                  maxSpeed:this.form.maxSpeed,
                  vehDistribution:this.form.vehDistribution,
                }).then(res=>{
                  console.log(res.data);
                  if(res.data.data.state==='T'){
                    this.$message({
                      message: '记录成功',
                      type: 'success'
                    });

                    this.$router.push('/submitselect');
                  }
                  else{
                    this.$message.error('未知错误，请重新设置！');
                       }
                    })
                  }
                });
              },
        //上一步
               lastBtn(){
                 this.$axios.post('api/set_params/back', {
                   account:sessionStorage.getItem('username'),
                   col_batch:sessionStorage.getItem('col_batch'),
                   index:3,
                 }).then(res=>{
                   console.log(res.data);
                   if(res.data){
                     this.$router.push('/routeselect');
                   }
                 })
              },

              handleChange(){
              },
      }

    }

</script>

<style scoped>

</style>
