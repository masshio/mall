<template>
  <div class="tabcontorl">
      <div v-for="(item,index) in title" 
      :key="item" 
      class="tab-contorl-item" 
      :class="{active: index === isactive}"
      @click="itemclick(index)"
      >
          <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        title: {
            type: Array,
            default(){
                return []
            }
        }
    },
    data() {
        return {
            isactive: 0
        }
    },
    methods: {
        itemclick(index){
            this.isactive = index
            this.$emit("tabClick",index)
        }
    },
}

</script>
<style>
.tabcontorl{
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
}

.tab-contorl-item{
    flex: 1;
}

.tab-contorl-item span{
    padding: 4px;
}

.active{
    color: var(--color-high-text);
}

.active span{
    border-bottom: 2px solid var(--color-high-text);
}
</style>