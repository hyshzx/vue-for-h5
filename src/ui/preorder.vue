<template>
  <div class="app">
    <top-nav :topData="topData"></top-nav>
    <div class="content">
      <div class="p-me-address flex g-link" data-page="me_address" data-params="from=preorder">
        <div class="flex left_area">
          <img src="../../static/img/common/icon_ads2.png" height="50" width="50" alt="">
          <p class="p-me-address-info flex_column " v-if="showAddr">
            <a><span class="me_name">{{address.receiver}}</span><span class="me_phone">{{address.mobile}}</span></a>
            <a class="me_address">{{address.name}}</a>
          </p>
          <p class="p-me-address-info-empty " v-else>请先输入地址</p>
        </div>
        <a><img src="../../static/img/common/btn_more.png" alt=""></a>
      </div>
      <div class="p-order-list">
        <div class='order'>
          <div class="head">订单<span class="index">1</span></div>
          <div class='good-list'>
            <div class="p-item" v-for="item in orderData">
              <div class="flex goodInfo">
                <div class="col-20 img">
                  <img :src="item.img" alt="">
                </div>
                <div class="col-80 text">
                  <div class="title">{{item.name}}</div>
                  <div class="model">{{item.model}}</div>
                  <div>
                    <span class="price">￥{{item.price}}</span>
                    <span class="num-ctn">x{{item.num}}</span>
                  </div>
                </div>
              </div>
              <div class="insurance">
                <a class="p-insurance-info">增值保障服务(费用：<span class="p-insurance-price">￥{{item.insurance}}</span>)</a>
              </div>
            </div>
          </div>
          <div class="msg-ctn ">
            <span>买家留言：</span>
            <input class="msg " type="text" placeholder="选填" />
          </div>
        </div>
      </div>
      <div class="section_total">
        <div class="row">
          <div class="col-70  ">小计</div>
          <div class="col-30 dis-money p-small-money">+￥{{price.goods_amount}}</div>
        </div>
        <div class="row">
          <div class="col-70 ">运费</div>
          <div class="col-30 dis-money fee">+￥{{price.shipping_fee}}</div>
        </div>
        <div class="row coupon-discount-ctn">
          <div class="col-70">优惠</div>
          <div class="col-30 dis-money coupon-discount">-￥{{price.goods_coin}}</div>
        </div>
        <div class="row">
          <div class="col-70">合计</div>
          <div class="col-30 dis-money p-all-money">￥{{price.goods_amount}}</div>
        </div>
      </div>
      <div class="pay_type">
        <div class="row pay_type_wx">
          <div class="col-70"><img src="../../static/img/common/icon_wxpay.png" alt="">微信支付</div>
          <div class="col-30">
            <input type="radio" class="pay-type " name="pay-type" value="wx" checked>
          </div>
        </div>
        <div class="row pay_type_zfb">
          <div class="col-70"><img src="../../static/img/common/iocn_zfbpay.png" alt="">支付宝支付</div>
          <div class="col-30">
            <input type="radio" class="pay-type" name="pay-type" value="zfb">
          </div>
        </div>
      </div>
    </div>
    <div class="footer p-putbar">
      <div>共<span class='p-all-count'>{{sum}}</span>件</div>
      <div class="money">合计: <span class='p-all-money'> ￥{{totalPrice}} </span></div>
      <button class='pay-btn'>结算</button>
    </div>
  </div>
</template>
<script>
import {
  ajax
} from "../lib/axios.js"
import topNav from "./topNavbar.vue"
export default {
  data() {
    return {
      topData: {
        title: '订单详情'
      },
      showAddr: true,
      address: [],
      orderData: [],
      price: {},
      sum: 0,
      totalPrice: 0
    }
  },
  created() {
    var self = this;
    var froms = this.$route.query.froms;
    var id = this.$route.query.id;
    var num = this.$route.query.num;
    if (froms == "goods") {
      ajax.good.preorder(id, { num: num }).then((res) => {
        console.log(res);
        if (res.status == 200 && res.data.api_code == 200) {
          self.renderData(res.data);
        }
      })
    }
  },
  components: {
    topNav: topNav,
  },
  methods: {
    renderData(data) {
      var self = this;
      if (data.address) {
        this.address = data.address;
      } else {
        this.showAddr = false;
      }
      if (data.orders && data.orders.length != 0) {
        let items = data.orders[0].items;
        items.forEach((item) => {
          let oneItem = {};
          oneItem.img = "http://116.62.222.82:8082" + item.model.imgs[0];
          oneItem.name = item.goods.name;
          oneItem.model = item.model.attr_str;
          oneItem.price = item.goods_amount;
          oneItem.num = item.num;
          oneItem.insurance = item.insurance;
          self.orderData.push(oneItem);
          self.sum += parseInt(item.num);
        });
        self.totalPrice = data.amount;
        self.price.goods_amount = data.orders[0].goods_amount;
        self.price.shipping_fee = data.orders[0].shipping_fee;
        self.price.goods_coin = data.orders[0].goods_coin;

      }
    }
  }
}

