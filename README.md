# efficiency-system
使用Vue + ECharts 

能效云系统：提供给光伏电站做能效管理

原型设计：http://119.3.177.188/
http://119.3.177.188:5415/

系统思路：光伏电站的发电从下到上，大致有这些环节【光伏板】->【汇流箱】->【逆变器】->【升压变】。能效管理就是在整个电站中找一到几组光伏组串（光伏板组成的串联设备，是我们系统管理的最小单元）作为标杆组串，对标杆组串进行更加有力的维护（比如加装温度传感器以监测温度，更加密集的进行灰尘清扫）以便让标杆组串的发电效率达到最高。从而对比其他的组串，看出差距，然后再分析这些差距给出改善建议。故障的设备要修理，低效的设备要分析原因，从而修理或者优化。

- 实时监测：把所有的设备都列出来，以便可以看到其状态
  - 可以根据状态筛选（正常、红色故障、黄色低效）
- 设备预警：发现有问题的设备
- 能效分析
- 运维建议
- 系统设置

ECharts：https://echarts.apache.org/

vue3：https://www.vue3js.cn/docs/zh/
vue3 github：https://github.com/vuejs/vue-next

vue router: https://next.router.vuejs.org/
vue router github：https://github.com/vuejs/vue-router-next

vuex: https://vuex.vuejs.org/zh/
vuex github：https://github.com/vuejs/vuex

element-plus: https://element-plus.gitee.io/#/zh-CN
element-plus github: https://github.com/element-plus/element-plus

animate.css: https://animate.style/
animate.css github: https://github.com/animate-css/animate.css

蓝湖：https://lanhuapp.com/url/t2GAm-XfcaS

```shell
winpty vue.cmd create efficiency-system
// Project setup
npm install
// Compiles and hot-reloads for development
npm run serve
// Compiles and minifies for production
npm run build
// Lints and fixes files
npm run lint
// Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

npm cache clean -f
npm install --global --production windows-build-tools

// update
npm i -g npm-check-updates
ncu -u
```
