import Vue from 'vue';
import App from './App.vue';
import store from './store';
import Element from 'element-ui';
import '@/assets/style/index.scss';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/lib/tagcanvas.js';
Vue.config.productionTip = false;
import { heroList } from '@/http/index';
Vue.use(Element);

const beginFn = function() {
  return new Promise(async resolve => {
    const res = await heroList();
    store.commit('setInfo', res);
    resolve();
  });
};

beginFn().then(() => {
  new Vue({
    store,
    render: h => h(App)
  }).$mount('#app');
});
