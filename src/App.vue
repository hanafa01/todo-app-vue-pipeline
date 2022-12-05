<template>
  <base-dialog :open="showConfirmDelete" @close="showConfirmDelete = false">
    <p>Are you sure you want to delete it ?</p>
    <div class="confirm-delete-actions">
      <button class="close" @click="showConfirmDelete = false">No</button>
      <button class="confirm" @click="removeTodo()">Yes</button>
    </div>
  </base-dialog>

  <h1 class="app-title">Todo App</h1>
  <div class="todo-info">
    <span class="total">Total: {{ nb_total }}</span>
    <span class="completed">Completed: {{ nb_completed }}</span>
    <span class="pending">Pending: {{ nb_pending }}</span>
  </div>

  <base-card>
    <TodoAdd />
  </base-card>

  <base-card>
    <div class="todo-actions">
      <TodoFilter />
      <transition name="fade-button">
        <button
          v-if="checkTodosExists && nb_completed > 0"
          @click="clearCompletedTodo()"
          class="todo-clearcompleted"
        >
          Clear Completed
        </button>
      </transition>
    </div>
    <transition-group name="fade-button">
      <transition-group tag="ul" name="fade-button" v-if="checkTodosExists">
        <TodoItem
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          :checkAll="checkIfAllCompleted"
          @showConfirmDeleteDialog="confirmDeleteTodo"
        />
      </transition-group>
      <div v-else class="no-todo">No Todo Available.</div>
    </transition-group>
  </base-card>
  <transition name="fade-button">
    <div v-if="checkTodosExists">
      <input
        type="checkbox"
        :checked="checkIfAllCompleted"
        @click="checkAll()"
      />
      Check All
    </div>
  </transition>
</template>

<script>
import TodoAdd from "./components/TodoAdd.vue";
import TodoItem from "./components/TodoItem.vue";
import TodoFilter from "./components/TodoFilter.vue";

export default {
  components: {
    TodoAdd,
    TodoItem,
    TodoFilter,
  },
  data() {
    return {
      showConfirmDelete: false,
      deleteid: null,
    };
  },
  computed: {
    todos() {
      return this.$store.getters.todosFiltered;
    },
    checkTodosExists() {
      return this.todos && this.todos.length > 0;
    },
    nb_total() {
      return this.$store.getters.nb_total;
    },
    nb_pending() {
      return this.$store.getters.nb_pending;
    },
    nb_completed() {
      return this.$store.getters.nb_completed;
    },
    checkIfAllCompleted() {
      return this.nb_pending === 0;
    },
  },
  methods: {
    clearCompletedTodo() {
      this.$store.dispatch("clearCompletedTodo");
    },
    checkAll() {
      this.$store.dispatch("checkAll", event.target.checked);
    },
    confirmDeleteTodo(id) {
      this.deleteid = id;
      this.showConfirmDelete = true;
    },
    removeTodo() {
      if (this.deleteid != null) {
        this.$store.dispatch("removeTodo", this.deleteid);
      }
      this.showConfirmDelete = false;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nobile:wght@500&display=swap");

* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  font-family: "Nobile", sans-serif;
  cursor: default;
}

body {
  margin: 0;
  padding: 0;
  background-color: black;
  color: #fff;
}

#app {
  margin: auto;
  max-width: 600px;
  padding: 15px;
}

.text-danger {
  color: red;
  margin-bottom: 0;
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

button {
  cursor: pointer;
  font: inherit;
  outline: none;
  background-color: transparent;
  border: none;
}

.app-title {
  text-align: center;
}

.todo-info,
.todo-actions {
  display: flex;
  justify-content: space-between;
}

.todo-actions {
  margin-bottom: 10px;
}

.todo-info span {
  cursor: not-allowed;
  border-radius: 20px;
  padding: 10px;
}

.todo-info .total {
  background-color: blue;
}

.todo-info .completed {
  background-color: green;
}

.todo-info .pending {
  background-color: red;
}

.todo-clearcompleted {
  border-radius: 6px;
  width: 160px;
  background-color: red;
  border: 2px solid red;
  color: #fff;
  padding: 10px;
  transition: all 0.3s ease-in-out;
}

.todo-clearcompleted:hover {
  border: 2px solid red;
  color: red;
  background-color: #fff;
}

svg {
  color: #fff;
}

.no-todo {
  text-align: center;
  margin-top: 15px;
}

.confirm-delete-actions {
  display: flex;
  justify-content: right;
  margin: 10px 0;
}

.confirm-delete-actions button {
  border-radius: 6px;
  padding: 10px;
}

.confirm-delete-actions .close {
  background-color: black;
  border: 2px solid black;
  color: #fff;
}

.confirm-delete-actions .confirm {
  background-color: green;
  border: 2px solid green;
  color: #fff;
  margin-left: 10px;
}

input[type="checkbox"] {
  width: 15px;
  height: 15px;
  vertical-align: middle;
  -webkit-appearance: none;
  background: none;
  border: 0;
  outline: 0;
  flex-grow: 0;
  transition: background 300ms;
  cursor: pointer;
  background-color: transparent;
  border: 3px solid white;
}

input[type="checkbox"]::before {
  content: "";
  color: transparent;
  display: block;
  width: inherit;
  height: inherit;
  border-radius: inherit;
  border: 0;
  background-color: transparent;
  background-size: contain;
}

input[type="checkbox"]:checked {
  background-color: white;
}

/* animations */
.requiredenterfrom,
.requiredleaveto {
  opacity: 0;
}

.requiredenteractive {
  transition: all 0.3s ease-out;
}

.requiredenterto,
.requiredleavefrom {
  opacity: 1;
}
.requiredleaveactive {
  transition: all 0.3s ease-in;
}

.fade-button-enter-from,
.fade-button-leave-to {
  opacity: 0;
}

.fade-button-enter-to,
.fade-button-leave-from {
  opacity: 1;
}

.fade-button-enter-active {
  transition: opacity 0.3s ease-out;
}

.fade-button-leave-active {
  transition: opacity 0.3s ease-in;
}
/* end animations */
</style>
