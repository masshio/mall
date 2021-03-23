<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="navbar"/>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImage"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="param"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommend" ref="goods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isshow"></back-top>
    <detail-bottom-bar @addToCart="addToCart"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottombar'

import Scroll from 'components/common/Scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'


import {itemListenerMixin,backTopMixin} from 'common/mixin.js'
import {debounce} from 'common/utils.js'

import { mapActions } from 'vuex'

import {getDetail,Goods,Shops,GoodsParam,getRecommend} from 'network/detail.js'
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImage: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      themeTopYs: [],
      getThemeTopYs: null,
      currentIndex: 0,
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  mixins: [itemListenerMixin,backTopMixin],
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid
    
    //2.根据iid请求详细数据
    getDetail(this.iid).then(res => {
      //1.获得顶部轮播图数据
      const data = res.result
      this.topImage = res.result.itemInfo.topImages

      //获得商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      //获取店铺信息
      this.shop = new Shops(data.shopInfo)

      //获取商品的详细信息
      this.detailInfo = data.detailInfo

      //获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

      //获取评论信息
      if(data.rate.cRate != 0){
        this.commentInfo = data.rate.list[0]
      }
    })

    //3.请求推荐数据
    getRecommend().then(res => {
      this.recommend = res.data.list
    })

    this.getThemeTopYs = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.goods.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE)
    })

  },
  destroyed() {
    this.$bus.$off("itemImageLoad",this.itemImgListener)
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad(){
      this.$refs.scroll.refresh()
      this.getThemeTopYs()
    },
    titleClick(index){
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },
    contentScroll(position){ //详情页navbar切换
      this.isshow = -(position.y) > 1000
      const positionY = -position.y
      let length = this.themeTopYs.length
      for(let i=0; i<length-1 ; i++){
        if((this.currentIndex !== i) && (this.themeTopYs[i] <= positionY) && (this.themeTopYs[i+1] > positionY)){
          this.currentIndex = i
          this.$refs.navbar.currentIndex = this.currentIndex
          console.log(i);
        }
      }
    },
    addToCart(){
      const product = {}
      product.image = this.topImage[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      this.addCart(product).then(res => {
        this.$toast.show(res)
      })
    }
  }
}

</script>
<style scoped>
#detail{
  position: relative;
  z-index: 8;
  background-color: #fff;
  height: 100vh;
}
.content{
  height: calc(100% - 44px - 49px);
}
.detail-nav{
  position: relative;
  background-color: #fff;
  z-index: 9;
}
</style>