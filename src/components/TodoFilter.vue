<template>
  <div>
    <button @click="changeFilter('all')" :class="{ active: filter === 'all' }">
      All
    </button>
    <button
      @click="changeFilter('completed')"
      :class="{ active: filter === 'completed' }"
    >
      Completed
    </button>
    <button
      @click="changeFilter('pending')"
      :class="{ active: filter === 'pending' }"
    >
      Pending
    </button>
  </div>
</template>

<script>
export default {
  computed: {
    filter() {
      return this.$store.getters.filter;
    },
  },
  methods: {
    changeFilter(type) {
      this.$store.dispatch("updateFilter", type);
    },
  },
};
</script>

<style scoped>
div{
  padding-bottom: 10px;
}

button:hover:after,
button.active:after {
  width: 100%;
}

button {
  color: white;
  padding-bottom: 2px;
}

button:after {
  content: "";
  width: 0px;
  height: 2px;
  display: block;
  background: white;
  transition: 0.3s;
}
</style>