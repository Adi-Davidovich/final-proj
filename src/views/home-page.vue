<template>
  <section class="home app-main main-layout">
    <div class="hero main-layout full hero-container">
      <img src="../assets/img/3.jpeg" />
    </div>

    <h2 class="homePage-title">Popular professional services</h2>

    <div class="cards-container">
      <div class="card-filter">
        <p>Build your brand <span class="filterTitle"> Logo Design</span></p>
        <img src="../assets/img/logo-design.jpg" />
      </div>

      <div class="card-filter">
        <p>Customize your site <span class="filterTitle">WordPress</span></p>
        <img src="../assets/img/wordpress.jpg" />
      </div>

      <div class="card-filter">
        <p>Share your message <span class="filterTitle">Voice Over</span></p>
        <img src="../assets/img/voiceover.jpg" />
      </div>

      <div class="card-filter">
          <p>Engage your audience <span class="filterTitle">Video Explainer</span></p>
        <img src="../assets/img/animated-explainer.jpg" />
      </div>

      <div class="card-filter">
        <p>Reach more customers <span class="filterTitle">Social Media</span></p>
        <img src="../assets/img/social.jpg" />
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
};
</script>
