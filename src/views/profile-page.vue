
<template>
  <section class="bgc-grey main-layout">
    <section class="profile-layout">
      <header v-if="user.isSeller" class="profile-header">
        <div class="tabs">
          <router-link to="/user">Profile</router-link>
          |
          <router-link to="/user/orders">Manage Orders</router-link>
        </div>
        <div class="total">
          <div class="balance">
            Balance: <span>{{ sumBalance }}$</span>
          </div>
        </div>
      </header>
          <router-view></router-view>

    </section>
  </section>
</template>

<script>
import Avatar from "vue-avatar";
import sellerGigs from "../components/seller-gigs.vue";

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
  },

  methods: {
    getUserOrders() {
      this.$store.dispatch({ type: "getUserOrders" });
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
