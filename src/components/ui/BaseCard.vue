<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.card {
  border-radius: 12px;
  border: 3px solid white;
  padding: 20px;
  margin: 15px auto;
}
</style>