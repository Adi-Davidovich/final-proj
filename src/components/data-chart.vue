<script>
import { Pie } from "vue-chartjs";

export default {
  props: ["info"],
  extends: Pie,
  data() {
    return {
      chartData: {
        labels: Object.keys(this.info),
        datasets: [
          {
            borderWidth: 1,
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
            ],
            data: Object.values(this.info),
          },
        ],
      },
      options: {
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },

  mounted() {
    console.log("Hi", Object.values(this.info));
    this.renderChart(this.chartData, this.options);
  },
};
</script>
