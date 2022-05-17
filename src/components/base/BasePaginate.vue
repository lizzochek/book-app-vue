<template>
  <nav aria-label="pagination">
    <ul class="pagination">
      <li>
        <base-button @click="$emit('pageChanged', 1)">First page</base-button>
      </li>
      <li v-for="num in numOfPages" :key="num">
        <base-button @click="$emit('pageChanged', num)">{{ num }}</base-button>
      </li>
      <li>
        <base-button @click="$emit('pageChanged', numOfPages)">Last page</base-button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['numOfPages'],
  emits: ['pageChanged'],
};
</script>

<style lang="css">
nav {
  display: flex;
  justify-content: center;
  border-top: 1px solid #eee;
  margin-top: 1em;
  padding-top: 0.5em;
}

.pagination {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.pagination li {
  margin: 0 1px;
}

.pagination a[aria-current='page'] {
  background-color: #333;
  color: #fff;
}

.selected {
  background-color: #3d008d;
  color: antiquewhite;
}
</style>
