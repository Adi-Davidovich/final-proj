<template>
  <section class="toy-filter">
    <label>
      Search a toy:
      <input
        @input="setFilter"
        placeholder="Search...."
        v-model="filterBy.name"
    /></label>
    <label>
      Stock:
      <select @change="setFilter" v-model="filterBy.inStock">
        <option value="">All</option>
        <option value="true">In stock</option>
        <option value="false">Not in stock</option>
      </select>
    </label>
    <label>
      Labels:

      <el-select v-model="filterBy.lable"  @change="setFilter" name="filter" multiple placeholder="Select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <!-- <select @change="setFilter" v-model="filterBy.lable">
        <option value="">All</option>
        <option value="On wheels">On wheels</option>
        <option value="Box game">Box game</option>
        <option value="Art">Art</option>
        <option value="Baby">Baby</option>
        <option value="Doll">Doll</option>
        <option value="Puzzle">Puzzle</option>
        <option value="Outdoor">Outdoor</option>
      </select> -->
      <label>
        Sort By:
        <select @change="setSort" v-model="sortBy">
          <option value="time">Time</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
      </label>
    </label>
    <!-- <div class="paging-section">
      <span v-for="page in pages" :key="page">
        <button @click="changePage(page - 1)">{{ page }}</button>
      </span>
    </div> -->
  </section>
</template>

<script>
import { utilService } from "../services/util.service.js";

export default {
  name: "toy-filter",
  props: {},
  data() {
    return {
      filterBy: {
        name: "",
        lable: "",
        inStock: null,
        pageIdx: 0,
      },
      sortBy: "",
      options: [{
          value: 'On wheels',
          label: 'On wheels'
        }, {
          value: 'Box game',
          label: 'Box game'
        }, {
          value: 'Art',
          label: 'Art'
        }, {
          value: 'Baby',
          label: 'Baby'
        }, {
          value: 'Doll',
          label: 'Doll'
        },
        {
          value: 'Puzzle',
          label: 'Puzzle'
        },
        {
          value: 'Outdoor',
          label: 'Outdoor'
        }],
        value1: [],
        value2: []
    };
  },
  created() {
    this.setFilter = utilService.debounce(this.setFilter, 1000);
  },
  methods: {
    setFilter() {
      this.$emit("filtered", this.filterBy);
    },
    setSort() {
      this.$emit("sorted", this.sortBy);
    },
    changePage(pageNum) {
      this.filterBy.pageIdx = pageNum;
      this.setFilter();
    },
  },
  computed: {
    pages() {
      console.log(Math.ceil(this.$store.getters.getNumOfPages));
      return Math.ceil(this.$store.getters.getNumOfPages);
    },
  },
};
</script>


