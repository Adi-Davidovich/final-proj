<template>
  <section v-if="gig" class="gig-details-wrapper">
    <a name="overview"></a>
    <nav
      @handleScroll="handleScroll"
      class="headroom gig-details-nav main-layout full"
    >
      <ul class="container">
        <li><a class="nav-link" href="#overview">Overview</a></li>
        <li><a class="nav-link" href="#description">Description</a></li>
        <li><a class="nav-link" href="#sellerInfo">About The Seller</a></li>
        <li><a class="nav-link" href="#reviews">Reviews</a></li>
      </ul>
    </nav>
    <div class="full margin">
    <section v-if="gig" class="gig-details ">
      <order-preview class="purchase-container" :gig="gig" />
      <gig-details-overview
        class="details-overview"
        :gig="gig"
        :reviewsLength="reviewsLength"
      />

      <!-- <h3>What people loved about this seller</h3> -->
      <div class="additional-info">
        <div class="description">
          <a name="description"></a>
          <h3>About This Gig</h3>
          <p>{{ gig.description }}</p>
        </div>
      
      <gig-details-seller
        class="details-seller"
        :gig="gig"
        :reviewsLength="reviewsLength"
      />
      <gig-details-reviews-package
        class="reviews-package"
        :gig="gig"
        :reviews="reviews"
      />
      <gig-details-reviews
        class="reviews-container"
        :reviews="reviews"
      />
      </div>
    </section>
    </div>
  </section>
</template>

<script>
import { gigService } from "../services/gig.service.js";
import { userService } from "../services/user.service copy.js";
import orderPreview from "../components/order-preview.vue";
import gigDetailsOverview from "../components/gig-details-overview.vue";
import gigDetailsSeller from "../components/gig-details-seller.vue";
import gigDetailsReviewsPackage from "../components/gig-details-reviews-package.vue";
import gigDetailsReviews from "../components/gig-details-reviews.vue";
import Avatar from "vue-avatar";

export default {
  name: "gig-details",
  data() {
    return {
      limitPosition: 120,
      scrolled: false,
      lastPosition: 0,
      gig: null,
    };
  },
  created() {
    this.loadGig();
    window.addEventListener("scroll", this.handleScroll);
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
    
  },
  watch: {
    "$route.params.gigId"(id) {
      this.loadGig();
    },
    immediate: true,
  },
  methods: {
    async loadGig() {
      const id = this.$route.params.gigId;
      this.gig = await gigService.getById(id);
      const sellerId = this.gig.owner._id;
      await this.$store.dispatch({ type: "loadReviews", id: sellerId });
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
    orderPreview,
    gigDetailsOverview,
    gigDetailsSeller,
    gigDetailsReviewsPackage,
    gigDetailsReviews,
    Avatar,
  },
};
</script>