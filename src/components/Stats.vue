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
    <!-- TODO: Note. NOGO: datalabel -->
    <span class="hidden-md-and-up">
      <chartjs-horizontal-bar
        class="barchart"
        :labels="labels"
        :datasets="datasets"
        :datalabel="datalabel"
        :option="option"
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
      datalabel: "Games Played",
      datasets: [
        {
          backgroundColor: ["#D32F2F", "#F57C00", "#FFD54F"],
          data: []
        }
      ],
      option: {
        title: {
          display: false,
          position: "bottom",
          text: "Wins to Losses"
        }
      }
    };
  },
  mounted() {
    axios
      .get("/api/get-my-stats")
      .then(res => {
        console.log("before==> ", this.datasets);
        this.datasets[0].data = res.data;
        console.log("after==> ", this.datasets);
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
  /* border: blue 3px solid; */
}
.donutchart {
  height: 90%;
  /* border: green 3px solid; */
}
.barchart {
  height: 80%;
  /* border: red 3px solid; */
}
</style>