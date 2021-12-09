<template>
  <section class="bgc-grey main-layout">
    <section class="profile-layout">
      <section class="page-container">
        <section class="left-side">
          <div class="details">
            <avatar
              :size="150"
              :username="user.username"
              :src="user.imgUrl"
            ></avatar>
            <h2>{{ user.username }}</h2>

            <div class="details-bottom">
              <div class="from-since flex">
                <p><i class="fas fa-user"></i> Member since</p>
                <b>{{ user.createdAt }} Nov 21</b>
              </div>
              <div class="from-since flex">
                <p><i class="fas fa-map-marker-alt"></i> from</p>
                <b>{{ user.country }} United States</b>
              </div>
            </div>
          </div>
        </section>

        <section class="right-side">
          <section v-if="sellerMode" class="seller-profile">
            <div class="seller-header">
              <p>{{ gigsHeader }}</p>
              <button class="regular-btn" @click="editPage">
                Create New Gig
              </button>
            </div>
            <ul class="gig-list-user">
              <li v-for="(gig, index) in gigs" :key="index">
                <gig-preview
                  @mouseover.native="hover = true"
                  @mouseleave.native="hover = false"
                  :gig="gig"
                />

                <div class="gig-tools">
                  <button class="regular-btn" @click="editGig(gig._id)">
                    Edit
                  </button>
                  <button class="regular-btn" @click="removeGig(gig._id)">
                    Delete
                  </button>
                </div>
              </li>
            </ul>
          </section>

          <section v-else class="user-profile"></section>
        </section>
      </section>
    </section>
    <pre>{{ orders }}</pre>
  </section>
</template>

<script>
import Avatar from "vue-avatar";
import GigPreview from "../components/gig-preview.vue";

export default {
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.user = this.$store.getters.loggedinUser;
    this.$store.dispatch({ type: "getUserGigs" });
  },
  computed: {
    gigs() {
      return this.$store.getters.gigsToShow;
    },
    orders() {
      return this.$store.getters.ordersToShow;
    },
    sellerMode() {
      return this.user.isSeller;
    },
    gigsHeader() {
      if (this.gigs.length) return "Active Gigs";
      else return "It seems that you don't have any active Gigs. Get selling!";
    },
  },

  methods: {
    getUserOrders() {
      if (user.isSeller) {
        this.$store.dispatch({ type: "getUserOrders", sellerId: user._id });
      }
      if (user.isSeller) {
        this.$store.dispatch({ type: "getUserOrders", buyerId: buyer._id });
      }
    },
    removeGig(gigId) {
      this.$store.dispatch({ type: "removeGig", gigId });
    },

    editGig(gigId) {
      this.$router.push(`/gig/edit/${gigId}`);
    },

    editPage() {
      this.$router.push(`/gig/edit`);
    },

    mouseOver(gig) {
      let elGig = document.querySelector(gig);
      elGig.classList.add("over");
    },
  },

  components: {
    Avatar,
    GigPreview,
  },
};
</script>

<style>
</style>