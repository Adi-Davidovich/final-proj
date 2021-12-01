
<template>
  <form @submit.prevent="addToy()">
    <input type="text" placeholder="Name of the Toy?" v-model="toyToEdit.name"/>
    <label>price:
      <input type="number" v-model="toyToEdit.price" />
    </label>

    <label>lables:
      <input type="text" v-model="toyToEdit.labels" />
    </label>

    <label>in stock
      <input type="radio" v-model="toyToEdit.inStock" />
    </label>

    <button>Save</button>
  </form>
</template>

<script>
export default {
  name: "toy-add",
  data() {
    return {
        toyToEdit: null
    }
  },
  methods: {
    addToy() {
      console.log("Adding...", this.toyToEdit);
      this.$store
        .dispatch({ type: "addToy", toy: this.toyToEdit })
        .then((toy) => {
          console.log("toy :>> ", toy);
          // showMsg(`Product added with id: ${toy._id}`)
          this.toyToEdit = toyService.getEmptyToy();
        });
    },
  },
};
</script>

