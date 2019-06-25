<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-counts" v-if="seller.supports">
        <span @click="showDetail" class="count">{{seller.supports.length}}个</span>
        <i class="iconfont arrow-right">&#xe75c;</i>
      </div>
    </div>
    <div @click="showDetail" class="bulletin-wrapper">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="iconfont arrow-right">&#xe75c;</i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%">
    </div>
    <!-- sticky footer布局 -->
    <!-- 最外层>wrapper层>内容+按钮 -->
    <!-- 其中wrapper层需要设置最小高度为100% -->
    <!-- 内容需要有向下的padding，为了使按钮不覆盖内容 -->
    <!-- 按钮设置负的margin-top -->
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="supports" v-if="seller.supports">
              <li class="support-item" v-for="(item,$index) in seller.supports" :key="$index">
                <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
                <span class="text">{{seller.supports[$index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <ul class="info">
              <li class="info-item" v-for="(item,$index) in seller.infos" :key="$index">{{seller.infos[$index]}}</li>
            </ul>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="iconfont">&#xe615;</i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import star from '../star/star'
// import title from '../title/title'

export default {
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  data() {
    return {
      detailShow: false
    }
  },
  methods: {
    showDetail() {
      this.detailShow = true
    },
    hideDetail() {
      this.detailShow = false
    }
  },
  components: {
    star
  }
}

</script>
<style lang="less" scoped>
@import "../../common/style/style.less";
@import "../../common/fonts/iconfont.css";

.header {
  color: #fff;
  position: relative;
  overflow: hidden;
  background-color: rgba(7, 17, 27, 0.5);

  .content-wrapper {
    position: relative;
    padding: 24px 12px 18px 24px;

    .avatar,
    .content {
      display: inline-block;
    }

    .avatar {
      vertical-align: top;
    }

    .avatar img {
      border-radius: 2px;
    }

    .content {
      padding: 2px 0 2px 16px;

      .title {
        .brand {
          display: inline-block;
          width: 30px;
          height: 18px;
          background-image: url("brand@2x.png");
          background-size: 30px 18px;
          background-repeat: no-repeat;
          vertical-align: top;
        }

        .name {
          margin-left: 6px;
          font-size: 16px;
          font-weight: bold;
          line-height: 18px;
        }
      }

      .description {
        font-size: 12px;
        font-weight: 200;
        line-height: 12px;
        margin-top: 8px;
      }

      .supports {
        font-size: 10px;
        font-weight: 200;
        line-height: 12px;
        margin-top: 10px;

        .icon {
          display: inline-block;
          vertical-align: top;
          width: 12px;
          height: 12px;
          margin-right: 4px;
          background-size: 12px 12px;
          background-repeat: no-repeat;

          &.decrease {
            background-image: url('decrease_1@2x.png');
          }

          &.discount {
            background-image: url('discount_1@2x.png');
          }

          &.guarantee {
            background-image: url('guarantee_1@2x.png');
          }

          &.invoice {
            background-image: url('invoice_1@2x.png');
          }

          &.special {
            background-image: url('special_1@2x.png');
          }
        }

        .text {
          font-size: 10px;
          font-weight: 200;
          line-height: 12px;
        }
      }
    }

    .support-counts {
      position: absolute;
      right: 12px;
      bottom: 18px;
      height: 24px;
      line-height: 24px;
      padding: 0px 8px;
      border-radius: 14px;
      background: rgba(0, 0, 0, 0.2);
      text-align: center;

      .count {
        vertical-align: top;
        font-size: 10px;
      }

      .arrow-right {
        font-size: 10px;
      }
    }
  }

  .bulletin-wrapper {
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 30px 0 12px;
    // font-size: 0; //可消除两个span之间的间隙
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: rgba(7, 17, 27, 0.2);

    .bulletin-title {
      display: inline-block;
      width: 22px;
      height: 12px;
      background-image: url('bulletin@2x.png');
      background-size: 22px 12px;
      background-repeat: no-repeat;
      vertical-align: top;
      margin-top: 8px;
    }

    .bulletin-text {
      font-size: 10px;
      font-weight: 200;
      line-height: 28px;
      margin: 0 4px;
      vertical-align: top;
    }

    .arrow-right {
      position: absolute;
      font-size: 10px;
      right: 12px;
    }
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }

  .detail {
    position: fixed;
    background-color: #999;
    z-index: 100;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(7, 17, 27, 0.8);
    overflow: auto;

    &.fade-enter-active,
    &.fade-leave-active {
      transition: opacity 0.5s;
    }

    &.fade-enter,
    &.fade-leave-to {
      opacity: 0;
    }

    &.fade-leave,
    &.fade-enter-to {
      opacity: 1;
    }

    .detail-wrapper {
      min-height: 100%;

      .detail-main {
        margin-top: 64px;
        padding: 0 36px 64px 36px;

        .name {
          font-size: 16px;
          font-weight: 700;
          line-height: 32px;
          text-align: center;
        }

        .star-wrapper {
          padding-top: 16px;
          text-align: center;
        }

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

        .supports {
          width: 80%;
          margin: 0 auto;
          font-size: 12px;
          font-weight: 200;

          .support-item {
            padding: 6px 0;

            .icon {
              display: inline-block;
              vertical-align: top;
              width: 16px;
              height: 16px;
              margin-right: 6px;
              background-size: 16px 16px;
              background-repeat: no-repeat;

              &.decrease {
                background-image: url('decrease_2@2x.png');
              }

              &.discount {
                background-image: url('discount_2@2x.png');
              }

              &.guarantee {
                background-image: url('guarantee_2@2x.png');
              }

              &.invoice {
                background-image: url('invoice_2@2x.png');
              }

              &.special {
                background-image: url('special_2@2x.png');
              }
            }

            .text {}
          }
        }

        .info {
          width: 80%;
          margin: 0 auto;

          .info-item {
            font-size: 12px;
            line-height: 24px;
            font-weight: 200;
          }
        }
      }
    }

    .detail-close {
      color: rgba(255, 255, 255, 0.5);
      position: relative;
      margin: -64px auto 0;
      width: 32px;
      height: 32px;

      i {
        font-size: 32px;
      }
    }
  }
}

</style>
