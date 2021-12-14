<template>
  <section v-if="gig" class="details-overview">
    <div class="overview">
      <h3 class="title">{{ gig.title }}</h3>
      <div class="owner-prev flex">
        <avatar
          :size="30"
          :username="gig.owner.username"
          :src="gig.owner.imgUrl"
        ></avatar>
        <div class="owner-content">
          <div class="owner-name-level">
            <h4>{{ gig.owner.username }}</h4>
            <span>Level 2 seller</span>
            <span class="seperator">|</span>
          </div>
          <div class="stars-orders">
            <div class="stars">
              <a href="#reviews"
                ><span
                  v-for="num in 5"
                  :key="num"
                  :class="'fa fa-star fill'"
                >
                <!-- <span
                  v-for="num in 5"
                  :key="num"
                  :class="
                    num <= gig.owner.rate
                      ? 'fa fa-star fill'
                      : 'far fa-star fill'
                  "
                > -->
                </span>
                <span class="rate">{{ gig.owner.rate }}</span>
                <span class="amount">({{ reviewsLength }})</span>
              </a>
            </div>
            <span class="seperator">|</span>
            <div class="orders">5 Orders in Queue</div>
          </div>
        </div>
      </div>
       <carousel  :images="gig.imgUrl"/>
    </div>
  </section>
</template>

<script>
import Avatar from "vue-avatar";
import carousel from "./carousel.vue"

export default {
  name: "gig-details-overview",
  props: ["gig", "reviewsLength"],
  components: {
    Avatar,
    carousel
  },
};
</script>
