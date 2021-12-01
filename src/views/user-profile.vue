
<template>
  <section
    v-if="loggedinUser"
    class="app-main user-profile"
    :style="{
      color: loggedinUser.color,
      backgroundColor: loggedinUser.BGColor,
    }"
  >
    <h1>{{ getUser.fullname }}</h1>
    <label>name:</label>
    <input
      type="text"
      placeholder="Your name"
      v-model="loggedinUser.fullname"
    />

    <label
      >color:
      <input ref="colorInput" type="color" v-model="loggedinUser.color" />
    </label>

    <label
      >BG color:
      <input ref="BGColorInput" type="color" v-model="loggedinUser.BGColor" />
    </label>
    <button v-on:click="changeUserPref">save</button>
    <ul>
      <li
        v-if:="loggedinUser.givenReviews"
        v-for="review in loggedinUser.givenReviews"
        :key="review._id"
      >
        {{ review.txt }}
        <router-link :to="`/user/${review.aboutUser._id}`">
          About {{ review.aboutUser.fullname }}
        </router-link>
      </li>
    </ul>

    <details>
      <summary>Full JSON</summary>
      <pre>{{ user }}</pre>
    </details>
  </section>
</template>

<script>
export default {
  name: "user-profile",
  data() {
    return {
      loggedinUser: null,
    };
  },
  created() {
    // const { userId } = this.$route.params
    // userService.getById(userId)
    //     .then(user => {
    //         console.log(user)
    //         this.user = user

    //     })
    this.loggedinUser = JSON.parse(JSON.stringify(this.$store.getters.loggedinUser));
    console.log('this.loggedinUser :>> ', this.loggedinUser);
     this.$store.dispatch({ type: "loadReviews" , userId: this.loggedinUser._id});
    this.$store.dispatch({ type: "loadAndWatchUser", userId: this.userId });
  },
  methods: {
    changeUserPref() {
      // var userToSave = { ...this.user }
      this.$store
        .dispatch({ type: "updateUserPref", loggedinUser: this.loggedinUser })
        .then(() => {
          // showMsg(`user updated `)
          this.$router.push("/toy-app");
        });
    },
    showName() {
      var nameCopy = this.$store.state.loggedinUser.fullname;
      this.name = nameCopy;
    },
  },
  computed: {
    getUser() {
      return this.$store.getters.loggedinUser;
    },
    user() {
      return this.$store.getters.watchedUser;
    },
    userId() {
      return this.$route.params.userId;
    },
  },
  // watch: {
  //   userId: {
  //     handler() {
  //       this.$store.dispatch({ type: "loadAndWatchUser", userId: this.userId });
  //     },
  //     immediate: true,
  //   },
  // },
};
</script>