<template>
  <ul class="gig-list-user">
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
  name: "seller-gigs",
  props: ["gigs"],

  components: {
    GigPreview,
  },
};
</script>

<style>
</style>