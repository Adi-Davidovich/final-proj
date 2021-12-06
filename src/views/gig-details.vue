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
      <order-preview class="purchase-container" :gig="gig" />

      <div class="overview">
        <h3 class="title">{{ gig.title }}</h3>
        <div class="owner-prev flex">
          <avatar
            :size="30"
            :username="gig.owner.username"
            :src="gig.owner.imgUrl"
          ></avatar>
          <div class="owner-name-level">
            <h4>{{ gig.owner.username }}</h4>
            <span>Level 2 seller</span>
          </div>
          <span class="seperator">|</span>
          <div class="stars">
            <a href="#reviews"
              ><span
                v-for="num in 5"
                :key="num"
                class="fa fa-star"
                :class="num <= gig.owner.rate ? 'fill' : 'empty'"
              >
              </span>
              <span class="rate">{{ gig.owner.rate }}</span>
              <span class="amount">({{ reviewsLength }})</span>
            </a>
          </div>
          <span class="seperator">|</span>
          <div class="orders">5 Orders in Queue</div>
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
            <div class="stars">
              <span
                v-for="num in 5"
                :key="num"
                class="fa fa-star"
                :class="num <= gig.owner.rate ? 'fill' : 'empty'"
              ></span>
              <span class="rate">{{ gig.owner.rate }}</span>
              <span class="amount">({{ reviewsLength }})</span>
            </div>
          </div>
        </div>
        <div class="table-info">
          <section class="stats">
            <div>
              <h4>From</h4>
              <h4>{{ gig.owner.country }}</h4>
            </div>
            <div>
              <h4>Member since</h4>
              <h4>Mar 2019</h4>
            </div>
            <div>
              <h4>Avg. response time</h4>
              <h4>1 hour</h4>
            </div>
            <div>
              <h4>Last delivery</h4>
              <h4>about 17 hours</h4>
            </div>
          </section>
          <section class="description">
            <p>{{ gig.owner.description }}</p>
          </section>
        </div>
      </div>

      <div class="reviews-package">
        <a name="reviews"></a>
        <header>
          <h3>{{ reviewsLength }} Reviews</h3>
          <div class="stars">
            <span
              v-for="num in 5"
              :key="num"
              class="fa fa-star"
              :class="num <= gig.owner.rate ? 'fill' : 'empty'"
            ></span>
            <span class="rate">{{ gig.owner.rate }}</span>
          </div>
        </header>
        <div class="breakdown-container">
          <div class="table-stars-container">
            <table class="stars-table">
              <tbody style="display: flex; flex-direction: column-reverse">
                <tr v-for="(num, idx) in 5" :key="idx">
                  <td class="star-filter">
                    <button>{{ num }} Stars</button>
                  </td>
                  <td class="progress-bar-container">
                    <div class="star-progress-bar">
                      <div class="grey">
                        <span
                          class="progress"
                          :style="{ width: `${progressBar(num)}%` }"
                        ></span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="star-num">({{ starNum(num) }})</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="rating-breakdown">
            <h5 class="title">Rating Breakdown</h5>
            <ul>
              <li>
                Seller communication level<span
                  >4.9<span class="fa fa-star"></span
                ></span>
              </li>
              <li>
                Recommend to a friend<span
                  >4.1<span class="fa fa-star"></span
                ></span>
              </li>
              <li>
                Service as described<span
                  >4.5<span class="fa fa-star"></span
                ></span>
              </li>
            </ul>
          </div>
        </div>
        <div class="reviews-container">
          <ul class="review-list">
            <li class="review-item" v-for="(review, idx) in reviews" :key="idx">
              <div class="user-img">
                <avatar
                  :size="30"
                  :username="review.username"
                  :src="review.username"
                ></avatar>
              </div>
              <div class="review-content">
                <div class="reviewer-details">
                  <h4>{{ review.username }}</h4>
                  <div class="review-rating">
                    <i class="fa fa-star" />
                    {{ review.rate }}
                  </div>
                </div>
                <div class="reviewer-sub-details">
                  <div class="country">
                    <img src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png" alt="flag" class="country-flag" />
                    <span class="country-name">
                      {{ review.country }}
                    </span>
                  </div>
                </div>
                <div class="review-description">
                  <p>
                    {{ review.txt }}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
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
import orderPreview from "../components/order-preview.vue";
import Avatar from "vue-avatar";

export default {
  name: "gig-details",

  data() {
    return {
      limitPosition: 120,
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
      return [
        {
          txt: "I loved the Logo",
          rate: 5,
          username: "Josh",
          country: "United States",
        },
        {
          txt: "Good Job!",
          rate: 5,
          username: "Josh",
          country: "United States",
        },
        {
          txt: "Thank you",
          rate: 2,
          username: "Josh",
          country: "United States",
        },
      ];
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
    progressBar(num) {
      const amount = +this.reviews.reduce((acc, review) => {
        if (review.rate === num) acc++;
        return acc;
      }, 0);
      return (amount / this.reviews.length) * 100;
    },
    starNum(num) {
      const amount = +this.reviews.reduce((acc, review) => {
        if (review.rate === num) acc++;
        return acc;
      }, 0);
      return amount;
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
    orderPreview,
    Avatar,
  },
};
</script>