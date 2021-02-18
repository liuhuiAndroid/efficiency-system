<template>
  <div class="main-right">
    <div class="main-right-menu">
      <p class="main-menu-title">运行监测</p>
      <div class="main-menu-item">
        <img :src="require('../assets/menu_icon.png')" alt=""/>
        <p>
          组件效率衰减<br>
          <span>1.2万元（2.1%）</span>
        </p>
      </div>
      <div class="main-menu-item">
        <img :src="require('../assets/menu_icon1.png')" alt="">
        <p>
          组件效率衰减<br>
          <span>1.2万元（2.1%）</span>
        </p>
      </div>
      <div class="main-menu-item">
        <img :src="require('../assets/menu_icon2.png')" alt="">
        <p>
          组件效率衰减<br>
          <span>1.2万元（2.1%）</span>
        </p>
      </div>
      <div class="main-menu-item">
        <img :src="require('../assets/menu_icon3.png')" alt="">
        <p>
          组件效率衰减<br>
          <span>1.2万元（2.1%）</span>
        </p>
      </div>
      <div class="main-menu-item">
        <img :src="require('../assets/menu_icon4.png')" alt="">
        <p>
          组件效率衰减<br>
          <span>1.2万元（2.1%）</span>
        </p>
      </div>
      <div class="main-menu-item">
        <img :src="require('../assets/menu_icon5.png')" alt="">
        <p>
          组件效率衰减<br>
          <span>12700元（2.1%）</span>
        </p>
      </div>
  </div>
  <div class="main-right-center">
    <p class="main-right-top">环境数据：<span style="margin-left: 0.2rem;">温度：4度</span><span>湿度：60%</span><span>风速：4m/s</span><span>GHI：120W/m</span><span>DHI：80W/m</span></p>
    <div class="main-center-warp">
      <div class="main-chart">
        <div class="main-chart-box1">
          <div class="main-chart-box2">
            <div class="main-chart-top">
              <div class="main-chart-item">
                <img :src="require('../assets/guangfu.png')" alt="">
                <div class="main-chart-box">
                  <p class="main-chart-title">光伏消耗</p>
                  <div class="main-chart-desc">
                    <span>组件效率衰减：1.2万元（2.1%）</span>
                    <span>预期遮挡：1.2万元（2.1%）</span>
                    <span>组件效率衰减：1.2万元（2.1%）</span>
                    <span>预期遮挡：1.2万元（2.1%）</span>
                    <span>组件效率衰减：1.2万元（2.1%）</span>
                    <span>预期遮挡：1.2万元（2.1%）</span>
                  </div>
                  <p class="main-chart-bottom">光伏板</p>
                </div>
              </div>
              <div class="main-chart-item main-chart-item2">
                <img :src="require('../assets/nibian.png')" alt="">
                <div class="main-chart-box">
                  <p class="main-chart-title">逆变器消耗</p>
                  <div class="main-chart-desc main-chart-desc1">
                    <span>逆变器损耗：15100元（2.1%）</span>
                    <span>故障险检修损耗：11.2万元（2.1%）</span>
                  </div>
                  <p class="main-chart-bottom main-chart-bottom1">逆变器</p>
                </div>
              </div>
              <div class="main-chart-item main-chart-item3">
                <img :src="require('../assets/nibian.png')" alt="">
                <div class="main-chart-box">
                  <p class="main-chart-title">电网消耗</p>
                  <div class="main-chart-desc main-chart-desc1">
                    <span>限电损失：0%</span>
                    <span>功率预测不准确的罚款：0%</span>
                  </div>
                  <p class="main-chart-bottom main-chart-bottom1">电网</p>
                </div>
              </div>
            </div>
            <div class="main-chart-img">
              <img class="guangfu_img" :src="require('../assets/guangfu_img.png')" alt="">
              <img class="huiliu_img" :src="require('../assets/huiliu_img.png')" alt="">
              <img class="nibian_img" :src="require('../assets/nibian_img.png')" alt="">
              <img class="shengya_img" :src="require('../assets/shengya_img.png')" alt="">
              <img class="dianwang_img" :src="require('../assets/dianwang_img.png')" alt="">
              <img class="arrow1" :src="require('../assets/arrow.png')" alt="">
              <img class="arrow2" :src="require('../assets/arrow.png')" alt="">
              <img class="arrow3" :src="require('../assets/arrow3.png')" alt="">
              <img class="arrow4" :src="require('../assets/arrow3.png')" alt="">
            </div>
            <div class="main-chart-top">
              <div class="main-chart-item main-chart-item4">
              <img :src="require('../assets/shengya.png')" alt="">
                <div class="main-chart-box">
                  <p class="main--chart-bottom-title">汇流箱</p>
                  <p class="main-chart-bottom-desc">汇流箱消耗</p>
                  <div class="main-chart-desc main-chart-desc2">
                    <span>功率预测不准确的罚款：0%</span>
                  </div>
                </div>
              </div>
              <div class="main-chart-item main-chart-item5">
                <img :src="require('../assets/shengya.png')" alt="">
                <div class="main-chart-box">
                  <p class="main--chart-bottom-title">升压变</p>
                  <p class="main-chart-bottom-desc">升压变消耗</p>
                  <div class="main-chart-desc main-chart-desc2">
                    <span>功率预测不准确的罚款：0%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Analysis',
  setup() {
    console.log('Analysis')
  }
})
</script>

