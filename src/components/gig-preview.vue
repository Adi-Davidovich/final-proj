<template>
    <section class="gig-preview" >
        <h2>{{ gig.name }}</h2>
      <h4>{{ gig.price }}$</h4>

       <!-- <img :src="require(`@/img/${toy.name}.jpg`)" alt="" /> -->
    </section>
  
</template>

<script>
export default {
    name:'gig-preview',
    props: ['gig'],
    data(){
        return {
          
        }
    },

}
</script>

    

