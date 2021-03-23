<template>
  <div class="cart">
    <nav-bar class="cart-nav">
      <template #center>
        <div class="title">
          购物车({{cartLength}})
        </div>
      </template>
    </nav-bar>
  <cart-list></cart-list>
  <cart-buttom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartButtomBar from './childComps/CartButtomBar'
import {mapGetters} from 'vuex'
export default {
  components: {
    NavBar,
    CartList,
    CartButtomBar
  },
  computed: {
    ...mapGetters(['cartLength'])
  }
}

</script>
<style>
.cart-nav{
  background-color: var(--color-tint);
  color: #fff;
}
.cart{
  height: 100vh;
}
</style>