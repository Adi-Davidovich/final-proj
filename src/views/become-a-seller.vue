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
        <p>Profile Picture:</p>
        <avatar-upload></avatar-upload>
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
        <p>Languages:</p>
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
        <button @click="becomeASeller">Continue</button>
        <button @click="becomeASeller" class="btn-skip">Skip</button>
      </div>
    </div>
  </section>
</template>

<script>
import { gigService } from "../services/gig.service.js";
import avatarUpload from "../components/avatar-upload.vue";
export default {
  name: "becomeASeller",
  data() {
    return {
      user: this.$store.getters.loggedinUser,
      sellerDetails: {
        imgUrl: "",
        description: "",
        languges: [],
        reviwes: [],
      },

      firstName: "",
      lastName: "",

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
    async becomeASeller() {
      // this.user.fullName = this.firstName + " " + this.lastName;
      this.user = { ...this.user, ...this.sellerDetails, isSeller: true };
      await this.$store.dispatch({ type: "updateUser", user: this.user });
      this.$router.push("/user");
    },
  },

  components: {
    avatarUpload,
  },
};
</script>
