import { createRouter, createWebHistory } from 'vue-router'
import { createToaster } from "@meforma/vue-toaster";

import TodoApp from './TodoApp'
import UserLogin from './UserLogin'
import UserRegister from './UserRegister'
import store from './store/index'


const toaster = createToaster({ /* options */ });

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/todo' },
        { path: '/todo', name: 'todo', component: TodoApp, meta: { requiresAuth: true }  },
        { path: '/login', name: 'login', component: UserLogin, meta: { requiresUnAuth: true }, props: true },
        { path: '/register', name: 'register', component: UserRegister, meta: { requiresUnAuth: true } },
        { path: '/:notFound(.*)', redirect: '/' },
    ],
});

router.beforeEach(function (to, _, next) {
    if(to.meta.requiresAuth && !store.getters.loggedIn){
        toaster.error('Please login first.');
        next('/login')
    }else if(to.meta.requiresUnAuth && store.getters.loggedIn){
        toaster.error('You are already authenticated.');
        next({name: 'todo'})
    }else{
        next();
    }
})


export default router;