<template>
  <div class="app">
    <top-nav :topData="topData"></top-nav>
    <div class="content">
      <div class="p_banner">
        <Carousel autoplay>
          <Carousel-item v-for="(item,index) in bannerData" key="{index}">
            <div class="demo-carousel"><img :src="item" alt=""></div>
          </Carousel-item>
        </Carousel>
      </div>
      <div class="p_floor p_floor_1">
        <p>{{floor_1.content}}</p>
        <p><span class="p_now_price">￥{{floor_1.price}}</span><span class="p_old_price">原价<i>￥{{floor_1.cost}}</i></span></p>
        <p class="flex"><span class="depreciation_cost_max">{{floor_1.depreciation_cost_min}} <span class="depreciation_cost_min">起/天</span> <span class="depreciation_cost">折旧费</span></span><span class="selled_num">已售{{floor_1.selled_num}}台</span></p>
      </div>
      <div class="p_floor p_floor_2 flex">
        <div class="p_left">
          <span><img src="../../static/img/good_detail/icon_zheng.png" alt="">正品保证</span>
          <span><img src="../../static/img/good_detail/back.png" height="32" width="32" alt="">一年随时退还</span>
          <span><img src="../../static/img/good_detail/icon_bao.png" alt="">增值保障服务</span>
        </div>
        <div class="p_right">
          <img src="../../static/img/common/btn_more.png" alt="">
        </div>
      </div>
      <div class="p_floor p_floor_3 flex" @click="show_modal(0)">
        <div class="p_left">
          请选择规格
        </div>
        <div class="p_right">
          <img src="../../static/img/common/btn_more.png" alt="">
        </div>
      </div>
      <div class="p_floor p_floor_4 flex" @click="gotoPagePj()">
        <div class="p_left">
          评价({{floor_4.comment}})
        </div>
        <div class="p_right">
          <img src="../../static/img/common/btn_more.png" alt="">
        </div>
      </div>
      <div class="p_floor p_floor_5">
        <ul class="p-good-pj-list">
          <li class="p-good-pj" v-for="item in PJ_data">
            <p class="p-pj-user"><img :src="item.avatar" height="104" width="104" alt=""><span>{{item.nickname}}</span></p>
            <p class="p-pj-detail">
              {{item.content}}
            </p>
            <p>型号：{{item.goods_content}} </p>
          </li>
        </ul>
      </div>
      <div class="p-good-detail p_floor_6">
        <p class="p-good-desc"><span></span>商品参数
          <a class="p-left-arrow "> </a>
        </p>
        <div class="p-good-desc-content hide">
        </div>
        <p class="p-image-title"><span></span>实拍图片</p>
        <ul class="p-image-list">
          <li v-for="item in DetailImg_data"><img :src="item"></li>
        </ul>
      </div>
    </div>
    <div class="bottom_good_area flex">
      <div class="p_kf"><img src="../../static/img/good_detail/icon_kf2.png" alt=""></div>
      <div class="p_collection" @click="switchFavored"><img src="../../static/img/good_detail/icon_shouc.png" height="40" width="40" alt="" v-if="isFavored"><img src="../../static/img/good_detail/icon_unshouc.png" alt="" v-else></div>
      <div class="p_btn_cart">
        <a class="p_fast_cart" @click="show_modal(1)">加入购物车</a>
      </div>
      <div class="p_btn_buy">
        <a class="p_fast_buy" @click="show_modal(2)">立即购买</a>
      </div>
    </div>
    <bottom-modal v-model="showModal" class="choose">
      <div class="choose-msg flex">
        <div class="choose-img left">
          <img :src="modal_data.img" alt="">
        </div>
        <div class="right">
          <div class="choose-price flex_column">
            <a class="p-price-info"><span class="p-price"></span></a>
            <!-- <span class="p-store"></span> -->
            <span class="p-depreciation-price"></span>
            <span class="p-choose-attr">请选择规格属性</span>
          </div>
          <div class="choose-classify hide">选择分类</div>
        </div>
        <a class="p-close-modal-choose" @click="showModal=false"><img src="../../static/img/common/icon_x.png" alt=""></a>
      </div>
      <div class="classify">
        <div class='attr-list'>
          <div v-for="(item,key) in showData">
            <p class="attr-name">{{key}}</p>
            <p class="attr-type" v-bind:data-name="key">
              <!--   <span class="btn-s btn-white choose-attr" :class={active:isActive,uactive:isUactive,normal:!isActive&&!isUactive} v-for="(_item,index) in item" v-bind:data-name='_item' v-bind:data-index='index' @click="choose_attr(index)">{{_item}}</span> -->
              <choose-attr v-for="(_item,index) in item" :key="index" v-bind:chooseItem="_item" v-bind:chooseIndex="index" v-bind:chooseKey="key" v-on:choose-attr="choose_attr"></choose-attr>
            </p>
          </div>
        </div>
        <p class="p-num">
          <span>购买数量</span>
          <a class="num-ctn">
            <stepper :stepperData="stepperData"></stepper>
          </a>
        </p>
        <p class="p-insurance-info">
          <span class="p-insurance-price">￥{{modal_data.insurance}}</span><span>增值保障服务</span>
          <span class="p_right p_insurance_info g-link" data-page="common_problem_detail" data-params="title=增值保障服务">什么是增值保障服务?</span>
        </p>
        <p class="p-old-fee-info">
          <span class="p-old-fee">￥0.0</span>起/天折旧费
          <span class="p_right p_old_fee g-link" data-page="common_problem_detail" data-params="title=折旧费">了解折旧费</span>
        </p>
      </div>
      <div class="buy-btn">
        <div class="addcar   orient" v-if="show_addcar_single">
          <button class="btn-b addcar-btn" @click="p_add_cart">加入购物车</button>
        </div>
        <div class="buy   orient" v-else-if="show_buy_single">
          <button class="btn-b btn-orange addcar-buy" @click="p_fast_buy">立即购买</button>
        </div>
        <div class="double   orient" v-else>
          <button class="btn-s addcar-btn" @click="p_add_cart">加入购物车</button>
          <button class="btn-s btn-orange addcar-buy" @click="p_fast_buy">立即购买</button>
        </div>
      </div>
    </bottom-modal>
  </div>
