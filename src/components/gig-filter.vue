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

    <div class="select-filters">
      <el-select
        v-model="value2"
        multiple
        collapse-tags
        placeholder="Seller Details"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select
        multiple
        collapse-tags
        style="margin-left: 20px"
        placeholder="Sort"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select
        v-model="value2"
        multiple
        collapse-tags
        style="margin-left: 20px"
        placeholder="Budget"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      filterBy: {
        badget: "",
        category: "",
        deliveyTime: "",
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
      if(category){
        this.filterBy.category = category;
      }
      this.$emit("setFilter", this.filterBy);
    },
  },
};
</script>

<style scoped>
</style>

