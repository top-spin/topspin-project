<template>
  <div>
    <!-- Removed title for cleaner page -->
    <!-- <h1 class="text-xs-center">Add Tournament Players</h1> -->
    <v-container class="addtournamentplayerscontainer">
      <!-- search players input -->
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            v-model="search_value"
            outline
            clearable
            label="Search Players"
            type="text"
            prepend-icon="search"
            @input="searchPlayers"
          >
            <v-fade-transition slot="append">
              <v-progress-circular v-if="loading" size="24" color="info" indeterminate></v-progress-circular>
            </v-fade-transition>
          </v-text-field>
          <div class="text-xs-center">Search by: name, email, city, organization</div>
          <h3 class="text-xs-center mt-5" v-if="search_value === null || search_value.length===0"></h3>
        </v-flex>
      </v-layout>

      <!-- display searched players -->
      <div
        class="text-xs-center"
        v-if="search_value === null || search_value.length!==0"
        v-for="player in players"
        :key="player.user_id"
      >
        <v-divider :inset="player.inset"></v-divider>
        <v-subheader :key="player.username">{{ player.username }}</v-subheader>

        <v-list-tile :key="player.title" avatar @click="addPlayer(player)">
          <v-list-tile-avatar>
            <img :src="player.avatar">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-html="player.name"></v-list-tile-title>
            <v-list-tile-sub-title v-html="player.email"></v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-list-tile-sub-title v-if="player.rating">Rank: #{{player.rating}}</v-list-tile-sub-title>
          </v-list-tile-action>
        </v-list-tile>
      </div>

      <!-- suggested players pulled from friends list -->
      <!-- TODO: need to add @click="addPlayer(player.username)" to each player -->
      <div>
        <h2>Suggested Players to Add</h2>
        <Followinglist/>
      </div>

      <!-- players in tournament -->
      <h2 class="playerslist">Tournament Players (8)</h2>

      <v-list>
        <v-list-tile v-for="(player, i) in playersList" :key="player.username">
          <v-list-tile-avatar>
            <img :src="player.avatar">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{player.username}}</v-list-tile-title>
          </v-list-tile-content>

          <v-btn @click="removePlayer(player, i)" flat color="primary">x</v-btn>
        </v-list-tile>
      </v-list>

      <!-- submit button -->
      <div>
        <div class="text-xs-center">
          <v-btn @click="submitTournament" color="success">Submit Tournament Players</v-btn>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import Axios from "axios";
// import Geocoder from "@pderas/vue2-geocoder";
// import Vue from "vue";
// import dropzone from "../components/Dropzone";
import Followinglist from "./Followinglist";

export default {
  name: "AddTournamentPlayers",
  components: {
    // dropzone
    Followinglist
  },
  data: () => ({
    // valid: false,

    playersList: [],

    loading: false,
    search_value: "",
    players: []
  }),
  methods: {
    searchPlayers() {
      this.loading = true;
      Axios.get("/api/players?value=" + this.search_value)
        .then(res => {
          this.loading = false;
          // console.log(res.data);
          this.players = res.data;
        })
        .catch(err => console.log(err));
    },
    // add a player to the list
    addPlayer(player) {
      console.log(this.playersList);
      if (this.playersList.length === 8) return;
      if (this.playersList.includes(player)) return;
      this.playersList.push(player);
      console.log(this.playersList);
    },
    // remove a player from the list
    removePlayer(player, index) {
      this.playersList.splice(index, 1);
    },
    submitTournament() {}
  }
};
</script>
 <style>
.addtournamentplayerscontainer {
  width: 70%;
}
</style>