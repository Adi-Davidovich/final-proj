<template>
  <section class="gig-explore main-layout">
    <div class="explore-hero main-layout">
      <div class="title">

      <h1>A whole world of <span>freelance</span><br> talent at your fingertips</h1>
      </div>
    </div>
    <gig-filter @setFilter="setFilter"></gig-filter>
    <gig-list v-if="gigs" :gigs="gigs" />
  </section>
</template>

<script>
import gigList from "../components/gig-list.vue";
import gigFilter from "../components/gig-filter.vue";

export default {
  name: "gig-explore",
  data() {
    return {

    };
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
    async setFilter(filterBy) {
      const copyFilter = JSON.parse(JSON.stringify(filterBy));
      await this.$store.dispatch({ type: "setFilter", filterBy: copyFilter });
      this.$store.dispatch({ type: "loadGigs" });
    },
    setSort(sortBy) {
      const copySort = JSON.parse(JSON.stringify(sortBy));
      this.$store.commit({ type: "setSort", copySort });
    },

    removegig(gigId) {
      this.$store
        .dispatch({ type: "removegig", gigId })
        .then(() => {
          // showMsg(`gig removed`)
        })
        .catch(() => {
          // showMsg(`Failed to remove gig`, 'danger')
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