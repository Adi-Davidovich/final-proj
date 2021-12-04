<template>
  <section>
    <app-header></app-header>
      <user-msg />
    <router-view class="main-layout main-app main "></router-view>
    <app-footer></app-footer>
  </section>
</template>

<script>
import appHeader from "./src/components/app-header.vue";
import userMsg from "./src/components/user-msg.vue";
import appFooter from "./src/components/app-footer.vue";

export default {
  name: "app",
  components: {
    userMsg,
    appHeader,
    appFooter,
  },
};
</script>
