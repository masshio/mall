<template>
  <div class="bottom-bar">
      <div class="check-content">
          <check-button class="check-button" :is-check="isSelectAll" @click.native="checkClick"/>
          <span>全选</span>
      </div>
      <div class="price">
          合计：{{totalPrice}}
      </div>
      <div class="calculate">
          去计算({{checkLength}})
      </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'
export default {
    components: {
        CheckButton
    },
    computed: {
        ...mapGetters(['cartList']),
        totalPrice(){
            return "￥"+this.cartList.filter(item => {
                return item.checked 
            }).reduce((preValue,item) => {
                return preValue + item.price * item.count
            },0).toFixed(2)
        },
        checkLength(){
            return this.cartList.filter(item => {
                return item.checked
            }).length
        },
        isSelectAll(){
            if(this.cartList.length === 0) return false
            return !this.cartList.find(item => !item.checked)
        },
    },
    methods: {
        checkClick(){
            if(this.isSelectAll){
                this.cartList.forEach(item => item.checked = false)
            }else {
                this.cartList.forEach(item => item.checked = true)
            }
        }
    },
}

</script>
<style scoped>
    .bottom-bar{
        height: 40px;
        background-color: #eee;
        position:relative;
        line-height: 40px;
        display: flex;
        font-size: 14px;
    }
    .check-content{
        align-items: center;
        display: flex;
    }
    .check-button{
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-left: 10px;
        margin-right: 5px;
    }
    .price{
        margin-left: 40px;
        flex: 1;
    }
    .calculate{
        width: 100px;
        background-color: #FF0040;
        color: #fff;
        text-align: center;
    }
</style>