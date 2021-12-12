
<template>
  <section class="page-container">
    <table class="orders-table">
      <tr>
        <th></th>
        <th>BUYER</th>
        <th>GIG</th>
        <th>DUE ON</th>
        <th>TOTAL</th>
        <th>STATUS</th>
        <th>ACTIONS</th>
      </tr>
      <tr v-for="(order, index) in orders" :key="index">
        <td class="image">
          <avatar :size="30" :username="order.buyer.username" class="avatar"></avatar>
        </td>
        <td>
          {{ order.buyer.username }}
        </td>
        <td>{{ order.gig.package.description }}</td>
        <td>{{ order.timeToDeliver }}</td>
        <td>${{ order.price }}</td>
        <td :class="order.status==='Complete'?'complete':'pending'">{{ order.status }}</td>
        <td class="actions">
          <el-tooltip content="Mark as complete" placement="top">
            <i @click="orderReady(order)" class="fas fa-check-circle"></i>
          </el-tooltip>
          <i slot="reference" class="far fa-trash-alt"></i>
        </td>
      </tr>
    </table>
  </section>
</template>


<script>
import Avatar from "vue-avatar";

export default {
  name: "seller-orders",
  props: ["orders"],
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
  },
  components: {
    Avatar,
  },
};
</script>

<style>
</style>