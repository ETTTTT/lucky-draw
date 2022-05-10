<template>
  <el-dialog
    :visible="visible"
    :append-to-body="true"
    width="390px"
    @close="$emit('update:visible', false)"
    class="c-LotteryConfig"
  >
    <div class="c-LotteryConfigtitle" slot="title">
      <span :style="{ fontSize: '16px', marginRight: '20px' }">
        随机配置
      </span>
    </div>
    <div class="container">
      <el-form ref="form" :model="form">
        <el-form-item label="一次抽取几个英雄:">
          <el-input
            type="number"
            v-model="form.lolNumber"
            :min="0"
            :step="1"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" type="primary" @click="onSubmit"
        >保存配置</el-button
      >
      <el-button size="mini" @click="$emit('update:visible', false)"
        >取消</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
import { setData, configField } from '@/helper/index';
export default {
  name: 'LotteryConfig',
  props: {
    visible: Boolean
  },
  computed: {
    form: {
      get() {
        return this.$store.state.config;
      },
      set(val) {
        return val;
      }
    }
  },

  methods: {
    onSubmit() {
      if (this.form.lolNumber <= 0) {
        return this.$message.error(`随机英雄数量必须大于0，且为整数`);
      }
      setData(configField, this.form);
      this.$store.commit('setConfig', this.form);
      this.$emit('update:visible', false);
      this.$message({
        message: '保存成功',
        type: 'success'
      });
    }
  }
};
</script>
<style lang="scss">
.c-LotteryConfig {
  .el-dialog__body {
    // height: 340px;
    .container {
      height: 100%;
      overflow-y: auto;
      padding: 0 10px;
    }
  }
}
.el-input {
  width: auto !important;
}
.dialog-showAddLottery {
  .el-dialog {
    height: 186px;
  }
}
</style>
