<template>
  <base-card>
    <base-button link to="/authentication" v-if="!isLoggedIn" id="log-in-wish">
      Log in to save
    </base-button>

    <div v-if="isLoggedIn">
      <button v-if="!isInWishlist" id="heart-img-btn" @click="addToWishList">
        <img id="heart-img" src="../../../assets/heart-svgrepo-com.svg" alt="heart img" />
      </button>

      <button v-else id="heart-img-btn" @click="removeFromWishList">
        <img id="heart-img-bold" src="../../../assets/heart-svgrepo-com-bold.svg" alt="heart img" />
      </button>
    </div>

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
  props: ['book', 'onWishlist'],
  computed: {
    isInWishlist() {
      return !!this.$store.getters['wishList/getWishBookById'](this.book);
    },
    bookDetailsLink() {
      return `${this.$route.path}/${this.book.id}`;
    },
    isLoggedIn() {
      return this.$store.getters['authentication/isLoggedIn'];
    },
  },
  methods: {
    addToWishList() {
      this.$store.dispatch('wishList/addToWishList', this.book);
    },
    async removeFromWishList() {
      await this.$store.dispatch('wishList/removeFromWishList', this.book);
      if (this.$parent.loadWishList) {
        this.$parent.loadWishList();
      }
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
  padding-left: 3rem;
}

#log-in-wish {
  margin-top: 1rem;
  overflow: hidden;
  float: right;
}
#details-button {
  display: flex;
  justify-content: flex-end;
}

#heart-img-btn {
  width: 50px;
  overflow: hidden;
  float: right;
  margin: 1rem;
  background-color: white;
  border: none;
}

#heart-img-bold {
  width: 40px;
}
</style>
