import Vue from 'vue';
import Index from './index.vue';
new Vue({
	el: '#app',
	render: function (h) {
		return h('Index');
	},
	components: {
		Index: Index
	}
});