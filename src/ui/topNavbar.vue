<template>
  <div class="top_navbar">
    <ul class="flex">
      <li class="p_bottom_nav" @click="backPage()"> <img src="../../static/img/common/icon_back.png" alt=""></li>
      <li class="p_bottom_nav">{{topData.title}}</li>
      <li class="p_bottom_nav"><img src="../../static/img/me/icon_set.png" alt=""></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'topNav',
  props: ['topData'],
  methods: {
    backPage() {
      this.$router.go(-1);
    }
  }
}
</script>
<style lang="sass" scope>
.top_navbar {
  position: fixed;
  top: 0;
  width: 100%;
  height: 88px;
  font-size: 37px;
  color: #fff;
  z-index: 1000;
  background: -webkit-linear-gradient(90deg, #00c7e9, #09B8F9);
  background: -o-linear-gradient(90deg, #00c7e9, #09B8F9);
  background: -moz-linear-gradient(90deg, #00c7e9, #09B8F9);
  background: linear-gradient(90deg, #00c7e9, #09B8F9);
  ul {
    width: 100%;
    height: 88px;
    justify-content: space-between;
    align-items: center;
    .p_bottom_nav {
      width: 25%;
      padding: 10px 0px;
      img {
        // margin: 0 auto;
        width: 44px;
        height: 44px;
      }
      span.active {
        color: #4495d1;
      }
    }
    .p_bottom_nav:nth-child(1) {
      img {
        margin: 0 24px;
      }
    }
    .p_bottom_nav:nth-child(3) {
      img {
        float: right;
        margin-right: 24px;
      }
    }
  }
}
</style>
