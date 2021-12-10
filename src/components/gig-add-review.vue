<template>
  <section class="review-form">
    <div class="title">
      <h3>Rate & Review</h3>
      <p>
        Share with the community your experience when working with this seller.
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
      <button class="btn-add btn-purchase">Add</button> <span class="worning" v-if="!isReviewAddedCorrectly">Please add your rating</span>
    </form>
  </section>
</template>

<script>
export default {
  name: "gig-add-review",
  props: [],
  data() {
    return {
      reviewToAdd: {
        txt: "",
        communication: 0,
        service: 0,
        recommend: 0,
        country: "United States",
        aboutUser: "",
      },
      isReviewAddedCorrectly: true
    };
  },
  methods: {
    changeStarColor(key, num) {
      this.reviewToAdd[key] = num;
    },
    async addReview() {
      const review = this.reviewToAdd;
      if (review.communication === 0 || review.service === 0 || review.recommend === 0){
        this.isReviewAddedCorrectly = false
        return
      }
      this.reviewToAdd.aboutUser = this.gig.owner._id;
      review.rate = +(
        (+review.communication + +review.service + +review.recommend) /
        3
      ).toFixed(1);
      console.log(review);
      await this.$store.dispatch({ type: "addReview", review });
      this.toggleAddReview = false;
      this.isReviewAddedCorrectly = true
    },
  },
};
</script>
