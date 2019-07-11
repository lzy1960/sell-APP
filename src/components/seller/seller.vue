<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="description">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul>
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span>{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span>{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span>{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favourite" @click="toggleFavourite">
          <span class="icon iconfont icon-love" :class="{'active':favourite}"></span>
          <p class="text">{{favouriteText}}</p>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <v-title>公告与活动</v-title>
        <p class="content">{{seller.bulletin}}</p>
        <ul>
          <li class="bulletin-item" v-for="(item,index) in seller.supports" :key="index">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <v-title>商家实景</v-title>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="(pic,index) in seller.pics" :key="index">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="infos">
        <v-title>商家信息</v-title>
        <ul class="info-list">
          <li class="info-item" v-for="(info,index) in seller.infos" :key="index">{{seller.infos[index]}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import star from '../../components/star/star'
import split from '../../components/split/split'
import title from '../../components/title/title'
import BScroll from 'better-scroll'
import { saveToLocal, loadFromLocal } from '../../common/js/store'

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      favourite: (() => {
        console.log(this.seller)
        return loadFromLocal(this.seller.id, 'favourite', false)
      })()
    }
  },
  computed: {
    favouriteText() {
      return this.favourite ? '已收藏' : '收藏'
    }
  },
  watch: {
    seller: function() {
      this._initScroll()
      this._initPic()
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  mounted() {
    this._initScroll()
    this._initPic()
  },
  updated() {
    this._initScroll()
    this._initPic()
  },
  methods: {
    _initScroll() {
      // 仅写这段代码无法滚动，原因是seller是异步获取的，刚开始获取到的是空对象，无法撑开盒子，导致高度无法获取到，应增加监听watch
      // BScroll传入两个参数，dom对象和属性
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    },
    _initPic() {
      if (this.seller.pics) {
        let picWidth = 120
        let margin = 6
        let width = (picWidth + margin) * this.seller.pics.length - margin

        this.$refs.picList.style.width = width + 'px'
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            })
          } else {
            this.picScroll.refresh()
          }
        })
      }
    },
    toggleFavourite(event) {
      if (!event._constructed) {
        return
      }
      this.favourite = !this.favourite
      console.log(this.seller.id)
      saveToLocal(this.seller.id, 'favourite', this.favourite)
    }
  },
  components: {
    star,
    split,
    'v-title': title
  }
}

</script>
<style lang="less" scoped>
@import '../../common/fonts/iconfont.css';

.seller {
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;

  .seller-content {
    .overview {
      padding: 18px 0;
      margin: 0 18px;

      .title {
        font-size: 14px;
        line-height: 14px;
        color: rgb(7, 17, 27);
      }

      .description {
        margin-top: 8px;
        padding-bottom: 18px;
        font-size: 0;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);

        .star {
          display: inline-block;
          vertical-align: top;
          margin-right: 8px;
        }

        .text {
          font-size: 10px;
          margin-right: 12px;
          display: inline-block;
          color: rgb(77, 85, 93);
          vertical-align: top;
        }
      }

      ul {
        padding: 18px 0 0;
        font-size: 0;
        display: flex;

        .block {
          flex: 1;
          text-align: center;
          border-right: 1px solid rgba(7, 17, 27, 0.1);

          &:last-child {
            border: none;
          }

          h2 {
            font-size: 10px;
            line-height: 10px;
            color: rgb(147, 153, 159);
          }

          .content {
            font-size: 10px;
            font-weight: 200;
            line-height: 48px;
            color: rgb(7, 17, 27);

            span {
              font-size: 24px;
            }
          }
        }
      }

      .favourite {
        position: absolute;
        top: 18px;
        right: 18px;
        text-align: center;
        width: 36px;

        .icon {
          font-size: 24px;
          line-height: 24px;
          color: #d4d6d9;

          &.active {
            color: rgb(240, 20, 20);
          }
        }

        .text {
          font-size: 10px;
          line-height: 10px;
          color: rgb(77, 85, 93);
          margin-top: 4px;
        }
      }
    }

    .bulletin {
      padding: 18px 18px 0;

      .content {
        font-size: 12px;
        line-height: 24px;
        font-weight: 200;
        color: rgb(240, 20, 20);
        padding: 0 12px 16px;
      }

      ul {
        .bulletin-item {
          padding: 16px 12px;
          font-size: 0;

          border-top: 1px solid rgba(7, 17, 27, 0.1);

          .icon {
            display: inline-block;
            vertical-align: top;
            width: 16px;
            height: 16px;
            margin-right: 6px;
            background-size: 16px 16px;
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
            font-size: 12px;
            font-weight: 200;
            color: rgb(7, 17, 27);
            line-height: 16px;
          }
        }
      }
    }

    .pics {
      padding: 18px;

      .pic-wrapper {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;

        .pic-list {
          font-size: 0;

          .pic-item {
            display: inline-block;
            margin-right: 6px;

            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
    }

    .infos {
      padding: 18px;

      .info-list {
        .info-item {
          padding: 16px 12px;
          border-top: 1px solid rgba(7, 17, 27, 0.1);
          font-size: 12px;
          line-height: 16px;
          font-weight: 200;
          color: rgb(7, 17, 27);
        }
      }
    }
  }
}

</style>
