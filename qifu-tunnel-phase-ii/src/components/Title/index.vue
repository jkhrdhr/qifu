<template>
  <div :style="`width: ${titleWidth};border-bottom: 1px solid #FFFFFF; border-color: rgba(255, 255, 255, 0.2);`">
    <h2 class="title">{{titleContent}}</h2>
    <div class="bottomBorder">

    </div>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: {
    titleContent: {
      type: String,
      default: ''
    },
    titleWidth: {
      type: String,
      default: ''
    },
  },
  computed: {
    
  },
  methods: {
    
  }
}
</script>

<style scoped>
.title {
  padding-left: 28px;
  margin: 9px 0;
  font-size: 24px;
  color: #fff;
  font-family: PangMenZhengDao;
}
.bottomBorder {
  width: 200px;
  height: 4px;
  background: linear-gradient(90deg, #00F4FF 0%, #00FFA7 100%);
}
.title::before {
  position: absolute;
  margin-left: -28px;
  margin-top: 4px;
  content: '';
  display: inline-block;
  width: 16px;
  height: 18px;
  background-image: url('../../assets/images/rectangle.png');
  /* transform:rotate(-45deg);
  background:linear-gradient(to bottom right, transparent 0%, transparent 49.9%, #00F4FF 0%,#00FFA7 100%); */
}
</style>

