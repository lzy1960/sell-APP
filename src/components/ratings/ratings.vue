<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <!-- 总览 -->
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect @ratingtype-select="_select" @content-toggle="_toggleContent" :ratings="ratings" :select-type="selectType" :only-content="onlyContent"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-show="needShow(rating.rateType,rating.text)" v-for="(rating,index) in ratings" class="rating-item" :key="index">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28">
            </div>
            <div class="content">
              <div class="name">{{rating.username}}</div>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend">
                <span class="icon iconfont" :class="{'icon-good':!rating.rateType,'icon-bad':rating.rateType}"></span>
                <span v-show="rating.recommend && rating.recommend.length" class="recommend-item" v-for="(item,index) in rating.recommend" :key="index">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import split from '../../components/split/split'
import star from '../../components/star/star'
import ratingselect from '../../components/ratingselect/ratingselect'
import { formatDate } from '../../common/js/date'
import BScroll from 'better-scroll'

const ALL = 2
const ERR_OK = 0

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      ratings: [],
      showFlag: false,
      selectType: ALL,
      onlyContent: true
    }
  },
  created() {
    this.$http.get('/api/ratings').then((response) => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.ratings = response.data
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          })
        })
      }
    })
  },
  filters: {
    formatDate(time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  components: {
    split,
    star,
    ratingselect
  },
  methods: {
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
    }
  }
}

</script>
<style lang="less" scoped>
@import '../../common/fonts/iconfont.css';

.ratings {
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;

  .ratings-content {
    .overview {
      display: flex;
      padding: 18px 0;

      .overview-left {
        flex: 0 0 137px;
        width: 137px;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        text-align: center;

        @media only screen and (max-width: 320px) {
          flex: 0 0 90px;
          width: 90px;
        }

        .score {
          font-size: 24px;
          line-height: 28px;
          color: rgb(255, 153, 0);
          margin-bottom: 6px;
        }

        .title {
          font-size: 12px;
          line-height: 12px;
          color: rgb(7, 17, 27);
          margin-bottom: 8px;
        }

        .rank {
          font-size: 10px;
          line-height: 10px;
          color: rgb(147, 153, 159);
          padding-bottom: 6px;
        }
      }

      .overview-right {
        flex: 1;
        // padding: 0 24px;
        padding-left: 12px;

        .score-wrapper {
          margin-bottom: 8px;
          font-size: 0;

          .title {
            display: inline-block;
            font-size: 12px;
            color: rgb(7, 17, 27);
            line-height: 18px;
          }

          .star {
            display: inline-block;
            margin: 0 12px;
            vertical-align: top;
          }

          .score {
            display: inline-block;
            font-size: 12px;
            line-height: 18px;
            color: rgb(255, 153, 0);
            vertical-align: top;
          }
        }

        .delivery-wrapper {
          font-size: 0;

          .title {
            font-size: 12px;
            color: rgb(7, 17, 27);
            line-height: 18px;
            margin-right: 12px;
          }

          .time {
            font-size: 12px;
            color: rgb(147, 153, 159);
            line-height: 18px;
          }
        }
      }
    }

    .rating-wrapper {
      .rating-item {
        display: flex;
        margin: 0 18px;
        padding: 18px 0;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);

        .avatar {
          flex: 0 0 28px;
          width: 28px;
          height: 28px;
          margin-right: 12px;
          border-radius: 50%;
          overflow: hidden;
        }

        .content {
          position: relative;
          flex: 1;

          .name {
            font-size: 10px;
            line-height: 12px;
            color: rgb(7, 17, 27);
          }

          .star-wrapper {
            margin: 4px 0 6px;
            font-size: 0;

            .star {
              display: inline-block;
              margin-right: 6px;
            }

            .delivery {
              font-size: 10px;
              line-height: 12px;
              font-weight: 200;
              color: rgb(147, 153, 159);
            }
          }

          .text {
            font-size: 12px;
            line-height: 18px;
            color: rgb(7, 17, 27);
          }

          .recommend {
            font-size: 0;
            margin-top: 8px;

            .icon {
              display: inline-block;
              font-size: 12px;
              line-height: 16px;

              &.icon-good {
                color: rgb(0, 160, 220);
              }

              &.icon-bad {
                color: rgb(147, 153, 159);
              }
            }

            .recommend-item {
              display: inline-block;
              margin-left: 8px;
              margin-bottom: 4px;
              font-size: 9px;
              line-height: 16px;
              color: rgb(147, 153, 159);
              border: 1px solid rgba(7, 17, 27, 0.1);
              padding: 0 6px;
            }
          }

          .time {
            position: absolute;
            top: 0;
            right: 0;
            font-size: 10px;
            line-height: 12px;
            font-weight: 200;
            color: rgb(147, 153, 159);
          }
        }
      }
    }
  }
}

</style>
