<template>
  <ul class="gig-list-user gig-list">
    <li
      v-for="(gig, idx) in gigs"
      :key="idx"
      @mouseover="isTools = true; gigIdx = idx"
      @mouseout="isTools = false; gigIdx = -1"
    >
      <gig-preview :gig="gig" />
      <div v-show="isTools && gigIdx === idx" class="gig-tools">
        <i class="far fa-trash-alt btn" @click="removeGig(gig._id)"></i>
        <i class="far fa-edit btn" @click="editGig(gig._id)"></i>
      </div>
    </li>
  </ul>
</template>

<script>
import GigPreview from "../components/gig-preview.vue";

export default {
  data() {
    return {
      isTools: false,
      gigIdx: -1,
    };
  },
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