</template>
<script>
import {
  ajax
} from "../lib/axios.js"
import topNav from "./topNavbar.vue"
import bottomModal from "./bottomModal.vue"
import chooseAttr from "./chooseAttr.vue"
import stepper from "./stepper.vue"
import {
  sku
} from "../lib/sku.js"
import {
  storage
} from "../lib/storage.js"
export default {
  data() {
    return {
      bannerData: [],
      topData: {
        title: '商品详情'
      },
      floor_1: {},
      floor_4: {},
      PJ_data: [],
      DetailImg_data: [],
      isFavored: false,
      showModal: false,
      // attrData: [],
      showData: {},
      goodArr: [],
      choosed: [],
      modal_data: [],
      show_addcar_single: false,
      show_buy_single: false,
      currentModelId: null,
      currentStock: 0,
      stepperData: {
        min: 1,
        max: null,
        step: 1,
        value: 1
      }
    }
  },
  created() {
    var goodId = this.$route.query.goodId;
    var self = this;
    if (goodId) {
      ajax.index.getGood(goodId).then(function(response) {
        console.log(response);
        if (response.status == 200 && response.data.api_code == 200) {
          let oneItem = {};
          response.data.imgs.forEach(function(item) {
            oneItem = "http://116.62.222.82:8082" + item;
            self.bannerData.push(oneItem);
          });
          self.floor_1.content = response.data.content;
          self.floor_1.price = response.data.price;
          self.floor_1.cost = response.data.cost;
          self.floor_1.selled_num = response.data.selled_num;
          self.floor_1.depreciation_cost_min = response.data.depreciation_cost_min;
          self.floor_4.comment = response.data.comment;
          response.data.detail_imgs.forEach((item) => {
            self.DetailImg_data.push('http://116.62.222.82:8082' + item);
          });
          if (response.data.favored) {
            self.isFavored = true
          } else {
            self.isFavored = false
          }
          // /////////////////////////////////////////////
          let models = response.data.models;
          let goodsData = [];
          let defaultModel = models[0];
          models.forEach(function(item) {
            let skuItem = {};
            let goodItem = {};

            goodItem = {
              id: item.id,
              name: item.name,
              price: item.price,
              promote_price: item.promote_price,
              real_stock: item.real_stock >= 0 ? item.real_stock : 0,
              depreciation_cost: item.depreciation_cost
            };
            // 商品图片
            // 拿到默认商品
            if (item['default']) {
              defaultModel = item;
            }
            if (item.imgs.length > 0 && item.imgs[0]) {
              goodItem['img'] = item.imgs[0];
            } else {
              goodItem['img'] = item.imgs[0];
            }
            item.attrs.forEach(function(_item) {
              skuItem[_item.name] = _item.val;
            });
            skuItem['id'] = item.id;
            skuItem['num'] = item.real_stock >= 0 ? item.real_stock : 0;
            goodsData.push(skuItem);
            self.goodArr.push(goodItem);
          });
          // console.log(goodsData);
          var showData = sku.init(goodsData);
          // console.log(showData);
          // self.showData = showData;
          let keys = Object.keys(showData);
          keys.forEach(function(key) {
            if (key == "id" || key == "num") {
              return
            } else {
              self.showData[key] = showData[key];
            }
          });
          // 弹出层内部的数据控制

          self.modal_data.insurance = response.data.insurance;
          self.modal_data.img = "http://116.62.222.82:8082" + defaultModel.imgs[0];
        }
      });
      // 获取评价
      ajax.index.getGoodPJ(goodId).then(function(response) {
        // console.log(response);
        if (response.status == 200 && response.data.api_code == 200) {

          let sliceData = response.data.data.reverse().slice(0, 3);
          // console.log(sliceData);
          sliceData.forEach((item) => {
            let oneItem = {};
            oneItem.content = item.content;
            oneItem.goods_content = item.goods_content;
            oneItem.nickname = item.user.nickname;
            if (item.user.avatar) {
              oneItem.avatar = "http://116.62.222.82:8082" + item.user.avatar
            } else {
              oneItem.avatar = '../../static/img/common/default.png';
            }
            self.PJ_data.push(oneItem);
          })
        }
      })

    }
  },
  components: {
    topNav: topNav,
    bottomModal: bottomModal,
    chooseAttr: chooseAttr,
    stepper: stepper
  },
  methods: {
    show_modal(status) {
      this.showModal = true;
      if (status == 0) {
        this.show_buy_single = false;
        this.show_addcar_single = false;
      } else if (status == 1) {
        this.show_buy_single = false;
        this.show_addcar_single = true;
      } else if (status == 2) {
        this.show_buy_single = true;
        this.show_addcar_single = false;
      }
    },
    gotoPagePj() {
      let goodId = this.$route.query.goodId;
      this.$router.push({
        path: '/good_pj',
        query: {
          goodId: goodId
        }
      });
    },
    switchFavored() {
      var self = this;
      if (!this.checkLogined()) {
        return;
      }
      let id = this.$route.query.goodId;
      if (this.isFavored) {
        ajax.good.unfavorGood(id).then((item) => {
          if (item.status == 200) {
            self.$Message.info('取消收藏成功');
            self.isFavored = false;
          } else {
            self.$Message.success('取消收藏失败')
          }
        })
      } else {
        ajax.good.favorGood(id).then((item) => {
          if (item.status == 200) {
            self.$Message.info('收藏成功');
            self.isFavored = true;
          } else {
            self.$Message.success('收藏失败')
          }
        })
      }
    },
    checkLogined() {
      if (!storage.get('token')) {
        this.$router.push({
          path: 'login'
        });
        return false
      } else {
        return true
      }
    },
    choose_attr(currentItem) {
      var self = this;
      let allItem = currentItem.$parent.$children;
      let siblingsChildren = allItem.filter(function(item) {
        return item.chooseKey == currentItem.chooseKey;
      });
      siblingsChildren.forEach((_item) => {
        if (_item._uid == currentItem._uid && currentItem.isActive) {
          _item.isActive = true;
        } else {
          _item.isActive = false;
        }
      });
      let key = '';
      var self = this;
      // let choosedArray=Object.values(self.choosed);
      for (let _key in self.choosed) {
        // let item = self.choosed[_key];
        if (self.choosed[_key]) {
          if (self.choosed[_key].isActive && self.choosed[_key]._uid === currentItem._uid) {
            self.choosed[_key].isActive = false;
            // 遍历时不可以delete
            self.choosed[_key] = null;
          } else {

            self.choosed[_key].isActive = true;

            // 怎么找siblings?
            // 通过key属性来对children进行分组
            // $btn.addClass('active').siblings().removeClass('active');
            if (self.choosed[_key].chooseItem !== '') {
              key += self.choosed[_key].chooseItem + ';';
            }
          }
        }
      }

      var result = sku.getResult(key, true);
      allItem.forEach((item) => {
        item.$data.isUactive = true
      });
      allItem.forEach((item) => {

        if (result.indexOf(item.chooseItem) != -1) {
          item.$data.isUactive = false;
        }
      });
      if (sku.resultID && sku.resultID.id) {
        $.each(self.goodArr, function(index, item) {
          if (item.id == sku.resultID.id) {

            $('.choose-price .p-price').html('价格:￥' + item.price);
            // $('.choose-price .p-store').html("库存" + sureGood[0].real_stock + "件");
            // currentStock = item.real_stock;
            $('.choose-price .p-depreciation-price').html("(折旧费￥" + item.depreciation_cost + "/天)");
            $('.p-old-fee-info .p-old-fee').html("￥" + item.depreciation_cost);
            $('.choose-img img').attr('src', "http://116.62.222.82:8082" + item.img);
            $('.choose .choose-classify').text();
            // 取得商品id

            self.currentModelId = item.id;
            self.currentStock = item.real_stock;
            // initStepper();
            self.stepperData = { min: 1, max: item.real_stock, step: 1, value: 1 };
            $('.choose-classify').html("已选择：" + key);
          }
        })
      } else {
        $('.buy-bar').attr('data-id', null);
        self.currentModelId = null;
        self.currentStock = 0
        $('.choose-classify').html('请选择规格');

      }

    },
    p_add_cart() {
      var self = this;
      if (!this.checkLogined()) {
        return;
      }
      if (!this.currentModelId) {
        this.$Message.warning("请选择商品型号");
        return;
      }
      if (this.currentStock <= 0) {
        this.$Message.warning("库存不足哦~");
        return;
      }
      var id = this.currentModelId;
      var data = { num: this.stepperData.value };
      ajax.good.addToCart(id, data).then((res) => {
        console.log(res);
        if (res.status == 200 && res.data.api_code == 200) {
          self.$Message.info("成功添加到购物车")
        } else {
          self.$Message.warning("添加失败")
        }
      })
    },
    p_fast_buy() {
      if (!this.checkLogined()) {
        return;
      }
      if (!this.currentModelId) {
        this.$Message.warning("请选择商品型号");
        return;
      }
      if (this.currentStock <= 0) {
        this.$Message.warning("库存不足哦~");
        return
      };
      this.$router.push({
        path: 'preorder',
        query: {
          id: this.currentModelId,
          num: this.stepperData.value,
          froms: 'goods'
        }
      })
    }
  }
}

