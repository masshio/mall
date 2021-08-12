<template>
   <div>
     <div class="tou">
       <img src="./tou.jpg" alt="">
     </div>
     <div class="name">注册用户名</div>
     <div class="jifen">积分</div>

   </div>
</template>

<script>
export default {
  name: "Profile",

}

</script>
<style scoped>
  img{
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .tou{
    width: 100px;
    height: 100px;
    margin: 20px auto;
  }
  .name,.jifen{
    width: 250px;
    margin: 25px auto;
  }
</style>