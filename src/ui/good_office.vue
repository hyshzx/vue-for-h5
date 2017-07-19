<template>
  <div class="app">
    <top-nav :topData="topData"></top-nav>
    <div class="content">
      <div class="p-list">
        <ul class="p-good-list">
          <li class="p-good" v-for="item in listGoodData" @click="gotoDetailPage(item.id)">
            <img :src="item.img" alt="">
            <p class="p-price">￥{{item.price}}起 <span>抢购价</span></p>
            <div class="p-basic-info">
              <p class="p_depreciation_cost"><span class="first">￥{{item.depreciation_cost_min}}</span><span class="second">&nbsp;起/天</span> 折旧费</p>
              <p class="p_name">{{item.name}} {{item.content}}</p>
            </div>
          </li>
        </ul>
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
        title: '官方优品'
      },
      page: 0,
      pageSize: 10,
      listGoodData: []
    }
  },
  created() {
    this.getList();
  },
  components: {
    topNav: topNav,

  },
  methods: {
    getList: function() {
      var self = this;
      var classificationId = this.$route.query.id;
      var params = {
        page: this.page,
        pageSize: this.pageSize,
        classificationId: classificationId
      }
      console.log(params);
      ajax.index.getGoodList(params).then((response) => {
        console.log(response);
        // this.listGoodData=[];
        if (response.status == 200 && response.data.api_code == 200) {
          let listData = response.data.data;
          listData.forEach((item) => {
            let oneItem = {};
            oneItem.img = "http://116.62.222.82:8082" + item.show_img;
            oneItem.price = parseInt(item.price);
            oneItem.content = item.content;
            oneItem.name = item.name;
            oneItem.depreciation_cost_min = item.depreciation_cost_min;
            oneItem.id = item.id;
            self.listGoodData.push(oneItem);
          })
        }
      })
    },
    gotoDetailPage(goodId) {
      console.log(goodId);
      this.$router.push({
        path: 'good',
        query: {
          goodId: goodId
        }
      });
    },
  }

}

</script>
<style lang="sass" scoped>
.content {
  position: relative;
  top: 88px;
  width: 100%; // height: 100%;
  // 
  .p-list {
    // width: 100%;
    height: calc(100% - 88px);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding: 24px 24px 0px;
    .p-good-list {
      width: 100%;
      .p-good {
        width: 100%;
        height: 400px;
        border-radius: 10px;
        position: relative;
        box-shadow: 0px 1px 4px #666;
        background-color: #fff;
        align-items: center;
        margin-bottom: 30px;
        img {
          width: 702px;
          height: 400px;
          border-radius: 10px;
        }
        .p-basic-info {
          position: absolute;
          bottom: 0px;
          width: 100%;
          height: 100px; // background-color: #fff;
          background: rgba(256, 256, 256, .8);
          padding-left: 24px;
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
          .p_depreciation_cost {
            font-size: 22px;
            color: #666;
            font-weight: bold; // opacity: 1;
            span.first {
              color: #d43629;
              font-size: 32px;
            }
            span.second {
              color: #d43629;
            }
          }
          .p_name {
            opacity: 1;
            color: #666;
            font-size: 28px;
          }
        }
        .p-price {
          position: absolute;
          right: 0;
          bottom: 110px;
          font-weight: bold;
          text-align: right;
          color: #7d8fa8;
          font-size: 26px;
          background-color: #fff;
          height: 52px;
          line-height: 52px;
          padding: 0px 30px;
          border-left-radius: 5px;
          border-top-left-radius: 26px;
          border-bottom-left-radius: 26px;
          span {
            font-size: 22px;
          }
        }
      }
    }
  } // 
}

</style>
