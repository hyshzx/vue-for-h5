<template>
  <div class="app">
    <top-nav :topData="topData"></top-nav>
    <div class="content">
      <div class="me_address_edit_form">
        <div class="me_receive_name">
          <span>收货人姓名：</span>
          <input type="text" class="p-name" placeholder="收货人姓名" v-model="address.receiver">
        </div>
        <div class="me_receive_phone">
          <span>手机号码：</span>
          <input type="text" class="p-phone" placeholder="手机号码" v-model="address.mobile">
        </div>
        <div class="me_address_choose_pcq">
          <a class="col-100"> <span class="p-out-name">省:</span>
            <select id="province" v-model="province">
              <option v-for="item in provinceData" v-bind:value="item.id">{{item.region_name}}</option>
            </select>
          </a>
          <a class="col-100"> <span class="p-out-name">市:</span>
            <select id="city" v-model="city">
              <option v-for="item in cityData" v-bind:value="item.id">{{item.region_name}}</option>
            </select>
          </a>
          <a class="col-100"> <span class="p-out-name">区:</span>
            <select id="region" v-model="region">
              <option v-for="item in regionData" v-bind:value="item.id">{{item.region_name}}</option>
            </select>
          </a>
        </div>
        <div class="me_receive_address_detail">
          <span>详细地址：</span>
          <input type="text" placeholder="如街道，楼牌号等" class="p-addr-de" v-model='address.address'>
        </div>
        <p class="me_address_default_choose">
          <a class="choose-checkbox flex">
            <input type="checkbox" class="item-ckbox" :checked="address.dft===1" @change="switchDftStatus"> 默认收货地址
          </a>
        </p>
      </div>
      <div class="me_insure">
        <button class="p-sure" @click="btn_submit">确定</button>
      </div>
    </div>
  </div>
</template>
<script>
import topNav from "./topNavbar.vue"
import {
  ajax
} from "../lib/axios.js"
export default {
  data() {
      return {
        topData: {
          title: '地址编辑'
        },
        address: {},
        provinceData: [],
        cityData: [],
        regionData: [],
        province: null,
        city: null,
        region: null
      }
    },
    watch: {
      province(val, oldVal) {
        this.getCity(val)
      },
      city(val, oldVal) {
        this.getRegion(val);
      }
    },

    created() {
      var self = this;
      var id = this.$route.query.id;
      if (id) {
        ajax.user.getAddrById(id).then((response) => {
          if (response.status == 200 && response.data.api_code == 200) {
            self.address = response.data;
            self.getProvince();
          }
        });
      } else {
        self.getProvince();
      }
    },
    components: {
      topNav: topNav,
    },
    methods: {
      getProvince() {
        var self = this;
        ajax.user.getProvince().then((province) => {
          if (province.status == 200 && province.data.api_code == 200) {
            self.provinceData = province.data.data;
            if (self.address.province) {
              self.province = self.address.province;
            } else {
              self.province = self.provinceData[0].id;
            }

          }
        });
      },
      getCity(province) {
        // console.log(event);
        // 此处的event 第一次是非事件触发，有数据变化触发，属性为isTruseted :false
        // 当被外界出发触发时，isTruseted变成true
        // 该属性在移动端不适用
        // if (event.isTrusted) {
        //   this.address.province = event.target.value;
        // }

        var self = this;
        // var province = this.address.province;
        ajax.user.getCityByProv(province).then((city) => {
          if (city.status == 200 && city.data.api_code == 200) {
            self.cityData = city.data.data;
            if (self.address.city && self.address.province == self.province) {
              self.city = self.address.city;
            } else {
              self.city = self.cityData[0].id;
            }
            // self.getRegion();
          }
        });
      },
      getRegion(city) {

        var self = this;
        // var city = this.address.city;
        ajax.user.getRegionByCity(city).then((region) => {
          if (region.status == 200 && region.data.api_code == 200) {
            self.regionData = region.data.data;
            if (self.address.region && self.address.city == self.city) {
              self.region = self.address.region;
            } else {
              self.region = self.regionData[0].id;
            }
          }
        });
      },
      btn_submit() {
        // 验证手机号
        var self = this;
        var isPhone = function(phoneNum) {
          var reg = /^1[34578]\d{9}$/;
          return reg.test(phoneNum);
        };
        var nameRule = function(name) {
          // var reg=/^[a-zA-Z0-9_]{3,16}$/;
          var reg = /^[\u4e00-\u9fff\w]{2,8}$/
          return reg.test(name);
        };
        if (!nameRule(this.address.receiver)) {
          this.$Message.warning('请输入2-8位的正确收货人姓名');
          return;
        }
        if (!this.address.receiver || (this.address.receiver && !this.address.receiver.trim())) {
          this.$Message.warning('收货人不能为空');
          return
        }
        if (!this.address.mobile || (this.address.mobile && !this.address.mobile.trim())) {
          this.$Message.warning('联系方式不能为空');
          return
        }
        if (!this.address.address || (this.address.address && !this.address.address.trim())) {
          this.$Message.warning('详细地址不能为空');
          return
        }
        if (!isPhone(this.address.mobile)) {
          this.$Message.warning('联系方式格式不对,请重新输入');
          return;
        }
        // 
        var addressParams = {
          receiver: this.address.receiver,
          mobile: this.address.mobile,
          province: this.province,
          city: this.city,
          region: this.region,
          address: this.address.address,
          dft: this.address.dft
        };
        if (this.$route.query.id) {
          let addrId = this.$route.query.id;
          ajax.user.newAddrsss(addressParams, addrId).then((response) => {

            if (response.status == 200 && response.data.api_code == 200) {
              self.$Message.info("修改地址成功")
            } else {
              self.$Message.info("修改地址失败")
            }
          })
        } else {
          ajax.user.newAddrsss(addressParams).then((response) => {

            if (response.status == 200 && response.data.api_code == 200) {
              self.$Message.info("添加地址成功")
            } else {
              self.$Message.info("添加地址失败")
            }
          })
        }
      },
      switchDftStatus() {
        if (this.address.dft) {
          this.address.dft = 0
        } else {
          this.address.dft = 1;
        }

      }
    }
}
</script>
<style lang="sass" scoped>
@import "../assets/inc_me_insure.scss";
.content {
  position: relative;
  top: 88px;
  .me_address_edit_form {
    width: 100%;
    background-color: #fff;
    .me_receive_name,
    .me_receive_phone,
    .me_receive_address_detail {
      margin-left: 24px;
      border-bottom: 1px solid #cbcbcb;
      color: #333;
      font-size: 30px;
      height: 90px;
      span {
        display: inline-block;
        width: 200px;
      }
      input {
        // width: 100%;
        margin-top: 25px;
        height: 40px;
        line-height: 40px;
      }
      span {
        color: #333;
      }
    }
    .me_address_choose_pcq {
      a {
        // max-width: 350px;
        margin-left: 24px;
        border-bottom: 1px solid #cbcbcb;
        color: #333;
        font-size: 30px;
        display: block;
        height: 90px;
        span {
          display: inline-block;
          width: 200px;
        }
        select {
          // max-width: 230px;
          height: 90px;
          option {
            font-weight: normal;
            display: block;
            white-space: pre;
            height: 90px;
            min-height: 1.2em;
            padding: 0px 2px 1px;
            max-height: 1.2em;
          }
        }
      }
    }
    p.me_address_default_choose {
      padding-top: 18px;
      text-align: center;
      a.choose-checkbox {
        justify-content: center;
        align-items: center;
        font-size: 28px;
        // margin-top: 20px;
      }
      input {
        width: 56px;
      }
    }
  }
}
</style>
