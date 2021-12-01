<template>
   <section class="login-form main-app">
        <h3>signup</h3>    
        <form @submit.prevent="signup">
        <input ref="nickname" v-model="nickname" type="text" placeholder="username">
        <input v-model="password" type="password" placeholder="password">
        <button type="submit">signup</button>
        </form>
    </section>
</template>

<script>
import {userService} from '../services/user.service.js'
export default {
data() {
        return {
            nickname: '',
            password: ''
        }
    },
    methods:{
        signup(){
            userService.signup(this.nickname)
            .then((user) => {
                this.user = user
                this.$router.push('/')
            })
        }
    },
    mounted(){
        // console.log('mounted');
        this.$refs.nickname.focus()
    }
}
</script>