</script>
<style scoped lang="sass">
.app {
  overflow-y: auto;
}

.content {
  position: relative;
  top: 88px;
  padding-bottom: 88px;
  background-color: #efefef; // overflow-y: auto;
  .p-me-address {
    width: 100%; // height: 120px;
    min-height: 120px;
    padding: 10px 24px;
    background-color: #fff;
    margin-bottom: 20px;
    align-items: center;
    line-height: 1.6;
    justify-content: space-between;
    .left_area {
      align-items: center;
      img {
        margin-right: 24px;
      }
      .p-me-address-info,
      .p-me-address-info-empty {
        color: #333;
        font-size: 30px;
        margin-right: 26px;
        .me_name {
          margin-right: 26px;
        }
        .me_address {
          color: #999;
          font-size: 24px;
        }
      }
      .p-me-address-info-empty {
        color: #666;
        font-size: 30px;
      }
    }
  } //
  .p-order-list {
    background-color: #fff;
    margin-top: 20px;
    .head {
      height: 60px; // border-bottom: 1px solid #cbcbcb;
      line-height: 60px;
      padding: 0 30px;
      font-size: 28px;
    }
    .msg-ctn {
      span {
        width: 205px;
      }
      padding: 14px 24px;
      height: 78px;
      font-size: 30px;
      input {
        width: 75%;
        height: 50px;
      }
    }
    .p-item {
      padding: 20px 0px 0px;
      width: 100%;
      font-size: 30px;
      color: #333; // border-top: 1px solid #cbcbcb;
      .goodInfo {
        padding: 0 24px;
        border-bottom: 1px solid #cbcbcb;
      }
      .img {
        height: 100%;
        width: 20%;
        display: inline-block;
        img {
          max-width: 100%;
        }
      }
      .text {
        padding: 0 0 0 15px;
        width: 80%;
        display: inline-block;
        .model {
          color: #333;
          font-size: 28px;
          line-height: 2.2;
          span {
            margin-right: 20px;
          }
        }
        .title {
          line-height: 1.2;
          span {
            position: absolute;
            right: 30px;
            top: 30px;
            width: 32px;
            height: 36px;
            background: red;
          }
        }
        .price {
          line-height: 2.2;
          color: #c90920;
        }
        .num-ctn {
          float: right;
          line-height: 2.2;
          color: #666;
        }
      }
      .insurance {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 78px;
        line-height: 78px;
        padding: 0px 24px;
        font-size: 30px;
        border-bottom: 1px solid #cbcbcb;
        color: #333;
        a.p-insurance-info {
          span {
            color: #d43629;
          }
        }
        a.p-insurance-status {
          img {
            display: inline-block;
            margin-left: 10px;
          }
        }
      }
    }
  }
  .section_total {
    line-height: 78px;
    color: #333;
    font-size: 30px; // margin-bottom: 118px;
    padding: 0px 0px 0px 24px;
    background-color: #fff;
    .row {
      padding-right: 24px;
      border-bottom: 1px solid #cbcbcb;
      display: flex;
      .col-30 {
        width: 30%;
        text-align: right;
      }
      .col-70 {
        width: 70%;
      }
    }
    .row:nth-last-child(1) {
      border-bottom: none;
    }
  }
  .pay_type {
    // line-height: 78px;
    color: #333;
    font-size: 30px; // margin-bottom: 118px;
    padding: 0px 0px 0px 24px;
    background-color: #fff;
    margin-top: 20px;
    .row {
      padding-right: 24px;
      border-bottom: 1px solid #cbcbcb;
      display: flex;
      .col-30 {
        width: 30%;
        text-align: right;
      }
      .col-70 {
        width: 70%;
        display: flex;
        align-items: center;
        img {
          display: inline-block;
        }
      }
    }
  }
}

.p-putbar {
  width: 100%;
  height: 98px;
  line-height: 98px;
  background: #fff;
  position: fixed;
  bottom: 0;
  font-size: 28px;
  padding-left: 36px;
  border-top: 1px solid #cbcbcb;
  div {
    float: left;
    margin-right: 30px;
    span {
      color: #eb5800;
    }
  }
  .pay-btn {
    float: right;
    border: none;
    outline: none;
    width: 260px;
    height: 100%;
    text-align: center;
    line-height: 98px;
    background-color: #d43629;
    color: #fff;
    font-size: 30px;
  }
}

</style>
