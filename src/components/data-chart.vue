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
              "rgba(29, 191, 115, 1)",
              "rgba(98,100,106,1)",
              "rgba(227, 147, 1, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            backgroundColor: [
              "rgba(29, 191, 115, 0.2)",
              "rgba(98,100,106, 0.2)",
              "rgba(227, 147, 1, 0.2)",
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
    this.renderChart(this.chartData, this.options);
  },
};
</script>