</script>
<style lang="less" scoped>
.content {
  position: relative;
  top: 88px;
  background-color: #efefef;
  .p_banner {
    width: 100%;
    height: 420px;
  }
  .p_floor_1 {
    width: 100%;
    background-color: #fff;
    border-top: 1px solid #cbcbcb;
    p:nth-child(1) {
      width: 100%;
      text-align: left;
      font-size: 32px;
      color: #333;
      font-weight: bold;
      padding-left: 24px;
      padding-top: 22px;
      padding-bottom: 22px
    }
    p:nth-child(2) {
      width: 100%;
      text-align: left;
      font-size: 32px;
      color: #333;
      padding-left: 20px;
      .p_now_price {
        font-size: 32px;
        color: #d43629;
        padding-right: 14px;
      }
      .p_old_price {
        color: #999;
        font-size: 24px;
      }
      padding-bottom:22px;
    }
    p:nth-child(3) {
      width: 100%;
      text-align: left;
      padding-left: 24px;
      padding-right: 24px;
      color: #333;
      padding-bottom: 20px;
      font-weight: bold;
      border-bottom: 1px solid #cbcbcb;
      justify-content: space-between;
      align-items: center;
      .depreciation_cost_max {
        color: #d43629;
        font-size: 36px;
      }
      .depreciation_cost_min {
        color: #d43629;
        font-size: 22px;
      }
      .depreciation_cost {
        font-size: 22px;
        color: #333;
      }
      .selled_num {
        font-weight: normal;
        font-size: 22px; // margin-top: 10px;
        color: #999;
      }
    }
  }
  .p_floor_2 {
    width: 100%;
    height: 80px;
    padding: 0 24px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #cbcbcb;
    margin-bottom: 20px;
    background-color: #fff;
    .p_left {
      display: flex;
      span {
        display: flex;
        align-items: center; // line-height: 32px;
        color: #999;
        font-size: 28px;
        margin-right: 25px;
        img {
          display: inline-block;
          width: 32px;
          height: 32px;
          margin-right: 10px;
        }
      }
    }
  }
  .p_floor_3,
  .p_floor_4 {
    width: 100%;
    height: 80px;
    padding: 0 24px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #cbcbcb; // margin-bottom: 20px;
    background-color: #fff;
    font-size: 28px;
  }
  .p-good-pj-list {
    width: 100%;
    padding-left: 34px;
    background-color: #fff;
    .p-good-pj {
      width: 100%;
      padding: 20px 34px 20px 0px;
      border-bottom: 1px solid #cbcbcb;
      p:nth-child(1) {
        color: #666;
        font-size: 28px;
        display: flex; // font-weight: bold;
        align-items: center;
        img {
          width: 54px;
          height: 54px;
          margin-right: 10px;
        }
      }
      p:nth-child(2) {
        color: #666;
        font-size: 28px;
        margin-top: 10px;
        margin-bottom: 10px;
      }
      p:nth-child(3) {
        color: #999;
        font-size: 28px;
        .pj_time {
          float: right;
          color: #999;
        }
      }
    }
  }
  .p-good-detail {
    background-color: #fff;
    .p-image-title,
    .p-good-desc {
      height: 110px;
      padding: 0px 24px 0px 24px;
      font-size: 30px;
      color: #333;
      line-height: 110px;
      border-top: 1px solid #cbcbcb;
      span {
        width: 0px;
        border-left: 2px solid #38c1fa;
        padding-right: 12px;
      }
      a {
        height: 30px;
        float: right;
        margin-top: 45px;
        width: 14px; // background: url('../img/common/btn_more.png') no-repeat 0 0;
      }
      a.p-down-arrow {
        width: 30px; // background: url('../img/common/icon_more2.png') no-repeat 0 0;
      }
    }
    .p-good-desc-content {
      padding-bottom: 20px;
      font-size: 24px;
      p {
        padding: 0px 30px 0px 50px;
        color: #666;
      }
    }
    .p-image-list {
      width: 100%; // padding: 0px 30px 30px;
      padding: 0px 30px 80px;
      img {
        margin-bottom: 20px;
        width: 100%;
      }
    }
  }
}

