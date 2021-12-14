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
            <div class="delivery">
              {{ gig.package.timeToDeliver }} Days Delivery
            </div>
          </div>
          <div class="revisions-wrapper">
            <div class="icon"><i class="fas fa-sync-alt"></i></div>
            <div class="revisions">{{ gig.package.revisions }} Revisions</div>
          </div>
        </div>
        <div class="fetures">
          <ul>
            <li v-for="(option, idx) in options" :key="idx">
              <template v-if="option.category === gig.category">
              <div v-for="(include,index) in option.included" :key="index" >
              <i class="fas fa-check"></i>
              <span >{{include}}</span>
              </div>
              </template>
            </li>
          </ul>
        </div>
      </article>
      <footer>
        <button class="btn-purchase" @click="orderCheckout">
          Continue (${{ gig.price }})
        </button>
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
        {
          category: "Logo Design",
          included: [
            "3 Initial Concepts Included",
            "Source File",
            "Logo Transparency",
            "High Resolution",
            "Vector File"
          ],
        },
        {
          category: "Illustration",
          included: [
            "Commercial Use",
            "Color",
            "Source File",
            "High Resolution",
            "Background/Scene"
          ],
        },
        {
          category: "Voice Over",
          included: [
            "HQ Audio File (WAV format)",
            "Number of words: 150"
          ],
        },
        {
          category: "Video Explainer",
          included: [
            "Characters included",
            "Illustrated Background included",
            "Music/Sound Design included",
            "Voice Over Recording",
            "Storyboard",
          ],
        },
        {
          category: "Social Media Marketing",
          included: [
            "Engagement with Followers",
            "14 Days",
            "Page/Channel Evaluation",
            "Schedule Posts",
            "Action Plan",
          ],
        },
      ],
    };
  },
  methods: {
    orderCheckout() {
      this.$router.push("/checkout/" + this.gig._id);
    }
  },
};
</script>

<style>
</style>