<style lang="scss" scoped>
.main-right{
  position: absolute;
  top: 1rem;
  bottom: .2rem;
  left: 2.2rem;
  right: 0.2rem;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #00B1FF;
}

.main-right-menu{
  width: 2.2rem;
  position: absolute;
  top: 0.2rem;
  left: 0.2rem;
  bottom: 0.2rem;
  border: 1px solid #00B1FF;
  border-radius: 4px;
  background: #022841;
  font-size: 0.16rem;
  color: #fff;
  padding: 0.2rem 0 0 0.2rem;
}

.main-menu-title{
  font-size: 0.18rem;
}

.main-menu-item{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 0.24rem;
}

.main-menu-item img{
  width: 0.3rem;
  margin-right: 0.2rem;
}

.main-menu-item span{
  display: inline-block;
  margin-top: 0.06rem;
  color: #00B1FF;
}

.main-right-center{
  position: absolute;
  left: 2.8rem;
  top: 0.2rem;
  bottom: 0.2rem;
  right: 0;
  box-sizing: border-box;
  font-size: 0.16rem;
  color: #fff;
  overflow: hidden;
}

.main-right-top{
  width: 100%;
  height: 0.3rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.main-right-top span{
  display: inline-block;
  margin-left: 0.4rem;
}
.main-chart{
  top: 0.6rem;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
}

.main-chart-box1{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-chart-box2{
  width: 100%;
  overflow: auto;
}

.main-chart-top{
  width: 100%;
  overflow: hidden;
}

.main-chart-item{
  float: left;
  width:  5rem;
  height: 2.2rem;
  position: relative;
}

.main-chart-item img{
  width: 100%;
  height: 100%;
}

.main-chart-item2{
  width: 2.2rem;
  margin-left: 0.5rem;
}

.main-chart-item3{
  width: 2.2rem;
  margin-left: 2.5rem;
}

.main-chart-item4{
  width: 2.2rem;
  height: 1.4rem;
  margin-left: 3.7rem;
}

.main-chart-item5{
  width: 2.2rem;
  height: 1.4rem;
  margin-left: 1.8rem;
}

.main-chart-box{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  color: #fff;
  font-size: 12px;
  padding-left: 0.08rem;
   box-sizing: border-box;
}

.main-chart-title{
  margin-top: 0.04rem;
  font-size: 0.16rem;
}

.main-chart-desc {
  width: 100%;
  overflow: hidden;
  margin-top: 0.12rem;
}

.main-chart-desc span{
  display: block;
  width: 50%;
  float: left;
  margin-top: 0.08rem;
}

.main-chart-desc1 span{
  width: 100%;
  box-sizing: border-box;
  margin-top: 0.16rem;
}

.main-chart-desc2 span{
  width: 100%;
  box-sizing: border-box;
  margin-top: 0.12rem;
}

.main-chart-bottom{
  position: absolute;
  bottom: 0.08rem;
  left: 46%;
  font-size: 0.18rem;
}
.main-chart-bottom1{
  left: 40%;
  bottom: 0.1rem;
}

.main--chart-bottom-title{
  width: 100%;
  font-size: 0.16rem;
  height: 0.35rem;
  display: flex;
  justify-content: center;
  align-items: center;

}
.main-chart-img{
  width: 80%;
  height: 2.6rem;
  margin: 0 auto 0;
  position: relative;
}
.main-chart-img1{
  width: 100%;
}

.main-chart-bottom-desc{
  margin-top: 0.28rem;
}

.guangfu_img{
  width: 2.6rem;
  top: 0.3rem;
  left: 0;
  position: absolute;
  z-index: 99;
}

.huiliu_img{
  bottom: 0;
  left: 2.1rem;
  width: 2.6rem;
  position: absolute;
  z-index: 99;
}

.nibian_img{
  top: 0.2rem;
  left: 3.8rem;
  width: 2.6rem;
  position: absolute;
  z-index: 99;
}

.dianwang_img{
  width: 2.6rem;
  top: 0;
  right: 0;
  position: absolute;
  z-index: 99;
}

.shengya_img{
  width: 2.6rem;
  bottom: 0.2rem;
  right: 2.4rem;
  position: absolute;
  z-index: 99;
}

.arrow1{
  width: 0.8rem;
  position: absolute;
  top: 1.3rem;
  right: 2rem;
}

.arrow2{
  width: 1.2rem;
  position: absolute;
  top: 1.4rem;
  left: 3.5rem;
}

.arrow3{
  width: 1rem;
  position: absolute;
  top: 0.8rem;
  left: 1.8rem;
}

.arrow4{
  width: 1rem;
  position: absolute;
  top: 0.7rem;
  left: 5.7rem;
}
</style>
