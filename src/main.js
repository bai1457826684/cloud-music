import Vue from 'vue';
import App from './App';
import * as global from './common/global.js';
import './style/mixin.scss';
// import nodeSass from 'node-sass'

Vue.config.productionTip = false;

Vue.prototype.$global = global;

App.mpType = 'app';

const app = new Vue({
	...App,
});
app.$mount();
