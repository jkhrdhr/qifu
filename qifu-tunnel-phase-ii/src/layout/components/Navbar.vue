<template>
  <div class="navbar">
    <ul id="ul1">
      <router-link to="">
        <li class="menuItem menuItem1">路段运营</li>
      </router-link>
      <router-link to="/index">
        <li class="menuItem menuItem2">事件管理</li>
      </router-link>
      <router-link to="">
        <li class="menuItem menuItem3">指挥调度</li>
      </router-link>
      <router-link to="">
        <li class="menuItem menuItem4">综合监控</li>
      </router-link>
      <router-link to="/wisdomEntrance" style="margin-left: 733px;">
        <li class="menuItem menuItem5">智慧入口</li>
      </router-link>
      <a style="position: relative;">
        <li class="menuItem menuItem6" @click="showPullDownMenu">隧道全域</li>
        <div class="pullDownMenu" v-show="isShowPullDownMenu">
          <router-link to="/tunnelWholeDomain">
            <div @click="showPullDownMenu" :class="activeIndex === 'tunnelWholeDomain'?'active':''">全域监控</div>
          </router-link>
          <router-link to="/tunnelWholeDomain/twinborn">
            <div @click="showPullDownMenu" :class="activeIndex === 'twinborn'?'active':''">孪生站点</div>
          </router-link>
          <router-link to="/tunnelWholeDomain/panorama">
            <div @click="showPullDownMenu" :class="activeIndex === 'panorama'?'active':''">全景漫游</div>
          </router-link>
        </div>
      </a>
      <router-link to="/control">
        <li class="menuItem menuItem7">隧道管控</li>
      </router-link>
      <router-link to="">
        <li class="menuItem menuItem8">统计查询</li>
      </router-link>
    </ul>
    <div class="right-menu">
      <span @click="logout">退出</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { nextTick } from 'q';

import Screenfull from "@/components/Screenfull";

