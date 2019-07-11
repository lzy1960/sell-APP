<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <i class="iconfont icon-shop-car"></i>
            </div>
            <div class="number" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
          <div class="description">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" @click.stop.prevent="pay" :class="{'payable':totalPrice>=minPrice}">
            {{payDescription}}
          </div>
        </div>
      </div>
      <div class="ball-container">
        <transition-group name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
          <div class="ball" v-for="(ball,index) in balls" :key="index" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition-group>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="(food,index) in selectFoods" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price * food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="toggleList"></div>
    </transition>
    <transition name="pay">
      <keep-alive>
        <router-view :seller="seller" :selectFoods="selectFoods" :totalPrice="totalPrice" :minPrice="minPrice" @clear-foods="empty"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import cartcontrol from '../../components/cartcontrol/cartcontrol'
import pay from '../../components/pay/pay'
import BScroll from 'better-scroll'

export default {
  props: {
    seller: {
      type: Object
    },
    // 购物车中的所有数据变化都随selectFoods改变
    selectFoods: {
      type: Array,
      default () {
        return []
      }
      // 数据模板为[{price: ** , count: **}]
    },
    deliveryPrice: {
      type: Number
    },
    minPrice: {
      type: Number
    }
  },
  components: {
    cartcontrol,
    pay
  },
  data() {
    return {
      balls: [{
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [],
      fold: true
    }
  },
  watch: {
    selectFoods: function() {
      if (!this.totalCount) {
        this.fold = true
      }
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.listContent, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    }
  },
  computed: {
    totalPrice() {
      let price = 0
      this.selectFoods.forEach((food) => {
        price += food.price * food.count
      })
      return price
    },
    totalCount() {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDescription() {
      if (this.totalPrice <= 0) {
        return `￥${this.minPrice}起送`
      } else if (this.totalPrice >= this.minPrice) {
        return '去结算'
      } else {
        return `还差￥${this.minPrice - this.totalPrice}起送`
      }
    },
    listShow() {
      if (!this.totalCount) {
        return false
      }
      let show = !this.fold
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
      return show
    }
  },
  methods: {
    // 触发小球动画
    drop: function(el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    toggleList() {
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
    },
    empty() {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    },
    pay() {
      if (this.totalPrice < this.minPrice) {
        return
      }
      this.$router.push(`${this.$route.path}/pay`)
    },
    beforeEnter(el) {
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect()
          // getBoundingClientRect()可以获取当前元素相对于视口的坐标，有left和top
          let x = rect.left - 36
          let y = -(window.innerHeight - rect.top - 29)
          // el.style.display = ''
          el.style.webkitTransform = `translate3d(0,${y}px,0)`
          el.style.transform = `translate3d(0,${y}px,0)`
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    enter(el, done) {
      /* eslint-disable no-unused-vars */
      // 浏览器重绘
      let rf = el.offsetHeight
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)'
        el.style.transform = 'translate3d(0,0,0)'
        let inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = 'translate3d(0,0,0)'
        inner.style.transform = 'translate3d(0,0,0)'
        el.addEventListener('transitionend', done)
      })
    },
    afterEnter(el) {
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    }
  }
}

</script>
<style lang="less" scoped="">
@import "../../common/fonts/iconfont.css";

.shopcart {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 50;
  width: 100%;
  height: 48px;

  .content {
    display: flex;
    background-color: #141d27;

    .content-left {
      flex: 1;
      font-size: 0;

      .logo-wrapper {
        display: inline-block;
        width: 56px;
        height: 56px;
        margin: 0 12px;
        padding: 6px;
        position: relative;
        top: -10px;
        border-radius: 50%;
        background: #141d27;
        box-sizing: border-box;
        vertical-align: top;

        .logo {
          width: 100%;
          height: 100%;
          background-color: #2b343c;
          border-radius: 50%;
          text-align: center;

          &.highlight {
            background-color: rgb(0, 160, 220);

            .iconfont {
              color: #fff;
            }
          }

          .iconfont {
            font-size: 24px;
            line-height: 44px;
            color: #80858a;
          }
        }

        .number {
          position: absolute;
          right: -6px;
          top: 0;
          width: 24px;
          height: 16px;
          border-radius: 8px;
          text-align: center;
          padding: 0 6px;
          font-size: 9px;
          font-weight: 700;
          line-height: 16px;
          color: #fff;
          background: rgb(240, 20, 20);
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.4);
          box-sizing: border-box;
        }
      }

      .price {
        display: inline-block;
        font-size: 16px;
        color: rgba(255, 255, 255, 0.4);
        font-weight: 700;
        line-height: 24px;
        margin: 12px 0;
        padding-right: 12px;
        border-right: 1px solid rgba(255, 255, 255, 0.1);

        &.highlight {
          color: #fff;
        }
      }

      .description {
        display: inline-block;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.4);
        line-height: 24px;
        padding-left: 12px;
      }
    }

    .content-right {
      flex: 0 0 105px;
      width: 105px;

      .pay {
        font-size: 12px;
        font-weight: 700;
        line-height: 48px;
        color: rgba(255, 255, 255, 0.4);
        text-align: center;
        background-color: #2b3336;

        &.payable {
          background-color: #00b43c;
          color: #fff;
        }
      }
    }
  }

  .ball-container {
    .ball {
      position: fixed;
      left: 36px;
      bottom: 29px;
      z-index: 100;

      &.drop-enter-active,
      &.drop-leave-active {
        transition: all 0.4s cubic-bezier(.29, -0.27, .84, .24); // 贝赛尔曲线，抛物线

        .inner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: rgb(0, 160, 220);
          transition: all 0.4s linear; // x轴线性变化
        }
      }
    }
  }

  .shopcart-list {
    position: absolute;
    left: 0;
    transform: translate3d(0, -100%, 0);
    width: 100%;
    padding-bottom: 48px;
    z-index: -1;

    &.fold-enter-active,
    &.fold-leave-active {
      transition: all 0.5s;
    }

    &.fold-enter,
    &.fold-leave-to {
      transform: translate3d(0, 0, 0);
    }

    &.fold-enter-to,
    &.fold-leave {
      transform: translate3d(0, -100%, 0);
    }

    .list-header {
      height: 40px;
      background-color: #f3f5f7;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      padding: 0 18px;

      .title {
        float: left;
        font-size: 14px;
        font-weight: 200;
        line-height: 40px;
        color: rgb(7, 17, 27);
      }

      .empty {
        float: right;
        font-size: 12px;
        line-height: 40px;
        color: rgb(0, 160, 220);
      }
    }

    .list-content {
      padding: 0 18px 20px;
      max-height: 281px;
      overflow: hidden;
      background-color: #fff;

      .food {
        padding: 12px 0;
        display: flex;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);

        .name {
          font-size: 14px;
          line-height: 48px;
          color: rgb(7, 17, 27);
          flex: 1;
        }

        .price {
          font-size: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);
          line-height: 48px;
          margin-right: 12px;
        }

        .cartcontrol-wrapper {
          flex: 0 0 72px;
          width: 72px;
          margin-top: 12px;
        }
      }
    }
  }
}

.list-mask {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 49;
  background-color: rgba(7, 17, 27, 0.6);
  backdrop-filter: blur(10px); // 苹果会有背景模糊效果

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

.pay-enter-active,
.pay-leave-active {
  transition: all 0.4s;
}

.pay-enter,
.pay-leave-to {
  transform: translate3d(100%, 0, 0);
}

.pay-leave,
.pay-enter-to {
  transform: translate3d(0, 0, 0);
}

</style>
