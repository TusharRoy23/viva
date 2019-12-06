import Router from 'vue-router';
import Login from '@pages/common/Login.vue';
import Dashboard from '@pages/common/Dashboard.vue';

export default new Router({
    mode: 'history',
    routes:[
        {
            path: '/',
            component: Login
        },
        {
            path: '/Dashboard',
            component: Dashboard
        }
    ]
});