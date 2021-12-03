<template>
  <section class="filter-explore">
    <div class="category-selection-container">
      <h6>Select Category</h6>
      <ul class="grid">
        <li
          class="category-card flex"
          v-for="category in categories"
          :key="category.id"
          @click="setFilter(category.value)"
        >
          <img :src="require(`@/assets/icons/${category.iconUrl}`)" />
          <p>{{ category.categoryName }}</p>
        </li>
      </ul>
    </div>

    <div class="select-filters"></div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      sortOptions: ["Price"],
      filterBy: {
        badget: "",
        category: "",
        deliveyTime: "",
        sort: "",
      },
      categories: [
        {
          categoryName: "All",
          value: "",
          iconUrl: "grid.png",
        },
        {
          categoryName: "Cartoons & Comics",
          value: "cartoonAndComic",
          iconUrl: "comic-book.png",
        },
        {
          categoryName: "Logo Design",
          value: "logoDesign",
          iconUrl: "logo-design.png",
        },
        {
          categoryName: "Illustration",
          value: "Illustration",
          iconUrl: "illustration.png",
        },
        {
          categoryName: "Social Media Marketing",
          value: "socialMediaMarketing",
          iconUrl: "SocialMediaMarketing.png",
        },
        {
          categoryName: "Visual Effects",
          value: "visualEffct",
          iconUrl: "visual-effects.png",
        },
      ],
    };
  },

  methods: {
    setFilter(category) {
      this.filterBy.category = category;
      this.$emit("setFilter", this.filterBy);
    },
  },
};
</script>

<style scoped>
</style>

