<template>
  <div>
    <span class="title">
      <span class="font-weight-light">My</span>
      <span class="orange--text">Statistics</span>
    </span>
    <span class="hidden-sm-and-down">
      <chartjs-doughnut class="donutchart" :labels="labels" :datasets="datasets" :option="option"></chartjs-doughnut>
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
export default {
  data() {
    return {
      labels: ["Tournament Wins", "Wins", "Losses"],
      datalabel: "Games Played",
      datasets: [
        {
          backgroundColor: ["#D32F2F", "#F57C00", "#FFD54F"],
          data: [4, 40, 30]
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
  }
};
</script>

<style>
.title {
  margin-top: 5px;
  display: flex;
  justify-content: center;
  /* border: blue 1px solid; */
}
.donutchart {
  height: 90%;
  /* border: green 1px solid; */
}
.barchart {
  height: 80%;
  /* border: red 1px solid; */
}
</style>
