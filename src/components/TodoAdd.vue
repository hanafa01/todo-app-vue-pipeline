<template>
  <form @submit.prevent="addTodo()">
    <div>
      <input
        type="text"
        placeholder="Enter new Todo"
        autocomplete="off"
        ref="todoTitle"
      />
      <button>Add</button>
    </div>
    <transition
      enter-from-class="requiredenterfrom"
      enter-to-class="requiredenterto"
      enter-active-class="requiredenteractive"
      leave-from-class="requiredleavefrom"
      leave-to-class="requiredleaveto"
      leave-active-class="requiredleaveactive"
    >
      <p v-if="!isValid" class="text-danger">{{ errorMessage }}</p>
    </transition>
  </form>
</template>

<script>
export default {
  data() {
    return {
      id: 3,
      errorMessage: "",
      isValid: true,
    };
  },
  methods: {
    addTodo() {
      this.isValid = true;
      const enteredTodoTitle = this.$refs.todoTitle.value;
      if (enteredTodoTitle.trim() === "") {
        this.errorMessage = "Todo Title is required.";
        this.isValid = false;
        return;
      } else if (
        this.$store.getters.todos.filter(
          (todo) => todo.title.toLowerCase() === enteredTodoTitle.trim().toLowerCase()
        ).length > 0
      ) {
        this.errorMessage = "Todo Title exists.";
        this.isValid = false;
        return;
      }

      this.$store.dispatch("addTodo", {
        id: this.id,
        title: enteredTodoTitle,
        completed: false,
      });
      this.id++;
      this.$refs.todoTitle.value = "";
      this.$store.state.filter = "all";
    },
  },
};
</script>

<style scoped>
input {
  width: calc(100% - 80px);
  background-color: transparent;
  border: 2px solid hsla(0, 0%, 100%, 0.35);
  font: inherit;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  padding: 10px;
  outline: none;
  color: inherit;
}

button {
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  width: 80px;
  padding: 10px;
  background-color: #fff;
  border: 2px solid hsla(0, 0%, 100%, 0.35);
  padding: 10px;
  color: #000;
  transition: all 0.3s ease-in-out;
}

button:hover {
  background-color: #000;
  border: 2px solid #fff;
  padding: 10px;
  color: white;
}
</style>