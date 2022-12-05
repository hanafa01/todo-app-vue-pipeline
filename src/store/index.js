import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            filter: "all",
            todos: [
                { id: 2, title: 'Todo 2', completed: true },
                { id: 1, title: 'Todo 1', completed: false },
            ],
        };
    },
    mutations: {
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
        updateFilter(state, type) {
            state.filter = type;
        },
        checkAll(state, checked) {
            state.todos.forEach(function (todo) {
                todo.completed = checked;
            });
        },
    },
    actions: {
        addTodo(context, data) {
            context.commit('addTodo', data)
        },
        removeTodo(context, id) {
            context.commit('removeTodo', id)
        },
        updateTodo(context, data) {
            context.commit('updateTodo', data)
        },
        clearCompletedTodo(context) {
            context.commit('clearCompletedTodo')
        },
        updateFilter(context, type) {
            context.commit('updateFilter', type)
        },
        checkAll(context, checked) {
            context.commit('checkAll', checked)
        },
    },
    getters: {
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
});

export default store;