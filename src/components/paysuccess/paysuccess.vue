<template>
  <div class="paysuccess">
    <div class="title"></div>
    <div class="view-wrapper">
      <h1 class="title"><span class="iconfont icon-yes_fill"></span>支付成功</h1>
      <button class="confirm" @click="confirm">完成</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    selectFoods: {
      type: Array
    }
  },
  data() {
    return {
      selectFoodsFn1: this.selectFoods
    }
  },
  methods: {
    confirm() {
      this.selectFoodsFn1.forEach((food) => {
        food.count = 0
      })
      this.$emit('clear-foods', this.selectFoodsFn1)
      this.$router.go(-2)
    }
  }
}

</script>
<style lang="less" scoped>
@import '../../common/fonts/iconfont.css';

.paysuccess {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 100;

  .view-wrapper {
    position: absolute;
    width: 100%;
    left: 0;
    top: 30%;

    .title {
      font-size: 28px;
      line-height: 56px;
      text-align: center;

      .iconfont {
        font-size: 28px;
        line-height: 56px;
        margin-right: 10px;
        color: rgb(0, 160, 240);
      }
    }

    .confirm {
      display: block;
      width: 70%;
      height: 40px;
      border: none;
      border-radius: 10px;
      background-color: rgb(0, 160, 240);
      font-size: 16px;
      color: #fff;
      margin: 30px auto;
    }
  }
}

</style>
