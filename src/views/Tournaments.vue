<template>
  <div>
    <router-link to="/newtournament">
      <div class="text-xs-center mt-5">
        <v-btn large color="success">Create New Tournament</v-btn>
      </div>
    </router-link>
    <div class="tournaments_container">
      <UpcomingTourney/>
    </div>
    <div class="tournaments_container" style= "margin-bottom:10vh;">
      <PastTourney/>
    </div>
  </div>
</template>

<script>
import PastTourney from "@/components/PastTourney.vue";
import UpcomingTourney from "@/components/UpcomingTourney.vue";

export default {
  name: "TournamentView",
  components: {
    PastTourney,
    UpcomingTourney
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
.tournaments_container {
  width: 80%;
  height: 40%;
  border: 1px solid black;
  margin: auto;
  margin-top: 50px;
}
</style>
