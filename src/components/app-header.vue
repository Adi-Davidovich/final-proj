
<template>
  <div class="main-header-sticky">
    <!-- <div class="user-msg"></div> -->
    <div class="header main-layout">
      <header class="logged-out-homepage-header header-transparent">
        <router-link class="logo" to="/" exact
          >fiverr<span class="logo-dot">.</span></router-link
        >

        <!-- <div class="fiver-header-search-animated">
              <div class="search-bar-package search_bar-package">
                <form class=""><button>Search</button></form>
              </div>
              </div> -->
        <nav>
          <router-link v-if="user" :to="'/user/' + user._id">Hi {{ user.fullname }}</router-link>
          <router-link to="/explore">Explore</router-link> |
          <!-- <router-link to="/dashboard">Dashboard</router-link> |
                <router-link to="/review">Reviews</router-link>|
                <router-link to="/chat">Chat</router-link>| -->
          <router-link to="/start_selling">Become a Seller</router-link>|
          <router-link to="/login">Sign In</router-link>
          <!-- <router-link to="/about">About</router-link> -->
          <button>Join</button>
        </nav>
      </header>
    </div>
  </div>
</template>

<script>
// import userMsg from '../components/user-msg.cmp.js'
export default {
  name: "app-header",
  data() {
    return {};
  },
  computed: {
    user() {
      console.log(
        "this.$store.getters.loggedinUser :>> ",
        this.$store.getters.loggedinUser
      );
      return this.$store.getters.loggedinUser;
    },
  },
  components: {},
};
</script>

