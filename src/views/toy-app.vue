<template>
  <section class="toy-app">
    <toy-filter @filtered="setFilter" @sorted="setSort"></toy-filter>
    <p v-if="isLoading">Loading...</p>
    <toy-list v-else-if="toys" :toys="toys" @remove="removeToy" />
    <router-link class="router-link-btn" to="/toy/edit">Add toy</router-link>
    <button @click="prePage">prev</button>
    <button @click="nextPage">next</button>
  </section>
</template>

<script>
// import { toyService } from "../services/toy.service.js";
import toyFilter from "../components/toy-filter.vue";
import toyList from "../components/toy-list.vue";

export default {
  name: "toy-app",
  data() {
    return {
      
    };
  },
  computed: {
    toys() {
      return this.$store.getters.toysToShow;
    },
    user() {
      return this.$store.getters.user;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  created() {
    this.$store.dispatch({ type: "loadToys" });
  },
  methods: {
    setFilter(filterBy) {
      console.log('filterBy :>> ', filterBy);
      const copyFilter = JSON.parse(JSON.stringify(filterBy));
      console.log('copy :>> ', copyFilter);
      this.$store.dispatch({ type: "setFilter", filterBy:copyFilter });
    },
    setSort(sortBy) {
      const copySort = JSON.parse(JSON.stringify(sortBy));
      this.$store.commit({ type: "setSort", copySort });
    },

    removeToy(toyId) {
      console.log("Removing...", toyId);
      this.$store
        .dispatch({ type: "removeToy", toyId })
        .then(() => {
          // showMsg(`toy removed`)
          console.log("toy removed");
        })
        .catch(() => {
          // showMsg(`Failed to remove toy`, 'danger')
        });
    },
    nextPage() {
      let pageIdx = ++this.pageIdx;
      this.$store.commit({ type: "setPageIdx", pageIdx });
    },
    prePage() {
      let pageIdx = --this.pageIdx;
      this.$store.commit({ type: "setPageIdx", pageIdx });
    },
  },
  components: {
    toyFilter,
    toyList,
  },
};
</script>