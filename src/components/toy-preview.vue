<template>
    <section class="toy-preview" >
        <h2>{{ toy.name }}</h2>
      <h4>{{ toy.price }}$</h4>
      <h4>In stock: {{ toy.inStock }}</h4>
       <!-- <img :src="require(`@/img/${toy.name}.jpg`)" alt="" /> -->
    </section>
  
</template>

<script>
export default {
    name:'toy-preview',
    props: ['toy'],
    data(){
        return {
          
        }
    },

}
</script>

    

