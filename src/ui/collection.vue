<template>
  <div class="app">
    <top-nav :topData="topData"></top-nav>
    <div class="content">
      <div class="order_manager" v-if="show">
        <ul class="p-order-list">
          <li class="p-order" v-for="item in collectionData">
            <div class="p-order-info flex">
              <a class="g-link flex" @click='gotoPage(item.id)'>
                <img :src="item.img" height="150" width="150" alt="" class="p-order-img">
                <span class="p-order-brand flex_column">
                 <span>{{item.name}}</span>
                <span>{{item.content}}</span>
                <span>￥{{item.price}}</span>
                </span>
              </a>
              <a class="p_collection_delete" @click="deleteCollection(item.id)"><img src="../../static/img/common/icon_x.png" alt=""></a>
            </div>
          </li>
        </ul>
      </div>
      <div class="p-show-empty flex" v-else>
        暂无收藏哦，请去收藏你喜欢的商品吧~
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
          title: '我的收藏'
        },
        collectionData: [],
        show: true
      }
    },
    created() {
      var self = this;
      ajax.user.getCollection().then((response) => {
        console.log(response);
        if (response.status == 200 && response.data.api_code == 200) {
          let data = response.data.data;
          data.forEach((item) => {
            var oneItem = {};
            if (item.target.models && item.target.models.length != 0) {
              oneItem.img = "http://116.62.222.82:8082" + item.target.models[0].imgs[0];
              oneItem.id = item.target.id;
              oneItem.name = item.target.name;
              oneItem.content = item.target.content;
              oneItem.price = item.target.price;
            }
            self.collectionData.push(oneItem);
          })
          if (self.collectionData.length == 0) {
            self.show = false;
          }
        }
      })
    },
    components: {
      topNav: topNav,
    },
    methods: {
      gotoPage(id) {
        if (id) {
          this.$router.push({
            path: 'good',
            query: {
              goodId: id
            }
          })
        }
      },
      deleteCollection(id) {
        var self = this;
        if (id) {
          this.$Modal.confirm({
            title: '提示',
            content: "确认删除该收藏嘛？",
            onOk: function() {
              ajax.good.unfavorGood(id).then(function(response) {
                console.log(response);
                if (response.status == 200 && response.data.api_code == 200) {
                  self.$Message.info("取消收藏成功");
                  self.collectionData = self.collectionData.filter(function(item) {
                    return item.id != id;
                  })
                  if (self.collectionData.length == 0) {
                    self.show = false
                  }
                } else {
                  self.$Message.error("取消收藏失败");
                }
              })
            },
          })

        }
      }
    }
}
</script>
<style lang="sass" scoped>
.content {
  position: relative;
  top: 88px;
  .order_manager {
    width: 100%;
    .p-order-info {
      background-color: #fff;
      padding: 20px 24px;
      width: 100%;
      height: 198px;
      justify-content: space-between;
      border-top: 1px solid #cbcbcb;
      // border-bottom: 1px solid #cbcbcb;
      margin-bottom: 20px;
      a:nth-child(1) {
        width: 100%;
      }
      .p-order-img {
        margin-right: 24px;
        width: 150px;
        height: 150px;
        display: flex;
        flex-shrink: 0;
      }
      .p-order-brand {
        width: 100%;
        justify-content: space-between;
        span:nth-child(1) {
          color: #333;
          font-size: 30px;
        }
        span:nth-child(2) {
          color: #999;
          font-size: 24px;
        }
        span:nth-child(3) {
          text-align: left;
          color: #d43629;
          font-size: 30px;
        }
      }
      .p_collection_delete {
        width: 50px;
        img {
          float: right;
        }
      }
    }
  }
  .p-show-empty {
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 150px;
    font-size: 28px;
    text-align: center;
    background-color: #fff;
  }
}
</style>
