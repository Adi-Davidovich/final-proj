<template>
  <section>
    <app-header></app-header>
      <user-msg />
    <router-view class="main-layout main-app main "></router-view>
    <!-- <footer><p>Coffeerights 2021</p></footer> -->
  </section>
</template>

<script>
import appHeader from "./src/components/app-header.vue";
import userMsg from "./src/components/user-msg.vue";

export default {
  name: "app",
  components: {
    userMsg,
    appHeader,
  },
};
</script>
