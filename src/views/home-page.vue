<template>
  <section class="home app-main main-layout">
    <div class="main-content full">
      <div class="main-layout">
        <div class="hero-wrapper flex">
          <div class="hero-title">
            <p>
              Find the perfect <span>freelance</span> services for your business
            </p>
            <div class="search-bar-package search_bar-package">
              <form class="">
                <span
                  class="search-bar-icon"
                  aria-hidden="true"
                  style="width: 16px; height: 16px"
                  ><i class="fas fa-search"></i></span
                ><input
                  type="search"
                  autocomplete="off"
                  placeholder='Try "building mobile app"'
                  value=""
                /><button class="submit-button">Search</button>
              </form>
            </div>

            <div class="popular">
              Popular:
              <ul>
                <li @click="setCategory('Social Media Marketing')">
                  Social Media
                </li>
                <li @click="setCategory('Illustration')">Illustration</li>
                <li @click="setCategory('Logo Design')">Logo Design</li>
                <li @click="setCategory('Voice Over')">Voice Over</li>
              </ul>
            </div>
          </div>
          <div class="hero-backgrounds">
            <div
              v-for="(hero, idx) in heroes"
              class="hero-image-content"
              :key="hero.id"
              :style="{
                backgroundColor: hero.backgroundColor,
                backgroundImage: 'url(' + hero.image + ')',
                opacity: idx === heroIdx ? 1 : 0,
              }"
            >
              <div class="seller-name">
                <p>
                  <span
                    v-for="num in 5"
                    :key="num"
                    class="fa fa-star stars"
                  ></span><br>
                  {{ hero.name }}, <b>{{ hero.subTitle }}</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h2 class="home-page-title">Popular professional services</h2>
    <div class="cards-container">
      <div class="card-filter" @click="setCategory('Logo Design')">
        <p>Build your brand <span class="filter-title"> Logo Design</span></p>
        <img src="../assets/img/logo-design.jpg" />
      </div>

      <div class="card-filter" @click="setCategory('Illustration')">
        <p>Color your dreams <span class="filter-title">Illustration</span></p>
        <img src="../assets/img/illustration.jpg" />
      </div>

      <div class="card-filter" @click="setCategory('Voice Over')">
        <p>Share your message <span class="filter-title">Voice Over</span></p>
        <img src="../assets/img/voiceover.jpg" />
      </div>

      <div class="card-filter" @click="setCategory('Video Explainer')">
        <p>
          Engage your audience <span class="filter-title">Video Explainer</span>
        </p>
        <img src="../assets/img/animated-explainer.jpg" />
      </div>

      <div class="card-filter" @click="setCategory('Social Media Marketing')">
        <p>
          Reach more customers <span class="filter-title">Social Media</span>
        </p>
        <img src="../assets/img/social.jpg" />
      </div>
    </div>

    <div class="home-page-info-container full">
      <div class="main-info main-layout">
        <div class="content flex">
          <div class="home-page-info">
            <h2>A whole world of freelance talent at your fingertips</h2>
            <ul>
              <li>
                <h6>
                  <span><i class="far fa-check-circle"></i></span>The best for
                  every budget
                </h6>
                <p>
                  Find high-quality services at every price point. No hourly
                  rates, just project-based pricing.
                </p>
              </li>

              <li>
                <h6>
                  <span><i class="far fa-check-circle"></i></span>Quality work
                  done quickly
                </h6>
                <p>
                  Find the right freelancer to begin working on your project
                  within minutes.
                </p>
              </li>

              <li>
                <h6>
                  <span><i class="far fa-check-circle"></i></span>Protected
                  payments, every time
                </h6>
                <p>
                  Always know what you'll pay upfront. Your payment isn't
                  released until you approve the work.
                </p>
              </li>
              <li>
                <h6>
                  <span><i class="far fa-check-circle"></i></span>24/7 support
                </h6>
                <p>
                  Questions? Our round-the-clock support team is available to
                  help anytime, anywhere.
                </p>
              </li>
            </ul>
          </div>
          <div class="home-page-img">
            <img src="../assets/img/selling-proposition.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import appHeader from "../components/app-header.vue";
import {socketService} from '../services/socket.service.js'


export default {
  name: "home-page",
  components: {
    appHeader,
  },
  data() {
    return {
      filterBy: {
        txt: "",
        price: 1000,
        category: "",
        deliveyTime: "",
        sort: "",
      },
      heroIdx: 0,
    };
  },
  created() {
    
    this.heroes = [
      {
        id: 1,
        image: require(`../assets/img/4.jpg`),
        backgroundColor: "#88b3e0",
        name: "Gabrielle",
        subTitle: "Video Explainer",
      },
      {
        id: 2,
        image: require(`../assets/img/5.jpg`),
        backgroundColor: "#eea5ae",
        name: "Andrea",
        subTitle: "Fashion Designer",
      },
      {
        id: 3,
        image: require(`../assets/img/6.jpg`),
        backgroundColor: "#708284",
        name: "Zach",
        subTitle: "Graphic Designer",
      },
      {
        id: 4,
        image: require(`../assets/img/2.jpg`),
        backgroundColor: "#fa679b",
        name: "Veronica",
        subTitle: "Illustraitor",
      },
      {
        id: 5,
        image: require(`../assets/img/7.jpg`),
        backgroundColor: "#293a28",
        name: "Samuel",
        subTitle: "Social Media Manager",
      },
    ];

    setInterval(() => {
      this.heroIdx = (this.heroIdx + 1) % this.heroes.length;
    }, 5000);
  },
  methods: {
    setCategory(category) {
      this.filterBy.category = category;
      var filterBy = this.filterBy;
      const copyFilter = JSON.parse(JSON.stringify(filterBy));
      this.$store.dispatch({ type: "setFilter", filterBy: copyFilter });
      this.$store.dispatch({ type: "loadGigs" });
      this.$router.push("/explore");
    },
  },
};
</script>
