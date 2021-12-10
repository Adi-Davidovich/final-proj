<template>
  <div v-if="reviews" class="reviews-container">
    <ul class="review-list">
      <li class="review-item" v-for="(review, idx) in reviews" :key="idx">
        <div class="user-img">
          <avatar :size="30" :username="review.buyer.fullname"></avatar>
        </div>
        <div class="review-content">
          <div class="reviewer-details">
            <h4>{{ review.buyer.fullname }}</h4>
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
</template>

<script>
export default {
  name: "gig-details-reviews",
  props: ["reviews"],
};
</script>
