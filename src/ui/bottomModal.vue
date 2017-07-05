<template>
  <div class="modal_bottom" v-show="showModal">
    <div class="modal_mask" @click="closed"></div>
    <div class="modal">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    scrollable: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    showModal() {
      if (this.value) {
        this.addScrollEffect();
      } else {
        this.removeScrollEffect()
      }
      return this.value;
    }
  },

  methods: {
    closed() {
      // this.showModal = false;
      this.$emit('input', false);
      this.removeScrollEffect()
    },
    checkScrollBar() {
      let fullWindowWidth = window.innerWidth;
      if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
        const documentElementRect = document.documentElement.getBoundingClientRect();
        fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
      }
      this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
      // if (this.bodyIsOverflowing) {
      //     this.scrollBarWidth = getScrollBarSize();
      // }
    },
    setScrollBar() {
      if (this.bodyIsOverflowing && this.scrollBarWidth !== undefined) {
        document.body.style.paddingRight = `${this.scrollBarWidth}px`;
      }
    },
    resetScrollBar() {
      document.body.style.paddingRight = '';
    },
    addScrollEffect() {
      this.checkScrollBar();
      this.setScrollBar();
      document.body.style.overflow = 'hidden';
    },
    removeScrollEffect() {
      document.body.style.overflow = '';
      this.resetScrollBar();
    }
  }
}
</script>
<style lang="sass" scoped>
.modal_bottom {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  .modal_mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(55, 55, 55, .6);
    height: 100%;
    z-index: 1000;
  }
  .modal {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    max-height: 60%;
    min-height: 30%;
    overflow-y: auto;
    z-index: 10001;
  }
}
</style>
