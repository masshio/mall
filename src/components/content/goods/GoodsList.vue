<template>
  <div class="goods">
      <good-list-item v-for="(item,index) in goods" :key="index" :item="item"/>
  </div>
</template>

<script>
import GoodListItem from './GoodsListItem'
export default {
    name: "GoodsList",
    props: {
        goods: {
            type: Array,
            default(){
                return []
            }
        }
    },
    components: {
        GoodListItem
    }
}

</script>
<style>
  .goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }
</style>