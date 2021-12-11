<template>
  <section v-if="gig && reviews" class="gig-preview">
      <el-carousel :autoplay="false" trigger="click" height="197px">
        <el-carousel-item v-for="img in gig.imgUrl" :key="img">
          <div class="img-container">
            <img
              :src="require(`@/assets/img/card-images/${img}`)"
              alt=""
              class="gig-img"
              @click="gigDetails"
            />
          </div>
        </el-carousel-item>
      </el-carousel>
    <div class="owner-prev flex">
      <avatar
        :size="24"
        :username="gig.owner.username"
        :src="gig.owner.imgUrl"
      ></avatar>
      <div class="owner-name-level">
        <h4>{{ gig.owner.username }}</h4>
        <h5>Level 2 seller</h5>
      </div>
    </div>

    <p :title="gig.title" class="title" @click="gigDetails">{{ gig.title }}</p>

    <div class="owner-rating">
      <i class="fas fa-star"></i><span>{{ gig.owner.rate }}</span
      ><span>({{ reviewsLength }})</span>
    </div>
    <div class="gig-footer flex">
      <el-tooltip content="Add to favorite" placement="top">
        <i class="fas fa-heart"></i>
      </el-tooltip>
      <div class="price">
        <h6>starting at</h6>
        <span> ${{ gig.price }}</span>
      </div>
    </div>
  </section>
</template>

<script>
import Avatar from "vue-avatar";
export default {
  name: "gig-preview",
  props: ["gig"],
  data() {
    return {};
  },
  created() {
    this.loadReviews();
  },
  computed: {
    reviews() {
      return this.$store.getters.reviews;
    },
    reviewsLength() {
      return this.reviews.length;
    },
  },
  methods: {
    gigDetails() {
      this.$router.push("/gig/" + this.gig._id);
    },
    async loadReviews() {
      await this.$store.dispatch({
        type: "loadReviews",
        id: this.gig.owner._id,
      });
    },
  },

  components: {
    Avatar,
  },
};
</script>


