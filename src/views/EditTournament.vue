<template>
  <div>
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
            <v-list-tile-sub-title v-if="player.rank">Rank: #{{player.rank}}</v-list-tile-sub-title>
          </v-list-tile-action>
        </v-list-tile>
      </div>

      <!-- players in tournament -->
      <h2 class="playerslist">Tournament Players ({{tournament.size}})</h2>

      <v-list>
        <v-list-tile v-for="(player, i) in playersList" :key="player.username">
          <v-list-tile-avatar>
            <img :src="player.avatar">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-if="player.type === 'pending'">{{player.username}} (PENDING)</v-list-tile-title>
            <v-list-tile-title v-else-if="player.type === 'rejected'">{{player.username}} (REJECTED)</v-list-tile-title>
            <v-list-tile-title v-else>{{player.username}}</v-list-tile-title>
          </v-list-tile-content>

          <!-- submit button -->
          <v-btn @click="removePlayer(player, i)" flat color="primary">x</v-btn>
        </v-list-tile>
      </v-list>
      <div>
        <div class="text-xs-center">
          <v-btn
            @click="editTournament"
            :disabled="playersList.length<tournament.size"
            color="success"
          >Submit Tournament Players</v-btn>
        </div>
      </div>

      <!-- suggested players pulled from friends list -->
      <div>
        <h2>Suggested Players to Add</h2>
        <Followinglist :addPlayer="addPlayer"/>
      </div>
    </v-container>

    <v-snackbar
      v-model="snackbarduplicate"
      :timeout="2000"
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
import MatchBox from "@/components/MatchBox.vue";
import PreMatchBox from "@/components/PreMatchBox.vue";
import WinnerBox from "@/components/WinnerBox.vue";
import Followinglist from "@/components/Followinglist";
import axios from "axios";

export default {
  name: "TournamentView",
  components: {
    MatchBox,
    WinnerBox,
    PreMatchBox,
    Followinglist
  },
  data() {
    return {
      matches: [],
      rounds: [],
      tournament: {},
      pendingPlayers: [],
      acceptedPlayers: [],
      finished: true,
      tournamentArray: [],
      playersList: [],
      loading: false,
      search_value: "",
      players: [],
      allPlayers: [],
      snackbarduplicate: false,
      snackbarmax: false
    };
  },
  mounted() {
    axios
      .get("/api/tournament-matches/" + this.$route.params.id)
      .then(res => {
        if (res.data.acceptedPlayers) {
          this.tournament = res.data.tournament;
          this.pendingPlayers = res.data.pendingPlayers;
          this.acceptedPlayers = res.data.acceptedPlayers;
          this.finished = res.data.finished;
          // debugger;
          let pending = this.pendingPlayers.map(player => {
            if (player.rejected) {
              player.type = "rejected";
            } else {
              player.type = "pending";
            }
            return player;
          });
          let accepted = this.acceptedPlayers.map(player => {
            player.type = "accepted";
            return player;
          });
          let allPlayers = accepted.concat(pending);
          this.allPlayers = allPlayers;
          this.playersList = allPlayers;
          let newArray = [];
          // console.log("testing", res.data.tournament.size / 2);
          for (let i = 0; res.data.tournament.size > i; i = i + 2) {
            // debugger
            newArray.push({
              player1: allPlayers[i],
              player2: allPlayers[i + 1]
            });
          }
          this.tournamentArray = newArray;
          // console.log(this.tournamentArray);
        } else {
          if (res.data.matches.length === 15) {
            this.rounds = [
              {
                matches: res.data.matches.slice(0, 8)
              },
              {
                matches: res.data.matches.slice(8, 12)
              },
              {
                matches: res.data.matches.slice(12, 14)
              },
              {
                matches: res.data.matches.slice(14)
              }
            ];
          } else if (res.data.matches.length === 7) {
            this.rounds = [
              {
                matches: res.data.matches.slice(0, 4)
              },
              {
                matches: res.data.matches.slice(4, 6)
              },
              {
                matches: res.data.matches.slice(6)
              }
            ];
          }
          if (res.data.matches.length === 3) {
            this.rounds = [
              {
                matches: res.data.matches.slice(0, 3)
              },
              {
                matches: res.data.matches.slice(3)
              }
            ];
          }
          if (res.data.matches.length === 1) {
            this.rounds = [
              {
                matches: res.data.matches.slice(0, 1)
              }
            ];
          }
          // console.log(this.rounds)
          this.matches = res.data.matches;
          this.tournament = res.data.tournament;
        }
      })
      .catch(err => console.log(err));
  },

  methods: {
    searchPlayers() {
      this.loading = true;
      axios
        .get("/api/players?value=" + this.search_value)
        .then(res => {
          this.loading = false;
          this.players = res.data;
        })
        .catch(err => console.log(err));
    },
    // add a player to the list
    addPlayer(player) {
      if (+this.playersList.length == this.tournament.size) {
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
    },
    // remove a player from the list
    removePlayer(player, index) {
      if (player.user_id === this.$store.state.user.user_id) return;
      this.playersList.splice(index, 1);
    },
    editTournament() {
      axios
        .put("/api/edit-tournament/" + this.tournament.tournament_id, {
          players: this.playersList
        })
        .then(res => {
          this.$router.push(
            "/tournament/view/" + this.tournament.tournament_id
          );
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style>
.vertical_align {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-content: center;
}
.addtournamentplayerscontainer {
  width: 70%;
}
</style>
