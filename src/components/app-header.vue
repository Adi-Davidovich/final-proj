
<template>
  <header class="app-header">
    <div class="logo">
      <h1><i class="fas fa-dice"></i>Toys</h1>
    </div>
    <router-link  v-if="user" :to="'/user/' + user._id">Hi {{ user.fullname }}</router-link>
    <nav>
      <router-link active-class="active-link" to="/" exact>Home</router-link> |
      <router-link to="/explore">Explore</router-link> |
      <router-link to="/dashboard">Dashboard</router-link> |
      <router-link to="/review">Reviews</router-link>|
      <router-link to="/chat">Chat</router-link>|
      <router-link to="/login">Login / Signup</router-link>|
      <router-link to="/about">About</router-link>
    </nav>
  </header>
</template>

<script>
// import userMsg from '../components/user-msg.cmp.js'
export default {
  name: "app-header",
  data() {
    return {};
  },
  computed: {
    user() {
      console.log('this.$store.getters.loggedinUser :>> ', this.$store.getters.loggedinUser);
      return this.$store.getters.loggedinUser;
    },
  },
  components: {},
};
</script>

