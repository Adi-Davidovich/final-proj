<template>
  <section class="gig-details-wrapper">
    <div class="gig-details-top">
      <nav class="container">
        <ul>
          <li>Overview</li>
          <li>About The Seller</li>
          <li v-if="reviews.length">Reviews</li>
        </ul>
      </nav>
    </div>
    <section v-if="gig" class="gig-details">
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
      <div>
        <img :src="gigImg" alt="" />
      </div>

      <div class="purchase-container">
        
      </div>

      <!-- <h3>What people loved about this seller</h3> -->
      <h3>About This Gig</h3>

      <p>{{ gig.description }}</p>
      <br />
      <div v-if="reviews.length" class="reviews-container">
        <h3>{{ reviewsLength }} Reviews</h3>
        <ul v-if="reviews">
          <li v-for="(review, idx) in reviews" :key="idx">{{ review.txt }}</li>
        </ul>
      </div>

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
    this.loadGig();
  },
  computed: {
    reviews() {
      return this.$store.getters.reviews;
    },
    reviewsLength() {
      return this.reviews.length;
    },
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
    gigImg() {
      return this.gig.imgUrl[0];
    },
  },
  watch: {
    "$route.params.gigId"(id) {
      console.log("Changed to", id);
      this.loadGig();
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