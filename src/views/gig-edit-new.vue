<template>
  <section>
    <div class="gig-title">
      <p>Gig Title:</p>
      <el-input
        type="textarea"
        v-model="newGig.title"
        placeholder="I will do something i'm really goo at"
      ></el-input>
    </div>

    <div class="gig-category">
      <p>Category:</p>
      <el-select v-model="newGig.category" placeholder="Category">
        <el-option
          v-for="item in categories"
          :key="item.label"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </div>

    <div>
      <p>Description:</p>
      <el-input
        type="textarea"
        v-model="newGig.description"
        placeholder="Describe you're gig"
      ></el-input>
    </div>

          <el-input placeholder="Picture" v-model="sellerDetails.imgUrl"></el-input>
  </section>
</template>


    //   title: '',
    // description: '',
    // category: '',
    // price: null,
    // timeToDeliver: '',
    // imgUrl: '',

<script>
import { gigService } from "../services/gig.service.js";
export default {
  data() {
    return {
      newGig: gigService.getEmptyGig(),

      categories: [
        "Illustration",
        "Logo Design",
        "Voice Over",
        "Social Media Marketing",
        "Video Explainer",
      ],
    };
  },
};
</script>

<style>
</style>