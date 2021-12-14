<template>
  <section class="page-container seller-dashboard">
    <div class="dashboard-left">
      <div class="orders-overview">
        <div class="total-orders details-flex">
          <p>Total orders:</p>
          <h3>{{ orders.length }}</h3>
        </div>
        <div class="pending-orders details-flex">
          <p>Pending:</p>
          <h3>
            {{ pendingOrders }} <span>({{ percent(pendingOrders) }})</span>
          </h3>
        </div>
        <div class="completed-orders details-flex">
          <p>Completed:</p>
          <h3>
            {{ completedOrders }}<span>({{ percent(completedOrders) }})</span>
          </h3>
        </div>
        <div class="top-sales details-flex">
          <p>Top Selling Category:</p>
          <h3>{{ topSeller }}<span></span></h3>
        </div>
      </div>
    </div>
    <div class="dashboard-right">
      <pie-chart class="pie-chart" :info="info"></pie-chart>
    </div>
  </section>
</template>

<script>
import PieChart from "../components/data-chart.vue";
export default {
  computed: {
    orders() {
      return this.$store.getters.orders;
    },
    info() {
      if (!this.orders) return null;
      let storeOrders = JSON.parse(JSON.stringify(this.orders));
      let res = storeOrders.reduce((acc, order) => {
        if (acc[order.gig.category]) acc[order.gig.category]++;
        else acc[order.gig.category] = 1;
        return acc;
      }, {});
      return res;
    },

    pendingOrders() {
      let ordersCopy = JSON.parse(JSON.stringify(this.orders));
      let pendingOrders = ordersCopy.filter(
        (order) => order.status === "Pending"
      );
      return pendingOrders.length;
    },
    completedOrders() {
      let ordersCopy = JSON.parse(JSON.stringify(this.orders));
      let pendingOrders = ordersCopy.filter(
        (order) => order.status === "Complete"
      );
      return pendingOrders.length;
    },
    topSeller() {
      return Object.keys(this.info).reduce((a, b) =>
        this.info[a] > this.info[b] ? a : b
      );
    },
  },
  methods: {
    percent(num) {
      return `${((num / this.orders.length) * 100).toFixed()}%`;
    },
  },
  components: {
    PieChart,
  },
};
</script>

<style>
</style>