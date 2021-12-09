<template>
  <div class="explore-container">
    <p class="services-counter">
      <span v-if="categoryName"> {{ categoryName }}</span>
      {{ gigs.length }} services available
    </p>
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
  computed: {
    categoryName() {
      let category=this.$store.getters.categoryName;
      if(category==='Illustration') return 'Illustration'
      if(category==='Logo Design') return 'Logo Design'
      if(category==='Voice Over') return 'Voice Over'
      if(category==='Video Explainer') return 'Video Explainer'
      if(category==='Social Media Marketing') return 'Social Media Marketing'
      else return
    },
  },
  components: {
    gigPreview,
  },
};
</script>