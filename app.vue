<template>
  <section>
    <app-header></app-header>
      <user-msg />
    <router-view></router-view>
    <footer><p>Coffeerights 2021</p></footer>
  </section>
</template>

<script>
import appHeader from "./src/components/app-header.vue";
import userMsg from "@/components/user-msg.vue";
export default {
  name: "app",
  components: {
    userMsg,
    appHeader,
  },
};
</script>
