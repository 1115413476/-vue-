<template>
  <div>
    <el-steps :active="1" finish-status="success" simple style="margin-top: 20px">
      <el-step title="采集数量" ></el-step>
      <el-step title="路线选择" ></el-step>
      <el-step title="车辆类型" ></el-step>
      <el-step title="确认" ></el-step>
    </el-steps>
  <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler"  :scroll-wheel-zoom="true" style="width: 100%;height: 500px">
   <bm-marker :position="postionMap" :dragging="true" dragend="getposition" @click="getPoint"  ><!--跳动效果：animation="BMAP_ANIMATION_BOUNCE"-->
     <bm-label content="起点" :labelStyle="{color: 'black', fontSize : '12px'}" :offset="{width: 0, height: 35}"/>
   </bm-marker>
    <bm-marker :position="postionMap2" :dragging="true" dragend="getposition2" @click="getPoint2"  ><!--跳动效果：animation="BMAP_ANIMATION_BOUNCE"-->
      <bm-label content="终点" :labelStyle="{color: 'black', fontSize : '12px'}" :offset="{width: 0, height: 35}"/>
    </bm-marker>
    <h4></h4>
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item label="起点纬度">
        <el-input v-model="postionMap.lng"></el-input>
      </el-form-item>
      <el-form-item label="起点经度">
        <el-input v-model="postionMap.lat"></el-input>
      </el-form-item>
    </el-form>

    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item label="终点纬度">
        <el-input v-model="postionMap2.lng"></el-input>
      </el-form-item>
      <el-form-item label="终点经度">
        <el-input v-model="postionMap2.lat"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="lastBtn">上一步</el-button>
    <el-button type="primary" @click="nextBtn">下一步</el-button>
    <h6>（点击标记点以刷新经纬度）</h6>
    </baidu-map>
  </div>
  　　<!-- baidu-map指的既是BaiduMap组件 -->
</template>
<script>
  import BaiduMap from 'vue-baidu-map/components/Map/Map.vue'

  export default {
    data () {
      return {
        center:{
          lng: 0,
          lat: 0
        },
        postionMap:{  //地图坐标
          lng: 116.404,
          lat: 39.915
        },
        postionMap2:{
          lng: 116.355,
          lat: 39.915
        },
        //经纬度
        zoom: 12　 //地图展示级别
      }
    },
    components: {
      BaiduMap, //指定组件模板
    },
    methods: {
      //为初始化的center赋值，确定center位置
      handler ({BMap, map}) {
        this.center.lng = 116.404;
        this.center.lat = 39.915;
        this.zoom = 12
      },
      getPoint(e){
        this.postionMap.lng = e.point.lng;
        this.postionMap.lat = e.point.lat;
      },
      getPoint2(e){
        this.postionMap2.lng = e.point.lng;
        this.postionMap2.lat = e.point.lat;
      },
      //接口，提交经纬度
      nextBtn(){
       this.$axios.post('api/set_params/next', {
          account:sessionStorage.getItem('username'),
          col_batch:sessionStorage.getItem('col_batch'),
         index:'2',
          s_lat:this.postionMap.lat,//如果后端不能接受经纬度信息，那应该将经纬度转为字符串的格式
          s_lon:this.postionMap.lng,
          e_lat:this.postionMap2.lat,
          e_lon:this.postionMap2.lng,
        }).then(res => {
          if(res.data.data.state==='T') {
            console.log(res.data);
            this.$message({
              message: '记录成功',
              type: 'success'
            });
            this.$router.push('/typeselect');
          }
          else{
            console.log(res.data);
            this.$message.error('未知错误,请刷新重试！');
          }
        });
      },
      //返回上一步
      lastBtn(){
        this.$axios.post('api/set_params/back', {
          account:sessionStorage.getItem('username'),
          col_batch:sessionStorage.getItem('col_batch'),
           index:'2',
        }).then(res => {
          console.log(res.data);
          if(res.data.data) {
            this.$router.push('/carset');
          }
          else{
            console.log(res.data);
            this.$message.error('未知错误,请刷新重试！');
          }
        });
      },
      getposition(){

      }



    }
  }
</script>
<style  scoped>

</style>

