<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item" :key="index"></span>
  </div>
</template>
<script>
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'

export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  // 计算属性
  computed: {
    starType() {
      return 'star-' + this.size
    },
    itemClasses() {
      let result = []
      let score = Math.floor(this.score * 2) /
        2
      let hasPoint = score % 1 !== 0
      let integer = Math.floor(score) // 整数

      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }

      if (hasPoint) {
        result.push(CLS_HALF)
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}

</script>
<style lang="less" scoped>
.star {
  font-size: 0;

  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }

  &.star-48 {
    .star-item {
      width: 20px;
      height: 20px;
      padding: 0 11px;
      background-size: 20px 20px;

      &.on {
        background-image: url('star48_on@2x.png');
      }

      &.half {
        background-image: url('star48_half@2x.png');
      }

      &.off {
        background-image: url('star48_off@2x.png');
      }
    }
  }

  &.star-36 {
    .star-item {
      width: 15px;
      height: 15px;
      padding: 0 3px;
      background-size: 15px 15px;

      &.on {
        background-image: url('star36_on@2x.png');
      }

      &.half {
        background-image: url('star36_half@2x.png');
      }

      &.off {
        background-image: url('star36_off@2x.png');
      }
    }
  }

  &.star-24 {
    .star-item {
      width: 10px;
      height: 10px;
      padding: 0 2px;
      background-size: 10px 10px;

      &.on {
        background-image: url('star48_on@2x.png');
      }

      &.half {
        background-image: url('star48_half@2x.png');
      }

      &.off {
        background-image: url('star48_off@2x.png');
      }
    }
  }
}

</style>
