<template>
  <div>
    <h1 class="text-xs-center">Dashboard</h1>

    <v-container class="dashboardcontainer hidden-sm-and-down">
      <v-layout row wrap class="toprow">
        <Stats class="stat"/>
        <UpcomingTourney class="ut"/>
      </v-layout>

      <v-layout row wrap class="bottomrow">
        <TopPlayers class="stand"/>
        <RecentMatches class="rm"/>
      </v-layout>
    </v-container>

    <v-container class="hidden-md-and-up">
      <v-layout column wrap>
        <Stats class="smallcontainers"/>
        <UpcomingTourney class="smallcontainers"/>
        <TopPlayers class="smallcontainers"/>
        <RecentMatches class="smallcontainers"/>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Stats from "@/components/Stats.vue";
import UpcomingTourney from "@/components/UpcomingTourney.vue";
import TopPlayers from "@/components/TopPlayers.vue";
import RecentMatches from "@/components/RecentMatches.vue";

export default {
  components: {
    Stats,
    UpcomingTourney,
    TopPlayers,
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
.toprow {
  height: 60%;
}
.bottomrow {
  height: 40%;
}
.stat {
  width: 48%;
  margin-right: 2%;
  margin-bottom: 2%;
  border: 3px #424242 solid;
}
.ut {
  width: 48%;
  margin-bottom: 2%;
  border: 3px #424242 solid;
}
.stand {
  width: 48%;
  margin-right: 2%;

  border: 3px #424242 solid;
}
.rm {
  width: 48%;
  border: 3px #424242 solid;
}
.smallcontainers {
  border: 2px #424242 solid;
  margin-bottom: 5px;
}
</style>
