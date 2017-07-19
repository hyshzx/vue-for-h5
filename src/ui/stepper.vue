<template>
  <div class="gw_num">
    <em class="jian" @click="jian">-</em>
    <input type="text" v-model="stepperData.value" @change="change" class="num"/>
    <em class="add" @click="add">+</em>
  </div>
</template>
<script>
// basic logic
// how to control em for disabled
export default {
  data() {
    return {

    }
  },
  computed: {
    min() {
      if (this.stepperData.min) {
        return this.stepperData.min
      } else {
        return 1;
      }
    },
    step() {
      if (this.stepperData.step) {
        return this.stepperData.step
      } else {
        return 1;
      }
    },
    max() {
      if (this.stepperData.max) {
        return this.stepperData.max
      } else {
        return null;
      }
    },
  },
  props: ["stepperData"],
  methods: {
    jian() {
      if (this.stepperData.value > this.min) {
        this.stepperData.value -= this.step;
      }
    },
    add() {
      if (this.max) {
        if(this.stepperData.value < this.max){this.stepperData.value += this.step;}
      } else {
        this.stepperData.value += this.step;
      }
    },
    change() {
       
      // console.log(this.stepperData.value);
      if(this.max){
      	 if(this.stepperData.value>this.max){
      	 	 this.stepperData.value=this.max;
      	 }
      }
      if (this.min) {
          if(this.stepperData.value<this.min){
          	 this.stepperData.value=this.min
          }
      }
    }
  }
}

</script>
<style lang="sass" scoped>
.gw_num {
  border: 1px solid #dbdbdb;
  width: 200px;
  height: 62px;
  line-height: 62px;
  overflow: hidden;
}

.gw_num em {
  display: block;
  height: 100%;
  width: 58px;
  float: left;
  color: #7A7979;
  font-size: 30px;
  border-right: 1px solid #dbdbdb;
  text-align: center;
  cursor: pointer;
}

.gw_num .num {
  display: block;
  float: left;
  text-align: center;
  width: 80px;
  height: 100%;
  font-style: normal;
  font-size: 30px;
  line-height: 62px;
  border: 0;
}

.gw_num em.add {
  float: right;
  border-right: 0;
  border-left: 1px solid #dbdbdb;
}

</style>
