<template>
  <section class="bgc-grey grid-narrow">
    <section v-if="gigToEdit" class="edit-gig-container">
      <div class="gig-title grid-div">
        <p>Gig Title:</p>
        <el-input
          type="textarea"
          v-model="gigToEdit.title"
          class="title"
          placeholder="I will do something i'm really goo at"
        ></el-input>
      </div>

      <div class="gig-category grid-div">
        <p>Category:</p>
        <el-select v-model="gigToEdit.category" placeholder="Category">
          <el-option
            v-for="item in categories"
            :key="item.label"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>

      <div class="price grid-div">
        <p>Price (US$):</p>
        <el-input
          type="number"
          placeholder="Price"
          v-model="gigToEdit.price"
        ></el-input>
      </div>

      <div class="image-upload grid-div">
        <p>Images:</p>
        <img-upload></img-upload>
      </div>

      <div class="package">
        <p class="package-title">What's in the package:</p>
        <div class="day-to-deliver grid-div">
          <p>Dellvery Time (Days):</p>
          <el-input
            type="number"
            placeholder="Dellvery Time"
            v-model="gigToEdit.package.timeToDeliver"
          ></el-input>
        </div>
        <div class="description grid-div">
          <p>Description:</p>
          <el-input
            type="textarea"
            v-model="gigToEdit.package.description"
            placeholder="Describe you're gig"
          ></el-input>
        </div>

        <div class="revision grid-div">
          <p>Revision:</p>
          <el-input
            type="number"
            placeholder="Dellvery Time"
            v-model="gigToEdit.package.revisions"
          ></el-input>
        </div>
      </div>
      <div class="btn-div">
        <button @click="save">Create Gig</button>
      </div>
    </section>
  </section>
</template>


<script>
import { gigService } from "../services/gig.service.js";
import imgUpload from "../components/img-upload.vue";
export default {
  data() {
    return {
      gigToEdit: null,

      categories: [
        "Illustration",
        "Logo Design",
        "Voice Over",
        "Social Media Marketing",
        "Video Explainer",
      ],
    };
  },
  created() {
    this.loadGig();
  },
  computed: {
    gigId() {
      return this.$route.params.gigId;
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
          console.log("GigToEdit");
          await this.$store.dispatch({
            type: "updateGig",
            gig: this.gigToEdit,
          });
          this.$router.push("/user");
        } catch (err) {
          console.log("Editing Error (gig-edit):", err);
        }
      } else {
        try {
          const savedGig = await this.$store.dispatch({
            type: "addGig",
            gig: this.gigToEdit,
          });
          console.log(savedGig);
          this.gigToEdit = gigService.getEmptyGig();
          this.$router.push("/user");
        } catch (err) {
          console.log("Adding Error (gig-edit):", err);
        }
      }
    },
  },
  components: {
    imgUpload,
  },
};
</script>

<style>
</style>