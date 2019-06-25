<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="iconfont icon-previewleft"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span>月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="new">￥{{food.price}}</span>
            <del class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</del>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol ref="cartcontrol" :food="food"></cartcontrol>
          </div>
          <transition name="fade">
            <div class="buy" @click="addFirst" v-show="!food.count || food.count===0">加入购物车</div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品详情</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split v-show="food.ratings"></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect @ratingtype-select="_select($event)" @content-toggle="_toggleContent($event)" :select-type="selectType" :only-content="onlyContent" :description="description" :ratings="food.ratings"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li class="rating-item" v-show="needShow(rating.rateType,rating.text)" v-for="(rating,index) in food.ratings" :key="index">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" :src="rating.avatar">
                </div>
                <div class="time">{{rating.rateTime | formatDate(rating.rateTime)}}</div>
                <p class="text">
                  <span class="icon iconfont" :class="{'icon-good':!rating.rateType,'icon-bad':rating.rateType}"></span>{{rating.text}}
                </p>
              </li>
              <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import Vue from 'vue'
import BScroll from 'better-scroll'
import cartcontrol from '../cartcontrol/cartcontrol'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'
import { formatDate } from '../../common/js/date'

/* eslint-disable no-unused-vars */
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

export default {
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      description: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  components: {
    cartcontrol,
    split,
    ratingselect
  },
  filters: {
    formatDate(time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    show() {
      this.showFlag = true
      this.selectType = ALL
      this.onlyContent = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    hide() {
      this.showFlag = false
    },
    addFirst(event) {
      if (!event._constructed) {
        return
      }
      this.$emit('cart-add', event.target)
      Vue.set(this.food, 'count', 1)
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    },
    _select(type) {
      this.selectType = type

      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    _toggleContent(onlyContent) {
      this.onlyContent = onlyContent

      this.$nextTick(() => {
        this.scroll.refresh()
      })
    }
  }
}

</script>
<style lang="less" scoped>
@import "../../common/fonts/iconfont.css";

.food {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  bottom: 48px;
  z-index: 30;
  background-color: #f3f5f7;

  &.move-enter-active,
  &.move-leave-active {
    transition: all 0.3s;
  }

  &.move-enter,
  &.move-leave-to {
    transform: translate3d(100%, 0, 0);
  }

  &.move-enter-to,
  &.move-leave {
    transform: translate3d(0, 0, 0);
  }

  .food-content {
    background-color: #fff;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    position: relative;

    .image-header {
      // 让图片外的盒子是一个宽高相等的容器
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 100%;

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      .back {
        position: absolute;
        top: 10px;
        left: 10px;

        .icon-previewleft {
          display: block;
          padding: 10px;
          font-size: 20px;
          color: #fff;
        }
      }
    }

    .content {
      padding: 18px;
      position: relative;

      .title {
        font-size: 14px;
        font-weight: 700;
        color: rgb(7, 17, 27);
        line-height: 14px;
      }

      .detail {
        margin-top: 8px;

        span {
          font-size: 10px;
          color: rgb(147, 153, 159);
          line-height: 10px;
        }
      }

      .price {
        position: relative;
        display: inline-block;
        margin-top: 18px;

        .old {
          font-size: 10px;
          font-weight: 700;
          color: rgb(147, 153, 159);
          line-height: 24px;
        }

        .new {
          font-size: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);
          line-height: 24px;
        }
      }

      .cartcontrol-wrapper {
        position: absolute;
        right: 18px;
        bottom: 18px;
      }

      .buy {
        position: absolute;
        right: 18px;
        bottom: 18px;
        z-index: 10;
        height: 24px;
        line-height: 12px;
        padding: 6px 12px;
        box-sizing: border-box;
        font-size: 10px;
        background-color: rgb(0, 160, 220);
        color: #fff;
        border-radius: 12px;

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
    }

    .info {
      padding: 18px;

      .title {
        font-size: 14px;
        line-height: 14px;
        color: rgb(7, 17, 27);
      }

      .text {
        font-size: 12px;
        line-height: 24px;
        font-weight: 200;
        color: rgb(77, 85, 93);
        padding: 6px 8px 0 8px;
      }
    }

    .rating {
      padding-top: 18px;

      .title {
        font-size: 14px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        margin: 0 18px;
      }

      .rating-wrapper {
        .rating-item {
          position: relative;
          padding: 16px 0;
          margin: 0 18px;
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);

          .user {
            position: absolute;
            right: 0;
            top: 16px;
            font-size: 0;

            .name {
              font-size: 10px;
              line-height: 12px;
              color: rgb(147, 153, 159);
            }

            .avatar {
              width: 12px;
              height: 12px;
              margin-left: 6px;
              border-radius: 50%;
            }
          }

          .time {
            font-size: 10px;
            line-height: 12px;
            color: rgb(147, 153, 159);
          }

          .text {
            font-size: 12px;
            line-height: 16px;
            color: rgb(7, 17, 27);

            .icon {
              line-height: 24px;
              font-size: 12px;
              color: rgb(0, 160, 220);
              line-height: 24px;
              margin-right: 4px;
            }
          }
        }

        .no-rating {
          padding: 16px 0;
          margin: 0 18px;
          font-size: 12px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
}

</style>
