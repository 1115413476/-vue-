
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

#tips
登录采用了飞冰的物料源，其余使用element-ui的样式集成
修改config下的dev文件，设置api，实现接口与跨域
在router下的js文件，设置路由钩子（后端没给token，用用户名验证）
用户名和批次存储在session中，防止刷新消失（vuex是动态存储，刷新重置）


