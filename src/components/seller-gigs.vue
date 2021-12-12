<template>
  <ul class="gig-list-user gig-list">
    <li v-for="(gig, index) in gigs" :key="index">
      <gig-preview :gig="gig" />
      <div class="gig-tools">
        <el-popover placement="top" width="160" v-model="visible">
          <p>Are you sure to delete this?</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible = false"
              >cancel</el-button
            >
            <el-button type="primary" size="mini" @click="visible = false"
              >confirm</el-button
            >
          </div>
          <el-button slot="reference">Delete</el-button>
          <button>
            <i class="far fa-trash-alt btn" @click="removeGig(gig._id)"></i>
          </button>
        </el-popover>

        <i class="far fa-edit btn" @click="editGig(gig._id)"></i>
      </div>
    </li>
  </ul>
</template>

<script>
import GigPreview from "../components/gig-preview.vue";

export default {
  computed: {
    gigs() {
      return this.$store.getters.gigsToShow;
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
    GigPreview,
  },
};
</script>

<style>
</style>