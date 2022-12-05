import axios from 'axios';

axios.defaults.baseURL = 'http://localhost/yallahope_projects/todo-app-laravel/public/api';

export default {
    state() {
        return {
            filter: "all",
            todos: [
                // { id: 2, title: 'Todo 2', completed: true },
                // { id: 1, title: 'Todo 1', completed: false },
            ],
            isLoading: false,
        };
    },
    mutations: {
        retrieveTodos(state, todos) {
            state.todos = todos;
        },
        addTodo(state, data) {
            state.todos.unshift(data)
        },
        removeTodo(state, id) {
            const selectedTodoIndex = state.todos.findIndex(todo => todo.id === id)
            state.todos.splice(selectedTodoIndex, 1);
        },
        updateTodo(state, todo) {
            console.log(todo)
            const index = state.todos.findIndex(item => item.id === todo.id)
            state.todos.splice(index, 1, {
                id: todo.id,
                title: todo.title,
                completed: todo.completed,
            })
        },
        clearCompletedTodo(state) {
            state.todos = state.todos.filter(todo => todo.completed === false)
            state.filter = 'all';
        },
        checkAll(state, checked) {
            state.todos.forEach(function (todo) {
                todo.completed = checked;
            });
        },
        updateFilter(state, type) {
            state.filter = type;
        },
    },
    actions: {
        retrieveTodos(context) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.rootState.token

            context.state.isLoading = true;
            axios.get('/todos')
                .then(response => {
                    context.state.isLoading = false;
                    context.commit('retrieveTodos', response.data)
                })
                .catch(error => {
                    context.state.isLoading = false;
                    console.log(error)
                })
        },
        addTodo(context, data) {
            context.state.isLoading = true;
            axios.post('/todos/store', {
                title: data.title,
                completed: false,
            })
                .then(response => {
                    context.state.isLoading = false;
                    context.commit('addTodo', response.data)
                })
                .catch(error => {
                    context.state.isLoading = false;
                    console.log(error)
                })
        },
        removeTodo(context, id) {
            context.state.isLoading = true;
            axios.delete('/todos/' + id)
                .then(response => {
                    context.state.isLoading = false;
                    console.log(response.data.id)
                    context.commit('removeTodo', response.data.id)
                })
                .catch(error => {
                    context.state.isLoading = false;
                    console.log(error)
                })
        },
        updateTodo(context, data) {
            context.state.isLoading = true;
            axios.patch('/todos/' + data.id, {
                title: data.title,
                completed: data.completed,
            })
                .then(response => {
                    context.state.isLoading = false;
                    context.commit('updateTodo', response.data)
                })
                .catch(error => {
                    context.state.isLoading = false;
                    console.log(error)
                })
        },
        clearCompletedTodo(context) {
            const completed = context.state.todos
                .filter(todo => todo.completed)
                .map(todo => todo.id)

            axios.delete('/todos/clearCompleted', {
                data: {
                    todos: completed
                }
            })
                .then(response => {
                    console.log(response)
                    context.commit('clearCompletedTodo')
                })
                .catch(error => {
                    console.log(error)
                })


            // let ids_completed = [];
            // context.state.todos.filter(function (todo) {
            //     if (todo.completed) {
            //         ids_completed.push(todo.id);
            //     }
            // });
            // context.state.isLoading = true;
            // axios.delete('/todos/clearCompleted', {
            //     data: {
            //         ids: ids_completed
            //     }
            // })
            //     .then(response => {
            //         context.state.isLoading = false;
            //         console.log(response)
            //         context.commit('clearCompletedTodo')
            //     })
            //     .catch(error => {
            //         context.state.isLoading = false;
            //         console.log(error)
            //     })

        },
        checkAll(context, checked) {
            context.state.isLoading = true;
            axios.patch('/todos/checkAll', {
                completed: checked
            })
                .then(response => {
                    context.state.isLoading = false;
                    console.log(response)
                    context.commit('checkAll', checked)
                })
                .catch(error => {
                    context.state.isLoading = false;
                    console.log(error)
                })
        },
        updateFilter(context, type) {
            context.commit('updateFilter', type)
        },
    },
    getters: {
        isLoading(state) {
            return state.isLoading;
        },
        todos(state) {
            return state.todos;
        },
        todosFiltered(state, getters) {
            if (state.filter === 'completed') {
                return getters.todos.filter(todo => todo.completed);
            }

            if (state.filter === 'pending') {
                return getters.todos.filter(todo => !todo.completed);
            }

            return getters.todos;
        },
        filter(state) {
            return state.filter;
        },
        nb_total(_, getters) {
            return getters.todos.length
        },
        nb_pending(_, getters) {
            return getters.todos.filter(todo => !todo.completed).length
        },
        nb_completed(_, getters) {
            return getters.todos.filter(todo => todo.completed).length
        },
    }
}