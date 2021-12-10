<template>
  <section>
    <header
      class="navbar main-layout"
      :class="{
        'header-transparent': isHeaderTransparent && isRouteHomePage,
        sticky: isRouteHomePage,
      }"
    >
      <div class="header-wrapper">
        <div class="header-row">
          <div class="logo" @click="routToHome">
            Higher<span class="logo-dot">.</span>
          </div>
          <div
            class="header-search"
            :class="{
              show: isHeaderSearchVisible,
            }"
          >
            <div class="search-bar-package search_bar-package">
              <form @submit.prevent="setFilter">
                <span class="search-bar-icon" style="width: 16px; height: 16px">
                  <i class="fas fa-search"></i>
                </span>
                <input
                  type="search"
                  autocomplete="off"
                  placeholder="Find Services"
                  v-model="filterBy.txt"
                  @change="setFilter"
                />
                <button class="search-button" type="submit">Search</button>
              </form>
            </div>
          </div>
          <nav class="navbar">
            <ul>
              <li class="display-from-md">
                <router-link
                  to="/explore"
                  class="nav-link"
                  active-class="active-link"
                  >Explore</router-link
                >
              </li>
              <li class="display-from-md">
                <router-link
                  to="/start_selling"
                  class="nav-link"
                  active-class="active-link"
                  >Become a Seller</router-link
                >
              </li>
              <li v-if="!user" class="display-from-sm">
                <a
                  @click="openLogin"
                  href="#"
                  rel="nofollow"
                  class="nav-link"
                  active-class="active-link"
                  >Sign In</a
                >
              </li>
              <li v-if="!user">
                <a
                  @click="openSignup"
                  class="join-button"
                  active-class="active-link"
                  rel="nofollow"
                  href="#"
                  >Join</a
                >
              </li>
              <li v-if="user">
                <a
                  @click="doLogout"
                  class="nav-link"
                  active-class="active-link"
                  rel="nofollow"
                  href="#"
                  >Logout</a
                >
              </li>
              <li v-if="user" @click="userProfile">
                <avatar
                  v-if="user"
                  :size="35"
                  :username="user.username"
                  :src="user.imgUrl"
                  style="cursor: pointer"
                ></avatar>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
    <signup-form
      :loginMode="loginMode"
      @closeModal="closeModal"
      v-if="signupMode || loginMode"
    ></signup-form>
  </section>

  <!-- <router-link to="/dashboard">Dashboard</router-link> |
                <router-link to="/review">Reviews</router-link>|
  <router-link to="/chat">Chat</router-link>|-->
  <!-- <router-link to="/start_selling">Become a Seller</router-link>|
  <router-link to="/login">Sign In</router-link>-->
  <!-- <router-link to="/about">About</router-link> -->
  <!-- <button>Join</button> -->
</template>

<script>
import Avatar from "vue-avatar";
import signupForm from "./signup-login-form.vue";
// import userMsg from '../components/user-msg.cmp.js'
export default {
  name: "app-header",
  data() {
    return {
      filterBy: {
        txt: "",
        price: 0,
        category: "",
        deliveyTime: "",
        sort: "",
        sellerDetails: {
          level: "",
          rating: "",
          languge: "",
        },
      },
      isHeaderTransparent: true,
      isHeaderSearchVisible: false,
      signupMode: false,
      loginMode: false,
      isRouteHomePage: true,
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
    getSearchTerm() {
      return this.$store.getters.categoryName;
    },
  },
  created() {
    // if (!this.$store.state.filterBy) {
    //   this.categoryShow = "Find Services";
    // } else {
    //   this.categoryShow === this.$store.state.filterBy.category;
    // }
    window.addEventListener("scroll", this.handleScroll);
    this.isRouteHomePage = this.$route.path === "/";
  },
  watch: {
    $route({ path }) {
      this.isRouteHomePage = path === "/";
    },
  },
  methods: {
    routToHome() {
      this.$router.push("/");
    },
    handleScroll() {
      const sticky = 50;
      if (window.pageYOffset >= sticky) {
        this.isHeaderTransparent = false;
      } else {
        this.isHeaderTransparent = true;
      }
      if (window.pageYOffset >= sticky + 100) {
        this.isHeaderSearchVisible = true;
      } else {
        this.isHeaderSearchVisible = false;
      }
    },
    // filterCategory() {
    //   if (!this.$store.state.filterBy) {
    //     this.categoryShow = "Find Services";
    //   } else {
    //     this.categoryShow === this.$store.state.filterBy.category;
    //   }
    // },
    async setFilter() {
      const copyFilter = JSON.parse(JSON.stringify(this.filterBy));
      console.log("copy :>> ", copyFilter);
      await this.$store.dispatch({
        type: "setFilter",
        filterBy: copyFilter,
      });
      this.$router.push("/explore");
      this.$refs.input.value = null;
    },

    openLogin() {
      this.loginMode = true;
      let body = document.body;
      body.classList.add("disable-scrolling");
    },
    openSignup() {
      this.signupMode = true;
      let body = document.body;
      body.classList.add("disable-scrolling");
    },

    closeModal() {
      this.signupMode = false;
      this.loginMode = false;
      let body = document.body;
      body.classList.remove("disable-scrolling");
    },

    userProfile() {
      console.log("Hi");
      this.$router.push("/user");
    },

    async doLogout() {
      await this.$store.dispatch({ type: "logout" });
      this.$router.push("/");
    },
  },
  components: {
    signupForm,
    Avatar,
  },
};
</script>