export default {
  components: {
    Screenfull,
  },
  computed: {
    setting: {
      get() {
        return this.$store.state.settings.showSettings;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "showSettings",
          value: val,
        });
      },
    },
    topNav: {
      get() {
        return this.$store.state.settings.topNav;
      },
    },
  },
  data() {
    return {
      isShowPullDownMenu: true,
      activeIndex: 'roadOperating',
      lis: ''
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.activeIndex = route.name
        this.isShowPullDownMenu = false
        if(this.lis) {
          this.changeActivate()
        }
      },
      immediate: true
    }
  },
  created() {
  },
  mounted() {
    var oUl = document.getElementById("ul1");
    this.lis = document.getElementById("ul1").getElementsByTagName("li");
    this.changeActivate()
  },
  methods: {
    // 下拉菜单开启/关闭
    showPullDownMenu() {
      this.isShowPullDownMenu = !this.isShowPullDownMenu
    },
    // 菜单change
    changeActivate() {
      this.lis.forEach((element,index) => {
        element.classList.remove('itemActive'+ (index +1))
      })
      if(this.activeIndex === 'roadOperating') {
          this.lis[0].classList.add('itemActive1')
        }else if(this.activeIndex === 'eventManagement') {
          this.lis[1].classList.add('itemActive2')
        }else if(this.activeIndex === 'commandDispatch') {
          this.lis[2].classList.add('itemActive3')
        }else if(this.activeIndex === 'monitoring') {
          this.lis[3].classList.add('itemActive4')
        }else if(this.activeIndex === 'wisdomEntrance') {
          this.lis[4].classList.add('itemActive5')
        }else if(this.activeIndex === 'tunnelWholeDomain' || this.activeIndex === 'twinborn' || this.activeIndex === 'panorama') {
          this.lis[5].classList.add('itemActive6')
        }else if(this.activeIndex === 'control') {
          this.lis[6].classList.add('itemActive7')
        }else if(this.activeIndex === 'statisticalQuery') {
          this.lis[7].classList.add('itemActive8')
        }
    },
    async logout() {
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("LogOut").then(() => {
            location.href = "/index";
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.pullDownMenu {
  width: 180px;
  height:136px;
  position: absolute;
  display: inline-block;
  padding-top: 10px;
  top: 50px;
  left: 0;
  // background: rgb(3, 49, 51);
  background: url(../../assets/images/title_popup2.png) no-repeat;
  div {
    border: 1px solid rgb(2, 137, 145);
    color: #fff;
    text-align: center;
    height: 42px;
    line-height: 42px;
    border-radius: 5px;
  }
}
.active {
  background-color: rgba(244, 205, 63, 0.12);
}
.navbar {
  height: 100px;
  // overflow: hidden;
  padding-top: 10px;
  padding-left: 540px;
  position: relative;
  z-index: 999;
  background: url('../../assets/images/top_bg.png') no-repeat;
  background-size: 100% 100%;
  background-position: 100% 100%;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    position: absolute;
    right: 20px;
    top: 0;
    height: 100%;
    line-height: 60px;
    color: #fff;
  }
}
#ul1 {
  margin: 0;
  padding: 0;
  list-style:none; 
}
.menuItem {
  width: 250px;
  height: 42px;
  line-height: 42px;
  display: inline-block;
  color: rgba(202, 232, 234, 1);
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  font-family: PangMenZhengDao;
  margin-right: 4px;
}
.menuItem1 {
  background: url('../../assets/images/road_choosed.png');
}
.menuItem1:hover {
  background: url('../../assets/images/road_choosed2.png');
  color: rgba(255, 217, 0, 1);
}
.itemActive1 {
  background: url('../../assets/images/road_choosed2.png') !important;
  color: rgba(255, 217, 0, 1) !important;
}
.menuItem2 {
  background: url('../../assets/images/event_unchoosed.png');
}
.menuItem2:hover {
  background: url('../../assets/images/event_choosed.png');
  color: rgba(255, 217, 0, 1);
}
.itemActive2 {
  background: url('../../assets/images/event_choosed.png') !important;
  color: rgba(255, 217, 0, 1) !important;
}
.menuItem3 {
  background: url('../../assets/images/command_unchoosed.png');
}
.menuItem3:hover {
  background: url('../../assets/images/command_choosed.png');
  color: rgba(255, 217, 0, 1);
}
.itemActive3 {
  background: url('../../assets/images/command_choosed.png') !important;
  color: rgba(255, 217, 0, 1) !important;
}
.menuItem4 {
  background: url('../../assets/images/comprehensive_unchoosed.png');
}
.menuItem4:hover {
  background: url('../../assets/images/comprehensive_choosed.png');
  color: rgba(255, 217, 0, 1);
}
.itemActive4 {
  background: url('../../assets/images/comprehensive_choosed.png') !important;
  color: rgba(255, 217, 0, 1) !important;
}
.menuItem5 {
  background: url('../../assets/images/entrance_unchoosed.png');
}
.menuItem5:hover {
  background: url('../../assets/images/entrance_choosed.png');
  color: rgba(255, 217, 0, 1);
}
.itemActive5 {
  background: url('../../assets/images/entrance_choosed.png') !important;
  color: rgba(255, 217, 0, 1) !important;
}
.menuItem6 {
  background: url('../../assets/images/global_unchoosed.png');
}
.menuItem6:hover {
  background: url('../../assets/images/global_choosed.png');
  color: rgba(255, 217, 0, 1);
}
.itemActive6 {
  background: url('../../assets/images/global_choosed.png') !important;
  color: rgba(255, 217, 0, 1) !important;
}
.menuItem7 {
  background: url('../../assets/images/monitor_unchoosed.png');
}
.menuItem7:hover {
  background: url('../../assets/images/monitor_choosed.png');
  color: rgba(255, 217, 0, 1);
}
.itemActive7 {
  background: url('../../assets/images/monitor_choosed.png') !important;
  color: rgba(255, 217, 0, 1) !important;
}
.menuItem8 {
  background: url('../../assets/images/data_unchoosed.png');
}
.menuItem8:hover {
  background: url('../../assets/images/data_choosed.png');
  color: rgba(255, 217, 0, 1);
}
.itemActive8 {
  background: url('../../assets/images/data_choosed.png') !important;
  color: rgba(255, 217, 0, 1) !important;
}

</style>
