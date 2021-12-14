<template>
  <section class="home app-main main-layout">
    <div class="main-content full">
      <div class="main-layout">
        <div class="hero-wrapper flex">
          <div class="hero-title">
            <p>
              Find the perfect <span>freelance</span> services for your business
            </p>
            <div class="search-bar-package search_bar-package">
              <form class="">
                <span
                  class="search-bar-icon"
                  aria-hidden="true"
                  style="width: 16px; height: 16px"
                  ><i class="fas fa-search"></i></span
                ><input
                  type="search"
                  autocomplete="off"
                  placeholder='Try "building mobile app"'
                  value=""
                /><button class="submit-button">Search</button>
              </form>
            </div>

            <div class="popular">
              Popular:
              <ul>
                <li @click="setCategory('Social Media Marketing')">
                  Social Media
                </li>
                <li @click="setCategory('Illustration')">Illustration</li>
                <li @click="setCategory('Logo Design')">Logo Design</li>
                <li @click="setCategory('Voice Over')">Voice Over</li>
              </ul>
            </div>
          </div>
          <div class="hero-backgrounds">
            <div
              v-for="(hero, idx) in heroes"
              class="hero-image-content"
              :key="hero.id"
              :style="{
                backgroundColor: hero.backgroundColor,
                backgroundImage: 'url(' + hero.image + ')',
                opacity: idx === heroIdx ? 1 : 0,
              }"
            >
              <div class="seller-name">
                <p>
                  <span
                    v-for="num in 5"
                    :key="num"
                    class="fa fa-star stars"
                  ></span
                  ><br />
                  {{ hero.name }}, <b>{{ hero.subTitle }}</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h2 class="home-page-title">Popular professional services</h2>
    <div class="cards-container">
      <div
        v-for="category in categories"
        :key="category.name"
        class="card-filter"
        @click="setCategory(category.name)"
      >
        <p>
          {{ category.title }}
          <span class="filter-title">{{ category.subTitle }}</span>
        </p>
        <img :src="require(`@/assets/img/${category.name}.jpg`)" />
      </div>
    </div>

      

    <div class="home-page-info-container full">
      <div class="main-info main-layout">
        <div class="content flex">
          <div class="home-page-info">
            <h2>A whole world of freelance talent at your fingertips</h2>
            <ul>
              <li>
                <h6>
                  <span><i class="far fa-check-circle"></i></span>The best for
                  every budget
                </h6>
                <p>
                  Find high-quality services at every price point. No hourly
                  rates, just project-based pricing.
                </p>
              </li>

              <li>
                <h6>
                  <span><i class="far fa-check-circle"></i></span>Quality work
                  done quickly
                </h6>
                <p>
                  Find the right freelancer to begin working on your project
                  within minutes.
                </p>
              </li>

              <li>
                <h6>
                  <span><i class="far fa-check-circle"></i></span>Protected
                  payments, every time
                </h6>
                <p>
                  Always know what you'll pay upfront. Your payment isn't
                  released until you approve the work.
                </p>
              </li>
              <li>
                <h6>
                  <span><i class="far fa-check-circle"></i></span>24/7 support
                </h6>
                <p>
                  Questions? Our round-the-clock support team is available to
                  help anytime, anywhere.
                </p>
              </li>
            </ul>
          </div>
          <div class="home-page-img">
            <img src="../assets/img/selling-proposition.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import appHeader from "../components/app-header.vue";

export default {
  name: "home-page",
  data() {
    return {
      filterBy: {
        txt: "",
        price: 1000,
        category: "",
        deliveyTime: "",
        sort: "",
      },
      settings: {
        dots: true,
        infinite: true,
        initialSlide: 2,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        swipeToSlide: true,
      },
      heroIdx: 0,
      heroes: [
        {
          id: 1,
          image: require(`../assets/img/4.jpg`),
          backgroundColor: "#88b3e0",
          name: "Gabrielle",
          subTitle: "Video Explainer",
        },
        {
          id: 2,
          image: require(`../assets/img/5.jpg`),
          backgroundColor: "#eea5ae",
          name: "Andrea",
          subTitle: "Fashion Designer",
        },
        {
          id: 3,
          image: require(`../assets/img/6.jpg`),
          backgroundColor: "#708284",
          name: "Zach",
          subTitle: "Graphic Designer",
        },
        {
          id: 4,
          image: require(`../assets/img/2.jpg`),
          backgroundColor: "#fa679b",
          name: "Veronica",
          subTitle: "Illustraitor",
        },
        {
          id: 5,
          image: require(`../assets/img/7.jpg`),
          backgroundColor: "#293a28",
          name: "Samuel",
          subTitle: "Social Media Manager",
        },
      ],
      activeImage: 0,
      categories: [
        {
          name: "Logo Design",
          img: "../assets/img/logo-design.jpg",
          title: "Build your brand",
          subTitle: "Logo Design",
        },
        {
          name: "Illustration",
          img: "../assets/img/illustration.jpg",
          title: "Color your dreams",
          subTitle: "Illustration",
        },
        {
          name: "Voice Over",
          img: "../assets/img/voiceover.jpg",
          title: "Share your message",
          subTitle: "Voice Over",
        },
        {
          name: "Video Explainer",
          img: "../assets/img/animated-explainer.jpg",
          title: "Engage your audience",
          subTitle: "Video Explainer",
        },
        {
          name: "Social Media Marketing",
          img: "../assets/img/social.jpg",
          title: "Reach more customers",
          subTitle: "Social Media",
        },
      ],
    };
  },
  created() {
    setInterval(() => {
      this.heroIdx = (this.heroIdx + 1) % this.heroes.length;
    }, 5000);
  },
  methods: {
    setCategory(category) {
      this.filterBy.category = category;
      var filterBy = this.filterBy;
      const copyFilter = JSON.parse(JSON.stringify(filterBy));
      this.$store.dispatch({ type: "setFilter", filterBy: copyFilter });
      this.$store.dispatch({ type: "loadGigs" });
      this.$router.push("/explore");
    },
    nextImage() {
      var active = this.activeImage + 1;
      if (active >= this.images.length) {
        active = 0;
      }
      this.activateImage(active);
    },
    prevImage() {
      var active = this.activeImage - 1;
      if (active < 0) {
        active = this.images.length - 1;
      }
      this.activateImage(active);
    },
    activateImage(imageIndex) {
      this.activeImage = imageIndex;
    },
  },
  components: {
    appHeader,

  },
};
</script>
