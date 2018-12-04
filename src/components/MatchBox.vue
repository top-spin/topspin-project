<template>
  <div>
    <h4>Match</h4>
    <v-list-tile
      class="box"
      v-for="player in players"
      :key="player.username"
      router
      :to="player.route"
    >
      <v-list-tile-avatar>
        <img :src="player.image">
      </v-list-tile-avatar>

      <!-- <v-list-tile-content width="90%"> -->
      <v-list-tile-title>{{player.username}}</v-list-tile-title>
      <!-- </v-list-tile-content> -->
      <v-spacer></v-spacer>

      <v-list-tile-content class="score1">{{player.score}}</v-list-tile-content>
    </v-list-tile>
  </div>
</template>

<script>
export default {
  name: "MatchBox",
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
