<template>
  <section v-if="gig" class="gig-details app-main">
    <h3>{{ gig.title }}</h3>
    <div class="owner-prev flex">
      <avatar
        :size="24"
        :username="gig.owner.username"
        :src="gig.owner.imgUrl"
      ></avatar>
      <h4 class="owner-name-level">{{ gig.owner.username }}</h4>
      <h5>Level 2 seller</h5>
      | <i class="fas fa-star"></i>{{ gig.owner.rate }}
    </div>
    <!-- <h3>What people loved about this seller</h3> -->
    <h3>About This Gig</h3>

    <p>{{ gig.description }}</p>
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
import Avatar from "vue-avatar";

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
    this.loadGig()   
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
    "$route.params.gigId"(id) {
      console.log("Changed to", id);
      this.loadGig()
    },
      immediate: true,
    
  },
  methods: {
    async loadGig() {
      const id = this.$route.params.gigId;
      this.gig = await gigService.getById(id);

      // this.reviewToEdit.aboutGigId = this.gig._id;
      // console.log("this.reviewToEdit :>> ", this.reviewToEdit);
      // this.$store.dispatch({ type: "loadReviews", id: this.gig._id });
    },
    async addReview() {
      await this.$store.dispatch({
        type: "addReview",
        review: this.reviewToEdit,
      });
      this.reviewToEdit = { txt: "", aboutUserId: null };
    },
  },
  components: {
    Avatar,
  },
};
</script>