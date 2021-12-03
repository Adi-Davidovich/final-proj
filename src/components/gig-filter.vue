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
      <div class="filter-left">
        <el-select  v-model="filterBy.deliveyTime" placeholder="Delivery Time">
          <el-option
            v-for="item in deliveyTimeLabels"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select class="second" v-model="filterBy.sort" placeholder="Sort">
          <el-option
            v-for="item in sortLabels"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <div class="filter-right">
        <h4>Sort by:</h4>
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ setSortLabel }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="sortBy('price')"
              >Price</el-dropdown-item
            >
            <el-dropdown-item @click.native="sortBy('deliveryTime')"
              >delivey Time</el-dropdown-item
            >
            <el-dropdown-item @click.native="sortBy('newest')"
              >Newest Arrivals</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      deliveyTimeLabels: [
        {
          label: "Express 24H",
          value: "1",
        },
        {
          label: "Up to 7 days",
          value: "7",
        },
        {
          label: "Anytime",
          value: "",
        },
      ],
      sortLabels: [
        {
          label: "Price",
          value: "price",
        },
      ],
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
      console.log(this.filterBy);
      this.$emit("setFilter", this.filterBy);
    },

    sortBy(value) {
      this.filterBy.sort = value;
      this.setFilter();
    },
  },

  computed: {
    setSortLabel() {
      if (this.filterBy.sort === "deliveryTime") return "Delivey Time";
      else if (this.filterBy.sort === "newest") return "Newest Arrivals";
      else if (this.filterBy.sort === "price") return "Price";
    },
  },
};
</script>

<style scoped>
</style>

