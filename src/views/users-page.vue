
<template>
  <section class="user-details app-main">
    <h1>users</h1>
    <table>
      <thead>
        <th>Name</th>
        <th>Id</th>
        <th>score</th>
      </thead>
      <tbody>
        <tr for="(user,idx) in users" key="idx">
          <td>{{ user.nickname }}</td>
          <td>{{ user._id }}</td>
          <td>{{ user.score }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>

import { userService } from '../services/user.service.js'
import { bugService } from '../services/bug.service.js'
export default {
    data() {
        return {
            users: '',
        }
    },
//     created() {
//         this.user = userService.getLoggedinUser()
//         console.log(this.user)
//         this.nickname = this.user.nickname
//         bugService.query().then((bugs) => {
//             this.bugs = bugs.filter(bug => bug.creator.nickname === this.nickname)
//         });
//     },
//     methods: {
//         remove(bugId) {
//             this.$emit('remove', bugId)
//         },
//         logId(bugId) {
//             console.log('Id is', bugId);
//         },
//         changeDateFormat(bug) {
//             var date = bug.createdAt;
//             var date = new Date(+date)
//             return date.toLocaleString().slice(0, 10)
//         },
//         showLessText(part) {
//             if (part.length > 25) {
//                 // console.log(part.slice(0,25) + "...")
//                 return part.slice(0, 25) + "..."
//             } else {
//                 return part
//             }
//         },

//     },
// }
// components: {
//     loginForm,
//         userService
}

</script>

<style>
</style>

