<template>
  <div class="app">
    <top-nav :topData="topData"></top-nav>
    <div class="content">
      <div class='p-single-address' v-for="item in listAddrData">
        <div class='p-main'>
          <div class="p-person">
            收货人:
            <span class="p-name">{{item.receiver}}</span>
            <span class="p-pNum">{{item.mobile}}</span>
          </div>
          <div class="p-address">{{item.name}}</div>
        </div>
        <div class="edit">
          <input name='p-default-addr' type="radio" class="item-ckbox p-set-default-address" @change="defaultChoose(item.id)" item.dft>默认收获地址
          <a class='p-delete-address' @click="deleteAddr(item.id)"><img src="../../static/img/common/icon_x.png" alt=""></a>
          <button class='p-edit-address g-link' @click="gotoPage(item.id)">编辑</button>
        </div>
      </div>
      <div class="p-no-address hide">暂无收获地址，请添加收获地址</div>
    </div>
    <div class="p-add-address-contain">
      <button class='p-add-address  ' @click="gotoPage()">新增地址
      </button>
    </div>
  </div>
</template>
<script>
import topNav from "./topNavbar.vue";
import { ajax } from "../lib/axios.js";
export default {
    data() {
        return {
            topData: {
                title: "我的地址"
            },
            listAddrData: []
        };
    },
    created() {
        console.log(1);
        var self = this;
        ajax.user.getListAddr().then(function(response) {
            console.log(response);
            if (response.status == 200 && response.data.api_code == 200) {
                self.listAddrData = response.data.data;
            }
        });
    },
    components: {
        topNav: topNav
    },
    methods: {
        deleteAddr(id) {
            var self = this;
            this.$Modal.confirm({
                title: "提示",
                content: "确认删除该地址嘛？",
                onOk: function() {
                    ajax.user.deleteAddr(id).then(function(response) {
                        console.log(response);
                        if (
                            response.status == 200 &&
                            response.data.api_code == 200
                        ) {
                            self.$Message.info("删除地址成功");
                            self.listAddrData = self.listAddrData.filter(
                                function(item) {
                                    return item.id != id;
                                }
                            );
                        } else {
                            self.$Message.error("删除地址失败");
                        }
                    });
                }
            });
        },
        defaultChoose(id) {
            if (id) {
                ajax.user.defaultAddr(id).then(function(response) {
                    console.log(response);
                });
            }
        },
        gotoPage(id) {
            if (id) {
                this.$router.push({
                    path: "address_edit",
                    query: {
                        id: id
                    }
                });
            } else {
                this.$router.push({
                    path: "address_edit"
                });
            }
        }
    }
};
</script>
<style lang="sass" scoped>
.p-no-address {
  margin-top: 8px;
  height: 148px;
  line-height: 148px;
  text-align: center;
  background: #fff;
}

.content {
  position: relative;
  top: 88px;
}

.p-single-address {
  padding: 30px 30px 0 30px;
  background: #fff;
  font-size: 30px;
  color: #333;
  position: relative;
  border-bottom: 1px solid #cbcbcb;
  .p-pNum {
    margin-left: 26px;
  }
  .p-name {}
  .p-address {
    line-height: 1.4;
    margin-top: 10px;
    width: 650px;
    font-size: 24px;
    color: #999;
  }
}

.edit {
  padding: 20px 0;
  height: 95px;
  color: #999;
  font-size: 24px;
  line-height: 2.1;
  input {
    float: left;
    // margin-right: 10px;
    margin-top: -6px;
  }
  button {
    color: #666;
    width: 100px;
    height: 50px;
    border: 1px solid #cbcbcb;
    font-size: 0.92rem;
    float: right;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    background: #fff;
    margin-left: 20px;
  }
  a.p-delete-address {
    width: 50px;
    height: 50px;
    img {
      float: right;
    }
    position: absolute;
    top: 30px;
    right: 30px;
  }
}

.p-single-address {
  margin-top: 8px;
}

.p-add-address-contain {
  width: 100%;
  height: 80px;
  position: fixed;
  bottom: 50px;
  text-align: center;
  .p-add-address {
    outline: none;
    border: none;
    width: 600px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    color: #fff;
    background: -webkit-linear-gradient(90deg, #00c7e9, #09B8F9);
    background: -o-linear-gradient(90deg, #00c7e9, #09B8F9);
    background: -moz-linear-gradient(90deg, #00c7e9, #09B8F9);
    background: linear-gradient(90deg, #00c7e9, #09B8F9);
    color: #fff;
    font-size: 30px;
    border-radius: 40px;
  }
}
</style>
