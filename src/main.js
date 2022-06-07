import Vue from 'vue';
import App from './App';
import * as global from './common/global.js';
import vConsole from './common/vConsole.js';
import store from './store/index.js';
import './style/mixin.scss';
// import nodeSass from 'node-sass'
import './style/iconfont.css';

vConsole.use();

Vue.config.productionTip = false;

Vue.prototype.$global = global;
Vue.prototype.$store = store;

App.mpType = 'app';

const app = new Vue({
	...App,
});
app.$mount();
