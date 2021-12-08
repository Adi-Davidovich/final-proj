<template>
  <section v-if="gig" class="gig-preview">
    <el-carousel :autoplay="false" trigger="click" height="197px">
      <el-carousel-item  v-for="img in gig.imgUrl"  :key="img">
        <img
          :src="require(`@/assets/img/card-images/${img}`)"
          alt=""
          class="gig-img"
          @click="gigDetails"
        />
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

    <p @click="gigDetails">{{ gig.title }}</p>

    <div class="owner-rating">
      <i class="fas fa-star"></i>{{ gig.owner.rate }}
    </div>
    <div class="gig-footer flex">
      <el-tooltip content="Add to favorite" placement="top">
        <i class="fas fa-heart"></i>
      </el-tooltip>
      <h6>
        starting at<span> US${{ gig.price }}</span>
      </h6>
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
  },

  methods: {
    gigDetails() {
      this.$router.push("/gig/" + this.gig._id);
    },
  },

  components: {
    Avatar,
  },
};
</script>


