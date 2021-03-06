// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// import {setDPR, remChange} from './common/js/remChange.js';

// setDPR();
// remChange();

Vue.config.productionTip = false;

router.push('/goods');
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
