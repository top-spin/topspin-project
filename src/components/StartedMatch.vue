<template>
  <div>
    <h4>Match</h4>
    <div v-if="match">
    <v-list-tile
      class="box"
      router
    >
      <v-list-tile-avatar>
        <img :src="match.player1.avatar">
      </v-list-tile-avatar>

      <!-- <v-list-tile-content width="90%"> -->
      <v-list-tile-title v-if="match.player1.type==='pending'">{{match.player1.username}} (PENDING)</v-list-tile-title>
      <v-list-tile-title v-else-if="match.player1.type==='rejected'">{{match.player1.username}} (REJECTED)</v-list-tile-title>
      <v-list-tile-title v-else>{{match.player1.username}}</v-list-tile-title>
      <!-- </v-list-tile-content> -->
      <v-spacer></v-spacer>

      <v-list-tile-content class="score1"><v-text-field 
            label="Regular"
            placeholder="Score"
            solo
            maxlength="2"
            :value="match.score1"
            v-model="match.score1"></v-text-field></v-list-tile-content>
    </v-list-tile>
    <v-list-tile
      class="box"
      router
    >
      <v-list-tile-avatar>
        <img :src="match.player2.avatar">
      </v-list-tile-avatar>

      <!-- <v-list-tile-content width="90%"> -->
      <v-list-tile-title v-if="match.player2.type==='pending'">{{match.player2.username}} (PENDING)</v-list-tile-title>
      <v-list-tile-title v-else-if="match.player2.type==='rejected'">{{match.player2.username}} (REJECTED)</v-list-tile-title>
      <v-list-tile-title v-else>{{match.player2.username}}</v-list-tile-title>
      <!-- </v-list-tile-content> -->
      <v-spacer></v-spacer>

      <v-list-tile-content class="score1"><v-text-field 
            label="Regular"
            placeholder="Score"
            solo
            maxlength="2"
            :value="match.score2"
            v-model="match.score2"></v-text-field></v-list-tile-content>
    </v-list-tile>
    </div>
  </div>
</template>

<script>
export default {
  name: "MatchBox",
  props: {
    match:Object
  },
  data() {
    return {

    };
  }
};
</script>

<style>
.box {
  border: #424242 3px solid;
}
.score1 {
  width: 40%;
  border-left: #999 2px solid;
  padding-left: 5px;
}
.score2 {
  border-left: #f57c00 3px solid;
  padding-left: 5px;
}
</style>
