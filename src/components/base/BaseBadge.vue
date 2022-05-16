<template>
  <span class="badge">{{ title }}</span>
</template>

<script>
export default {
  props: ['title'],
};
</script>

<style scoped>
.badge {
  background-color: #3d008d;
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
  color: antiquewhite;
}
</style>
