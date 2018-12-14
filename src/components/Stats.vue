<template>
  <div>
    <span class="title">
      <span class="font-weight-light">My</span>
      <span class="orange--text">Statistics</span>
    </span>
    <span class="hidden-sm-and-down">
      <chartjs-doughnut
        v-if="datasets[0].data.length!==0"
        class="donutchart"
        :labels="labels"
        :datasets="datasets"
        :option="option"
      ></chartjs-doughnut>
    </span>

    <!-- horizontal-bars for smaller screen size -->
    <span v-if="datasets[0].data.length!==0" class="hidden-md-and-up">
      <chartjs-horizontal-bar
        class="barchart"
        :labels="labels"
        :datasets="datasets"
        :options="options"
      ></chartjs-horizontal-bar>
    </span>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      labels: ["Tournament Wins", "Wins", "Losses"],
      datasets: [
        {
          label: "Games Played",
          backgroundColor: ["#D32F2F", "#F57C00", "#FFD54F"],
          data: []
        }
      ],
      option: {
        title: {
          display: false,
          position: "bottom",
          text: "Games Played"
        }
      },
      options: {
        title: {
          display: false,
          position: "bottom",
          text: "Games Played"
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    };
  },
  mounted() {
    axios
      .get("/api/get-my-stats")
      .then(res => {
        this.datasets[0].data = res.data;
      })
      .catch(err => console.log(err));
  }
};
</script>
 

<style>
.title {
  margin-top: 5px;
  display: flex;
  justify-content: center;
}
.donutchart {
  height: 90%;
}
.barchart {
  height: 80%;
}
</style>