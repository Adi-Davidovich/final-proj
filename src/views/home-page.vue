<template>
  <section class="home app-main main-layout ">
    <app-header></app-header>
    <div class="hero main-layout full hero-container">
      <img src="../assets/img/3.jpeg" />
    </div>
  </section>
</template>

<script>
// import { eventBusService, SHOW_MSG } from '../services/event-bus.service.js'
// import {toyService} from '../services/toy.service.js'
import appHeader from "../components/app-header.vue"
export default {
  name: "home-page",
  components:{
    appHeader,
 
  }
};
</script>
