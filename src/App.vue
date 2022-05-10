<template>
  <div id="root">
    <el-button class="con" type="text" @click="showConfig = true">
      随机配置
    </el-button>
    <div class="title-kaer">
      <div class="text1">地球不爆炸</div>
      <div class="text2">卡尔不放假</div>
    </div>
    <div id="main" :class="{ mask: showRes }"></div>
    <div id="tags">
      <ul v-for="item in lolList" :key="item.key">
        <li>
          <a
            href="javascript:void(0);"
            :style="{
              color: '#fff',
              display: 'flex'
            }"
          >
            <img v-if="item.photo" :src="item.photo" :width="50" :height="50" />
          </a>
        </li>
      </ul>
    </div>
    <transition name="bounce">
      <div id="resbox" v-show="showRes" @click="showRes = false">
        <p>随机结果</p>
        <div class="container">
          <div v-for="item in resArr" :key="item.key" class="lol-show">
            <div class="img">
              <img :src="item.photo" alt="" />
            </div>
            <div>{{ item.name }}</div>
          </div>
        </div>
      </div>
    </transition>

    <LotteryConfig :visible.sync="showConfig" />
    <Tool @toggle="toggle" :running="running" />
  </div>
</template>
<script>
import LotteryConfig from '@/components/LotteryConfig';
import Tool from '@/components/Tool';
import { getData } from '@/helper/index';
import { luckydrawHandler } from '@/helper/algorithm';

export default {
  name: 'App',
  components: { LotteryConfig, Tool },
  computed: {
    lolList: {
      get() {
        return this.$store.state.lolList;
      }
    },
    config: {
      get() {
        return this.$store.state.config;
      }
    },
    result: {
      get() {
        return this.$store.state.result;
      },
      set(val) {
        this.$store.commit('setResult', val);
      }
    },
    historyHeroId: {
      get() {
        return this.$store.state.historyHeroId;
      }
    }
  },
  data() {
    return {
      running: false,
      showRes: false,
      showConfig: false,
      resArr: []
    };
  },
  mounted() {
    this.$store.commit('getHistoryHeroId');
    this.$store.commit('getHistory');
    this.startTagCanvas();
    window.addEventListener('resize', this.reportWindowSize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.reportWindowSize);
  },
  methods: {
    reportWindowSize() {
      const AppCanvas = this.$el.querySelector('#rootcanvas');
      if (AppCanvas.parentElement) {
        AppCanvas.parentElement.removeChild(AppCanvas);
      }
      this.startTagCanvas();
    },

    speed() {
      return [0.1 * Math.random() + 0.01, -(0.1 * Math.random() + 0.01)];
    },
    createCanvas() {
      const canvas = document.createElement('canvas');
      canvas.width = document.body.offsetWidth;
      canvas.height = document.body.offsetHeight;
      canvas.id = 'rootcanvas';
      this.$el.querySelector('#main').appendChild(canvas);
    },
    startTagCanvas() {
      this.createCanvas();
      const { speed } = this;
      window.TagCanvas.Start('rootcanvas', 'tags', {
        textColour: null,
        initial: speed(),
        dragControl: 1,
        textHeight: 20,
        noSelect: true,
        lock: 'xy'
      });
    },
    reloadTagCanvas() {
      window.TagCanvas.Reload('rootcanvas');
    },
    closeRes() {
      this.showRes = false;
    },
    // 停止关闭
    toggle() {
      const { speed } = this;
      if (this.running) {
        window.TagCanvas.SetSpeed('rootcanvas', speed());
        this.showRes = true;
        this.running = !this.running;
        this.$nextTick(() => {
          this.reloadTagCanvas();
        });
        // 开始抽奖逻辑
        const currentHeroId = luckydrawHandler(
          this.lolList,
          this.historyHeroId,
          this.config.lolNumber
        );
        this.getCurrentHero(currentHeroId);
        this.$store.commit('setHistoryHeroId', currentHeroId);
      } else {
        window.TagCanvas.SetSpeed('rootcanvas', [5, 1]);
        this.running = !this.running;
        this.showRes = false;
      }
    },
    // 获取当前的营销
    getCurrentHero(arr) {
      this.resArr = this.lolList.filter(item => arr.includes(item.key));
      // 根据时间存取一份
      const myDate = new Date().toLocaleString();
      const historyList = getData('historyList') || [];
      const obj = {
        time: myDate,
        list: this.resArr
      };
      historyList.unshift(obj);
      this.$store.commit('setHistoryList', historyList);
    }
  }
};
</script>
<style lang="scss">
.title-kaer {
  position: absolute;
  left: 20px;
  top: 20px;
  width: 300px;
  height: 100px;
  font-size: 50px;
  font-weight: 700;
  font-style: oblique;
  .text1 {
    background: linear-gradient(to right, #fff, #fff);
    -webkit-background-clip: text;
    color: transparent;
  }
  .text2 {
    background: linear-gradient(to right, #fae198, #de78c6);
    -webkit-background-clip: text;
    color: transparent;
  }
}
#root {
  height: 100%;
  background-color: #000;
  background: url('./assets/300.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .mask {
    -webkit-filter: blur(5px);
    filter: blur(5px);
  }

  .con {
    right: 20px;
    position: absolute;
    top: 17px;
    padding: 0;
    z-index: 10;
  }

  .audio {
    position: absolute;
    top: 100px;
    right: 30px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #fff;
    border-radius: 50%;
    padding: 0;
    text-align: center;
    .iconfont {
      position: relative;
      left: 1px;
    }
  }
  .copy-right {
    position: absolute;
    right: 0;
    bottom: 0;
    color: #ccc;
    font-size: 12px;
  }
  .bounce-enter-active {
    animation: bounce-in 1.5s;
  }
  .bounce-leave-active {
    animation: bounce-in 0s reverse;
  }
}
#main {
  height: 100%;
}

#resbox {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  text-align: center;
  min-width: 80%;
  max-height: 75%;
  overflow: auto;
  p {
    color: #409eff;
    font-size: 50px;
    line-height: 120px;
  }
  .container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .lol-show {
    margin: 20px;
    .img {
      background: #fff;
      padding: 10px;
      margin-bottom: 20px;
      border-radius: 8px;
    }
    img {
      width: 100px;
      height: 100px;
    }
    div {
      color: #fff;
      font-weight: 600;
    }
  }
  .itemres {
    background: #fff;
    width: 160px;
    height: 160px;
    border-radius: 4px;
    border: 1px solid #ccc;
    line-height: 160px;
    font-weight: bold;
    margin-right: 20px;
    margin-bottom: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .cont {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &.numberOver::before {
      content: attr(data-id);
      width: 30px;
      height: 22px;
      line-height: 22px;
      background-color: #fff;
      position: absolute;
      bottom: 0;
      left: 0;
      font-size: 14px;
      // border-radius: 50%;
      z-index: 1;
    }
  }
}
</style>
