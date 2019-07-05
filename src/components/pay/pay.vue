<template>
  <div class="pay-wrapper">
    <div class="menu-title">
      <div class="back" @click="back">
        <i class="icon iconfont icon-previewleft"></i>
      </div>
      <h2 class="text">提交订单</h2>
    </div>
    <div class="pay" ref="pay">
      <div class="pay-content">
        <div class="overview">
          <div class="address-content">
            <span class="bulletin">{{pay.bulletin}}</span>
            <span class="address">{{pay.address}}</span>
            <div class="user">
              <span class="name">{{pay.name}}</span>
              <span class="tel">{{pay.tel}}</span>
            </div>
          </div>
          <div class="info">
            <span class="way">立即送出</span>
            <span class="time">大约{{pay.getTime}}送达</span>
          </div>
        </div>
        <div class="pay-desc">
          <div class="seller">
            <span class="name">{{seller.name}}</span>
            <span class="bulletin">饿了么专送</span>
          </div>
          <ul class="food-list">
            <li class="food-item" v-for="(food,index) in selectFoods" :key="index">
              <div class="icon">
                <img :src="food.icon" width="50" height="50">
              </div>
              <div class="desc">
                <span class="name">{{food.name}}</span>
                <span class="price">
                  <del class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</del>
                  <span class="newPrice">￥{{food.price}}</span>
                </span>
                <p class="count">×{{food.count}}</p>
              </div>
            </li>
            <p class="delivery">
              <span class="title">配送费</span>
              <span class="desc">￥{{seller.deliveryPrice}}</span>
            </p>
          </ul>
        </div>
      </div>
    </div>
    <div class="settlement-wrapper">
      <div class="settlement">
        <span class="text">合计<span class="price">￥{{totalPrice + seller.deliveryPrice}}</span></span>
        <div class="button" @click="submit">提交订单</div>
      </div>
    </div>
    <transition name="fade">
      <div class="login-box" v-show="logboxShow">
        <div class="text">您当前尚未登录</div>
        <div class="buttons">
          <button class="cancel" @click="cancel">再等等</button>
          <button class="login" @click="toLogin">去登录</button>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="list-mask" v-show="logboxShow"></div>
    </transition>
    <transition name="move">
      <div>
        <router-view :users="users" @login-in="_login" @registerFn1="_register"></router-view>
        <router-view :logged="logged" @login-in="_login($event)" @registerFn1="_register($event)"></router-view>
      </div>
    </transition>
  </div>
</template>
<script>
import BScroll from 'better-scroll'

const ERR_OK = 200

export default {
  props: {
    seller: {
      type: Object
    },
    selectFoods: {
      type: Array
    },
    totalPrice: {
      type: Number
    }
  },
  data() {
    return {
      pay: {},
      logboxShow: false,
      logged: false,
      users: []
    }
  },
  updated() {
    if (!this.scroll) {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.pay, {
          click: true
        })
      })
    } else {
      this.scroll.refresh()
    }
  },
  created() {
    this.$axios.get('/static/data.json').then((response) => {
      // response = response.body
      if (response.status === ERR_OK) {
        this.pay = response.data.pay

        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.pay, {
            click: true
          })
        })
      }
    })
  },
  methods: {
    back() {
      this.$router.back(-1)
    },
    submit() {
      if (!this.logged) {
        this.logboxShow = true
      } else {
        alert('支付完成')
      }
    },
    cancel() {
      this.logboxShow = false
    },
    toLogin() {
      this.logboxShow = false
      this.$router.push(`${this.$route.path}/login`)
    },
    _login(logged) {
      this.logged = logged
    },
    _register(usersFn1) {
      this.users = usersFn1
    }
  }
}

</script>
<style lang="less" scoped>
@import "../../common/fonts/iconfont.css";

