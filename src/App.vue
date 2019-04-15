<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'app',
  mounted:function(){
    const this_ = this;
      window.onreSize =()=>{
          return (()=>{
              window.screenWidth = document.body.clientWidth;
              this_.screenWidth = window.screenWidth;
          })()
      },
      this.$nextTick(function(){
        window.onresize;
      })
  }
}
</script>

<style>

</style>
