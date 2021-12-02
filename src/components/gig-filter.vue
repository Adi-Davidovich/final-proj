<template>
  <section class="filter-explore">
    <div class="category-selection-container">
      <h6>Select Category</h6>
      <ul class="grid">
        <li
          class="category-card flex"
          v-for="category in categories"
          :key="category.id"
        >
          <img :src="require(`@/assets/icons/${category.iconUrl}`)" />
          <p>{{ category.categoryName }}</p>
        </li>
      </ul>
    </div>

    <div class="select-filters">
      <el-select v-model="value2" multiple collapse-tags placeholder="Seller Details">
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
      categories: [
        {
          categoryName: "WordPress",
          iconUrl: "newspaper.png",
        },
        {
          categoryName: "Website Design",
          iconUrl: "web-design.png",
        },
        {
          categoryName: "Logo Design",
          iconUrl: "logo-design.png",
        },
        {
          categoryName: "Illustration",
          iconUrl: "illustration.png",
        },
        {
          categoryName: "Social Media Marketing",
          iconUrl: "SocialMediaMarketing.png",
        },
        {
          categoryName: "Translation",
          iconUrl: "translation.png",
        },
        {
          categoryName: "Visual Effects",
          iconUrl: "visual-effects.png",
        },
        {
          categoryName: "Voice Over",
          iconUrl: "dubbing.png",
        },
        {
          categoryName: "Mobile Apps",
          iconUrl: "mobile-app.png",
        },
        {
          categoryName: "Podcast Editing",
          iconUrl: "edit.png",
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>

