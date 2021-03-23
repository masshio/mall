<template>
  <div>
      <nav-bar>
          <template #left>
              <div class="back" @click="back">
                  <img src="~assets/img/common/back.svg" alt="">
              </div>
          </template>
          <template #center>
                <div class="title">
                    <div v-for="(item,index) in titles" :key="index" class="title-item" 
                        :class="{active: currentIndex === index}"
                        @click="itemclick(index)">
                         {{item}}
                    </div>
                </div>
          </template>
      </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
    data() {
        return {
            titles: ['商品','参数','评论','推荐'],
            currentIndex: 0
        }
    },
    components: {
        NavBar
    },
    methods: {
        itemclick(index){
            this.currentIndex = index
            this.$emit("titleClick",index)
        },
        back(){
            this.$router.back()
        }
    },
}

</script>
<style scoped>
    .title{
        display: flex;
        font-size: 13px;
    }
    .title-item{
        flex: 1;
    }
    .active{
        color: var(--color-high-text);
    }
    .back{
        margin-top: 7px;
    }
    
</style>