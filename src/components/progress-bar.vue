
<template>
<div v-if="orders" class="container progress-bar">
    <div class="percent">Orders Completed: {{percent}}% </div>
    <div class="loading-bar">
         <div class="percentage" v-bind:style="{'width': percentage + '%'}"></div>
     </div>
 </div>
</template>

<script>
export default {
    name:'progress-bar',
    data() {
        return {
            percentage: null,
        }
    },
    created() {
        var interval = setInterval(() => {
            if (this.percentage < 100) {this.percentage += 0.1;}
            else clearInterval(interval)
        }, 1000);
    },
    computed: {
        orders() {
            return this.$store.getters.orders
        },
        percent(){
            this.percentage = this.$store.getters.showPercent
            return this.percentage
        }
    },
    methods: {
        
        }
};
</script>