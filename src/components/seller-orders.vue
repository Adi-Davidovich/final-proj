
<template>
  <section class="page-container">
    <table class="orders-table">
      <tr>
        <th></th>
        <th>BUYER</th>
        <th>GIG</th>
        <th>DATE</th>
        <th>DUE ON</th>
        <th>TOTAL</th>
        <th>STATUS</th>
        <th>ACTIONS</th>
      </tr>
      <tr v-for="(order, index) in orders" :key="index">
        <td class="image">
          <avatar :size="30" :username="order.buyer.username" class="avatar" :src="require(`@/assets/img/demo-data-img/${order.buyer.imgUrl}`)"></avatar>
        </td>
        <td>
          {{ order.buyer.username }}
        </td>
        <td class="gig-description">{{ order.gig.package.description }}</td>
        <td>{{ orderDate(order) }}</td>
        <td>{{ order.timeToDeliver }} Days</td>
        <td>${{ order.price }}</td>
        <td :class="order.status === 'Complete' ? 'complete' : 'pending'">
          {{ order.status }}
        </td>
        <td>
          <el-tooltip content="Mark as complete" placement="top">
            <i @click="orderReady(order)" class="fas fa-check-circle fa-lg"></i>
          </el-tooltip>
        </td>
      </tr>
    </table>
  </section>
</template>


<script>
import Avatar from "vue-avatar";

export default {
  name: "seller-orders",
  data() {
    return {};
  },
  computed: {
    orders() {
      return this.$store.getters.orders;
    },
  },
  methods: {
    orderReady(order) {
      this.$store.dispatch({ type: "updateOrder", order });
    },
    orderDate(order) {
      return new Date(order.createdAt).toDateString();
    },
  },
  components: {
    Avatar,
  },
};
</script>

<style>
</style>