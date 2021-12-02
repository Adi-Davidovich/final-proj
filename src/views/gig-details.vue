<template>
  <section v-if="gig" class="gig-details app-main">
    <h6>Details:</h6>
    <p><span>Pruduct:</span>{{ gig.title }}</p>
    <p><span>Price:</span>{{ gig.price }}</p>
    <p><span>Description:</span>{{ gig.description }}</p>
    <p>Tags:</p>
    <span>{{ gig.tags }}</span>
    <!-- <img :src="require(`@/img/${gig.name}.jpg`)" alt="" /> -->
    <br />
    <!-- <h6>Reviews:</h6>
    <ul v-if="reviews">
      <li v-for="(review, idx) in reviews" :key="idx">{{ review.txt }}</li>
    </ul> -->

    <!-- <form v-if="loggedInUser" @submit.prevent="addReview()">
      <h2>Add review!</h2>
      <textarea
        placeholder="Your Opinion Matters..."
        rows="4"
        cols="50"
        v-model="reviewToEdit.txt"
      ></textarea>
      <button>Save</button>
    </form> -->

    <!-- <router-link to="/gig-app">Back</router-link> -->
  </section>
</template>

<script>
import { gigService } from "../services/gig.service.js";

export default {
  name: "gig-details",

  data() {
    return {
      gig: null,
      reviewToEdit: {
        txt: "",
        aboutGigId: null,
      },
    };
  },
  created() {
    this.loadReviews();
  },
  computed: {
    reviews() {
      return this.$store.getters.reviews;
    },
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
  },
  watch: {
    "$route.params.gigId": {
      async handler() {
        const { gigId } = this.$route.params;
        this.gig = await gigService.getById(gigId);
      },
      immediate: true,
    },
  },
  methods: {
    loadReviews() {
      this.reviewToEdit.aboutGigId = this.gig._id;
      console.log("this.reviewToEdit :>> ", this.reviewToEdit);
      this.$store.dispatch({ type: "loadReviews", id: this.gig._id });
    },
    async addReview() {
      await this.$store.dispatch({
        type: "addReview",
        review: this.reviewToEdit,
      });
      this.reviewToEdit = { txt: "", aboutUserId: null };
    },
  },
  components: {},
};
</script>