<template>
  <div class="content">
    <top-nav :topData="topData"></top-nav>
    <div class="me_info_contain flex">
      <div class="p_left flex">
        <img :src="user.avatar" alt="">
        <span class="p_username">{{user.nickname}}</span>
      </div>
      <div class="p_right">
        <img src="../../static/img/common/btn_more.png" alt="">
      </div>
    </div>
    <div class="me_order_enter">
      <p class="p_title">我的订单</p>
      <ul class="p_order_list flex">
        <li class="p_order" @click="getOrder()"><img src="../../static/img/me/icon_order.png" alt="">全部订单</li>
        <li class="p_order"><img src="../../static/img/me/icon_order_payment.png" alt="">待付款</li>
        <li class="p_order"><img src="../../static/img/me/icon_order_delivery.png" alt="">待发货</li>
        <li class="p_order"><img src="../../static/img/me/icon_order_closed.png" alt="">待收货</li>
        <li class="p_order"><img src="../../static/img/me/icon_order_shouhou.png" alt="">售后退款</li>
      </ul>
    </div>
    <div class="p_floor p_floor_1 flex">
      <div class="p_left_area flex">
        <img src="../../static/img/me/icon_wyqd.png" alt="">
        <div class="p_right">
          <p>我邀请的</p>
          <p>4名成员</p>
        </div>
      </div>
      <div class="p_center_spearate"></div>
      <div class="p_right_area flex">
        <img src="../../static/img/me/icon_hsdd.png" alt="">
        <div class="p_right">
          <p>回收订单</p>
          <p>已回收订单</p>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="p_floor p_floor_2 flex">
      <div class="p_left_area flex" @click="gotoPage(3)">
        <img src="../../static/img/me/icon_shoppingcart.png" alt="">
        <div class="p_right">
          <p>购物车</p>
          <p>添加商品到购物车</p>
        </div>
      </div>
      <div class="p_center_spearate"></div>
      <div class="p_right_area flex" @click="gotoPage(2)">
        <img src="../../static/img/me/icon_collection.png" alt="">
        <div class="p_right">
          <p>我的收藏</p>
          <p>收藏记录</p>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="p_floor p_floor_3 flex">
      <div class="p_left_area flex">
        <img src="../../static/img/me/icon_logistics.png" alt="">
        <div class="p_right">
          <p>物流地址</p>
          <p>跳转到顺丰官网</p>
        </div>
      </div>
      <div class="p_center_spearate"></div>
      <div class="p_right_area flex">
        <img src="../../static/img/me/icon_wdyqm.png" alt="">
        <div class="p_right">
          <p>邀请好友买优品</p>
          <p>推广二维码</p>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="p_floor p_floor_4 flex">
      <div class="p_left_area flex" @click="gotoPage(1)">
        <img src="../../static/img/me/icon_ads.png" alt="">
        <div class="p_right">
          <p>地址管理</p>
          <p>地址信息编辑</p>
        </div>
      </div>
      <div class="p_center_spearate"></div>
      <div class="p_right_area flex">
        <img src="../../static/img/me/icon_kh.png" alt="">
        <div class="p_right">
          <p>在线客服</p>
          <p>服务时间:10:00-18:00</p>
        </div>
      </div>
    </div>
    <bottom-nav :showData="BottomShowData"></bottom-nav>
  </div>
</template>
<script>
import {
  ajax
} from "../lib/axios.js"
import bottomNav from "./bottomNavbar.vue"
import topNav from "./topNavbar.vue"
import {
  Store
} from "../lib/vuex.js"
import router from '../router/index.js'
export default {
  name: 'me',
  data() {
    return {
      BottomShowData: {
        show_home: false,
        show_sale: false,
        show_recycle: false,
        show_me: true
      },
      topData: {
        title: '我的'
      }

    }
  },
  computed: {
    user: function() {
      return Store.state.login.userInfo;
    }
  },
  created() {
    if (!Store.state.login.token) {
      router.push('login');
    }
  },
  components: {
    bottomNav: bottomNav,
    topNav: topNav
  },
  methods: {
    getOrder() {
      ajax.order.getOrders().then(function(response) {
        console.log(response);
      })
    },
    gotoPage(id) {
      console.log(id);
      if (id == 1) {
        this.$router.push({
          path: 'address',
        });
      } else if (id == 2) {
        this.$router.push({
          path: 'collection',
        });
      } else if (id == 3) {
        this.$router.push({
          path: 'shoppingCart',
        });
      }
    }
  }
}

</script>
<style lang="sass" scoped>
.content {
  width: 100%;
  height: 100%;
  position: relative;
  padding-top: 88px;
  background-color: #efefef;
  .me_info_contain {
    width: 100%;
    height: 160px;
    padding: 0px 30px 0px 24px;
    background-color: #fff;
    justify-content: space-between;
    align-items: center;
    .p_left {
      align-items: center;
      img {
        display: inline-block;
        width: 104px;
        height: 104px;
        margin-right: 20px;
      }
      .p_username {
        color: #333;
        font-size: 30px;
      }
    }
  }
  .me_order_enter {
    width: 100%;
    margin-top: 20px;
    padding: 0px 24px;
    background-color: #fff;
    .p_title {
      width: 100%;
      border-bottom: 1px solid #cbcbcb;
      font-size: 30px;
      color: #333;
      line-height: 70px;
      text-align: left
    }
    .p_order_list {
      padding: 19px 41px 20px;
      justify-content: space-between;
      font-size: 28px;
      color: #333;
      .p_order {
        img {
          margin: 0 auto 15px;
        }
      }
    }
  }
  .p_floor {
    width: 100%;
    height: 120px;
    background-color: #fff;
    align-items: center;
    border-bottom: 1px solid #cbcbcb;
    p {
      line-height: 1.2;
    }
    .p_left_area,
    .p_right_area {
      width: 50%;
      padding-left: 33px;
      align-items: center;
      font-size: 30px;
      color: #333;
      img {
        margin-right: 20px;
        width: 36px;
        height: 36px;
        display: flex;
        flex-shrink: 0;
      }
      p {
        text-align: left;
      }
      p:nth-child(2) {
        color: #999;
        font-size: 24px;
      }
    }
    .p_center_spearate {
      width: 0px;
      height: 50px;
      border-right: 1px solid #cbcbcb;
    }
  }
  .p_floor_1 {
    margin: 20px 0px;
    border-bottom: none;
  }
  .p_floor_4 {
    border-bottom: none;
    margin-bottom: 118px;
  }
}

</style>
