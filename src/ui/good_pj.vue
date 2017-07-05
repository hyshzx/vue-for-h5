<template>
  <div class="app">
    <top-nav :topData="topData"></top-nav>
    <div class="content">
      <ul class="p-good-pj-list" v-if="show">
        <li class="p-good-pj" v-for="item in listPjData">
          <p class="p-pj-user"><img :src="item.avatar" height="104" width="104" alt=""><span>{{item.nickname}}</span></p>
          <p class="p-pj-detail">
            {{item.content}}
          </p>
          <p>型号：{{item.goods_content}} </p>
        </li>
      </ul>
      <div class="p-show-empty flex " v-else>
        该产品暂无评价哦~
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
          title: '商品评价'
        },
        listPjData: [],
        show: true
      }
    },
    created() {
      var self = this;
      var goodId = this.$route.query.goodId;
      ajax.index.getGoodPJ(goodId).then(function(response) {
        console.log(response);
        if (response.status == 200 && response.data.api_code == 200) {

          let sliceData = response.data.data.reverse();
          console.log(sliceData);
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
            self.listPjData.push(oneItem);
          });
          if (self.listPjData.length == 0) {
            this.show = false;
          }
        } else {
          this.show = false
        }
      })

    },
    components: {
      topNav: topNav,

    },
}
</script>
<style lang="sass" scoped>
.content {
  position: relative;
  top: 88px;
  background-color: #fff;
  .p-good-pj-list {
    width: 100%;
    padding-left: 34px;
    .p-good-pj {
      width: 100%;
      padding: 20px 34px 20px 0px;
      border-bottom: 1px solid #cbcbcb;
      p:nth-child(1) {
        color: #333;
        font-size: 28px;
        display: flex;
        // font-weight: bold;
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
  .p-show-empty {
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 150px;
    text-align: center;
    background-color: #fff;
    font-size: 28px;
  }
}
</style>
