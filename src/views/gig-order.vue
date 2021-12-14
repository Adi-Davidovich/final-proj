<template>
  <section class="checkout">
    <div v-if="gig" class="gig-details-summary">
      <div class="order-info">
        <header>
          <img :src="require(`@/assets/img/demo-data-img/${img}`)" alt="" />
          <div class="gig-info">
            <div class="title">{{ gig.title }}</div>
            <div class="stars">
              <span v-for="num in 5" :key="num" :class="'fa fa-star fill'">
                <!-- <span
                v-for="num in 5"
                :key="num"
                :class="
                  num <= gig.owner.rate ? 'fa fa-star fill' : 'far fa-star fill'
                "
              > -->
              </span>
              <span class="rate">{{ gig.owner.rate }}</span>
              <!-- <span class="amount">({{ reviewsLength }} Reviews)</span> -->
            </div>
          </div>
          <div class="price">${{ gig.price }}</div>
        </header>
        <section class="package">
          <div class="text">Order Details</div>
          <p>{{ gig.package.description }}</p>
          <div class="fetures">
            <ul v-for="(option, idx) in options" :key="idx">
              <template v-if="option.category === gig.category">
                <li v-for="(include, index) in option.included" :key="index">
                  <i class="fas fa-check"></i>
                  <span>{{ include }}</span>
                </li>
              </template>
            </ul>
          </div>
        </section>
      </div>
      <div class="checkout-container">
        <header>
          <h3>Price summary</h3>
          <div class="subtotal summary-item">
            <p>Subtotal</p>
            <p>${{ gig.price }}</p>
          </div>
          <div class="service summary-item">
            <p>Service Fee</p>
            <p>${{ serviceFee }}</p>
          </div>
        </header>
        <article>
          <div class="total summary-item">
            <p>Total</p>
            <p>${{ finalPrice }}</p>
          </div>
          <div class="delivery summary-item">
            <p>Delivery Time</p>
            <p>{{ gig.package.timeToDeliver }} Days</p>
          </div>
        </article>
        <footer>
          <button class="btn-purchase" @click="purchase">Purchase</button>
        </footer>
      </div>
    </div>
  </section>
</template>

<script>
import { gigService } from "../services/gig.service.js";
import { orderService } from "../services/order.service.js";
import { showMsg } from "../services/event-bus-service.js";

export default {
  name: "gig-order",
  data() {
    return {
      order: null,
      serviceFee: 2.28,
      gig: null,
      options: [
        {
          category: "Logo Design",
          included: [
            "3 Initial Concepts Included",
            "Source File",
            "Logo Transparency",
            "High Resolution",
            "Vector File",
          ],
        },
        {
          category: "Illustration",
          included: [
            "Commercial Use",
            "Color",
            "Source File",
            "High Resolution",
            "Background/Scene",
          ],
        },
        {
          category: "Voice Over",
          included: ["HQ Audio File (WAV format)", "Number of words: 150"],
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
  created() {
    this.loadGig();
    this.$store.dispatch({ type: "loadUsers" });
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
    img() {
      return this.gig.imgUrl[0];
    },
    finalPrice() {
      return +(this.gig.price + this.serviceFee);
    },
    reviewsLength() {
      return this.loggedInUser.reviews;
    },
  },
  watch: {
    "$route.params.gigId"(id) {
      this.loadGig();
    },
    immediate: true,
  },
  methods: {
    async loadGig() {
      const id = this.$route.params.gigId;
      this.gig = await gigService.getById(id);
      this.order = await orderService.getEmptyOrder();
    },
    async purchase() {
      const order = JSON.parse(JSON.stringify(this.order));
      order.description = this.gig.title;
      order.price = this.finalPrice;
      order.timeToDeliver = this.gig.package.timeToDeliver;
      order.imgUrl = this.img;
      order.seller = {
        _id: this.gig.owner._id,
        username: this.gig.owner.username,
        imgUrl: this.gig.owner.imgUrl,
      };
      order.gig = {
        _id: this.gig._id,
        title: this.gig.title,
        category: this.gig.category,
        price: this.gig.price,
        package: {
          description: this.gig.package.description,
          revisions: this.gig.package.revisions,
        },
      };
      try {
        const savedOrder = await this.$store.dispatch({
          type: "addOrder",
          order,
        });
        socketService.emit(
          "add-order",
          `${this.loggedInUser.fullname} is ordering`
        );
        this.$message({
          showClose: true,
          message: "Thank you for your Order!",
          type: "success",
        });

        setTimeout(() => {
          this.$router.push("/gig/" + this.gig._id);
        }, 2000);


      } catch (err) {
        // showMsg(`unable to add order: ${savedOrder} `, "danger");
        console.log("Adding Error (checkout):", err);
      }
    },
  },
};
</script>

<style>
</style>