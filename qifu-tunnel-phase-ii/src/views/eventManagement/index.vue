<template>
  <div id="eventManage">
    <div class="rightSort">
      <div
        :class="checkedSortState == 'create_date' ? 'checkedState' : ''"
        @click="handleSort('create_date')"
      >
        <span>实时事件</span>
      </div>
      <div :class="checkedSortState == 'pro_name' ? 'checkedState' : ''" @click="handleSort('pro_name')">
        <router-link to="/roadOperating">
          <span>历史事件</span>
        </router-link>
      </div>
    </div>
    <div class="box">
      <div class="left-box">
        <div class="top">
          <Title :titleContent="'实时事件'" :titleWidth="'676px'"></Title>
          <div class="isEvent">
            <span @click="speed">
              <svg-icon
                iconClass="incidents_choosed"
                className="icon"
                style="font-size: 16px; margin-right: 10px"
                v-if="isFlag"
              ></svg-icon>
              <svg-icon
                iconClass="incidents_unchoosed"
                className="icon"
                style="font-size: 16px; margin-right: 10px"
                v-if="!isFlag"
              ></svg-icon>
              显示超速事件</span
            >
            <span @click="lanes">
              <svg-icon
                iconClass="incidents_choosed"
                className="icon"
                style="font-size: 16px; margin-right: 10px"
                v-if="isFlags"
              ></svg-icon
              ><svg-icon
                iconClass="incidents_unchoosed"
                className="icon"
                style="font-size: 16px; margin-right: 10px"
                v-if="!isFlags"
              ></svg-icon
              >显示变道事件</span>
          </div>
          <el-radio-group v-model="radio1" @change="changeEvent">
            <el-radio-button label="2">
              <svg-icon
                iconClass="traffic_accident"
                className="icon"
                style="font-size: 20px; margin-right: 3px; margin-left: 5px"
              ></svg-icon
              ><span style="margin-right: 5px">交通事故</span></el-radio-button
            >
            <el-radio-button label="1">
              <svg-icon
                iconClass="bad_weather"
                className="icon"
                style="font-size: 20px; margin-right: 3px; margin-left: 5px"
              ></svg-icon
              ><span style="margin-right: 5px">恶劣天气</span></el-radio-button
            >
            <el-radio-button label="3">
              <svg-icon
                iconClass="dangerous_accident"
                className="icon"
                style="font-size: 20px; margin-right: 3px; margin-left: 5px"
              ></svg-icon
              ><span style="margin-right: 5px"
                >危化品运输事故</span
              ></el-radio-button
            >
            <el-radio-button label="4">
              <svg-icon
                iconClass="fire_accident"
                className="icon"
                style="font-size: 20px; margin-right: 3px; margin-left: 5px"
              ></svg-icon
              ><span style="margin-right: 5px">火灾事件</span></el-radio-button
            >
            <el-radio-button label="5">
              <svg-icon
                iconClass="tunnel_failure"
                className="icon"
                style="font-size: 20px; margin-right: 3px; margin-left: 5px"
              ></svg-icon
              ><span style="margin-right: 5px"
                >隧道结构损坏</span
              ></el-radio-button
            >
            <el-radio-button label="6">
              <svg-icon
                iconClass="electrome_fault"
                className="icon"
                style="font-size: 20px; margin-right: 3px; margin-left: 5px"
              ></svg-icon
              ><span style="margin-right: 5px"
                >机电设施故障</span
              ></el-radio-button
            >
            <el-radio-button label="7">
              <svg-icon
                iconClass="security_incidents"
                className="icon"
                style="font-size: 20px; margin-right: 3px; margin-left: 5px"
              ></svg-icon
              ><span style="margin-right: 5px"
                >社会安全事件</span
              ></el-radio-button
            >
          </el-radio-group>
          <div class="tops-box">
            <table
              style="width: 100%; background: #061a1d; margin-top: 23px"
              cellspacing="0"
            >
              <tr>
                <th style="width: 259px">报警时间</th>
                <th style="width: 209px">事件类型</th>
                <th style="width: 259px">事件位置</th>
                <th style="width: 359px">详细描述</th>
                <th style="width: 209px">事件状态</th>
                <!-- <th style="width: 273px">操作</th> -->
              </tr>
            </table>
            <div class="tops-sm-box">
              <table style="width: 100%; background: #061a1d" cellspacing="0">
                <tbody>
                  <tr
                    ref="tr"
                    v-for="(item, index) in trafficData"
                    :key="index"
                    class="highlight"
                    @click="detailData(item, index)"
                  >
                    <td style="width: 259px" align="center">
                      {{item.accidentTime}}
                    </td>
                    <td style="width: 209px" align="center">
                      <template>
                        <span>{{ subAccidentTypeArray[item.subAccidentType] }}</span>
                      </template>
                    </td>
                    <td style="width: 259px" align="center">
                      {{ item.direction }}{{ item.milePost }}
                    </td>
                    <td style="width: 359px" align="center">
                      {{ item.contents }}
                    </td>
                    <td style="width: 209px" align="center">
                      <template>
                        <span class="status" v-if="item.status == 0"
                          >未确认</span
                        >
                        <span v-else-if="item.status == 1">处理中</span>
                      </template>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="center-box">
        <div class="event-information">
          <Title :titleContent="'事件信息'" :titleWidth="'487px'"></Title>
          <div class="text">
            <span class="text-two">违规停车</span>
            <span class="text-four">级</span>
            <span class="text-three">{{ eventInfo.grade }}</span>
          </div>
          <p>
            报警时间：<span>{{eventInfo.accidentTime}}</span>
          </p>
          <p>
            事件位置：<span>{{ eventInfo.direction }}{{ eventInfo.milePost }}</span>
          </p> 
          <p>
            详细描述：<span>{{ eventInfo.contents }}</span>
          </p>
        </div>
        <div class="car-information">
          <Title :titleContent="'车辆相关信息'" :titleWidth="'487px'"></Title>
          <el-carousel height="561px">
            <el-carousel-item  v-for="(item, index) in carList" :key="index">
              <div class="car-information-top">
                <div class="left">
                  <img v-if="item.type == '1'" src="@/assets/images/xq.png" alt="" />
                  <img
                    v-if="item.type == '2'"
                    src="@/assets/images/dh.png"
                    alt=""
                  />
                  <img
                    v-if="item.type == '3'"
                    src="@/assets/images/db.png"
                    alt=""
                  />
                  <img
                    v-if="item.type == '7'"
                    src="@/assets/images/zb.png"
                    alt=""
                  />
                  <img
                    v-if="item.type == '8'"
                    src="@/assets/images/wx.png"
                    alt=""
                  />
                  <img
                    v-if="item.type == '10'"
                    src="@/assets/images/xh.png"
                    alt=""
                  />
                  <span>{{ item.picLicense }}</span>
                </div>
                <div class="right">
                  <div>
                    <span>事件发生时所在位置</span>
                    <span>{{ detailList.eventLocation }}</span>
                  </div>
                  <div>
                    <span>进入时间</span>
                    <span>{{
                      moment(detailList.eventHappenTime).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )
                    }}</span>
                  </div>
                </div>
              </div>
              <div class="car-information-bottom">
                <div style="position: relative;">
                  <span>车牌特征图</span>
                  <img
                    :src="`data:image/jpeg;base64,${item.vehiclePic}`"
                    alt=""
                  />
                  <div style="position: absolute;left: 50px;bottom: 0;width: 105px;height: 30px;">
                    <el-image 
                      style="width: 100%; height: 100%"
                      :src="`data:image/jpeg;base64,${item.platePicPath}`" 
                      :preview-src-list="[`data:image/jpeg;base64,${item.platePicPath}`]">
                    </el-image>
                  </div>
                </div>
                <div>
                  <span>基站感知数据</span>
                  <img
                    :src="`data:image/jpeg;base64,${item.stionPic}`"
                    alt=""
                  />
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="right-box">
        <div class="right-box-first">
          <Title :titleContent="'证据链'" :titleWidth="'487px'"></Title>
          <div class="container">
            <div class="container-box">
              <div
                style="
                  width: 105px;
                  position: absolute;
                  top: 5px;
                  border-bottom: 29px solid #2d4656;
                  border-left: 30px solid transparent;
                  transform: rotate(180deg);
                "
              >
                <span
                  style="
                    position: absolute;
                    height: 29px;
                    margin-left: 6px;
                    color: #fff;
                    font-size: 14px;
                    line-height: 29px;
                    transform: rotate(-180deg);
                    font-weight: 500;
                  "
                  >事前图片</span
                >
              </div>
              <img :src="`data:image/jpeg;base64,${detailList.videoImage}`" alt="" />
              <div class="maskLayer"></div>
            </div>
            <div class="container-box">
              <div
                style="
                  width: 105px;
                  position: absolute;
                  top: 5px;
                  border-bottom: 29px solid #4d4034;
                  border-left: 30px solid transparent;
                  transform: rotate(180deg);
                "
              >
                <span
                  style="
                    position: absolute;
                    height: 29px;
                    margin-left: 6px;
                    color: #fff;
                    font-size: 14px;
                    line-height: 29px;
                    transform: rotate(-180deg);
                    font-weight: 500;
                  "
                  >事后图片</span
                >
              </div>
              <img :src="`data:image/jpeg;base64,${detailList.thirdVideoImage}`" alt="" />
              <div class="maskLayer"></div>
            </div>
            <div class="container-box">
              <div
                style="
                  width: 105px;
                  position: absolute;
                  top: 5px;
                  border-bottom: 29px solid #3f625e;
                  border-left: 30px solid transparent;
                  transform: rotate(180deg);
                "
              >
                <span
                  style="
                    position: absolute;
                    height: 29px;
                    margin-left: 6px;
                    color: #fff;
                    font-size: 14px;
                    line-height: 29px;
                    transform: rotate(-180deg);
                    font-weight: 500;
                  "
                  >事中图片</span
                >
              </div>
              <img :src="`data:image/jpeg;base64,${detailList.secondVideoImage}`" alt="" />
              <div class="maskLayer"></div>
            </div>
            <div class="container-box">
              <video width="416px" height="229px" :src="detailList.eventVideoUrl?detailList.eventVideoUrl:''" autoplay="autoplay" muted loop controls="controls" />
              <div class="maskLayer"></div>
              <!-- <video-player
                class="video-player vjs-custom-skin"
                ref="videoPlayer"
                :playsinline="true"
                :options="playerOptions"
              ></video-player> -->
            </div>
          </div>
        </div>
        <div class="right-box-end">
          <span>实时视频</span>
          <div id="info" style="margin-top:15px;"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import {
  getData,
  getDetail,
  updateStatus,
  refreshCamInfoByEventId,
  getCamInfo
} from "@/api/eventManagement/index.js";
import Title from "@/components/Title";
import { log } from 'util';
import '@/assets/adapter.js'
import {H5sPlayerWS, H5sPlayerHls, H5sPlayerRTC} from '@/assets/h5splayer.js'
import {H5siOS,H5sPlayerCreate} from '@/assets/h5splayerhelper.js'
export default {
  components: {
    Title,
  },
  data() {
    return {
      radio1: "2",
      checkedSortState: "create_date", //排序
      trafficData: [],
      detailList: {},
      carList: [],
      isFlag: true,
      isFlags: true,
      overSpeed: 0,
      changeLine: 0,
      eventInfo: {}, // 事件信息
      subAccidentTypeArray:{
        11: 'CO浓度超标',
        12: 'VI浓度超标',
        13: '风速超标',
        14: '洞外亮度超标',
        15: '洞内亮度超标',
        16: '隧道水浸',
        17: '台风',
        21: '非机动车',
        22: '行人',
        23: '拥堵',
        24: '停车',
        25: '抛洒物',
        26: '逆行',
        27: '超速',
        28: '碰撞/追尾/撞壁',
        29: '慢行',
        30: '违法变道',
        31: '超温车辆',
        32: '危化品泄露',
        33: '危化品燃烧',
        41: '明火',
        51: '隧道水毁',
        52: '滑坡',
        53: '塌方',
        61: '机电设施故障',
        71: '群体斗殴',
        72: '恐怖袭击',
      },
      stations: [],
      stations2: ['01_01_00','01_02_01','01_03_02','02_01_03','02_02_04','02_03_05','03_01_06','03_02_07','03_03_08',
        '04_01_09','04_02_10','04_03_11','05_01_12','05_02_13','05_03_14','06_01_15','06_02_16','06_03_17',
        '07_01_18','07_02_19','07_03_20','08_01_21','08_02_22','08_03_23','09_01_24','09_02_25','09_03_26',
        '10_01_27','10_02_28','10_03_29','11_01_30','11_02_31','11_03_32','12_01_33','12_02_34','12_03_35']
      };
  },
  mounted() {
    this.radio1 = this.$route.params.accidentType?this.$route.params.accidentType:'2'
    this.queryListFn();
  },
  methods: {
    getVideo() {
     let _this = this
      var tokens = [];
      var conf = {
          videoid:'h5sVideo1',
          protocol: 'http:', //'http:' or 'https:'
          host: '106.120.201.126:14525',
          rootpath:'/', // '/' or window.location.pathname
          token:'token1',
          hlsver:'v1', //v1 is for ts, v2 is for fmp4
          session:'c1782caf-b670-42d8-ba90-2244d0b0ee83' //session got from login
        };
        function createDiv(num){
          var str ="";
          for(var i = 0;i<num;i++){
            str += 	`<video id='h5sVideo${i}' style="width:416px;height:222px;object-fit: fill;${i===0?'margin-right: 16px;':''}" muted='muted'></video>`;
          }
          document.getElementById("info").innerHTML = str;
        }

        function displayH5sVideo(index,m) {
          conf.videoid ='h5sVideo'+(index%m);
          conf.token = _this.stations[index];
          tokens[index] = H5sPlayerCreate(conf);
          tokens[index].connect();
        }

        function deleteVideoAll(){
          for(var i=0;i<100;i++){
            if(tokens[i]!=null) {
              tokens[i].disconnect();
              delete tokens[i];
              tokens[i] = null;
            }
          }
        }

        var p = 0;//当前轮播页索引

        function play(m){
          createDiv(m);//创建播放视频的div
          deleteVideoAll();//清除所有之前的连接
          
          var n = _this.stations.length; //相机总个数
          var i = parseInt(n/m)  ; //总轮播次数
          var j = n%m ; //最后一次轮播的相机个数
          if(j> 0) i =i+1; //如果最后一次轮播相机个数不为0，则 总轮播次数加一
          if(p>= i) p =0; //当前轮播页索引到最后一页后从第一页开始

          // 翻页逻辑，按页展示每个相机
          for(var q =0; q<m; q++){
            if(p*m + q < n){
              displayH5sVideo(p*m + q,m);
            }	
          }
          p++;//当前轮播页索引页加一，播放下一页
        }

        var autoPlaynum = 2; //每页播放相机数
        play(autoPlaynum); //播放视频页

        //定时翻页 
        // var int=self.setInterval("clock()", 10000);
        // function clock(){
        //   play(autoPlaynum);
        // }
    },
    //切换大类
    changeEvent(id) {
      this.radio1 = id;
      this.queryListFn()
    },
    //切换实时/历史事件
    handleSort(val) {
      this.checkedSortState = val;
    },
    //初始渲染
    queryListFn() {
      getData({
        accidentType: this.radio1,
        overSpeed: this.overSpeed,
        changeLine: this.changeLine,
      }).then((res) => {
        this.trafficData = res.data;
        if(this.$route.params.accidentId) {
          this.trafficData.map((item, index)=> {
            if(item.accidentId === this.$route.params.accidentId) {
              this.detailData(item, index)
            }
          })
        }else {
          this.detailData(this.trafficData[0], 0)
        }
      });
    },
    //分类详情
    detailData(item, index) {
      if(item === undefined) {
        this.eventInfo = {}
        this.detailList = {}
        this.carList = []
        return
      }
      this.eventInfo = item
      this.$nextTick(()=> {
        this.$refs.tr.forEach((item, i)=> {
          if(i === index) {
            item.className = 'highlight clickHighlight'
          }else {
            item.className = 'highlight'
          }
        })
      })
      if(item.sourceId) {
        getDetail({ accidentSerialNumber: item.sourceId }).then((res) => {
          this.detailList = res.data;
          this.carList = JSON.parse(res.data.targetList);
          let array = []
          this.stations2.map(item=> {
            if(item.substring(0, 2)===res.data.staionId) {
              array.push(item)
            }
          })
          this.stations = [array[0], array[2]]
          this.getVideo();
        });
      }else {
        this.carList = []
        this.detailList = {}
        refreshCamInfoByEventId({eventId: item.accidentId}).then(res=> {
          getCamInfo({eventId: item.accidentId}).then(res=> {
            if (res.status == "success") {
              this.stations = res.data
              this.getVideo();
            }
          })
        })
      }
    },
    // affirm(item) {
    //   updateStatus({
    //     eventStatus: item.eventStatus,
    //     id: item.id,
    //   }).then((res) => {
    //     console.log(res);
    //     if (res.status == "success") {
    //       this.$message({
    //         message: "成功",
    //         type: "success",
    //       });
    //       this.queryListFn();
    //     }
    //   });
    // },
    //超速变道切换
    speed() {
      this.isFlag = !this.isFlag;
      if (this.isFlag) {
        this.overSpeed = 0;
      }else{
        this.overSpeed = 1;
      }
      this.queryListFn();
    },
    lanes() {
      this.isFlags = !this.isFlags;
      if (this.isFlags) {
        this.changeLine = 0;
      }else{
        this.changeLine = 1;
      }
      this.queryListFn();
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  margin-top: 20px;
}
#eventManage {
  width: 3840px;
  height: 1080px;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  .box {
    width: 3236px;
    height: 940px;
    background: rgba(6, 35, 36, 0.8);
    display: flex;
    .left-box {
      width: 1568px;
      height: 100%;
      margin: 0 56px;
      .el-radio-group {
        height: 64px;
        ::v-deep .is-active {
          background: linear-gradient(
            180deg,
            rgba(0, 242, 255, 0.3) 0%,
            rgba(42, 246, 176, 0.3) 100%
          );
        }
        .el-radio-button {
          // width: 77px;
          height: 36px;
          margin-top: 25px;
          margin-right: 55px;
          text-align: center;
          ::v-deep .el-radio-button__inner {
            width: 100%;
            height: 100%;
            color: #fff;
            border: 0;
            background: rgba(202, 232, 234, 0.1);
            border-radius: 0;
            padding: 6px 5px;
            box-shadow: none;
          }
        }
      }
      .top {
        padding-top: 20px;
        height: 366px;
        position: relative;
        .isEvent {
          position: absolute;
          top: 48px;
          right: 0;
          font-size: 14px;
          font-weight: 400;
          color: #cae8ea;
          span {
            cursor: pointer;
            margin-left: 50px;
          }
        }
        .tops-box {
          width: 100%;
          height: 728px;
          .tops-sm-box {
            width: 100%;
            max-height: 668px;
            overflow-y: auto;
          }
        }
      }
      .tops {
        padding-top: 20px;
        height: 266px;
        .tops-box {
          width: 100%;
          height: 166px;
          .tops-sm-box {
            width: 100%;
            max-height: 103px;
            overflow-y: auto;
          }
        }
      }
      table th {
        height: 61px !important;
        font-size: 16px;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        background: #061a1d;
        color: #ffffff;
      }
      table tr {
        height: 50px;
        background: #061a1d;
        font-size: 14px;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: #cae8ea;
      }
      .highlight:hover, .clickHighlight {
        background: #061a1d !important;
        box-shadow: inset 0px 0px 17px 0px rgba(112, 255, 255, 0.67);
      }
      .el-button--text {
        color: #4795c6;
        font-size: 16px;
      }
      .tbn-affirm {
        display: inline-block;
        height: 12px;
        opacity: 0.47;
        border: 1px solid #ffffff;
        margin: 0 5px;
      }
      .status {
        color: #1ac163;
      }
    }
    .center-box {
      width: 500px;
      height: 100%;
      margin: 0 56px;
      .event-information {
        padding-top: 20px;
        .text {
          margin-top: 30px;
          margin-bottom: 30px;
          :nth-of-type(1) {
            font-size: 20px;
            font-family: SourceHanSansCN-Bold, SourceHanSansCN;
            font-weight: bold;
            color: #cf9562;
          }
          :nth-of-type(2) {
            float: right;
            color: #fff;
            font-size: 20px;
            font-family: SourceHanSansCN-Bold, SourceHanSansCN;
            font-weight: bold;
          }
          :nth-of-type(3) {
            width: 22px;
            height: 26px;
            background: #cf9562;
            border-radius: 4px;
            float: right;
            text-align: center;
            color: #fff;
            font-size: 20px;
            font-family: SourceHanSansCN-Bold, SourceHanSansCN;
            margin-right: 9px;
          }
        }
        p {
          font-size: 16px;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #9c9c9c;
          line-height: 24px;
          span {
            font-size: 16px;
            font-family: SourceHanSansCN-Medium, SourceHanSansCN;
            font-weight: 500;
            color: #ffffff;
            line-height: 24px;
          }
        }
      }
      .car-information {
        padding-top: 20px;
        .car-information-top {
          margin-top: 40px;
          display: flex;
          .left {
            width: 122px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-right: 80px;
            img {
              width: 122px;
              height: 76px;
              margin-bottom: 10px;
            }
            span {
              width: 100px;
              height: 30px;
              background: #18438a;
              border-radius: 4px;
              font-size: 16px;
              font-family: SourceHanSansCN-Regular, SourceHanSansCN;
              font-weight: 400;
              color: #ffffff;
              line-height: 30px;
              text-align: center;
            }
          }
          .right {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            div {
              display: flex;
              flex-direction: column;
              :nth-of-type(1) {
                font-size: 14px;
                font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                font-weight: 400;
                color: #9c9c9c;
                margin-bottom: 5px;
              }
              :nth-of-type(2) {
                font-size: 16px;
                font-family: SourceHanSansCN-Medium, SourceHanSansCN;
                font-weight: 500;
                color: #ffffff;
                line-height: 24px;
              }
            }
          }
        }
        .car-information-bottom {
          margin-top: 35px;
          display: flex;
          justify-content: space-between;
          :nth-of-type(1) {
            margin-right: 10px;
            span {
              display: inline-block;
              width: 109px;
              height: 32px;
              background: rgba(0, 0, 0, 0.2);
              font-size: 14px;
              font-family: SourceHanSansCN-Normal, SourceHanSansCN;
              font-weight: 400;
              color: #9c9c9c;
              line-height: 32px;
              text-align: center;
            }
            img {
              width: 206px;
              height: 265px;
              margin-top: 15px;
            }
          }
          :nth-of-type(2) {
            span {
              display: inline-block;
              width: 124px;
              height: 32px;
              background: rgba(0, 0, 0, 0.2);
              font-size: 14px;
              font-family: SourceHanSansCN-Normal, SourceHanSansCN;
              font-weight: 400;
              color: #9c9c9c;
              line-height: 32px;
              text-align: center;
            }
            img {
              width: 272px;
              height: 265px;
              margin-top: 15px;
            }
          }
        }
      }
    }
    .right-box {
      .right-box-first {
        padding-top: 20px;
        .container {
          width: 852px;
          height: 490px;
          margin-top: 30px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .container-box {
            width: 416px;
            height: 229px;
            background-color: #000;
            position: relative;
            img {
              width: 100%;
              height: 100%;
            }
            .maskLayer {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              box-shadow: inset 0px 0px 23px 0px #0BF0FB;
              z-index: 999;
              display: none;
            }
          }
          
          .container-box:hover {
            .maskLayer {
              display: block;
            }
          }
        }
      }
      .right-box-end {

        padding-top: 10px;
        span {
          font-size: 20px;
          color: #fff;
          font-family: PangMenZhengDao;
          font-weight: 600;
        }
        .container {
          width: 852px;
          height: 490px;
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
          .container-box {
            width: 416px;
            height: 229px;
            box-shadow: inset 0 0 33px 0 #0bf0fb;
            position: relative;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .container-box:hover img {
            opacity: 0.55;
          }
        }
      }
    }
  }
  ::v-deep ::-webkit-scrollbar {
    width: 5px;
  }
  // 设置滚动条的背景色和圆角
  ::v-deep ::-webkit-scrollbar-thumb {
    background-color: #9ab1c0;
    border-radius: 8px;
  }
}
.rightSort {
  position: absolute;
  left: 100px;
  display: flex;
  flex-direction: column;
  > div {
    width: 148px;
    height: 114px;
    font-size: 26px;
    background: rgba(6, 35, 36, 0.8);
    color: #fff;
    text-align: center;
    font-family: PangMenZhengDao;
    line-height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .checkedState {
    color: #fff;
    background: #a69031;
  }
}
</style>>