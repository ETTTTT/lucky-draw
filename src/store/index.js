import Vue from 'vue';
import Vuex from 'vuex';
import {
  getData,
  setData,
  removeData,
  resultField,
  newLotteryField,
  listField
} from '@/helper/index';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    historyHeroId: [],
    historyList: [],
    lolList: [],
    baseNum: 0,
    config: {
      number: 0,
      lolNumber: 2
    },
    result: {
      firstPrize: []
    },
    newLottery: [],
    list: [],
    photos: []
  },
  mutations: {
    setClearConfig(state) {
      state.config = {
        number: state.baseNum,
        lolNumber: 1
      };
      state.newLottery = [];
    },
    setClearList(state) {
      state.list = [];
    },
    setClearPhotos(state) {
      state.photos = [];
    },
    setClearResult(state) {
      state.result = {
        firstPrize: []
      };
    },
    setClearStore(state) {
      state.config = {
        number: state.baseNum,
        lolNumber: 1
      };
      state.result = {
        firstPrize: []
      };
      state.newLottery = [];
      state.list = [];
      state.photos = [];
    },
    setConfig(state, config) {
      state.config = config;
    },
    setResult(state, result = {}) {
      state.result = result;

      setData(resultField, state.result);
    },
    setNewLottery(state, newLottery) {
      if (state.newLottery.find(item => item.name === newLottery.name)) {
        return;
      }
      state.newLottery.push(newLottery);
      setData(newLotteryField, state.newLottery);
    },
    setList(state, list) {
      const arr = state.list;
      list.forEach(item => {
        const arrIndex = arr.findIndex(data => data.key === item.key);
        if (arrIndex > -1) {
          arr[arrIndex].name = item.name;
        } else {
          arr.push(item);
        }
      });
      state.list = arr;

      setData(listField, arr);
    },
    setPhotos(state, photos) {
      state.photos = photos;
    },
    setInfo(state, data) {
      state.baseNum = data.length;
      state.config.number = data.length;
      state.config.lolNumber =
        (getData('config') && getData('config').lolNumber) || 1;
      state.lolList = data.map(item => {
        return {
          key: item.heroId,
          name: item.name,
          photo: `https://game.gtimg.cn/images/lol/act/img/champion/${item.alias}.png`
        };
      });
    },
    setHistoryHeroId(state, data) {
      const arr = state.historyHeroId.concat(data);
      state.historyHeroId = Array.from(new Set(arr));
      setData('historyHeroId', state.historyHeroId);
    },

    setHistoryList(state, data) {
      state.historyList = data;
      setData('historyList', data);
    },

    getHistory(state) {
      state.historyList = getData('historyList') || [];
    },

    getHistoryHeroId(state) {
      state.historyHeroId = getData('historyHeroId') || [];
    },

    clearHistory(state) {
      state.historyHeroId = [];
      state.historyList = [];
      removeData('historyHeroId');
      removeData('historyList');
    }
  },
  actions: {},
  modules: {}
});
