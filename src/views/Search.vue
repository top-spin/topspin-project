<template>
  <div>
    <v-form>
      <v-container>
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
            <h3
              class="text-xs-center mt-5"
              v-if="search_value === null || search_value.length===0"
              style="font-size:2em;"
            >Players from around the world...</h3>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
    <div
      class="text-xs-center"
      v-if="search_value === null || search_value.length!==0"
      v-for="player in players"
      :key="player.user_id"
    >
      <v-divider :inset="player.inset"></v-divider>
      <v-subheader :key="player.username">{{ player.username }}</v-subheader>

      <v-list-tile :key="player.title" avatar @click="viewProfile(player.username)">
        <v-list-tile-avatar>
          <img :src="player.avatar">
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title v-html="player.name"></v-list-tile-title>
          <v-list-tile-sub-title v-html="player.email"></v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-list-tile-sub-title v-if="player.rating">Rank: #{{player.rank}}</v-list-tile-sub-title>
        </v-list-tile-action>
      </v-list-tile>
    </div>
    <Map v-if="search_value === null || search_value.length===0"/>
  </div>
</template>

<script>
import Map from "../components/Map.vue";
import axios from "axios";

export default {
  name: "Search",
  components: {
    Map
  },
  data() {
    return {
      loading: false,
      search_value: "",
      players: []
    };
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
    viewProfile(username) {
      this.$router.push("/profile/" + username);
    }
  }
};
</script>
