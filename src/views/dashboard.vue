<template>
  <section v-if="info" class="dashboard app-main">
    <h1>Merchandise Data:</h1>
    <div class="data-container">
      <data-chart :info="info" class="data-chart" />
      <toy-chart :info="info" class="toy-chart" />
    </div>
  </section>
</template>

<script>
import dataChart from "../components/data-chart.vue";
import toyChart from "../components/toy-chart.vue";
export default {
  data() {
    return {};
  },
  components: {
    dataChart,
    toyChart,
  },
  created() {
    this.$store.dispatch({ type: "loadToys" });
  },
  computed: {
    toys() {
      return this.$store.getters.toys;
    },
    info() {
      if (!this.toys.length) return null;
      var storetoys = JSON.parse(JSON.stringify(this.toys));
      var dataLables = [];
      var filterToys = storetoys.filter((toy) => {
        if (toy.labels) return toy;
      });
      filterToys.forEach((toy) => {
        toy.labels.forEach((label) => {
          dataLables.push(label);
        });
      });
      var res = dataLables.reduce((acc, lable) => {
        if (acc[lable]) acc[lable]++;
        else acc[lable] = 1;
        return acc;
      }, {});
      console.log("res", res);
      return res;
    },
  },
  watch: {
    info() {
      console.log("MEMEME", this.info);
    },
  },
};
</script>
