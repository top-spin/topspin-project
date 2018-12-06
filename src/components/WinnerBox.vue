<template>
  <div v-if="match">
    <h4>Winner</h4>
    <v-list-tile
      class="box"
      router
      :to="'/profile/'+match.match_winner.username"
    >
      <v-list-tile-avatar>
        <img :src="match.match_winner.avatar">
      </v-list-tile-avatar>

      <v-list-tile-content>
        <v-list-tile-title>{{match.match_winner.username}}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </div>
</template>

<script>
export default {
  name: "WinnerBox",
  props: {
    match:Object
  },
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
