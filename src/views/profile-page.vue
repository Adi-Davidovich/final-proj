<template>
  <section class="main-layout">
    <section class="profile-layout">
      <section class="page-container">
        <section class="left-side">
          <div class="details">
            <avatar
              :size="150"
              :username="user.username"
              :src="user.imgUrl"
            ></avatar>
            <h2>{{ user.username }}</h2>
            <h2>Member since</h2>
          </div>
        </section>

        <section class="right-side">
          <section v-if="sellerMode" class="seller-profile">
            <div class="seller-header regular-btn">
              <p>Avctive Gigs</p>
              <router-link to="/gig/edit">Create New Gig</router-link>
            </div>
            <ul class="gig-list-user">
              <li v-for="(gig,index) in gigs" :key="index">
                <gig-preview :gig="gig" />
                <div class="gig-tools regular-btn">
                  <button @click="editGig(gig._id)">Edit</button>
                  <button @click="removeGig(gig._id)">Delete</button>
                </div>
              </li>
            </ul>
          </section>

          <section v-else class="user-profile"></section>
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import Avatar from "vue-avatar";
import GigPreview from "../components/gig-preview.vue";

export default {
  data() {
    return {
      user: null,
      filterBy: {
        userId: "",
      },
    };
  },
  created() {
    this.user = this.$store.getters.loggedinUser;
    this.filterBy.userId = this.user._id;
    this.$store.dispatch({ type: "getUserGigs", filterBy: this.filterBy });
  },
  computed: {
    gigs() {
      return this.$store.getters.gigsToShow;
    },
    sellerMode() {
      if (this.user.hasOwnProperty("sellerDetails")) return true;
    },
  },

  methods: {
    removeGig(gigId) {
      this.$store.dispatch({ type: "removeGig", gigId });
    },

    editGig(gigId) {
      this.$router.push(`/gig/edit/${gigId}`);
    },
  },

  components: {
    Avatar,
    GigPreview,
  },
};
</script>

<style>
</style>