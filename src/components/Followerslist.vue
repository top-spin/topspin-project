
<template>
  <div class="followers">
    <h3 class="text-xs-center ma5" v-if="players.length === 0">Loading Followers...</h3>
    <div class="text-xs-center" v-for="player in players" :key="player.user_id">
      <v-divider :inset="player.inset"></v-divider>
      <v-subheader :key="player.username">{{ player.username }}</v-subheader>

      <v-list-tile :key="player.title" avatar @click="viewProfile(player.username)">
        <v-list-tile-avatar>
          <img :src="player.avatar">
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title v-html="player.name"></v-list-tile-title>
          <v-list-tile-sub-title v-html="player.city"></v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-list-tile-sub-title v-if="player.rating">Rank: #{{player.rank}}</v-list-tile-sub-title>
        </v-list-tile-action>
      </v-list-tile>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      players: []
    };
  },
  methods: {
    viewProfile(username) {
      this.$router.push("/profile/" + username);
    }
  },
  mounted() {
    Axios.get("/api/followers/")
      .then(res => {
        // console.log(res.data);
        this.players = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
