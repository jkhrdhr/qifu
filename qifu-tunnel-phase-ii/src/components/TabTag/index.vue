<template>
  <div class="tabTagBox">
    <div :class="acticeIndex === index?'tabTagBg tabTag':'tabTag'" @click="clickDom(index)" v-for="(item, index) in tagData" :key="index">{{item}}</div>
    <el-date-picker
      :class="tagId?'datePicker2':'datePicker'"
      v-model="tagId"
      :editable="false"
      type="daterange"
      :range-separator="tagId?'至':' '"
      start-placeholder="自定义"
      end-placeholder="">
      </el-date-picker>
  </div>
</template>
<script>
export default {
  name: 'TabTag',
  props: {
    tagId: {
      type: Number,
      default: null
    },
    tagData: {
      type: Array,
      default: []
    },
  },
  data() {
    return {
      acticeIndex: 0
    }
  },
  computed: {
    
  },
  mounted() {
    var tabTagBox = document.getElementsByClassName("tabTagBox");
    var tags = document.getElementsByClassName("tabTag")
    tabTagBox.onclick = (ev)=>{
　　　var ev = ev || window.event;
　　　var target = ev.target || ev.srcElement;
      console.log(target.nodeName.toLowerCase())
　　　if(target.nodeName.toLowerCase() == 'li'){
        tags.forEach((element,index) => {
          element.classList.remove('itemActive')
        });
        target.classList.add('itemActive')
　　　}
　　}
  },
  methods: {
    clickDom(index) {
      this.acticeIndex = index
    }
  }
}
</script>

<style lang="scss">
.el-icon-circle-close {
  margin-top: -5px;
}
.el-date-editor .el-range__icon {
    font-size: 15px;
    margin-left: -6px;
    margin-top: -5px;
    margin-right: 4px;
}
.el-range-editor.is-active {
  border: none;
}
.el-date-editor .el-range-separator{
  color: #CAE8EA;
  background: #000;
  line-height: 22px;
}
.el-date-editor .el-range-input {
  color: #FFF;
}
.el-date-editor--daterange.el-input__inner {
  width: 260px;
  height: 24px;
  border: none;
  background: #2F4343;
  vertical-align: top;
  padding: 1px 10px;
}

.datePicker .el-range-input {
  width: 113px;
  background: #000;
}
.datePicker2 .el-range-input {
  width: 100px;
  background: #000;
}
.el-date-range-picker__content.is-left {
    border-right: 1px solid #616161
}
.el-date-range-picker__header, .el-picker-panel__icon-btn, .el-picker-panel__icon-btn:hover {
  color: #CAE8EA;
}
.el-date-table th {
  color: #CAE8EA;
  border-bottom: solid 1px #525757;
}

.el-picker-panel {
  border: 1px solid #616161;
  background: #1D3539;
}
.el-date-table td.next-month, .el-date-table td.prev-month {
  color: #4F686C;
}
.available {
  color: #CAE8EA;
}
.el-date-table td.end-date span, .el-date-table td.start-date span {
    background-color: #AD9A4C;
}
.el-date-table td.in-range div, .el-date-table td.in-range div:hover {
   background-color: rgba(255, 255, 255, 0.14);
}
.tabTagBox {
    margin: 22px 0;
}
.tabTagBg {
  background: linear-gradient(180deg, rgba(0, 244, 255, 0.3) 0%, rgba(42, 246, 176, 0.3) 100%);
}
.tabTag {
    width: 80px;
    height: 24px;
    cursor: pointer;
    color: #ffffff;
    text-align: center;
    line-height: 24px;
    margin-right: 10px;
    font-size: 14px;
    display: inline-block;
}
</style>
