<template>
  <nav>
    <v-toolbar flat app>
      <!-- hamburger menu -->
      <v-toolbar-side-icon class="grey--text" @click="drawer=!drawer"></v-toolbar-side-icon>
      <!-- title -->
      <router-link to="/">
        <v-toolbar-title>
          <span class="font-weight-light">Top</span>
          <span class="orange--text">Spin</span>
        </v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <!-- notifications bell -->
      <v-menu bottom left>
        <v-btn slot="activator" dark icon>
          <v-badge overlap color="orange">
            <span slot="badge" v-if="pendingCount">{{pendingCount}}</span>
            <v-icon large color="grey">notifications</v-icon>
          </v-badge>
        </v-btn>

        <v-list v-if="pendingList.length">
          <v-list-tile
            v-for="(pending, i) in pendingList"
            :key="i"
            @click="selectTournament(pending.tournament_id)"
          >
            <v-list-tile-title>{{ pending.name }}</v-list-tile-title>
            <v-btn
              small
              depressed
              @click="accept(pending.tournament_id)"
              color="light-green accent-3"
            >accept &#10004;</v-btn>/
            <v-btn small flat @click="decline(pending.tournament_id)" color="red darken-3">decline x</v-btn>
          </v-list-tile>
        </v-list>
        <v-list v-if="!pendingList.length">
          <v-list-tile>No pending tournaments</v-list-tile>
        </v-list>
      </v-menu>

      <!-- sign out button -->
      <v-btn @click="logout" flat color="grey">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>

    <!-- Side Navigation -->
    <!-- Note: temporary prop allows click away to close side nav. -->
    <v-navigation-drawer v-model="drawer" app class="primary">
      <!-- LIST tiles, good for sidenav and pages -->
      <v-list>
        <!-- avatar tile on top of sidenav-->
        <v-list-tile @click="viewProfile">
          <v-list-tile-avatar>
            <img style="height:40px; width:40px" :src="this.$store.state.user.avatar">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{this.$store.state.user.username}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <!-- rest of the tiles in the sidenav -->
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <!-- action tile, good for icons -->
          <v-list-tile-action>
            <v-icon class="white--text">{{link.icon}}</v-icon>
          </v-list-tile-action>
          <!-- content tile, for text -->
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{link.text}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      drawer: true,
      pendingCount: "",
      pendingList: [],

      links: [
        { icon: "dashboard", text: "Dashboard", route: "/" },
        { icon: "equalizer", text: "Tournaments", route: "/tournaments" },
        { icon: "star", text: "Friends", route: "/friends" },
        { icon: "assessment", text: "Standings ", route: "/standings" },
        { icon: "question_answer", text: "Chat", route: "/chat" },
        { icon: "search", text: "Search", route: "/search" }
      ]
    };
  },
  mounted() {
    this.$store.dispatch("getUser");
    this.getpendingcount();
    this.getpendinglist();
  },
  methods: {
    logout() {
      // console.log(this.$store.state.status)
      axios
        .delete("/api/logout")
        .then(res => {
          this.$store.dispatch("getStatus");
        })
        .catch(err => console.log(err));
    },
    selectTournament(id) {
      this.$router.push("/tournament/view/" + id);
    },
    getpendingcount() {
      axios
        .get("/api/tournamentpending")
        .then(res => {
          let pcount = res.data;
          this.pendingCount = pcount;
        })
        .catch(err => console.log(err));
    },
    getpendinglist() {
      axios
        .get("/api/tournamentpendinglist/")
        .then(res => {
          console.log(res.data);
          this.pendingList = res.data;
        })
        .catch(err => console.log(err));
    },
    accept(id) {
      axios.put(`/api/accepttournament/${id}`).then(res => {
        this.getpendingcount();
        this.getpendinglist();
      });
    },
    decline(id) {
      axios.put(`/api/declinetournament/${id}`).then(res => {
        this.getpendingcount();
        this.getpendinglist();
      });
    },
    viewProfile() {
      this.$router.push("/profile/" + this.$store.state.user.username);
    }
  }
};
</script>
     
<style>
a {
  text-decoration: none;
}
</style>