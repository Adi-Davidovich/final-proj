<template>
  <section class="home app-main main-layout">
    <div class="hero main-layout full hero-container"></div>

    <h2 class="homePage-title">Popular professional services</h2>

    <div class="cards-container">
      <div class="card-filter" @click="setCategory('logoDesign')">
        <p>Build your brand <span class="filterTitle"> Logo Design</span></p>
        <img src="../assets/img/logo-design.jpg" />
      </div>

      <div class="card-filter" @click="setCategory('illustration')">
        <p>Color your dreams <span class="filterTitle" >Illustration</span></p>
        <img src="../assets/img/illustration.jpg" />
      </div>

      <div class="card-filter" @click="setCategory('voiceOver')">
        <p>Share your message <span class="filterTitle">Voice Over</span></p>
        <img src="../assets/img/voiceover.jpg" />
      </div>

      <div class="card-filter" @click="setCategory('videoExplainer')">
        <p>
          Engage your audience <span class="filterTitle" >Video Explainer</span>
        </p>
        <img src="../assets/img/animated-explainer.jpg" />
      </div>

      <div class="card-filter" @click="setCategory('socialMediaMarketing')">
        <p>Reach more customers <span class="filterTitle">Social Media</span></p>
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
      </div>
    </div>
  </section>
</template>

<script>
// import { eventBusService, SHOW_MSG } from '../services/event-bus.service.js'
// import {toyService} from '../services/toy.service.js'
import appHeader from "../components/app-header.vue";
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
    };
  },
  methods: {
    setCategory(category) {
      this.filterBy.category = category;
      var filterBy = this.filterBy;
      const copyFilter = JSON.parse(JSON.stringify(filterBy));
      this.$store.dispatch({ type: "setFilter", filterBy: copyFilter });
      this.$store.dispatch({ type: "loadGigs" });
      this.$router.push('/explore')
    },
  },
};
</script>
