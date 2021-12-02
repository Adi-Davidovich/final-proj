<template>
  <section class="gig-explore">
    <gig-filter></gig-filter>
    <gig-list v-if="gigs" :gigs="gigs" />
  </section>
</template>

<script>
import gigList from "../components/gig-list.vue";
import gigFilter from "../components/gig-filter.vue";

export default {
  name: "gig-explore",
  data() {
    return {};
  },
  computed: {
    gigs() {
      return this.$store.getters.gigsToShow;
    },
    user() {
      return this.$store.getters.user;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  created() {
    this.$store.dispatch({ type: "loadGigs" });
  },
  methods: {
    setFilter(filterBy) {
      console.log("filterBy :>> ", filterBy);
      const copyFilter = JSON.parse(JSON.stringify(filterBy));
      console.log("copy :>> ", copyFilter);
      this.$store.dispatch({ type: "setFilter", filterBy: copyFilter });
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
    gigFilter,
    gigList,
  },
};
</script>