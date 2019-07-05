<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <div class="content">
      <!-- keep-alive可以时刻保持页面的属性，否则每次切换页签就会重新请求文件并渲染页面 -->
      <keep-alive>
        <router-view :seller="seller"></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import header from './components/header/header'
import { urlParse } from './common/js/util'

const ERR_OK = 200

export default {
  data() {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse()
          return queryParam.id
        })()
      }
    }
  },
  created() {
    this.$axios.get('static/data.json').then((response) => {
      // response = response.data
      if (response.status === ERR_OK) {
        this.seller = response.data
        this.seller = Object.assign({}, this.seller, response.data.seller)
        // Object.assign()方法用于将所有可枚举属性的值从一个或多个原对象复制到目标对象。它将返回目标对象
        // response.data扩展了this.seller，赋值给空对象
      }
    })
  },
  components: {
    'v-header': header
  }
}

</script>
<style lang="less" scoped>
.tab {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  box-sizing: border-box;
}

.tab-item {
  flex: 1;
  text-align: center;
}

.tab-item>a {
  display: block;
  font-size: 14px;
  color: rgb(77, 85, 93);
}

.tab-item>a.router-link-active {
  color: rgb(240, 20, 20);
}

</style>
