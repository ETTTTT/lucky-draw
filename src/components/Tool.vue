<template>
  <div id="tool">
    <el-button @click="startHandler" type="primary" size="mini">{{
      running ? '停止' : '开始'
    }}</el-button>
    <el-button size="mini" @click="drawer = true">
      历史记录
    </el-button>
    <el-drawer
      append-to-body
      title="历史记录"
      :visible.sync="drawer"
      :direction="direction"
    >
      <div class="demo-drawer__content">
        <div class="demo-drawer__main">
          <template v-if="historyList.length">
            <div class="box">
              <div
                v-for="(item, index) in historyList"
                :key="index"
                class="list"
              >
                <div class="time">随机时间：{{ item.time }}</div>
                <div class="list-box">
                  <div
                    v-for="(j, index) in item.list"
                    :key="index"
                    class="list-photo"
                  >
                    <img :src="j.photo" alt="" />
                    <div>{{ j.name }}</div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="no-list">
              暂无历史数据
            </div>
          </template>
        </div>
        <div class="demo-drawer__footer" v-if="historyList.length">
          <el-button @click="cancelForm" type="danger">清除历史记录</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  props: {
    running: Boolean
  },
  computed: {
    historyList: {
      get() {
        return this.$store.state.historyList;
      }
    },
    historyHeroId: {
      get() {
        return this.$store.state.historyHeroId;
      }
    },
    config: {
      get() {
        return this.$store.state.config;
      }
    }
  },
  data() {
    return {
      drawer: false,
      direction: 'rtl'
    };
  },

  methods: {
    startHandler() {
      if (this.historyHeroId.length >= this.config.number) {
        return this.$message.error(
          '所有的英雄都随机过了，请清除历史记录重新随机'
        );
      }
      this.$emit('toggle');
    },
    cancelForm() {
      this.$store.commit('clearHistory');
      this.$message.success('清除历史记录成功');
    }
  }
};
</script>
<style lang="scss">
.el-drawer__header {
  margin-bottom: 0 !important;
}
.box {
  overflow: auto;
}
.list-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.list {
  border: 1px solid #000;
  margin: 20px;
  .time {
    font-size: 16px;
    padding: 10px 10px 0 10px;
  }
  .time:hover {
    opacity: 0.8;
  }
  .list-photo {
    width: 100px;
    padding: 10px 0;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    img {
      width: 50px;
    }
  }
}
.no-list {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-drawer__body {
  height: calc(100% - 44px);
}
.demo-drawer__content {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.demo-drawer__main {
  flex: 1;
  overflow: auto;
}
.demo-drawer__footer {
  padding: 20px;
}
#tool {
  position: fixed;
  width: 60px;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .el-button {
    width: 80px;
  }
  .el-button + .el-button {
    margin-top: 20px;
    margin-left: 0px;
    width: 80px;
  }
}
.setwat-dialog {
  .colorred {
    color: red;
    font-weight: bold;
  }
}
.import-dialog {
  .footer {
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
}
.c-removeoptions {
  .el-dialog {
    height: 290px;
  }
  .el-radio.is-bordered + .el-radio.is-bordered {
    margin-left: 0px;
  }
  .el-radio.is-bordered {
    margin-bottom: 10px;
  }
}
</style>
