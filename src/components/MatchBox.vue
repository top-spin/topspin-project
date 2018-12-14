<template>
  <div>
    <h4>Match</h4>
    <div v-if="match">
      <v-list-tile class="box" router :to="'/profile/'+match.match_winner.username">
        <v-list-tile-avatar class="hidden-md-only">
          <img :src="match.match_winner.avatar">
        </v-list-tile-avatar>

        <v-list-tile-title>{{match.match_winner.username}}</v-list-tile-title>
        <v-spacer></v-spacer>

        <v-list-tile-content class="score1">{{match.winning_score}}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile class="box" router :to="'/profile/'+match.match_loser.username">
        <v-list-tile-avatar class="hidden-md-only">
          <img :src="match.match_loser.avatar">
        </v-list-tile-avatar>

        <v-list-tile-title>{{match.match_loser.username}}</v-list-tile-title>
        <v-spacer></v-spacer>

        <v-list-tile-content class="score1">{{match.losing_score}}</v-list-tile-content>
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
