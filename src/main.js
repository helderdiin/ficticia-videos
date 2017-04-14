// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import moment from 'moment';

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import router from './router';

Vue.config.productionTip = false;

moment.locale('pt');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
