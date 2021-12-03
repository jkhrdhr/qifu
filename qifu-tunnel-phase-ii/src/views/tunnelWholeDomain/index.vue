<template>
  <div class="iframeBox">
    <iframe src="http://127.0.0.1:19303/?type=globalMonitor" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {

    };
  },
  methods: {
    
  }, 
};
</script>

<style scoped lang="scss">
.iframeBox {
  height: 1080px;
}
.iframeBox iframe{
  width:100%;
  height: 100%;
}
</style>
