<template>
  <div>
    <h1 class="text-xs-center">Dashboard</h1>

    <v-container class="dashboardcontainer hidden-sm-and-down">
      <v-layout row wrap class="toprow">
        <Stats class="stat"/>
        <UpcomingTourney class="ut"/>
      </v-layout>

      <v-layout row wrap class="bottomrow">
        <Standings class="stand"/>
        <RecentMatches class="rm"/>
      </v-layout>
    </v-container>

    <v-container class="hidden-md-and-up">
      <v-layout column wrap>
        <Stats class="smallcontainers"/>
        <UpcomingTourney class="smallcontainers"/>
        <Standings class="smallcontainers"/>
        <RecentMatches class="smallcontainers"/>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Stats from "@/components/Stats.vue";
import UpcomingTourney from "@/components/UpcomingTourney.vue";
import Standings from "@/components/Standings.vue";
import RecentMatches from "@/components/RecentMatches.vue";

export default {
  components: {
    Stats,
    UpcomingTourney,
    Standings,
    RecentMatches
  },
  data() {
    return {
      player1: "Jerry",
      player2: "Ethan"
    };
  }
};
</script>

<style>
.dashboardcontainer {
  /* height: 80vh; */
  height: 500px;
  border: 1px red solid;
}
.toprow {
  height: 60%;
  /* border: 1px red solid; */
}
.bottomrow {
  height: 40%;
  /* border: 1px red solid; */
}
.stat {
  width: 50%;
  margin-bottom: 2%;
  border: 3px #424242 solid;
  /* border: 1px red solid; */
}
.ut {
  width: 40%;
  margin-left: 5%;
  margin-top: 3%;
  border: 3px #424242 solid;
  /* border: 1px green solid; */
}
.stand {
  width: 45%;
  margin-right: 5%;
  border: 3px #424242 solid;
  /* border: 1px blue solid; */
}
.rm {
  width: 45%;
  margin-top: 2%;
  border: 3px #424242 solid;
  /* border: 1px purple solid; */
}
.smallcontainers {
  height: 30vh;
  border: 3px #424242 solid;
  margin-bottom: 5px;
}
</style>
