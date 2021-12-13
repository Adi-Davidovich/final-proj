<template>
  <section class="page-container my-profile">
    <section class="left-side">
      <div class="details">
        <div class="details-top">

        <avatar
          :size="150"
          :username="user.username"
          :src="user.imgUrl"
        ></avatar>
        <h2>{{ user.username }}</h2>
        </div>

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
      <header>
        <p>{{ rightHeaderTitle }}</p>
        <button v-if="user.isSeller" class="regular-btn" @click="editPage">
          Create New Gig
        </button>
      </header>
      <seller-gigs
        v-if="user.isSeller"
        class="user-gig-list"
        :gigs="gigs"
      ></seller-gigs>
      <ul v-else>
        <li class="user-order" v-for="(order, index) in orders" :key="index">
          <img
            :src="require(`@/assets/img/card-images/${order.imgUrl}`)"
            alt=""
          />
          <div class="order-description">
            <p>{{ order.gig.package.description }}</p>
          </div>
          <div class="buyer-details">
            <avatar
              :size="30"
              :username="order.seller.username"
              :src="order.seller.imgUrl"
            ></avatar>
            <p>{{ order.seller.username }}</p>
          </div>
          <div class="price">
            <p>Price:</p>
            <p>${{ order.price }}</p>
          </div>
          <div class="status">
            <p :class="order.status === 'Complete' ? 'complete' : 'pending'">
              {{ order.status }}
            </p>
          </div>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
import Avatar from "vue-avatar";
import sellerGigs from "./seller-gigs.vue";

export default {
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.user = this.$store.getters.loggedinUser;
    this.$store.dispatch({ type: "getUserGigs" });
    this.getUserOrders();
  },
  computed: {
    gigs() {
      return this.$store.getters.gigsToShow;
    },
    orders() {
      return this.$store.getters.orders;
    },
    sellerMode() {
      return this.user.isSeller;
    },
    gigsHeader() {
      if (this.gigs.length) return "Active Gigs";
      else return "It seems that you don't have any active Gigs. Get selling!";
    },
    sumBalance() {
      return this.orders.reduce((a, b) => a + b.price, 0);
    },
    rightHeaderTitle() {
      if (this.user.isSeller) return "My Active Gigs";
      if (!this.user.isSeller) return "My Orders";
    },
  },

  methods: {
    getUserOrders() {
      this.$store.dispatch({ type: "getUserOrders" });
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
    gigDetails(gigId) {
      this.$router.push("/gig/" + gigId);
    },

    openManageSaleTab() {
      this.manageSaleTab = true;
    },
    openActiveGigs() {
      this.manageSaleTab = false;
    },
  },

  components: {
    Avatar,
    sellerGigs,
  },
};
</script>

<style>
</style>