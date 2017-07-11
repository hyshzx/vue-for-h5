<template>
  <span class="btn-s btn-white choose-attr" :class={active:isActive,uactive:isUactive} v-bind:data-name='chooseItem' v-bind:data-index='chooseIndex' @click="choose_attr(chooseKey)">{{chooseItem}}</span>
</template>
<script>
export default {
  data() {
      return {
        isActive: false,
        isUactive: false
      }
    },
    props: ['chooseItem', 'chooseIndex', 'chooseKey'],
    methods: {
      choose_attr(key) {

        let self = this;
        if (this.isUactive) {
          return;
        }
        this.$parent.$parent.choosed[key] = this;
        this.$emit('choose-attr', this);

      }
    }
}
</script>
<style scoped lang="sass">
</style>
