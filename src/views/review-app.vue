<template>
  <div class="container home app-main">
    <ul class="review-list">
      <li v-for="review in reviews" :key="review._id">
        <p>
          About
          <router-link :to="`Gig/${review.aboutGigId}`">
            {{review.aboutGigId}}
          </router-link> 
        </p>
        <h3>{{review.txt}}</h3>
        <p>By 
          <router-link :to="`user/${review.byUser}`">
            {{review.byUser.fullname}}
          </router-link>
        </p>
        <hr />
      </li>
    </ul>
    <hr />
    <form v-if="loggedInUser" @submit.prevent="addReview()">
      <h2>Your gossip:</h2>
      <select v-model="reviewToEdit.aboutUserId">
        <option v-for="user in users" :key="user._id" :value="user._id" >
          {{user.fullname}}
        </option>
      </select>
      <textarea placeholder="Your Opinion Matters..." v-model="reviewToEdit.txt"></textarea>
      <button>Save</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      reviewToEdit: {
        txt: '',
        aboutUserId: null
      }
    }
  },
  computed: {
    reviews() {
      return this.$store.getters.reviews;
    },
    users() {
      return this.$store.getters.users
    },
    loggedInUser() {
      return this.$store.getters.loggedinUser
    }
  },
  created() {
    this.$store.dispatch({type: 'loadUsers'})
    this.$store.dispatch({type: 'loadReviews'})
  },
  methods: {
    async addReview() {
    
      await this.$store.dispatch({type: 'addReview', review: this.reviewToEdit})
      this.reviewToEdit = {txt: '', aboutUserId: null}
    }
  }
}
</script>
