<template>
  <section>
    <section @click.prevent.stop="closeModal" class="dark-bgc">
      <div @click.stop class="signup-user">
        <div class="up-header">
          <h4>{{ loginOrSignupHeader }}</h4>
        </div>
        <div class="upper-side"></div>
        <button class="google-btn">
          <svg
            width="18"
            height="19"
            viewBox="0 0 18 19"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 7.84363V11.307H13.8438C13.6365 12.428 12.9994 13.373 12.0489 14.0064V16.2534H14.9562C16.6601 14.6951 17.641 12.4029 17.641 9.67839C17.641 9.04502 17.5854 8.43176 17.4792 7.84865H9V7.84363Z"
              fill="#3E82F1"
            ></path>
            <path
              d="M9.00001 14.861C6.65394 14.861 4.67192 13.2876 3.96406 11.1714H0.955627V13.4937C2.43709 16.4142 5.48091 18.4198 9.00001 18.4198C11.432 18.4198 13.4697 17.6206 14.9562 16.2533L12.0489 14.0064C11.245 14.5443 10.2135 14.861 9.00001 14.861Z"
              fill="#32A753"
            ></path>
            <path
              d="M3.96404 5.45605H0.955617C0.348876 6.66246 0 8.02972 0 9.47238C0 10.915 0.348876 12.2823 0.955617 13.4887L3.96404 11.1714C3.78202 10.6335 3.6809 10.0605 3.6809 9.47238C3.6809 8.88426 3.78202 8.31122 3.96404 7.77336V5.45605Z"
              fill="#F9BB00"
            ></path>
            <path
              d="M0.955627 5.45597L3.96406 7.77327C4.67192 5.65703 6.65394 4.08368 9.00001 4.08368C10.3197 4.08368 11.5079 4.53608 12.4382 5.42078L15.0219 2.85214C13.4646 1.40948 11.427 0.52478 9.00001 0.52478C5.48091 0.52478 2.43709 2.53043 0.955627 5.45597Z"
              fill="#E74133"
            ></path>
          </svg>
          <p>Continue with google</p>
        </button>

        <div class="middle-line">
          <p>OR</p>
        </div>

        <div class="user-details">
          <el-input
            v-if="!loginMode"
            placeholder="Full Name"
            v-model="user.fullname"
          ></el-input>
          <el-input placeholder="Username" v-model="user.username"></el-input>
          <el-input
            placeholder="Password"
            v-model="user.password"
            type="password"
          ></el-input>
          <button @click="signupLogin">Continue</button>
        </div>
        <div class="alredy-member">
          <p>
            {{ loginOrSignupFooter }}
            <span> {{ loginOrSignupFooterSpan }}</span>
          </p>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  props: ["loginMode"],
  data() {
    return {
      user: {
        fullname: "",
        username: "",
        password: "",
        imgUrl:'avatars/boy2.jpg'
      },
    };
  },
  computed: {
    loginOrSignupFooter() {
      if (this.loginMode) return "Not a member yet?";
      else return "Already a member?";
    },
    loginOrSignupFooterSpan() {
      if (this.loginMode) return "Join now";
      else return "Sign in";
    },

    loginOrSignupHeader() {
      if (this.loginMode) return "Sign In to Fiverr";
      else return "Join Fiverr";
    },
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },

    async signupLogin() {
      if (this.loginMode) {
        if (!this.user.username || !this.user.password) {
          this.msg = "Please enter username/password";
          return;
        }
        try {
          let loginUser = await this.$store.dispatch({
            type: "login",
            userCred: {
              username: this.user.username,
              password: this.user.password,
            },
          });
          this.$emit("closeModal");
          this.$router.push("/");
        } catch (err) {
          console.log(err);
          this.msg = "Failed to login";
        }
      } else {
        try {
          await this.$store.dispatch({
            type: "signup",
            userCred: this.user,
          });

          this.$emit("closeModal");
          this.$router.push("/");
        } catch (err) {
          this.msg = "Failed to signUp";
        }
      }
    },
  },
};
</script>

<style>
</style>