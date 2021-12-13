<template>
  <div class="img-upload-container">
    <h1>Let's upload some images!</h1>
    <template v-if="!isLoading">
      <!-- UPLOAD IMG -->
      <label
        for="imgUploader"
        @drop.prevent="handleFile"
        @dragover.prevent="dragOver"
        @dragleave="isDragOver = false"
        :class="{ drag: isDragOver, 'not-drag': !isDragOver }"
      >
      <transition name="fade" mode="out-in">
      <img alt="Drop images here" v-bind:key="isDragOver" :src="isDragOver ? require('../assets/img/box.png') : require('../assets/img/upload.png')"/>
      </transition>
      <h3>Choose an image<span class="light"> or drag it here </span></h3>
      </label>
      <!-- HIDDEN INPUT -->
      <input
        type="file"
        name="img-uploader"
        id="imgUploader"
        @change="handleFile"
      />
    </template>
    <!-- LOADER -->
    <img
      class="loader"
      v-else
      :src="require('../assets/img/loader.gif')"
      alt=""
    />
  </div>
</template>

<script>
import { uploadImg } from '@/services/img-upload.service.js';
export default {
  data() {
    return {
      isLoading: false,
      isDragOver: false,
    };
  },
  methods: {
    dragOver(ev) {
      this.isDragOver = true;
    },
    handleFile(ev) {
      let file;
      if (ev.type === 'change') file = ev.target.files[0];
      else if (ev.type === 'drop') file = ev.dataTransfer.files[0];
      this.onUploadImg(file);
    },

    async onUploadImg(file) {
      this.isLoading = true;
      this.isDragOver = false;
      const res = await uploadImg(file);
      this.$emit('save', res.url);
      this.isLoading = false;
    },
  },
};
</script>

<style>
.loader {
  height: 150px;
}
label {
  cursor: pointer;
  transition: background-color .3s;
}
label img {
  height: 100px;
}
input {
  width: 0;
  height: 0;
}
.drag {
  color: grey;
  background-color: rgb(245, 245, 245);
  display: inline-block;
  padding: 30px 5px;
  width: 450px;
  border: 1px dashed gray;
  border-radius: 8px
}
.not-drag {
  color: grey;
  background-color: rgb(216, 216, 216);
  display: inline-block;
  padding: 30px 5px;
  width: 450px;
  border: 1px dashed gray;
  border-radius: 8px
}
.light {
  font-weight:lighter; 
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>