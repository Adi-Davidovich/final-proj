<template>
  <section class="home app-main main-layout">
    <!-- <div class="main-layout full">
      <div
        class="hero hero-container"
        :style="{ backgroundImage: `url(${mainImageSrc})` }"
      >
        <div class="below-hero main-layout">
          <div class="rate-hero"><i class="fas fa-star"></i>{{ stars }}</div>
          <p class="txt-hero">{{ hero }}</p>
        </div>
      </div>
    </div> -->
    <div class="main-content full">
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
              {{ hero.name }}, <b>{{ hero.subTitle }}</b>
            </p>
          </div>
        </div>
      </div>
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
              /><button
                class="submit-button"
              >
                Search
              </button>
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
        txt: "",
        price: 0,
        category: "",
        deliveyTime: "",
        sort: "",
      },
      heroIdx: 0,
      imgs: [],
      mainImageSrc: require(`../assets/img/1.jpeg`),
      star: "",
      hero: "",
    };
  },
  created() {
    let self = this;
    this.heroes = [
      {
        id: 1,
        image: require(`../assets/img/3.jpeg`),
        backgroundColor: "#ffffff",
        name: "Andrea",
        subTitle: "Something",
      },
      {
        id: 2,
        image: require(`../assets/img/2.jpeg`),
        backgroundColor: "#ffffff",
        name: "Andrea",
        subTitle: "Something",
      },
      {
        id: 3,
        image: require(`../assets/img/1.jpeg`),
        backgroundColor: "#ffffff",
        name: "Andrea",
        subTitle: "Something",
      },
    ];

    setInterval(() => {
      this.heroIdx = (this.heroIdx + 1) % this.heroes.length;
    }, 3000);
    // var interval = 0;
    // if (interval === 2) {
    //   interval = 0;
    // }
    // setInterval(function () {
    //   // console.log("hi :>> ", interval);
    //   var num = utilService.getRandomIntInclusive(0, 2);
    //   self.mainImageSrc = self.images[num].image;
    //   self.star = self.stars[num];
    //   self.hero = self.heroText[num];
    //   // console.log('star',self.stars[num])
    //   // console.log('hero', self.heroText[num])
    //   this.mainImageSrc = self.mainImageSrc;
    //   // console.log("object :>> ", self.mainImageSrc);
    //   // console.log("this.mainImageSrc :>> ", this.mainImageSrc);
    // }, 8000);
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
