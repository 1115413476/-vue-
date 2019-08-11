<template>
  <el-card class="box-card">
  <el-steps :active="3" finish-status="success" simple style="margin-top: 20px">
      <el-step title="采集数量" ></el-step>
      <el-step title="路线选择" ></el-step>
      <el-step title="车辆类型" ></el-step>
      <el-step title="确认" ></el-step>
    </el-steps>
    <h2 style="text-align: left">设置总览</h2>
  <el-table
    :data="tableData"
    border
    style="width: 100%"
    max-height="750">
    <!--在el-table-column添加fixed来固定-->
    <el-table-column
      prop="args"
      label="车辆类型"
      width="150">
      <template slot-scope="scope">
        <span>{{scope.row.args.vType}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="args"
      label="车辆颜色"
      width="120">
      <template slot-scope="scope">
        <span>{{scope.row.args.vColor}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="args"
      label="初始速度"
      width="120">
      <template slot-scope="scope">
        <span>{{scope.row.args.vDepartSpeed}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="args"
      label="加速能力"
      width="120">
      <template slot-scope="scope">
        <span>{{scope.row.args.accle}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="args"
      label="变道模型"
      width="150">
      <template slot-scope="scope">
        <span>{{scope.row.args.laneChangeModel}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="args"
      label="模拟数量"
      width="120">
      <template slot-scope="scope">
        <span>{{scope.row.args.vehNum}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="args"
      label="最大速度"
      width="120">
        <template slot-scope="scope">
        <span>{{scope.row.args.maxSpeed}}</span>
        </template>
    </el-table-column>
    <el-table-column
      prop="args"
      label="车辆分布"
      width="150">
      <template slot-scope="scope">
        <span>{{scope.row.args.vehDistribution}}</span>
      </template>
    </el-table-column>

    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
<h3></h3>
    <el-button type="primary" round @click="lastBtn">上一步</el-button>
    <el-button type="primary" round @click="confirmBtn">确认</el-button>
  </el-card>
</template>

<script>
  export default {
    data() {
      return {

        tableData: [],
      }
    },

    mounted:function(){
      this.gettableData();
    },

    methods: {
      gettableData(){//获取数据，因为直接给的数字而非字符串，所以不会记录下来，如有问题请提供新的接口或自行修改
      this.$axios.post('api//set_params/next', {
        account:sessionStorage.getItem('username'),
        col_batch:sessionStorage.getItem('col_batch'),
        index:3,
        vType:1,
       vColor:1,
        vDepartSpeed:1,
       accle:1,
       laneChangeModel:1,
        vehNum:1,
        maxSpeed:1,
         vehDistribution:1,
      }).then(res=> {
        if (res.data.data.state === 'T') {
          console.log(res.data);
          this.tableData = res.data.data.content;
          console.log(this.tableData);
        }
      });
      },
      deleteRow(index, rows) {
        this.$axios.post('api/set_params/4_route_data/delete', {
          timestamp:this.tableData[index].timestamp
        }).then(res => {
          if(res.data.data) {
            rows.splice(index, 1);
          }
          else{
            this.$message.error('未知错误,请刷新重试！');
          }
        });
      },
      lastBtn(){
        this.$axios.post('api/set_params/back', {
          account:sessionStorage.getItem('username'),
          col_batch:sessionStorage.getItem('col_batch'),
          index:'4',
        }).then(res => {
          if(res.data.data) {
            this.$router.push('/typeselect');
          }
          else{
            this.$message.error('未知错误,请刷新重试！');
          }
        });
      },


      confirmBtn(){
        this.$axios.post('api/set_params/4_route_data', {
          account:sessionStorage.getItem('username'),
          col_batch:sessionStorage.getItem('col_batch'),
        }).then(res => {
          if(res.data.data.state==='succ') {
            this.$message({
              message: '已提交执行',
              type: 'success'
            });
            this.$router.push('/HelloWorld');
          }
          else{
            this.$message.error('未知错误,请刷新重试！');
          }
        });
      }
    },


  }
</script>
