<template>
  <base-card>
    <li>
      <h3>{{ book.title }}</h3>
      <div id="left">
        <h4>{{ book.authors }}</h4>
        <img v-if="book.thumbnail" :src="book.thumbnail" alt="Book cover" width="200" />

        <div>
          <base-badge
            v-for="category in book.categories"
            :key="category"
            :title="category"
          ></base-badge>
        </div>
      </div>

      <div id="right">
        <h4>Description</h4>
        <p>{{ book.description }}</p>

        <h4>Average rating:</h4>
        <p>{{ book.averageRating }}</p>
      </div>
    </li>

    <div id="details-button">
      <base-button link :to="bookDetailsLink">View details</base-button>
    </div>
  </base-card>
</template>

<script>
export default {
  props: ['book'],
  computed: {
    bookDetailsLink() {
      return `${this.$route.path}/${this.book.id}`;
    },
  },
};
</script>

<style scoped>
li {
  overflow: auto;
  margin: 1rem 0;
  padding: 1rem;
}
h3 {
  font-size: 1.5rem;
}
h3,
h4 {
  margin: 0.5rem 0;
}

#left {
  float: left;
  width: 30%;
  overflow: hidden;
}

#right {
  overflow: hidden;
}

#details-button {
  display: flex;
  justify-content: flex-end;
}
</style>
