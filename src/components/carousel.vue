<template>
  <section v-if="images" class="section" id="app">
    <div class="columns">
      <div class="column is-4">
        <div class="card">
          <div class="card-content">
            <div class="card-carousel">
              <div class="card-img">
                <img
                  :src="require(`@/assets/img/card-images/${currentImage}`)"
                />
                <div class="actions">
                  <span @click="prevImage" class="prev">
                    <i class="fas fa-chevron-left"></i>
                  </span>
                  <span @click="nextImage" class="next">
                    <i class="fas fa-chevron-right"></i>
                  </span>
                </div>
              </div>
              <div class="thumbnails">
                <div
                  v-for="(image, index) in images"
                  :key="index"
                  :class="[
                    'thumbnail-image',
                    activeImage == index ? 'active' : '',
                  ]"
                  @click="activateImage(index)"
                >
                  <img :src="require(`@/assets/img/card-images/${image}`)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "carousel",
  props: ["images"],
  data() {
    return {
      //Array to hold all carousel images
      //   images: [
      //     {
      //       id: "1",
      //       big: "images/p1.jpeg",
      //       thumb: "images/thumbs/p1.jpeg",
      //     },
      //     {
      //       id: "2",
      //       big: "images/p2.jpeg",
      //       thumb: "images/thumbs/p2.jpeg",
      //     },
      //     {
      //       id: "3",
      //       big: "images/p3.jpeg",
      //       thumb: "images/thumbs/p3.jpeg",
      //     },
      //     {
      //       id: "4",
      //       big: "images/p4.jpeg",
      //       thumb: "images/thumbs/p4.jpeg",
      //     },
      //   ],
      //Index of the active image on the images array
      activeImage: 0,
    };
  },
  computed: {
    // currentImage gets called whenever activeImage changes
    // and is the reason why we don't have to worry about the
    // big image getting updated
    currentImage() {
      return this.images[this.activeImage];
    },
  },
  methods: {
    // Go forward on the images array
    // or go at the first image if you can't go forward :/
    nextImage() {
      var active = this.activeImage + 1;
      if (active >= this.images.length) {
        active = 0;
      }
      this.activateImage(active);
    },
    // Go backwards on the images array
    // or go at the last image
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
};
</script>

<style>
</style>