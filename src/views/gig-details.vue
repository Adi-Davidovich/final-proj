<template>
  <section class="gig-details-wrapper main-layout">
    <a name="overview"></a>
    <nav
      @handleScroll="handleScroll"
      class="headroom gig-details-nav main-layout  full"
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
                :class="num <= gig.owner.rate ? 'fa fa-star fill' : 'far fa-star fill'"
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
                :class="num <= gig.owner.rate ? 'fa fa-star fill' : 'far fa-star fill'"
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
              :class="
                num <= gig.owner.rate ? 'fa fa-star fill' : 'far fa-star fill'
              "
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
        <footer v-if="loggedInUser">
          <button
            @click="toggleAddReview = !toggleAddReview"
            class="add-review btn-actions"
          >
            {{ addReviewBtn }}
          </button>
          <section v-if="toggleAddReview" class="review-form">
            <div class="title">
              <h3>Rate & Review</h3>
              <p>
                Share with the community your experience when working with this
                seller.
              </p>
            </div>
            <form @submit.prevent="addReview()">
              <div class="questions">
                <div class="rate-question">
                  <div class="question">
                    <h4>Communication With Seller</h4>
                    <p>How responsive was the seller during the process?</p>
                  </div>
                  <div class="stars">
                    <span
                      v-for="num in 5"
                      :key="num"
                      class="fa fa-star"
                      :class="{ fill: num <= reviewToAdd.communication }"
                      @click="changeStarColor('communication', num)"
                    ></span>
                  </div>
                </div>
                <div class="rate-question">
                  <div class="question">
                    <h4>Service as Described</h4>
                    <p>Did the result match the Gig's description?</p>
                  </div>
                  <div class="stars">
                    <span
                      v-for="num in 5"
                      :key="num"
                      class="fa fa-star"
                      :class="{ fill: num <= reviewToAdd.service }"
                      @click="changeStarColor('service', num)"
                    ></span>
                  </div>
                </div>
                <div class="rate-question">
                  <div class="question">
                    <h4>Buy Again or Recommend</h4>
                    <p>Would you recommend buying this Gig?</p>
                  </div>
                  <div class="stars">
                    <span
                      v-for="num in 5"
                      :key="num"
                      class="fa fa-star"
                      :class="{ fill: num <= reviewToAdd.recommend }"
                      @click="changeStarColor('recommend', num)"
                    ></span>
                  </div>
                </div>
              </div>
              <div class="text-area">
                <h4>Tell Your Story (Optional)</h4>
                <textarea
                  placeholder="What was your goal in buying this Gig? How did the seller help you achieve it?"
                  rows="6"
                  cols="50"
                  v-model="reviewToAdd.txt"
                ></textarea>
              </div>
              <button class="btn-add btn-purchase">Add</button>
            </form>
          </section>
        </footer>
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
                    <img
                      src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                      alt="flag"
                      class="country-flag"
                    />
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
    </section>
  </section>
</template>

<script>
import { gigService } from "../services/gig.service.js";
import { userService } from "../services/user.service copy.js";
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
      toggleAddReview: false,
      reviewToAdd: {
        txt: "",
        communication: 0,
        service: 0,
        recommend: 0,
        country: "United States",
      },
    };
  },
  created() {
    this.loadGig();
    // this.$store.dispatch({type: 'loadUsers'})
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
    addReviewBtn() {
      return !this.toggleAddReview ? "Add Review" : "Close";
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
    changeStarColor(key, num) {
      this.reviewToAdd[key] = num;
    },
    async addReview() {
      const review = this.reviewToAdd;
      review.rate =+((+review.communication + +review.service + +review.recommend) / 3).toFixed(1);
      console.log(review);
      await this.$store.dispatch({type: "updateSeller", review });
      this.reviewToAdd = {
        txt: "",
        communication: 0,
        service: 0,
        recommend: 0,
      };
      this.toggleAddReview = false;
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