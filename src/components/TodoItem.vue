<template>
  <li>
    <div class="todo-detail">
      <input type="checkbox" :checked="isCompleted" @change="updateTodo()" />
      <transition name="fade-button" mode="out-in">
        <input
          type="text"
          v-if="isEdit"
          v-model="title"
          class="input-edit"
          @keyup.enter="doneEditTodo(id)"
        />
        <span :class="{ completed: isCompleted }" v-else>{{ title }}</span>
      </transition>
    </div>
    <div class="todo-actions-2">
      <transition name="fade-button" mode="out-in">
        <button v-if="!isCompleted && !isEdit" @click="editTodo(id)">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button v-else-if="isEdit" @click="doneEditTodo(id)">
          <i class="fa-solid fa-circle-check"></i>
        </button>
      </transition>
      <button @click="confirmDeleteTodo()">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
    checkAll: {
      type: Boolean,
    },
  },
  data() {
    return {
      isEdit: false,
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
    };
  },
  computed: {
    isCompleted() {
      return this.completed == true;
    },
  },
  watch: {
    checkAll() {
      this.completed = this.checkAll ? true : this.todo.completed;
    },
  },
  methods: {
    // removeTodo(id) {
    //   this.$store.dispatch("removeTodo", id);
    //   this.showConfirmDelete = false;
    // },
    updateTodo() {
      this.$store.dispatch("updateTodo", {
        id: this.id,
        title: this.title,
        // completed: event.target.checked,
        completed: !this.completed,
      });
      this.isEdit = false;
    },
    editTodo() {
      this.isEdit = true;
    },
    doneEditTodo() {
      this.isEdit = false;
      this.$store.dispatch("updateTodo", {
        id: this.id,
        title: this.title,
        completed: this.completed,
      });
    },
    confirmDeleteTodo() {
      this.$emit("showConfirmDeleteDialog", this.id);
    },
  },
};
</script>

<style scoped>
span {
  margin-left: 10px;
}

li {
  margin: 15px auto;
  background-color: transparent;
  border: 2px solid hsla(0, 0%, 100%, 0.35);
  font: inherit;
  border-radius: 6px;
  padding: 10px;
  outline: none;
  color: inherit;
  display: flex;
  justify-content: space-between;
}

.completed {
  text-decoration: line-through;
  color: grey;
}

.fa-circle-check {
  color: green;
}

.todo-detail {
  width: calc(100% - 46px);
}

.input-edit {
  width: calc(100% - 80px);
  background-color: transparent;
  border: none;
  border-bottom: 2px solid white;
  font: inherit;
  padding: 0;
  outline: none;
  color: inherit;
  margin-left: 10px;
}

input[type="checkbox"] {
  border-radius: 50%;
}

[type="checkbox"]:checked::before {
  box-shadow: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E %3Cpath d='M15.88 8.29L10 14.17l-1.88-1.88a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7a.996.996 0 0 0 0-1.41c-.39-.39-1.03-.39-1.42 0z' fill='%23fff'/%3E %3C/svg%3E");
}

.todo-actions-2 button {
  padding: 0;
  margin: 0px 4px;
}
</style>
