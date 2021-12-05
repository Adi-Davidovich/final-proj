<template>
  <section class="home app-main main-layout">
    <div class="main-layout full">
      <div
        class="hero hero-container"
        :style="{ backgroundImage: `url(${mainImageSrc})` }"
      ></div>
    </div>

    <h2 class="homePage-title">Popular professional services</h2>

    <div class="cards-container">
      <div class="card-filter" @click="setCategory('Logo Design')">
        <p>Build your brand <span class="filterTitle"> Logo Design</span></p>
        <img src="../assets/img/logo-design.jpg" />
      </div>

      <div class="card-filter" @click="setCategory('Illustration')">
        <p>Color your dreams <span class="filterTitle">Illustration</span></p>
        <img src="../assets/img/illustration.jpg" />
      </div>

      <div class="card-filter" @click="setCategory('Voice Over')">
        <p>Share your message <span class="filterTitle">Voice Over</span></p>
        <img src="../assets/img/voiceover.jpg" />
      </div>

      <div class="card-filter" @click="setCategory('Video Explainer')">
        <p>
          Engage your audience <span class="filterTitle">Video Explainer</span>
        </p>
        <img src="../assets/img/animated-explainer.jpg" />
      </div>

      <div class="card-filter" @click="setCategory('Social Media Marketing')">
        <p>
          Reach more customers <span class="filterTitle">Social Media</span>
        </p>
        <img src="../assets/img/social.jpg" />
      </div>
    </div>

    <div class="homePage-info-container main-layout">
      <div class="main-info flex">
        <div class="homePage-info">
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
                Always know what you'll pay upfront. Your payment isn't released
                until you approve the work.
              </p>
            </li>
            <li>
              <h6>
                <span><i class="far fa-check-circle"></i></span>24/7 support
              </h6>
              <p>
                Questions? Our round-the-clock support team is available to help
                anytime, anywhere.
              </p>
            </li>
          </ul>
        </div>
        <div class="homePage-img">
          <img src="../assets/img/selling-proposition.png" alt="" />
        </div>

        <div class="hero-title main-layout">
          <p>
            Find the perfect <span>freelance</span> services for your business
          </p>
          <form class="search-container home-page-search-container">
            <span class="search-span"><i class="fas fa-search"></i></span>
            <input
              type="search"
              class="search-input"
              autocomplete="off"
              placeholder='Try "Video Explainer" '
            />
            <button class="homePage-search">search</button>
          </form>
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
      </div>
    </div>
  </section>
</template>

<script>
// import { eventBusService, SHOW_MSG } from '../services/event-bus.service.js'
// import {toyService} from '../services/toy.service.js'
import appHeader from "../components/app-header.vue";
import { utilService } from "../services/util.service.js";
export default {
  name: "home-page",
  components: {
    appHeader,
  },
  data() {
    return {
      filterBy: {
        price: 0,
        category: "",
        deliveyTime: "",
        sort: "",
      },
      imgs: [],
      mainImageSrc: require(`../assets/img/1.jpeg`),
    };
  },
  created() {
    let self = this;
    this.images = [
      { id: 1, image: require(`../assets/img/3.jpeg`) },
      { id: 2, image: require(`../assets/img/2.jpeg`) },
      { id: 3, image: require(`../assets/img/1.jpeg`) },
    ];
    var interval = 0;
    if (interval === 2) {
      console.log;
      interval = 0;
    }
    setInterval(function () {
      console.log("hi :>> ", interval);
      self.mainImageSrc =
        self.images[utilService.getRandomIntInclusive(0, 2)].image;
      this.mainImageSrc = self.mainImageSrc;
      console.log("object :>> ", self.mainImageSrc);
      console.log("this.mainImageSrc :>> ", this.mainImageSrc);
    }, 8000);
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
