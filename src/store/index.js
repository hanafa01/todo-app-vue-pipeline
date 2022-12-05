import { createStore } from 'vuex'
import TodosModule from './modules/todos/index'

import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

const store = createStore({
    modules: {
        todos: TodosModule
    },
    state() {
        return {
            token: localStorage.getItem('access_token') || null,
        };
    },
    mutations: {
        retrieveToken(state, token) {
            state.token = token
        },
        destroyToken(state) {
            state.token = null;
        },
        clearTodos(state) {
            state.todos = [];
        }
    },
    actions: {
        retrieveName(context) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

                axios.get('/user')
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => {
                        console.log(error.response)
                        reject(error)
                    })
            });
        },
        retrieveToken(context, credentials) {
            return new Promise((resolve, reject) => {
                axios.post('/login', {
                    username: credentials.username,
                    password: credentials.password,
                })
                    .then(response => {
                        console.log(response)
                        const token = response.data.access_token;
                        localStorage.setItem('access_token', token)
                        context.commit('retrieveToken', token)
                        resolve(response)
                    })
                    .catch(error => {
                        console.log(error.response)
                        reject(error)
                    })
            });
        },
        register(context, data) {
            return new Promise((resolve, reject) => {
                axios.post('/register', {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                })
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => {
                        console.log(error.response)
                        reject(error)
                    })
            });
        },
        destroyToken(context) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                if (context.getters.loggedIn) {
                    axios.post('/logout')
                        .then(response => {
                            localStorage.removeItem('access_token')
                            context.commit('destroyToken')
                            resolve(response)
                        })
                        .catch(error => {
                            localStorage.removeItem('access_token')
                            context.commit('destroyToken')
                            console.log(error)
                            reject(error)
                        })
                }
            });
        },
        clearTodos(context) {
            context.commit('clearTodos');
        }
    },
    getters: {
        loggedIn(state) {
            return state.token !== null;
        },
    }
})

export default store;