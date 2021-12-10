
<template>
  <section class="bgc-grey main-layout">
    <section class="profile-layout">
      <header v-if="user.isSeller" class="profile-header">
        <div class="tabs">
          <router-link active-class="active-link1" class="nav-link" to="/user">Profile</router-link>
          |
          <router-link active-class="active-link" class="nav-link" to="/user/orders">Manage Orders</router-link>
          |
          <router-link active-class="active-link" class="nav-link" to="/user/dashboard">My Dashboard</router-link>
        </div>
        <div class="total">
          <div v-if="orders" class="balance">
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
      return this.orders.reduce((a, b) => a + b.price, 0).toFixed(2);
    },
  },

  methods: {

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
