<template>
  <div>
    <h4>Winner</h4>
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

      <v-list-tile-content>
        <v-list-tile-title>{{player.username}}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </div>
</template>

<script>
export default {
  name: "WinnerBox",
  data() {
    return {
      players: [
        {
          image: "https://randomuser.me/api/portraits/men/85.jpg",
          username: "James",
          score: 19,
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
</style>
