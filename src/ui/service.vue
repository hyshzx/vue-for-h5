<template>
  <div class="app">
    <top-nav :topData="topData"></top-nav>
    <div class="content">
      <div class="p-back-step">
        <p class="p-back-title">还呗流程</p>
        <div class="p-step-contain">
          <ul class="p-steps flex">
            <li class="p-step"> <img src="../../static/img/common/icon_shou.png" alt=""><span>还呗申请</span> </li>
            <li class="p-step"><img src="../../static/img/common/icon_gu.png" alt=""><span>系统估价</span> </li>
            <li class="p-step"><img src="../../static/img/common/icon_sendphone.png" alt=""><span>寄送手机</span> </li>
            <li class="p-step"><img src="../../static/img/common/icon_jiany.png" alt=""><span>检验合格</span> </li>
            <li class="p-step"><img src="../../static/img/common/icon_collection.png" alt=""><span>等待收款</span> </li>
          </ul>
        </div>
      </div>
    </div>
    <bottom-nav :showData="BottomShowData"></bottom-nav>
  </div>
</template>
<script>
import topNav from "./topNavbar.vue"
import bottomNav from "./bottomNavbar.vue"
import {
  ajax
} from "../lib/axios.js"
export default {
  data() {
      return {
        topData: {
          title: '还呗'
        },
        BottomShowData: {
          show_home: false,
          show_sale: true,
          show_recycle: false,
          show_me: false
        },
      }
    },
    components: {
      topNav: topNav,
      bottomNav: bottomNav,
    },
}
</script>
<style lang="sass" scoped>
.content {
  width: 100%;
  position: relative;
  top: 88px;
  margin-bottom: 98px;
  .p-back-step {
    background-color: #fff;
    width: 100%;
    height: 350px;
    padding-top: 40px;
    .p-back-title {
      margin-left: 24px;
      color: #666;
      font-size: 32px;
      padding-left: 6px;
      border-left: 3px solid #38c1fa;
    }
    ul.p-steps {
      width: 100%;
      padding: 60px 36px 30px;
      justify-content: space-between;
      background: url('../../static/img/common/icon_line.png') no-repeat 126px 105px;
      li.p-step {
        width: 112px;
        text-align: center;
        img {
          margin: 0 auto 18px;
        }
        span {
          color: #666;
          font-size: 28px;
        }
      }
    }
  }
  // btn_more
  .p-choose-contain {
    width: 100%;
    padding: 30px 24px;
    background-color: #fff;
    border-top: 1px solid #cbcbcb;
    margin-bottom: 20px;
    p {
      line-height: 30px;
      font-size: 30px;
      color: #333;
      .right-arrow {
        float: right;
      }
    }
  }
  // p-backing-orders
  .p-no-order {
    font-size: 30px;
    color: #666;
    img {
      display: block;
      margin: 66px auto 60px;
    }
    p {
      text-align: center;
    }
  }
}
</style>
