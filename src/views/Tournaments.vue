<template>
  <div>
    <h1 class="text-xs-center">Tournament</h1>

    <v-container class="hidden-sm-and-down">
      <v-layout row wrap>
        <v-flex xs3>
          <v-btn class="success">Start Round</v-btn>
          <v-layout class="verticlealign">
            <MatchBox/>
            <MatchBox/>
            <MatchBox/>
            <MatchBox/>
          </v-layout>
        </v-flex>
        <v-flex xs3 ml-2>
          <v-btn depressed color="#f57c00">Round 1 Done</v-btn>
          <v-layout class="verticlealign">
            <MatchBox/>
            <MatchBox/>
          </v-layout>
        </v-flex>
        <v-flex xs3 ml-2>
          <v-btn flat color="success">Round 2 Done</v-btn>
          <v-layout class="verticlealign">
            <MatchBox/>
          </v-layout>
        </v-flex>
        <v-flex xs2 ml-2>
          <v-btn>Round 3 Done</v-btn>
          <v-layout class="verticlealign">
            <WinnerBox/>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container class="hidden-md-and-up">
      <v-layout column wrap>
        <v-flex xs3>
          <v-btn class="success">Start Round</v-btn>
          <v-layout class="verticlealign">
            <MatchBox/>
            <MatchBox/>
            <MatchBox/>
            <MatchBox/>
          </v-layout>
        </v-flex>
        <v-flex xs3 ml-2>
          <v-btn depressed color="#f57c00">Round 1 Done</v-btn>
          <v-layout class="verticlealign">
            <MatchBox/>
            <MatchBox/>
          </v-layout>
        </v-flex>
        <v-flex xs3 ml-2>
          <v-btn flat color="success">Round 2 Done</v-btn>
          <v-layout class="verticlealign">
            <MatchBox/>
          </v-layout>
        </v-flex>
        <v-flex xs2 ml-2>
          <v-btn>Round 3 Done</v-btn>
          <v-layout class="verticlealign">
            <WinnerBox/>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import MatchBox from "@/components/MatchBox.vue";
import WinnerBox from "@/components/WinnerBox.vue";

export default {
  name: "Tournaments",
  components: {
    MatchBox,
    WinnerBox
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
/* .horizonalalign{
  
} */
.verticlealign {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-content: center;
}
</style>
