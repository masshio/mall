<template>
  <div class="toast" v-show="isShow">
      {{message}}
  </div>
</template>

<script>
export default {
    data() {
        return {
            message: "",
            isShow: false
        }
    },
    methods: {
        show(message, duration=2000){
            this.message = message;
            this.isShow = true;
            setTimeout(() => {
                this.message = "";
                this.isShow = false;
            }, duration);
        }
    },
}

</script>
<style scoped>
    .toast{
      position: fixed;
      z-index: 9;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      padding: 8px 10px;
      color: #fff;
      background-color: rgba(0, 0, 0, .75);
      border-radius: 10px;
    }
</style>