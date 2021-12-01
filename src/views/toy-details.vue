<template>
  <section v-if="toy" class="toy-details app-main">
    <h6>Details:</h6>
    <p><span>Pruduct:</span>{{ toy.name }}</p>
    <p><span>Price:</span>{{ toy.price }}</p>
    <p><span>In stock:</span>{{ toy.inStock }}</p>
    <p>Labels:</p>
    <span>{{ toy.labels }}</span>
    <!-- <img :src="require(`@/img/${toy.name}.jpg`)" alt="" /> -->
    <br />
    <h6>Reviews:</h6>
    <ul v-if="reviews">
      <li v-for="(review, idx) in reviews" :key="idx">{{ review.txt }}</li>
    </ul>

    <form v-if="loggedInUser" @submit.prevent="addReview()">
      <h2>Add review!</h2>
      <textarea
        placeholder="Your Opinion Matters..."
        rows="4"
        cols="50"
        v-model="reviewToEdit.txt"
      ></textarea>
      <button>Save</button>
    </form>

    <router-link to="/toy-app">Back</router-link>
  </section>
</template>

<script>
import { toyService } from "../services/toy.service.js";

export default {
  name: "toy-details",

  data() {
    return {
      toy: null,
      reviewToEdit: {
        txt: "",
        aboutToyId: null 
      },
    };
  },
  created() {
    this.loadToy()
  },
  computed: {
    reviews() {
      return this.$store.getters.reviews;
    },
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
  },
  methods: {
    loadToy() {
      const id = this.$route.params.toyId;
      toyService.getById(id).then((toy) => {
        this.toy = toy;
        this.reviewToEdit.aboutToyId = toy._id;
        console.log('this.reviewToEdit :>> ', this.reviewToEdit);
        this.$store.dispatch({ type: "loadReviews" , id: this.toy._id});
      });
    },
    async addReview() {
      await this.$store.dispatch({type: "addReview", review: this.reviewToEdit,});
      this.reviewToEdit = { txt: "", aboutUserId: null };
    },
  },
  watch: {
    "$route.params.toyId"(id) {
      console.log("Changed to", id);
      this.loadToy();
    },
  },
  components: {},
};
</script>