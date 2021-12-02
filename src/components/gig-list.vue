<template>
  <div class="explore-container main-layout">
    <ul class="gig-list grid">
      <li v-for="gig in gigs" :key="gig._id">
        <gig-preview :gig="gig" />
      </li>
    </ul>
  </div>
</template>

<script>
import gigPreview from "./gig-preview.vue";
export default {
  name: "gig-list",
  props: ["gigs"],
  methods: {},
  components: {
    gigPreview,
  },
};
</script>