.pay-wrapper {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 60;
  background: linear-gradient(rgb(0, 160, 240), #f0f0f0, #f0f0f0, #f0f0f0);

  .menu-title {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    background: linear-gradient(rgb(0, 160, 240), rgb(0, 160, 240), rgba(0, 160, 240, 0));
    z-index: 100;

    .back {
      position: absolute;
      top: 5px;
      left: 5px;

      .icon {
        display: block;
        padding: 10px;
        font-size: 20px;
        color: rgb(7, 17, 27);
      }
    }

    .text {
      font-size: 16px;
      line-height: 50px;
      text-align: center;
      color: rgb(7, 17, 27);
    }
  }

  .pay {
    position: fixed;
    width: 100%;
    top: 50px;
    left: 0;
    bottom: 70px;
    z-index: 60;

    .pay-content {
      .overview {
        margin: 0 12px;
        background-color: #fff;
        border-radius: 10px;
        padding: 0 12px;

        .address-content {
          padding: 16px 0;
          font-size: 0;
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);

          .bulletin {
            display: inline-block;
            font-size: 12px;
            background-color: #e2edfc;
            color: #4e8cdd;
            padding: 2px 6px;
            margin-right: 6px;
          }

          .address {
            font-size: 16px;
            line-height: 28px;
          }

          .user {
            font-size: 0;
            margin-top: 4px;

            .name {
              display: inline-block;
              font-size: 12px;
              line-height: 16px;
              color: rgb(7, 17, 27);
            }

            .tel {
              display: inline-block;
              font-size: 12px;
              line-height: 16px;
              margin-left: 12px;
              color: rgba(7, 17, 27, 0.6);
            }
          }
        }

        .info {
          padding: 20px 0;
          display: flex;

          .way {
            flex: 1;
            font-size: 16px;
            line-height: 16px;
          }

          .time {
            flex: 1;
            font-size: 16px;
            line-height: 16px;
            color: rgb(0, 160, 240);
            text-align: right;
          }
        }
      }

      .pay-desc {
        margin: 5px 12px 0;
        padding: 0 12px;
        background-color: #fff;
        border-radius: 10px;

        .seller {
          position: relative;
          padding: 6px 0;

          .name {
            font-size: 14px;
            line-height: 36px;
            color: rgba(7, 17, 27, 0.8);
          }

          .bulletin {
            position: absolute;
            right: 0;
            top: 16px;
            font-size: 10px;
            background-color: rgb(0, 160, 240);
            color: #fff;
            padding: 2px 5px;
            border-radius: 10px 0;
          }
        }

        .food-list {
          .food-item {
            display: flex;
            padding: 24px 0;
            border-top: 1px solid rgba(7, 17, 27, 0.1);

            .icon {
              flex: 0 0 50px;
              width: 50px;
              height: 50px;
            }

            .desc {
              position: relative;
              margin-left: 10px;
              flex: 1;

              .name {
                font-size: 14px;
                line-height: 24px;
              }

              .price {
                position: absolute;
                right: 0;
                top: 0;
                font-size: 0;

                .oldPrice {
                  font-size: 14px;
                  line-height: 24px;
                  color: rgba(7, 17, 27, 0.4);
                }

                .newPrice {
                  font-size: 16px;
                  line-height: 24px;
                  margin-left: 10px;
                }
              }

              .count {
                font-size: 10px;
                line-height: 24px;
                color: rgba(7, 17, 27, 0.4);
              }
            }
          }

          .delivery {
            padding: 24px 0;
            border-top: 1px solid rgba(7, 17, 27, 0.1);
            display: flex;

            .title {
              flex: 1;
              font-size: 14px;
            }

            .desc {
              flex: 1;
              text-align: right;
            }
          }
        }
      }
    }
  }

  .settlement-wrapper {
    position: fixed;
    bottom: 10px;
    left: 0;
    width: 100%;
    height: 50px;
    z-index: 100;

    .settlement {
      display: flex;
      margin: 0 12px;
      height: 100%;
      background-color: #181818;
      border-radius: 35px;
      box-shadow: rgba(0, 0, 0, 0.1) 0 2px 10px 2px;
      overflow: hidden;

      .text {
        flex: 1;
        font-size: 15px;
        line-height: 50px;
        color: #fff;
        text-align: right;
        margin-right: 16px;

        .price {
          font-size: 22px;
          margin-left: 6px;
          line-height: 50px;
          vertical-align: top;
        }
      }

      .button {
        flex: 0 0 100px;
        width: 100px;
        background-color: rgb(0, 160, 240);
        font-size: 15px;
        line-height: 50px;
        text-align: center;
        color: #fff;
      }
    }
  }

  .login-box {
    position: absolute;
    top: 40%;
    left: 10%;
    width: 80%;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-sizing: border-box;
    z-index: 200;

    .text {
      font-size: 14px;
      padding: 20px;
      text-align: center;
    }

    .buttons {
      display: flex;

      .cancel {
        font-size: 14px;
        line-height: 20px;
        padding: 5px 0;
        flex: 1;
        border: none;
        border-right: 1px solid #ccc;
        background-color: #fff;
        color: rgb(240, 20, 20);
      }

      .login {
        font-size: 14px;
        line-height: 20px;
        padding: 10px 0;
        background-color: rgb(0, 160, 240);
        color: #fff;
        flex: 1;
        border: none;
      }
    }
  }

  .list-mask {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 199;
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

  .move-enter-active,
  .move-leave-active {
    transition: all 0.3s;
  }

  .move-enter,
  .move-leave-to {
    transform: translate3d(100%, 0, 0);
  }

  .move-enter-to,
  .move-leave {
    transform: translate3d(0, 0, 0);
  }
}

</style>
