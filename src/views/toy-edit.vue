<template>
  <section v-if="isLoading">
    <p>Loading...</p>
  </section>
  <section v-else class="toy-edit-container app-main">
    <h3 v-if="toyToEdit">{{ title }}</h3>
    <form v-if="toyToEdit" @submit.prevent="save" class="toy-edit-form">
      <input type="text" placeholder="name" v-model="toyToEdit.name" />
      <input type="price" placeholder="price" v-model="toyToEdit.price" />
      
      <label
        >Is in stock?
        <select v-model="toyToEdit.inStock">
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </label>

      <el-select v-model="toyToEdit.labels" multiple placeholder="Select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <!-- <select v-model="toyToEdit.labels" multiple>
        <option value="On wheels">On wheels</option>
        <option value="Box game">Box game</option>
        <option value="Art">Art</option>
        <option value="Baby">Baby</option>
        <option value="Doll">Doll</option>
        <option value="Puzzle">Puzzle</option>
        <option value="Outdoor">Outdoor</option>
      </select> -->
      <button>Save</button>
    </form>
    <router-link class="router-link-btn" to="/">Back</router-link>
  </section>
</template>

<script>
// import { showMsg } from "@/services/event-bus.service.js";

export default {
  name: "toyEdit",
  components: {},
  data() {
    return {
      toyToEdit: null,
      options: [{
          value: 'On wheels',
          label: 'On wheels'
        }, {
          value: 'Box game',
          label: 'Box game'
        }, {
          value: 'Art',
          label: 'Art'
        }, {
          value: 'Baby',
          label: 'Baby'
        }, {
          value: 'Doll',
          label: 'Doll'
        },
        {
          value: 'Puzzle',
          label: 'Puzzle'
        },
        {
          value: 'Outdoor',
          label: 'Outdoor'
        }],
        value1: [],
        value2: []
    };
  },
  created() {
    if (this.toyId) {
      this.$store
        .dispatch({ type: "setCurrToy", toyId: this.toyId })
        .then(() => (this.toyToEdit = this.$store.getters.getCurrToy));
    } else {
      this.$store
        .dispatch({ type: "setNewToy" })
        .then(() => (this.toyToEdit = this.$store.getters.getCurrToy));
    }
    this.$store.dispatch({ type: "loadEdit" });
    console.log(this.toyToEdit);
  },

  methods: {
    save() {
      this.$store
        .dispatch({ type: "saveToy", toy: this.toyToEdit })
        .then((toy) => {
          console.log("toy", toy);
          //   showMsg(`updated/add new toy with id ${toy._id}`);
          console.log("save new");
          this.$router.push("/toy");
        });
    },
  },
  computed: {
    getCurrentToy() {
      return this.$store.getters.getCurrToy;
    },
    title() {
      return this.toyId ? "Edit toy" : "Add toy";
    },
    toyId() {
      console.log(this.$route.params.toyId);
      return this.$route.params.toyId || "";
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
};
</script>
