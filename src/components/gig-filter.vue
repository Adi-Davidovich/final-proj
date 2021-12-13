<template>
  <section class="filter-explore">
    <div class="category-selection-container">
      <h6>Select Category</h6>
      <ul class="grid">
        <li
          v-for="category in categories"
          :key="category.id"
          :class="`category-card ${category.class} flex ${
            category.categoryName
          } ${
            category.value === (filterBy.category || categoryName || '')
              ? 'active'
              : ''
          }`"
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
        <div class="delivery-time">
        <p>Delivery Time:</p>
        <el-select
          v-model="filterBy.deliveyTime"
          placeholder="Any"
          @change="setFilter"
        >
          <el-option
            v-for="item in deliveyTimeLabels"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        </div>
        <div class="price-slider">
          <p>Budget:</p>
          <el-slider
            :step="5"
            :max="300"
            :show-tooltip="false"
            v-model="filterBy.price"
            @change="setFilter"
          ></el-slider>
          <p>{{ priceRander }}</p>
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
              >Delivey Time</el-dropdown-item
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
          label: "Any",
          value: "",
        },
        {
          label: "Express 24H",
          value: 2,
        },
        {
          label: "Up to 3 days",
          value: 4,
        },
        {
          label: "Up to 7 days",
          value: 8,
        },
      ],
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
      if (this.filterBy.price === 300) return "Any";
      else return `Up to ${this.filterBy.price}$`;
    },
    categoryName() {
      let category = this.$store.getters.categoryName;
      if (category === "Illustration") return "Illustration";
      if (category === "Logo Design") return "Logo Design";
      if (category === "Voice Over") return "Voice Over";
      if (category === "Video Explainer") return "Video Explainer";
      if (category === "Social Media Marketing")
        return "Social Media Marketing";
      else return;
    },
  },
};
</script>

