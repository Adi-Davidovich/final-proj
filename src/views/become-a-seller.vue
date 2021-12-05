<template>
  <section class="become-a-seller">
      <div class="become-a-seller-hero">
        <h1>Work Your Way</h1>
        <p>You bring the skill. We'll make earning easy.</p>
      </div>
    <div class="personal-info-layout">
      <div class="personal-info-header">
        <h4>Personal Info</h4>
        <p>
          Tell us a bit about yourself. This information will appear on your
          public profile, so that potential buyers can get to know you better.
        </p>
      </div>
      <div class="grid-personal-info">
        <p>Full Name:</p>
        <div>
          <el-input
            placeholder="First Name"
            v-model="sellerDetails.fullName.firstName"
            required
          ></el-input>
          <el-input
            placeholder="Last Name"
            v-model="sellerDetails.fullName.lastName"
            required
          ></el-input>
        </div>
      </div>
      <div class="grid-personal-info">
        <p>Profile Picture:</p>
        <el-input
          placeholder="Picture"
          v-model="sellerDetails.imgUrl"
        ></el-input>
      </div>
      <div class="description grid-personal-info">
        <p>Description:</p>
        <el-input
          type="textarea"
          v-model="sellerDetails.description"
          :placeholder="textAreaPlaceholder"
        ></el-input>
      </div>

      <div class="grid-personal-info">
        <p>Languges:</p>
        <el-select
          v-model="sellerDetails.languges"
          multiple
          placeholder=" Languages you can communicate"
        >
          <el-option
            v-for="item in Languges"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <div class="btn">
        <button @click="saveSeller">Continue</button>
        <button class="btn-skip">Skip</button>
      </div>
    </div>
  </section>
</template>

<script>
import { gigService } from "../services/gig.service.js";
export default {
  name: "becomeASeller",
  data() {
    return {
      sellerDetails: {
        fullName: {
          firstName: "",
          lastName: "",
        },
        imgUrl: "",
        description: "",
        languges: [],
      },

      categories: [
        "WordPress",
        "Website Design",
        "Logo Design",
        "Illustration",
        "Social Media Marketing",
        "Translation",
        "Visual Effects",
        "Voice Over",
        "Podcast Editing",
        "Mobile Apps",
      ],

      Languges: [
        { label: "English", value: "english" },
        { label: "Hebrew", value: "hebrew" },
        { label: "Russian", value: "russian" },
      ],

      textAreaPlaceholder:
        "Share a bit about your work experience, cool projects youwve completed, and your area of expertise.",
    };
  },

  methods: {
    saveSeller() {
      return;
    },
  },
};
</script>
