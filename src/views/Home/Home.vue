<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-contorl :title="['流行','新款','精选']" 
      class="tabcontorl"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
      />
    <scroll class="content" ref="scroll" 
    :probe-type="3" 
    :pull-up-load="true"
    @scroll="contentScroll"
    @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-contorl :title="['流行','新款','精选']" 
      @tabClick="tabClick"
      ref="tabControl2"
      />
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
      
    <back-top @click.native="backClick" v-show="isshow"></back-top>
    
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/Scroll/Scroll'
import TabContorl from 'components/content/TabContorl/TabContorl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'

import {getHomeMultidata,getHomeGoods} from 'network/home.js'
import {itemListenerMixin,backTopMixin} from 'common/mixin.js'

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabContorl,
    GoodsList,
    Scroll,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY : 0
    }
  },
  mixins: [itemListenerMixin,backTopMixin],
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  created() {
    this.getMultidata()
    this.getGoods('pop')
    this.getGoods('new')
    this.getGoods('sell')

  },
  mounted() {
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
    this.$bus.$off("itemImageLoad",this.itemImgListener)
  },
  methods: {
    // 事件监听的方法
    tabClick(index){
        switch(index){
          case 0: 
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2: 
            this.currentType = 'sell' 
            break
        }
        this.$refs.tabControl1.isactive = index
        this.$refs.tabControl2.isactive = index
    },
    contentScroll(position){
      this.isshow = -(position.y) > 1000
      this.isTabFixed = -(position.y) > this.tabOffsetTop
    },
    loadMore(){
      this.getGoods(this.currentType)
    },
    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    //网络请求相关的方法
    getMultidata(){
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },

    getGoods(type){
      let page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
      })
    }
  },
}

</script>

<style scoped>
  #home{
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }

  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    /* position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 8; */
  }

  .tabcontorl{
    position: sticky;
    top: 44px;
    z-index: 6;
    background-color: white;
  }

  .content{
    position: absolute;
    top: 44px;
    bottom: 47px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style>