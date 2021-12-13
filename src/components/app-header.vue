<template>
  <section>
    <div v-if="isNavbarOpen" class="main-screen" @click="closeMenu"></div>
    <header
      class="main-navbar main-layout"
      :class="{
        'header-transparent':
          isHeaderTransparent && isRouteHomePage && windowWidth >= 850,
        sticky: isRouteHomePage,
      }"
    >
      <div class="header-wrapper">
        <div class="header-row">
          <div class="title flex">
            <button class="bars" @click="openMenu">
              <i class="fa fa-bars fa-lg"></i>
            </button>

            <div class="logo" @click="routToHome">
              Higher<span class="logo-dot">.</span>
            </div>
          </div>
          <div
            class="header-search"
            :class="{
              show: isRouteHomePage ? isHeaderSearchVisible : true,
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
          <nav v-if="isNavbarOpen || windowWidth >= 850" class="navbar">
            <ul>
              <li @click="isNavbarOpen = false" class="display-from-md">
                <router-link
                  to="/explore"
                  @click.native="goExplore"
                  class="nav-link"
                  active-class="active-link"
                  >Explore</router-link
                >
              </li>
              <li @click="isNavbarOpen = false" class="display-from-md">
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
                <el-badge :value="showSocketMessages" class="item">
                  <avatar
                    v-if="user"
                    :size="35"
                    :username="user.username"
                    :src="user.imgUrl"
                    style="cursor: pointer"
                  ></avatar>
                </el-badge>
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
import UserMsg from "./user-msg.vue";
import { Message } from "element-ui";

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
      messageSocket: [],
      isHeaderTransparent: true,
      isHeaderSearchVisible: false,
      signupMode: false,
      loginMode: false,
      isRouteHomePage: true,
      isNavbarOpen: false,
      windowWidth: window.innerWidth,
    };
  },
  computed: {
    showSocketMessages() {
      if (!this.messageSocket.length) return null;
      else return this.messageSocket.length;
    },
    user() {
      return this.$store.getters.loggedinUser;
    },
    getSearchTerm() {
      return this.$store.getters.categoryName;
    },
  },
  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth;
    };
  },
  created() {
    // if (!this.$store.state.filterBy) {
    //   this.categoryShow = "Find Services";
    // } else {
    //   this.categoryShow === this.$store.state.filterBy.category;
    // }
    window.addEventListener("scroll", this.handleScroll);
    this.isRouteHomePage = this.$route.path === "/";
    socketService.on("add-order-client", (msg) => {
      console.log('add-order-client')
      Message.success({
        showClose: true,
        message:msg,
        type: "success",
      });
      this.messageSocket.push(msg);
    });
    socketService.on("add-review-client", (msg) => {
      console.log('add-review-client ', msg);
      Message.success({
        showClose: true,
        message:msg,
        type: "success",
      });
    });
  },
  watch: {
    $route({ path }) {
      this.isRouteHomePage = path === "/";
    },
  },
  methods: {
    goExplore() {
      this.$store.dispatch({
        type: "setFilter",
        filterBy: { category: "" },
      });
    },
    routToHome() {
      this.$router.push("/");
      this.isNavbarOpen = false;
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
    openMenu() {
      this.isNavbarOpen = true;
      document.body.classList.add("menu-open");
    },
    closeMenu() {
      this.isNavbarOpen = false;
      document.body.classList.remove("menu-open");
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
      this.isNavbarOpen = false;
      body.classList.add("disable-scrolling");
    },
    openSignup() {
      this.signupMode = true;
      let body = document.body;
      this.isNavbarOpen = false;
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
      this.isNavbarOpen = false;
      this.messageSocket = [];
      this.$router.push("/user");
    },

    async doLogout() {
      await this.$store.dispatch({ type: "logout" });
      this.isNavbarOpen = false;
      this.$router.push("/");
    },
  },
  components: {
    signupForm,
    Avatar,
    UserMsg,
  },
};
</script>