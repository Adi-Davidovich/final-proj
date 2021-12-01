<template>
  <section class="gig-preview">
        <el-carousel :autoplay="false" trigger="click" height="150px">
      <el-carousel-item  v-for="item in gig.imgUrl" :key="item">
      <img :src="item" alt="" class="gig-img" />
      </el-carousel-item>
    </el-carousel>

    <div class="owner-prev flex">
      <avatar :size="24" :username="gig.title" :src="ownerImg"></avatar>
      <div class="owner-name-level">
        <h4>{{ gig.owner.username }}</h4>
        <h5>Level 2 seller</h5>
      </div>
    </div>
    <p>{{ gig.title }}</p>
    <div class="owner-rating">
      <i class="fas fa-star"></i>{{ gig.owner.rate }}
    </div>
    <div class="gig-footer flex">
      <i class="fas fa-heart"></i>
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
    return {
      ownerImg:"https://i.dlpng.com/static/png/7019966_preview.png"
    };
  },
  components: {
    Avatar,
  },
};
</script>


