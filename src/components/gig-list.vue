<template>
  <ul class="gig-list">
    <li v-for="gig in gigs" :key="gig._id" class="gig-list-container">
      <gig-preview :gig="gig" />
    </li>
  </ul>
</template>

<script>
import gigPreview from "./gig-preview.vue";
export default {
  name: "gig-list",
  props: ["gigs"],
  methods: {
  },
  components: {
    gigPreview,
  },
};
</script>