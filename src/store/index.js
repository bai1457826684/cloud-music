import Vue from 'vue';
import Vuex from 'vuex';
import song from './modules/song.js';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		song,
	},
});

export default store;