// /////////////////
.bottom_good_area {
  width: 100%;
  height: 98px;
  border-top: 1px solid #cbcbcb;
  position: fixed;
  background-color: #fff;
  bottom: 0;
  left: 0;
  align-items: center;
  .p_kf,
  .p_collection {
    width: 115px;
    height: 100%;
    line-height: 98px;
    img {
      margin: 29px auto;
    }
  }
  .p_kf {
    border-right: 1px solid #cbcbcb;
  }
  .p_btn_cart,
  .p_btn_buy {
    width: 260px;
    height: 100%;
    text-align: center;
    a {
      width: 100%;
      height: 100%;
      color: #fff;
      font-size: 30px;
      text-align: center;
      line-height: 98px;
    }
  }
  .p_btn_cart {
    background-color: #ffb723;
  }
  .p_btn_buy {
    background-color: #d43629;
  }
}

.choose {
  z-index: 100;
  .modal {
    width: 750px; // max-height: 80%;
    overflow-y: hidden;
    background: #fff;
    .choose-msg {
      width: 100%;
      height: 245px;
      margin: 0 auto;
      padding: 0px 15px 0px 24px;
      position: relative;
      a.p-close-modal-choose {
        width: 50px;
        height: 80px;
        position: absolute;
        right: 45px;
        top: 60px;
        img {
          float: right;
        }
      }
      .choose-img {
        width: 200px;
        height: 200px;
        margin-right: 24px;
        margin-top: 45px;
        display: flex;
        flex-shrink: 0;
        img {
          width: 200px;
          height: 200px;
          border: 1px solid #cbcbcb;
        }
      }
      .right {
        width: 100%;
        margin-top: 85px;
      }
      .choose-price {
        .p-price-info {
          color: #d43629;
          font-size: 32px;
        }
        span.p-depreciation-price {
          color: #666;
          font-size: 28px;
        }
        span.p-store {
          color: #333;
          font-size: 28px;
        }
        span.p-choose-attr {
          color: #333;
          font-size: 28px;
        }
      }
    }
    .classify {
      padding: 30px 30px 30px;
      width: 750px; // max-height: 666px;
      // height: calc(100% - 330px);
      // height: calc(100% - 330px); //wx
      height: 600px;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      .attr-name {
        font-size: 30px;
        margin-bottom: 2px;
      }
      .attr-type {
        font-size: 24px;
        color: #333;
        margin-bottom: 30px;
        span {
          min-width: 160px;
          display: inline-block;
          margin-top: 20px;
          margin-right: 36px;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          border-radius: 5px;
        }
        .active {
          border-color: #0979bf;
          color: #0979bf;
        }
        .uactive {
          border-color: #999;
          color: #999;
          border-style: dashed;
        }
      }
      .p-num {
        font-size: 1.15rem;
        margin-top: 59px; // margin-bottom: 20px;
      }
    }
    .buy-btn {
      .addcar-btn,
      .addcar-buy {
        width: 100%;
        height: 84px;
        border: none;
        outline: none;
        text-align: center;
        border-radius: 0px;
        font-size: 30px;
      }
      .addcar-btn {
        background-color: #ffb723;
        color: #fff;
      }
      .addcar-buy {
        background-color: #d43629;
      }
      .double {
        display: flex;
        button {
          width: 50%;
          display: inline-block;
          color: #fff;
        }
      }
    }
    .num-ctn {
      float: right; // width: 185px;
    }

    .p-insurance-info {
      width: 100%;
      margin-top: 88px;
      font-size: 30px;
      color: #333;
      span.p-insurance-price {
        color: #d43629;
      }
      span.p_right {
        float: right;
        color: #38c1fa;
        font-size: 30px;
        font-weight: bold;
      }
    }
    .p-old-fee-info {
      width: 100%;
      margin-top: 40px;
      font-size: 30px;
      color: #333;
      span.p-old-fee {
        color: #d43629;
      }
      span.p_right {
        float: right;
        color: #38c1fa;
        font-size: 30px;
        font-weight: bold;
      }
    }
  }
}

</style>
