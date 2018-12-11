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
      <!-- players in tournament -->
      <h2
        class="playerslist"
      >Tournament Players ({{playersList.length}} of {{this.$store.state.pending_tournament.count}})</h2>

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
          <v-btn
            @click="submitTournament"
            :disabled="+playersList.length<+this.$store.state.pending_tournament.count"
            color="success"
          >Submit Tournament Players</v-btn>
        </div>
      </div>
      <!-- display searched players -->
      <!-- suggested players pulled from friends list -->
      <div>
        <h2>Suggested Players to Add</h2>
        <Followinglist :addPlayer="addPlayer"/>
      </div>
    </v-container>

    <v-snackbar
      v-model="snackbarduplicate"
      :timeout="1500"
      :right="true"
      :bottom="true"
    >Player has already been added to tournament
      <v-btn dark flat @click="snackbarduplicate=false">Close</v-btn>
    </v-snackbar>

    <v-snackbar
      v-model="snackbarmax"
      :timeout="1500"
      :right="true"
      :bottom="true"
    >Tournament is full
      <v-btn dark flat @click="snackbarmax=false">Close</v-btn>
    </v-snackbar>
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
    players: [],
    snackbarduplicate: false,
    snackbarmax: false
  }),
  mounted() {
    this.playersList.push(this.$store.state.user);
  },
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
      // console.log(this.playersList);
      if (
        +this.playersList.length == +this.$store.state.pending_tournament.count
      ) {
        this.snackbarmax = true;
        return;
      }
      if (
        this.playersList.some(user => {
          return player.user_id === user.user_id;
        })
      ) {
        console.log("Already exists.");
        this.snackbarduplicate = true;
        return;
      }
      this.playersList.push(player);
      this.search_value = "";
      if (this.playersList.includes(player)) return;
      this.playersList.push(player);
      console.log(this.playersList);
    },
    // remove a player from the list
    removePlayer(player, index) {
      if (player.user_id === this.$store.state.user.user_id) return;
      this.playersList.splice(index, 1);
    },
    submitTournament() {
      Axios.post("/api/tournament", {
        players: this.playersList,
        tournament: this.$store.state.pending_tournament
      })
        .then(res => {
          console.log(res.data);
          this.$router.push(
            "/tournament/view/" + res.data.newTournament.tournament_id
          );
        })
        .catch(err => console.log(err));
    }
  }
};
</script>
 <style>
.addtournamentplayerscontainer {
  width: 70%;
}
</style>