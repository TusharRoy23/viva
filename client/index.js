import Vue from 'vue';
import router from './router';
import Router from 'vue-router';

import 'materialize-css';
import 'materialize-css/dist/css/materialize.css';
import moment from 'moment';

import store from './store';
import Validator from 'vee-validate';

import Main from './pages/Main.vue';

import TextInput from '@components/TextInput.vue';
import Loader from '@components/Loader.vue';
import Button from '@components/Button.vue';
import noteMixin from '@client/mixins/note';

Vue.use(Validator);
Vue.use(store);
Vue.use(Router);

Vue.component('text-input', TextInput);
Vue.component('loader', Loader);
Vue.component('btn', Button);

Vue.mixin(noteMixin);

Vue.filter('dateFormat', (value) => moment(value).format('DD MMM YYYY hh:mm a'));

const app = new Vue({
    el: "#app",
    router,
    store,
    render: h => h(Main)
});
// new Vue({
//     components: { App },
//     router,
//     store,
//     template: '<App/>'
//   }).$mount('#app')