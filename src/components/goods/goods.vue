<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <!-- 【v-el:】获取当前DOM对象 -->
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" :key="index" @click="selectMenu(index,$event)">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li class="food-list food-list-hook" v-for="(item,index) in goods" :key="index">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li class="food-item" @click="selectFood(food,$event)" v-for="(food,index) in item.foods" :key="index">
              <div class="icon">
                <img :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="description" v-if="food.description">
                  <span>{{food.description}}</span>
                </p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="new-price">￥{{food.price}}</span><del v-if="food.oldPrice" class="old-price">￥{{food.oldPrice}}</del>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food" @cart-add="_drop"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" :seller="seller" :food="selectedFood" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
    <!-- 组件上可以绑定从父组件传递的参数 -->
    <food @cart-add="_drop" ref="food" :food="selectedFood"></food>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import shopcart from '../shopcart/shopcart'
import cartcontrol from '../cartcontrol/cartcontrol'
import food from '../food/food'

// 1. 要获取DOM，现在模板中添加【ref="名称"】，在script中使用【this.$refs.名称】就可以获取到这个DOM元素
// 2. 需要计算DOM相关的内容时，需要在nextTick()中执行，否则不会渲染在页面上

const ERR_OK = 0

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      deliveryPrice: this.seller.deliveryPrice,
      minPrice: this.seller.minPrice,
      selectedFood: {}
    }
  },
  components: {
    shopcart,
    cartcontrol,
    food
  },
  computed: {
    // 菜单索引
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]

        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    selectFoods() {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this.$http.get('/api/goods').then((response) => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.goods = response.data
        // 滚动是异步执行在this.$nextTick中的

        // 在created()中进行的DOM操作一定要放在Vue.$nextTick()的回调函数中
        // 在created()钩子函数执行的时候，DOM元素并未进行任何渲染
        // created()的nextTick对应的事mounted()
        this.$nextTick(() => {
          this._initScroll() // 写在外面的话，获取DOM高度会出现问题

          // 然后计算高度
          this._calculateHeight()
        })
      }
    })
  },
  methods: {
    // 编程习惯：方法前加下划线，表示私有方法
    _initScroll: function() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      // BScroll接收两个参数，DOM对象和JSON对象
      // 【this.$els.dom名】获取之前定义的DOM对象
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        probeType: 3, // 监测实时滚动的位置
        click: true
      })

      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y)) // round四舍五入
      })
    },
    _calculateHeight: function() {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    selectMenu: function(index, event) {
      if (!event._constructed) {
        // PC端有这个属性，但手机端没有，所以如果有这个属性派发的事件，则不执行
        return
      }
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let item = foodList[index]
      this.foodsScroll.scrollToElement(item, 300)
    },
    selectFood(food, event) {
      if (!event._constructed) {
        return
      }
      this.selectedFood = food
      this.$refs.food.show()
    },
    _drop: function(target) { // _drop的作用是：调用shopcart中的drop方法
      // 优化：用$nextTick()异步执行下落动画，否则动画会感到卡顿
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target)
      })
    }
  }
}

</script>
<style lang="less" scoped>
.goods {
  display: flex;
  position: absolute;
  width: 100%;
  top: 176px;
  bottom: 48px;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      width: 80px;
      height: 54px;
      padding: 0 12px;
      box-sizing: border-box;

      &.current {
        background: #fff;
        margin-top: -1px;

        .text {
          border: none;
          font-weight: 700;
        }
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 4px;
        background-size: 12px 12px;
        background-repeat: no-repeat;

        &.decrease {
          background-image: url('decrease_3@2x.png');
        }

        &.discount {
          background-image: url('discount_3@2x.png');
        }

        &.guarantee {
          background-image: url('guarantee_3@2x.png');
        }

        &.invoice {
          background-image: url('invoice_3@2x.png');
        }

        &.special {
          background-image: url('special_3@2x.png');
        }
      }

      .text {
        display: table-cell;
        vertical-align: middle;
        font-size: 12px;
        line-height: 14px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .food-list {
      .title {
        font-size: 12px;
        color: rgb(147, 153, 159);
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        background-color: #f3f5f7;
        padding-left: 12px;
      }

      .food-item {
        display: flex;
        padding: 18px 0;
        margin: 0 18px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);

        &:last-child {
          border: none;
        }

        .icon {
          flex: 0 0 57px;
          width: 57px;
          margin-right: 10px;

          img {
            width: 57px;
            height: 57px;
          }
        }

        .content {
          flex: 1;
          vertical-align: top;
          position: relative;

          .name {
            font-size: 14px;
            font-weight: bold;
            line-height: 14px;
            color: rgb(7, 17, 27);
            padding-top: 2px;
          }

          .description,
          .extra {
            font-size: 10px;
            color: rgb(147, 153, 159);
            line-height: 10px;
            padding-top: 8px;
          }

          .description {
            line-height: 12px;
          }

          .extra {
            span {
              margin-right: 12px;
            }
          }

          .price {
            padding-top: 8px;

            .new-price {
              font-size: 14px;
              font-weight: 700;
              line-height: 14px;
              color: rgb(240, 20, 20);
            }

            .old-price {
              font-size: 10px;
              font-weight: 700;
              line-height: 10px;
              color: rgb(147, 153, 159);
              margin-left: 8px;
            }
          }

          .cartcontrol-wrapper {
            position: absolute;
            height: 24px;
            right: 0;
            bottom: -6px;
          }
        }
      }
    }
  }
}

</style>
