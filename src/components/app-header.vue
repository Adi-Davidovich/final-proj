
<template>
  <header class="main-header main-layout">
    <div class="header-container">
      <div class="logo" @click="routToHome">
        fiverr<span class="logo-dot">.</span>
        <form class="search-container">
          <span class="search-span"><i class="fas fa-search"></i></span>
          <input
            type="search"
            class="search-input"
            autocomplete="off"
            v-model="categoryShow"
            :placeholder="categoryShow"
          />
          <button class="homePage-search">search</button>
        </form>
      </div>
      <nav class="main-nav">
        <router-link to="/explore" class="link" active-class="active-link"
          >Explore</router-link
        >
        <router-link to="/start_selling" class="link"
          >Become a Seller</router-link
        >
        <router-link to="/login" class="link" active-class="active-link"
          >Sign In</router-link
        >
        <router-link
          to="/login"
          class="link link-join"
          active-class="active-link"
          >Join</router-link
        >
      </nav>
    </div>
  </header>

  <!-- <div class="main-header-sticky main-layout"> -->
  <!-- <div class="user-msg"></div> -->
  <!-- <div class="header">
      <header class="logged-out-homepage-header header-transparent">
        > -->

  <!-- <div class="fiver-header-search-animated">
              <div class="search-bar-package search_bar-package">
                <form class=""><button>Search</button></form>
              </div>
              </div> -->
  <!-- <nav>
          <router-link v-if="user" :to="'/user/' + user._id">Hi {{ user.fullname }}</router-link>
          <router-link to="/explore">Explore</router-link> | -->
  <!-- <router-link to="/dashboard">Dashboard</router-link> |
                <router-link to="/review">Reviews</router-link>|
                <router-link to="/chat">Chat</router-link>| -->
  <!-- <router-link to="/start_selling">Become a Seller</router-link>|
          <router-link to="/login">Sign In</router-link> -->
  <!-- <router-link to="/about">About</router-link> -->
  <!-- <button>Join</button>
        </nav>
      </header>
    </div>
  </div> -->
</template>

<script>
// import userMsg from '../components/user-msg.cmp.js'
export default {
  name: "app-header",
  data() {
    return {
      categoryShow: (!this.$store.state.filterBy)? "Find Services":this.$store.state.filterBy.category
    };
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
  created() {
    if (!this.$store.state.filterBy) {
      this.categoryShow = "Find Services";
    } else {
      this.categoryShow === this.$store.state.filterBy.category;
    }
  },
  watch: {
    "$store.state.filterBy": {
      showChange() {
        deep: true, this.filterCategory();
      },
      immediate: true,
    },
  },
  methods: {
    routToHome() {
      this.$router.push("/");
    },
    filterCategory() {
      console.log("hi :>> ");
      if (!this.$store.state.filterBy) {
        this.categoryShow = "Find Services";
      } else {
        this.categoryShow === this.$store.state.filterBy.category;
      }
    },
  },
  components: {},
}
</script>