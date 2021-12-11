<template>
  <div class="container app-main" v-if="gig">
    <h1>Chat</h1>
    <p>Customer Service</p>
    <h2>Lets Chat About gig:{{ gig.title }}</h2>

    <ul>
      <li v-for="(msg, idx) in msgs" :key="idx">
        <span>{{ msg.from }}:</span>{{ msg.txt }}
      </li>
    </ul>
    
    <form @submit.prevent="sendMsg">
      <input type="text" v-model="msg.txt" placeholder="Your msg" />
      <button>Send</button>
    </form>
  </div>
</template>

<script>
import { socketService } from "@/services/socket.service";
import { gigService } from "../services/gig.service.js";
export default {
  data() {
    return {
      msg: { from: this.loadUser, txt: "" },
      msgs: [],
      topic: "",
      gig: null,
    };
  },
  created() {
    this.loadGig();
    socketService.setup();
    socketService.emit("chat topic", this.topic);
    socketService.on("chat addMsg", this.addMsg);
  },
  destroyed() {
    socketService.off("chat addMsg", this.addMsg);
    socketService.terminate();
  },
  watch: {
    "$route.params.gigId"(id) {
      console.log("Changed to", id);
      this.loadGig();
    },
    immediate: true,
  },
  methods: {
    async loadGig() {
      const id = this.$route.params.gigId;
      this.gig = await gigService.getById(id);
      this.topic = this.gig._id;
      console.log("gig", this.gig);
    },
    async loadUser(){
      if (this.$store.getters.loggedinUser.fullname) return this.$store.getters.loggedinUser.fullname
      else return 'guest'
    },
    addMsg(msg) {
      this.msgs.push(msg);
    },
    sendMsg() {
      console.log("Sending", this.msg);
      socketService.emit("chat newMsg", this.msg);
      this.$message({
          showClose: true,
          message: this.msg,
          type: "success",
        });
      // TODO: next line not needed after connecting to backend
      // this.addMsg(this.msg)
      // setTimeout(()=>this.addMsg({from: 'Dummy', txt: 'Yey'}), 2000)
      this.msg = { from: this.msg.from, txt: "" };
    },
    changeTopic() {
      socketService.emit("chat topic", this.topic);
    },
  },
};
</script>
