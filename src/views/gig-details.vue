<template>
  <section class="gig-details-wrapper main-layout">
    <a name="overview"></a>
    <nav
      :class="{ 'headroom--unpinned': scrolled }"
      @handleScroll="handleScroll"
      class="headroom gig-details-nav main-layout"
    >
      <ul class="container">
        <li><a class="nav-link" href="#overview">Overview</a></li>
        <li><a class="nav-link" href="#description">Description</a></li>
        <li><a class="nav-link" href="#sellerInfo">About The Seller</a></li>
        <li><a class="nav-link" href="#reviews">Reviews</a></li>
      </ul>
    </nav>
    <section v-if="gig" class="gig-details">
      <div class="purchase-container">
        <div class="order-info">
          <h5>Order Details</h5>
        </div>
      </div>

      <div class="overview">
        <h3 class="title">{{ gig.title }}</h3>
        <div class="owner-prev flex">
          <avatar
            :size="30"
            :username="gig.owner.username"
            :src="gig.owner.imgUrl"
          ></avatar>
          <h4 class="owner-name-level">{{ gig.owner.username }}</h4>
          <h5>Level 2 seller</h5>
          <span>|</span>
          <span v-for="num in 5" :key="num" class="fa fa-star"></span>
          {{ gig.owner.rate }} ({{ reviewsLength }})
          <span>| 5 Orders in Queue</span>
        </div>
        <el-carousel :autoplay="false" trigger="click" height="430px">
          <el-carousel-item v-for="img in gig.imgUrl" :key="img">
            <div class="img-container">
              <img :src="require(`@/assets/img/card-images/${img}`)" alt="" />
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>

      <!-- <h3>What people loved about this seller</h3> -->

      <div class="description">
        <a name="description"></a>
        <h3>About This Gig</h3>
        <p>{{ gig.description }}</p>
      </div>

      <div class="seller-info">
        <a name="sellerInfo"></a>
        <h3>About The Seller</h3>
        <div class="owner-prev flex">
          <avatar
            :size="100"
            :username="gig.owner.username"
            :src="gig.owner.imgUrl"
          ></avatar>
          <div class="seller-name flex">
            <h4 class="owner-name-level">{{ gig.owner.username }}</h4>
            <h5>Level 2 seller</h5>
            <div class="seller-rate">
              <span v-for="num in 5" :key="num" class="fa fa-star"></span>
              {{ gig.owner.rate }} ({{ reviewsLength }})
            </div>
          </div>
        </div>
      </div>

      <div class="reviews-container">
        <a name="reviews"></a>
        <h3>{{ reviewsLength }} Reviews</h3>
        <ul>
          <li v-for="(review, idx) in reviews" :key="idx">{{ review }}</li>
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
      limitPosition: 500,
      scrolled: false,
      lastPosition: 0,
      gig: null,
      reviewToEdit: {
        txt: "",
        aboutGigId: null,
      },
    };
  },
  created() {
    this.loadGig();
    window.addEventListener("scroll", this.handleScroll);
  },
  computed: {
    reviews() {
      return ["I loved the Logo", "Good Job!", "Thank you"];
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
    handleScroll() {
      if (
        this.lastPosition < window.scrollY &&
        this.limitPosition < window.scrollY
      ) {
        this.scrolled = true;
        // move up!
      }

      if (this.lastPosition > window.scrollY) {
        this.scrolled = false;
        // move down
      }

      this.lastPosition = window.scrollY;
      // this.scrolled = window.scrollY > 250;
    },
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  components: {
    Avatar,
  },
};
</script>