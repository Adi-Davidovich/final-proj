<template>
  <section v-if="gig" class="details-seller">
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
                  :class="
                    num <= gig.owner.rate
                      ? 'fa fa-star fill'
                      : 'far fa-star fill'
                  "
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
  </section>
</template>

<script>
import Avatar from "vue-avatar";

export default {
  name: "gig-details-seller",
  props: ["gig", "reviewsLength"],
  components: {
    Avatar,
  },
};
</script>
