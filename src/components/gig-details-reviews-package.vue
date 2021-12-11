<template>
  <section v-if="reviews" class="reviews-package">
    <div>
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
      <gig-reviews-breakdown class="reviews-breakdown" :reviews="reviews" />
      <footer>
        <button
          @click="toggleAddReview = !toggleAddReview"
          class="add-review-btn btn-actions"
        >
          {{ addReviewBtn }}
        </button>
        <gig-add-review
          v-if="toggleAddReview"
          @toggleReview = "toggleReview"
          :gig="gig" 
        />
      </footer>
    </div>
  </section>
</template>

<script>
import Avatar from "vue-avatar";
import gigReviewsBreakdown from "../components/gig-reviews-breakdown.vue";
import gigAddReview from "../components/gig-add-review.vue";

export default {
  name: "gig-details-reviews-package",
  props: ["gig", "reviews"],
  data() {
    return {
      toggleAddReview: false,
    };
  },
  computed: {
    addReviewBtn() {
      return !this.toggleAddReview ? "Add Review" : "Close";
    },
    reviewsLength() {
      return this.reviews.length;
    },
  },
  methods: {
    toggleReview() {
      this.toggleAddReview = false;
    },
  },
  components: {
    Avatar,
    gigReviewsBreakdown,
    gigAddReview,
  },
};
</script>
