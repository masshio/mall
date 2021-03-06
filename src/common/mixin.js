import {debounce} from './utils'
import BackTop from 'components/content/backTop/BackTop.vue'

export const itemListenerMixin = {
    data () {
        return {
            itemImgListener: null
        }
    },
    mounted () {
        const refresh = debounce(this.$refs.scroll.refresh,300)
        this.itemImgListener = () => {refresh()}
        this.$bus.$on('itemImageLoad', this.itemImgListener)
    }
}

export const backTopMixin = {
    data () {
        return {
            isshow: false
        }
    },
    components: {
        BackTop
    },
    methods: {
        backClick(){
        this.$refs.scroll.scrollTo(0,0)
      }
    }
}