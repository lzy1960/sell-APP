<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
        <span class="inner iconfont icon-minus"></span>
      </div>
    </transition>
    <transition name="fade">
      <div class="cart-count" v-show="food.count>0">
        {{food.count}}
      </div>
    </transition>
    <div class="cart-add iconfont icon-xinzeng" @click.stop.prevent="addCart">
    </div>
  </div>
</template>
<script>
import Vue from 'vue'

export default {
  props: {
    food: {
      type: Object
    },
    isTrans: {
      type: Boolean
    }
  },
  methods: {
    addCart: function(event) {
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit('cart-add', event.target)
      // $dispatch在vue2.0中已被弃用
      // $emit子组件向父组件传递数据，两个参数：派发的事件、DOM对象
    },
    decreaseCart: function() {
      if (!event._constructed) {
        return
      }
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}

</script>
<style lang="less" scoped>
@import "../../common/fonts/iconfont.css";

.cartcontrol {
  height: 100%;
  font-size: 0;
  position: relative;

  .cart-decrease {
    display: inline-block;

    .inner {
      display: inline-block;
      color: rgb(0, 160, 220);
      font-size: 24px;
      line-height: 24px;
    }

    &.move-enter-active,
    &.move-leave-active {
      transition: all 0.3s linear;

      .inner {
        transition: all 0.3s linear;
      }
    }

    &.move-enter,
    &.move-leave-to {
      opacity: 0;
      transform: translate3d(24px, 0, 0);

      .inner {
        transform: rotate(180deg);
      }
    }

    &.move-leave,
    &.move-enter-to {
      opacity: 1;
      transform: translate3d(0, 0, 0);

      .inner {
        transform: rotate(0);
      }
    }
  }

  .cart-count {
    display: inline-block;
    width: 24px;
    text-align: center;
    font-size: 10px;
    line-height: 24px;
    color: rgb(147, 153, 159);
    vertical-align: top;

    &.fade-enter-active,
    &.fade-leave-active {
      transition: opacity 0.5s;
    }

    &.fade-enter,
    &.fade-leave-to {
      opacity: 0;
    }

    &.fade-enter-to,
    &.fade-leave {
      opacity: 1;
    }
  }

  .cart-add {
    display: inline-block;
    color: rgb(0, 160, 220);
    font-size: 24px;
    line-height: 24px;
  }
}

</style>
