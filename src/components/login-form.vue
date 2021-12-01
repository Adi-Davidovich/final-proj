
<template>
  <section class="login-form main-app">
        <h3>login</h3>    
        <form @submit.prevent="login">
        <input ref="nickname" v-model="nickname" type="text" placeholder="username">
        <input v-model="password" type="password" placeholder="password">
        <button type="submit">login</button>
        </form>
    </section>
</template>

<script>
import { userService } from '../services/user.service.js'
// import { eventBus } from '../services/event-bus.service.js'
export default {
 data() {
        return {
            nickname: '',
            password: ''
        }
    },
    methods: {
        login() {
            console.log(this.password)
            if (!this.nickname) return
            userService.login(this.nickname).then((user) => {
                this.$router.push('/')
            })
        }
    },
    mounted() {
        // console.log('mounted');
        this.$refs.nickname.focus()
    }
}
</script>

<style>

</style>