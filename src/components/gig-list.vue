<template>
  <ul class="gig-list">
    <li v-for="gig in gigs" :key="gig._id" class="gig-list-container">
      <toy-preview :gig="gig" />
    </li>
  </ul>
</template>

<script>
import toyPreview from "./toy-preview.vue";
export default {
  name: "toy-list",
  props: ["toys"],
  methods: {
    logId(toyId) {
      console.log("Id is", toyId);
    },
  },
  components: {
    toyPreview,
  },
};
</script>