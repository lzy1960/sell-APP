<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{description.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{description.positive}}<span class="count">{{positives.length}}</span></span>
      <span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{description.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div @click="toggleContent" class="switch" :class="{'on':onlyContentFn1}">
      <span class="icon iconfont icon-yes_fill"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

export default {
  props: {
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: true
    },
    description: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  data() {
    return {
      selectTypeFn1: this.selectType,
      onlyContentFn1: this.onlyContent
    }
  },
  computed: {
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE
      })
    },
    negatives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE
      })
    }
  },
  methods: {
    select(type, event) {
      if (!event._constructed) {
        return
      }
      this.selectTypeFn1 = type
      // 然后派发一个事件，让父组件的selectType改变
      this.$emit('ratingtype-select', this.selectTypeFn1)
    },
    toggleContent(event) {
      if (!event._constructed) {
        return
      }
      this.onlyContentFn1 = !this.onlyContentFn1

      this.$emit('content-toggle', this.onlyContentFn1)
    }
  }
}

</script>
<style lang="less" scoped>
@import '../../common/fonts/iconfont.css';

.ratingselect {
  .rating-type {
    padding: 18px 0;
    margin: 0 18px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    font-size: 0;

    .block {
      display: inline-block;
      padding: 8px 12px;
      font-size: 12px;
      color: rgb(77, 85, 93);
      margin-right: 8px;

      &.active {
        color: #fff;
      }

      .count {
        font-size: 8px;
      }

      &.positive {
        background-color: rgba(0, 160, 220, 0.2);
        border-radius: 2px;

        &.active {
          background-color: rgb(0, 160, 220);
        }
      }

      &.negative {
        background-color: rgba(77, 85, 93, 0.2);
        border-radius: 1px;

        &.active {
          background-color: rgb(77, 85, 93);
        }
      }
    }
  }

  .switch {
    color: rgb(147, 153, 159);
    padding: 16px 18px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    font-size: 0;

    &.on {
      .icon {
        color: #00c850;
      }
    }

    .icon {
      font-size: 24px;
      line-height: 24px;
    }

    .text {
      font-size: 12px;
      line-height: 24px;
      margin-left: 4px;
      vertical-align: top;
    }
  }
}

</style>
