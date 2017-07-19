<template>
  <div class="app">
    <top-nav :topData="topData"></top-nav>
    <div class="content">
      <div class="p-gwc-list" v-if="show">
        <div class="item row" data-id="item.id" v-for="item in shoppingData">
          <div class="col-10 p-choose-good">
            <input type="checkbox" class="item-ckbox">
          </div>
          <div class="col-25 good-img g-link" data-page="goods" data-params="id={$goodsId}">
            <img :src="item.img" />
          </div>
          <div class="col-60 right-info">
            <div class="title  ">{{item.name}}<span class='close'></span></div>
            <div class="model g-link" data-page="goods" data-params="id={$goodsId}">{{item.model}}</div>
            <div class="info ">
              <div class="price">￥{{item.price}}</div>
              <div class="num-ctn">
                <stepper :stepperData="item.stepperData"></stepper>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="p-empty " v-else>
        <img src="../../static/img/common/pic_gwck.png" height="262" width="394" alt="">
        <p>您的购物车空空如也</p>
        <p>去挑选商品吧</p>
      </div>
      <div class="pay-bar">
        <span class="p-all">
        <input type="checkbox" class="item-ckbox all-ckbox" @change="getAll">全部选择</span>
        <span class="info">合计: <span class="cost">￥0.00</span></span>
        <button class="btn-s btn-orange pay-btn">去结算<span class='hide num'></span></button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  ajax
} from "../lib/axios.js"
import topNav from "./topNavbar.vue"
import stepper from "./stepper.vue"
export default {
  data() {
    return {
      topData: {
        title: '购物车详情'
      },
      show: true,
      shoppingData: []
    }
  },
  created() {
    this.getListData();
  },
  components: {
    topNav: topNav,
    stepper: stepper
  },
  methods: {
    getListData() {
      var self = this;
      ajax.good.getCart().then((response) => {
        if (response.status == 200 && response.data.api_code == 200) {
          console.log(response);
          let listData = response.data.items;
          listData.forEach((item) => {
            let oneItem = {};
            oneItem.id = item.id;
            oneItem.img = "http://116.62.222.82:8082" + item.model.imgs[0];
            oneItem.price = item.model.price;
            oneItem.goodId = item.goods.id;
            oneItem.name = item.goods.name;
            oneItem.model = item.model.attr_str;
            let stepperData = {};
            stepperData.max = item.model.real_stock;
            stepperData.value = item.num;
            stepperData.min = 0;
            stepperData.step = 1;
            oneItem.stepperData = stepperData;
            self.shoppingData.push(oneItem);
          });
          if (self.shoppingData.length == 0) {
            self.show = false;
          }
        } else {
          self.show = false;
          self.$Message.warning('获取数据失败，请重试~')
        }
      })
    },
    getAll() {

    }
  }
}

</script>
<style scoped lang="sass">
.content {
  position: relative;
  top: 88px;
  background-color: #efefef;

  .item {
    position: relative;
    border-top: 1px solid #cbcbcb;
    height: 230px;
    padding: 30px 0 45px 0;
    background: #fff;
    display: flex;
    .p-choose-good {
      position: relative;
      height: 100%;
      width: 10%;
      input {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
      }
    }
    .good-img {
      height: 100%;
      overflow: hidden;
      width: 25%;
      img {
        width: 155px;
        height: 155px;
        margin: 0 auto;
      }
    }
    .right-info {
      width: 60%;
    }
    .text {
      padding: 0 105px 0 20px;
    }
    .model {
      color: #333;
      font-size: 28px;
      line-height: 2.0;
      span {
        margin-right: 20px;
      }
    }
    .title {
      line-height: 1.2;
      font-size: 28px;
      .close {
        position: absolute;
        right: 30px;
        top: 30px;
        background: url(../../static/img/common/icon_x.png) no-repeat;
        width: 32px;
        height: 37px;
      }
    }
    .price {
      font-size: 28px;
      line-height: 2.0;
      color: #cb4923;
      position: absolute;
      bottom: 30px;
    }
    .num-ctn {
      position: absolute;
      right: 35px;
      bottom: 30px;
    }
    .stepper {
      width: 180px;
      line-height: 60px;
      .add,
      .sub {
        font-size: 1.5rem;
      }
      .num {
        line-height: 60px;
      }
    }
  }

  .p-empty {
    width: 100%;

    img {
      margin: 0px auto 55px;
    }
    p {
      width: 100%;
      color: #666;
      font-size: 30px;
      text-align: center;
    }
  }

  .pay-bar {
    position: fixed;
    bottom: 0px;
    width: 750px;
    font-size: 32px;
    line-height: 98px;
    padding: 0 0 0 24px;
    background: #fff;
    border-top: 1px solid #cbcbcb;
    .p-all {
      input {
        float: left;
        margin-top: 16px;
        margin-right: 0px;
      }
    }
    .info {
      margin-left: 76px;
      position: absolute;
      top: 0;
      left: 160px;
      .cost {
        font-size: 1rem;
        color: #cb4329;
      }
    }
    .pay-btn {
      float: right;
      width: 260px;
      height: 100%;
      text-align: center;
      line-height: 98px;
      border: none;
      border-radius: 0px;
      outline: none;
      background-color: #d43629;
      color: #fff;
      font-size: 30px;
    }
    .pay-btn.active {
      background: #cb4329;
    }
  }
}

</style>
