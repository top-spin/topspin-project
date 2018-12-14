<template>
  <div>
    <h4>Match</h4>
    <div v-if="match">
      <v-list-tile class="box" router>
        <v-list-tile-avatar>
          <img :src="match.player1.avatar">
        </v-list-tile-avatar>

        <v-list-tile-title
          v-if="match.player1.type==='pending'"
        >#{{match.player1.rank}} {{match.player1.username}} (PENDING)</v-list-tile-title>
        <v-list-tile-title
          v-else-if="match.player1.type==='rejected'"
        >#{{match.player1.rank}} {{match.player1.username}} (REJECTED)</v-list-tile-title>
        <v-list-tile-title v-else>#{{match.player1.rank}} {{match.player1.username}}</v-list-tile-title>
        <v-spacer></v-spacer>

        <v-list-tile-content class="score1"></v-list-tile-content>
      </v-list-tile>
      <v-list-tile class="box" router>
        <v-list-tile-avatar>
          <img :src="match.player2.avatar">
        </v-list-tile-avatar>

        <v-list-tile-title
          v-if="match.player2.type==='pending'"
        >#{{match.player2.rank}} {{match.player2.username}} (PENDING)</v-list-tile-title>
        <v-list-tile-title
          v-else-if="match.player2.type==='rejected'"
        >#{{match.player2.rank}} {{match.player2.username}} (REJECTED)</v-list-tile-title>
        <v-list-tile-title v-else>#{{match.player2.rank}} {{match.player2.username}}</v-list-tile-title>
        <v-spacer></v-spacer>

        <v-list-tile-content class="score1"></v-list-tile-content>
      </v-list-tile>
    </div>
  </div>
</template>

<script>
export default {
  name: "MatchBox",
  props: {
    match: Object
  },
  data() {
    return {
      players: [
        {
          image: "https://randomuser.me/api/portraits/men/85.jpg",
          username: "James",
          score: 19,
          route: "/profile"
        },
        {
          image: "https://randomuser.me/api/portraits/men/85.jpg",
          username: "Tyler",
          score: 12,
          route: "/profile"
        }
      ]
    };
  }
};
</script>

<style>
.box {
  border: #424242 3px solid;
}
.score1 {
  width: 25%;
  border-left: #999 2px solid;
  padding-left: 5px;
}
.score2 {
  border-left: #f57c00 3px solid;
  padding-left: 5px;
}
</style>
