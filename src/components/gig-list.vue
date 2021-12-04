<template>
  <div class="explore-container">
    <p class="services-counter">
      {{ gigs.length }} services available <template v-if="categoryName">in</template>
      <span v-if="categoryName"> {{ categoryName }}</span>
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
      if(category==='illustration') return 'Illustration'
      if(category==='logoDesign') return 'Logo Design'
      if(category==='voiceOver') return 'Voice Over'
      if(category==='videoExplainer') return 'Video Explainer'
      if(category==='socialMediaMarketing') return 'Social Media Marketing'
      else return
    },
  },
  components: {
    gigPreview,
  },
};
</script>