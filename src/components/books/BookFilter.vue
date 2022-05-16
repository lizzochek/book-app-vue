<template>
  <base-card>
    <div id="wrapper">
      <h2 id="left">Filter books</h2>

      <select class="minimal" name="filters" id="filters" @change="filterSelected">
        <option value="alphabet-asc">A - z</option>
        <option value="alphabet-desc">Z - a</option>
        <option value="publicationDate">Most recent</option>
        <option value="rating">Top rated</option>
      </select>
    </div>
  </base-card>
</template>

<script>
export default {
  emits: ['change-filter'],
  methods: {
    filterSelected(event) {
      const id = event.target.value;
      this.$emit('change-filter', id);
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

#wrapper {
  text-align: center;
  overflow: auto;
  margin: 1rem 0;
  padding: 1rem;
}

#left {
  float: left;
  width: 30%;
  overflow: hidden;
  font-size: 1.5rem;
}

select {
  float: right;
  background-color: white;
  border: thin solid black;
  border-radius: 4px;
  display: inline-block;
  font: inherit;
  text-align: center;
  line-height: 1.5em;
  padding: 0.5em 3.5em 0.5em 1em;

  margin: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
}

/* eslint-disable */
select.minimal {
  background-image: linear-gradient(45deg, transparent 50%, gray 50%),
                    linear-gradient(135deg, gray 50%, transparent 50%),
                    linear-gradient(to right, #ccc, #ccc));
  background-position: (calc(100% - 20px) calc(1em + 2px),
  calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em);
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
}
</style>
