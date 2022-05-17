<template>
  <base-card id="wrapper">
    <div id="left">
      <h3 id="find-books">Find books</h3>
      <form @submit.prevent @keyup.enter="submitFrom">
        <label for="author">
          <input
            type="text"
            id="author"
            placeholder="Type to search"
            v-model="input"
            @blur="clearValidity"
          />
        </label>
      </form>
    </div>

    <h3>Filter results</h3>
    <select name="filters" id="filters" @change="filterSelected">
      <option value="alphabet-asc">A - z</option>
      <option value="alphabet-desc">Z - a</option>
      <option value="publicationDate">Most recent</option>
      <option value="rating">Top rated</option>
    </select>
  </base-card>
</template>

<script>
export default {
  emits: ['change-filter', 'search-books'],
  data() {
    return {
      input: '',
      isValid: true,
    };
  },
  methods: {
    filterSelected(event) {
      const id = event.target.value;
      this.$emit('change-filter', id);
    },
    validateForm() {
      if (this.input === '') this.isValid = false;
    },
    clearValidity() {
      this.isValid = true;
    },
    submitFrom() {
      this.validateForm();
      if (!this.isValid) return;

      this.$emit('search-books', this.input);
      this.input = '';
    },
  },
};
</script>

<style scoped>
#find-books {
  font-size: 1.2rem;
  margin-right: 3rem;
}

#wrapper {
  text-align: center;
  overflow: auto;
}

#left {
  float: left;
  width: 30%;
  overflow: hidden;
  margin-left: 6rem;
  font-size: 1.5rem;
}

select {
  background-color: white;
  border: thin solid black;
  border-radius: 4px;
  display: inline-block;
  font: inherit;
  text-align: center;
  line-height: 1.5em;
  padding: 0.5em 2.5em 0.5em 2.5rem;
  text-align-last: center;

  margin: 0;

  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input {
  display: block;
  width: 60%;
  font: inherit;
  font-weight: normal;
  font-size: 1.1rem;
  background-color: white;
  border: thin solid black;

  border-radius: 4px;
  text-align: center;
  line-height: 1.5rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
}

input::-webkit-input-placeholder {
  font-size: 20px;
}

input:focus,
select:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #a37bd8;
}
</style>
