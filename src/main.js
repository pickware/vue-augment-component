// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import AugmentComponentPlugin from './plugins/AugmentComponentPlugin';
import viisonAppExtension from './extensions/ViisonAppExtension';

Vue.use(AugmentComponentPlugin);
viisonAppExtension();

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
