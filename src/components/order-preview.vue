<template>
  <div class="purchase-container">
    <div class="order-info">
      <header>
        <div class="title">
          <span class="text">Order Details</span>
          <span class="price">${{ gig.price }}</span>
        </div>
        <p>{{ gig.package.description }}</p>
      </header>
      <article>
        <div class="additional-info">
          <div class="delivery-wrapper">
            <div class="icon"><i class="far fa-clock"></i></div>
            <div class="delivery">{{ gig.package.timeToDeliver }} Days Delivery</div>
          </div>
          <div class="revisions-wrapper">
            <div class="icon"><i class="fas fa-sync-alt"></i></div>
            <div class="revisions">{{ gig.package.revisions }} Revisions</div>
          </div>
        </div>
        <div class="fetures">
          <ul>
            <li v-for="(option, idx) in options" :key="idx">
              <i class="fas fa-check"></i> 
              <span>{{ option }}</span>
            </li>
          </ul>
        </div>
      </article>
      <footer>
        <button class="btn-purchase" @click="orderCheckout">Continue (${{ gig.price }})</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "order-preview",
  props: ["gig"],
  data() {
    return {
      options: [
        "3 Initial Concepts Included",
        "Source File",
        "Logo Transparency",
        "High Resolution",
        "Vector File",
      ],
    };
  },
  methods: {
      orderCheckout() {
          this.$router.push('/checkout/'+this.gig._id)
      }
  }
};
</script>

<style>
</style>