<template>
  <section>
    <h1>Work Your Way</h1>
    <h3>You bring the skill. We'll make earning easy.</h3>
    <form @submit.prevent="save">
      <label>
        Full Name
        <input v-model="gigDetails.owner.fullname" type="text" placeholder="" />
      </label>

      <label>
        Category
        <select v-model="gigDetails.category" name="category" id="category">
          <option
            v-for="category in categories"
            :key="category"
            value="category"
          ></option>
        </select>
      </label>

      <label>
        Title
        <input v-model="gigDetails.title" type="text" placeholder="I will.." />
      </label>

      <label>
        Price
        <input
          v-model="gigDetails.price"
          type="number"
          placeholder="I will.."
        />
      </label>

      <label>
        Time to deliver
        <input v-model="gigDetails.timeToDeliver" type="number" />
      </label>

      <label>
        Description
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
        ></textarea>
      </label>
      <button>Save</button>
    </form>
  </section>
</template>

<script>
import { gigService } from "../services/gig.service.js";
export default {
  name: "becomeASeller",
  data() {
    return {
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

      gigDetails: gigService.getEmptyGig(),
    };
  },

  methods: {
    save() {
      return
    },
  },
};
</script>
