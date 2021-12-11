<template>
  <ul class="gig-list-user gig-list">
    <li v-for="(gig, index) in gigs" :key="index">
      <gig-preview :gig="gig" />
      <div class="gig-tools">
        <i class="far fa-trash-alt btn" @click="removeGig(gig._id)"></i>
        <i class="far fa-edit btn" @click="editGig(gig._id)"></i>
      </div>
    </li>
  </ul>
</template>

<script>
import GigPreview from "../components/gig-preview.vue";

export default {
  computed: {
    gigs() {
      return this.$store.getters.gigsToShow;
    },
  },
  methods: {
    removeGig(gigId) {
      this.$store.dispatch({ type: "removeGig", gigId });
    },

    editGig(gigId) {
      this.$router.push(`/gig/edit/${gigId}`);
    },
  },

  components: {
    GigPreview,
  },
};
</script>

<style>
</style>