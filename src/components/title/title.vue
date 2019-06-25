<template>
  <div class="title">
    <div class="line"></div>
    <div class="text">{{titleText[titleIndex]}}</div>
    <div class="line"></div>
  </div>
</template>
<script>
export default {
  props: {
    $index: {
      type: Number
    }
  },
  computed: {
    titleIndex() {
      let $index = 0
      return $index++
    },
    titleText() {
      let arr = ['优惠信息', '商家公告']
      return arr
    }
  }
}

</script>
<style lang="less" scoped>
.title {
  display: flex;
  margin: 28px auto 24px;

  .line {
    flex: 1;
    position: relative;
    top: -6px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  .text {
    padding: 0 12px;
    font-size: 14px;
    font-weight: 700;
  }
}

</style>
