<template>
  <section class="filter-explore">
    <div class="category-selection-container">
      <h6>Select Category</h6>
      <ul class="grid">
        <li
          v-for="(category) in categories"
          :key="category.id"
          :class="`category-card ${category.class} flex ${category.categoryName} ${category.value === filterBy.category ? 'active' : ''}`"
          @click="setCategory(category.value)"
        >
          <img
            :src="require(`@/assets/img/category-img/${category.iconUrl}`)"
          />
          <p>{{ category.categoryName }}</p>
        </li>
      </ul>
    </div>

    <div class="select-filters">
      <div class="filter-left">
        <el-select
          v-model="filterBy.deliveyTime"
          multiple
          :multiple-limit="1"
          placeholder="Delivery Time"
        >
          <el-option
            v-for="item in deliveyTimeLabels"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <div class="price-slider">
          <p>Budget:</p>
          <el-slider
            :step="5"
            :max="300"
            :show-tooltip="false"
            v-model="filterBy.price"
            @change="setFilter"
          ></el-slider>
          <p>Up to {{ priceRander }}</p>
        </div>
      </div>

      <div class="filter-right">
        <p>Sort by:</p>
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
          value: 1,
        },
        {
          label: "Up to 3 days",
          value: 3,
        },
        {
          label: "Up to 7 days",
          value: 7,
        },
      ],
      sortLabels: [
        {
          label: "Price",
          value: "price",
        },
      ],
      filterBy: {
        txt: "",
        price: 300,
        category: "",
        deliveyTime: "",
        sort: "",
        sellerDetails: {
          level: "",
          rating: "",
          languge: "",
        },
      },
      categories: [
        {
          class: "all",
          categoryName: "All",
          value: "",
          iconUrl: "grid.png",
        },
        {
          class: "illustration",
          categoryName: "Illustration",
          value: "Illustration",
          iconUrl: "illustration.png",
        },
        {
          class: "logo-design",
          categoryName: "Logo Design",
          value: "Logo Design",
          iconUrl: "logo-design.png",
        },
        {
          class: "voice-over",
          categoryName: "Voice Over",
          value: "Voice Over",
          iconUrl: "voice-over.png",
        },
        {
          class: "social-media",
          categoryName: "Social Media Marketing",
          value: "Social Media Marketing",
          iconUrl: "social-media.png",
        },
        {
          class: "video-explainer",
          categoryName: "Video Explainer",
          value: "Video Explainer",
          iconUrl: "video-tutorial.png",
        },
      ],
    };
  },

  methods: {
    setFilter() {
      this.$emit("setFilter", this.filterBy);
    },
    setCategory(category) {
      this.filterBy.category = category;
      this.setFilter();
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

    priceRander() {
      if (this.filterBy.price === 0) return "Any";
      else return `${this.filterBy.price}$`;
    },
  },
};
</script>

