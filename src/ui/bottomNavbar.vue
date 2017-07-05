<template>
  <div class="bottom_navbar">
    <ul class="flex">
      <li class="p_bottom_nav" @click="gotToIndex"><img src="../../static/img/index/icon_home.png" height="44" width="44" alt="" v-if="showData.show_home" /><img src="../../static/img/index/icon_unhome.png" height="44" width="44" alt="" v-else/><span :class="{active:showData.show_home}">首页</span></li>
      <li class="p_bottom_nav"><img src="../../static/img/index/icon_aftersales.png" height="44" width="44" alt="" v-if="showData.show_sale" /><img src="../../static/img/index/icon_unaftersales.png" height="44" width="44" alt="" v-else /><span :class="{active:showData.show_sale}">售后</span></li>
      <li class="p_bottom_nav"><img src="../../static/img/index/icon_recycling.png" height="44" width="44" alt="" v-if="showData.show_recycle" /><img src="../../static/img/index/icon_unrecycling.png" height="44" width="44" alt="" v-else /><span :class="{active:showData.show_recycle}">回收</span></li>
      <li class="p_bottom_nav" @click="gotToMe"><img src="../../static/img/index/icon_my.png" height="44" width="44" alt="" v-if="showData.show_me" /><img src="../../static/img/index/icon_unmy.png" height="44" width="44" alt="" v-else /><span :class="{active:showData.show_me}">我的</span></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'bottomNav',
  props: ['showData'],
  methods: {
    gotToMe() {
      this.$router.push('me');
    },
    gotToIndex() {
      this.$router.push('/');
    }
  }
}
</script>
<style lang="sass" scope>
.bottom_navbar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 98px;
  background-color: #fff;
  border-top: 1px solid #cbcbcb;
  ul {
    width: 100%;
    height: 98px;
    .p_bottom_nav {
      width: 25%;
      padding: 10px 0px;
      font-size: 24px;
      color: #999;
      text-align: center;
      img {
        margin: 0 auto;
        width: 48px;
        height: 44px;
        margin-bottom: 10px;
      }
      span.active {
        color: #4495d1;
      }
    }
  }
}
</style>
