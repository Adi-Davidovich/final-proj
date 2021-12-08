<template>
  <!-- <section v-if="isLoading">
    <p>Loading...</p>
  </section> -->
  <!-- <section v-else class="gig-edit-container app-main"> -->
  <section class="gig-edit-container app-main">
    <h3 v-if="gigToEdit">{{ title }}</h3>
    <form v-if="gigToEdit" @submit.prevent="save" class="gig-edit-form">
      <input type="text" placeholder="title" v-model="gigToEdit.title" />
      <input type="price" placeholder="price" v-model="gigToEdit.price" />

      <el-select v-model="gigToEdit.labels" multiple placeholder="Select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <button>Save</button>
    </form>
    <router-link class="router-link-btn" to="/">Back</router-link>
  </section>
</template>

<script>
import { showMsg } from "../services/event-bus-service.js";
import { gigService } from "../services/gig.service.js";

export default {
  name: "gigEdit",
  components: {},
  data() {
    return {
      gigToEdit: null,
      options: [
        {
          value: "On wheels",
          label: "On wheels",
        },
        {
          value: "Box game",
          label: "Box game",
        },
        {
          value: "Art",
          label: "Art",
        },
        {
          value: "Baby",
          label: "Baby",
        },
        {
          value: "Doll",
          label: "Doll",
        },
        {
          value: "Puzzle",
          label: "Puzzle",
        },
        {
          value: "Outdoor",
          label: "Outdoor",
        },
      ],
      value1: [],
      value2: [],
    };
  },
  created() {
    this.loadGig();
    // if (this.gigId) {
    //   this.$store
    //     .dispatch({ type: "setCurrGig", gigId: this.gigId })
    //     .then(() => (this.gigToEdit = this.$store.getters.getCurrGig));
    // } else {
    //   this.$store
    //     .dispatch({ type: "setNewGig" })
    //     .then(() => (this.gigToEdit = this.$store.getters.getCurrGig));
    // }
    // this.$store.dispatch({ type: "loadEdit" });
    // console.log(this.gigToEdit);
  },
  computed: {
    gigId() {
      console.log(this.$route.params.gigId);
      return this.$route.params.gigId;
    },
    getCurrentGig() {
      return this.$store.getters.getCurrGig;
    },
    title() {
      return this.gigId ? "Edit Gig" : "Add Gig";
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  methods: {
    async loadGig() {
      if (this.gigId) {
        const gig = await gigService.getById(this.gigId);
        this.gigToEdit = JSON.parse(JSON.stringify(gig));
      } else {
        this.gigToEdit = gigService.getEmptyGig();
      }
    },
    async save() {
      if (this.gigToEdit._id) {
        try {
          const savedGig = await this.$store.dispatch({
            type: "updateGig",
            gig: this.giToEdit,
          });
          showMsg(`gig with id: ${savedGig._id} edited`);
          // this.$router.push("/");
        } catch (err) {
          showMsg(`unable to edit gig with id: ${savedGig._id}`, "danger");
          console.log("Editing Error (gig-edit):", err);
        }
      } else {
        try {
          const savedGig = await this.$store.dispatch({
            type: "addGig",
            gig: this.gigToEdit,
          });
          console.log(savedGig);
          showMsg(`gig added with id: ${savedGig._id}`);
          this.gigToEdit = gigService.getEmptyGig();
          // this.$router.push("/");
        } catch (err) {
          showMsg(`unable to add gig: ${savedGig} `, "danger");
          console.log("Adding Error (gig-edit):", err);
        }
      }
    },
  },
};
</script>
