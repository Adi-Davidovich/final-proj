<template>
  <section class="login-form main-app">
    <h3>Join fiverr</h3>
    <form @submit.prevent="signup">
      <el-input
        placeholder="Enter username"
        v-model="user.username"
        required
      ></el-input>
      <el-input
        placeholder="Enter pssword"
        v-model="user.password"
        type="password"
        required
      ></el-input>
      <button type="submit">Join</button>
    </form>
  </section>
</template>

<script>
import { userService } from "../services/user.service.js";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    signup() {
      userService.signup(this.nickname).then((user) => {
        this.user = user;
        this.$router.push("/");
      });
    },
  },
  mounted() {
  },
};
</script>

