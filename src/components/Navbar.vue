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

      <!-- title option 2
      <v-toolbar-title>
        <span class="font-weight-light">Top</span>
        <span>Spin</span>
      </v-toolbar-title>
      title option 3
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Top</span>
        <span>Spin</span>
      </v-toolbar-title>-->
      <!-- spaces left and right -->
      <v-spacer></v-spacer>

      <!-- notifications bell -->
      <v-menu bottom left>
        <v-btn slot="activator" dark icon>
          <!-- <span class="orange--text">accept tournaments</span> -->
          <v-badge overlap color="orange">
            <span slot="badge">{{pendingCount}}</span>
            <v-icon large color="grey">notifications</v-icon>
          </v-badge>
        </v-btn>

        <v-list>
          <v-list-tile v-for="(item, i) in notificationItems" :key="i" @click="notificationActions">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            <v-btn small depressed @click="accept" color="light-green accent-3">accept &#10004;</v-btn>/
            <v-btn small flat @click="decline" color="red darken-3">decline x</v-btn>
          </v-list-tile>
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
        <!-- // avatar tile on top -->
        <v-list-tile v-for="av in avatar" :key="av.name" router :to="av.route">
          <v-list-tile-avatar>
            <img height="128" width="auto" :src="av.image">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{av.username}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <!-- rest of the tiles -->
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
      pendingCount: "",
      pendingList: [],
      // notificationItems: [{ title: "tournament name", tourney: 0 }],
      drawer: true,
      avatar: [
        {
          // need to make image dynamic
          image: "https://randomuser.me/api/portraits/men/85.jpg",
          username: "Jerry Berry",
          route: "/profile"
        }
      ],
      // coding links so that I do not have to rewrite the list-tile action&content over and over again.
      // added v-for into v-list-tile
      // :key="link.text" does the binding gives vue a unique output for every for-loop.
      // added router which gives the tile a link tag onClick. router prop gives us hover effect as well.
      // :to="link.route" sends us to the appropriate link
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
    axios
      .get("/api/navbar-info")
      .then(res => {
        this.avatar = [
          {
            image: res.data.image,
            username: res.data.username,
            route: "/profile/" + res.data.username
          }
        ];
      })
      .catch(err => console.log(err));
    this.$store.dispatch("getUser");
    axios
      .get("/api/tournamentpending")
      .then(res => {
        let pcount = res.data;
        this.pendingCount = pcount;
      })
      .catch(err => console.log(err));
    axios
      .get("/api/tournamentpendinglist/:user")
      .then(res => {
        console.log(res.data);
        // let pcount = res.data;
        // this.pendingCount = pcount;
      })
      .catch(err => console.log(err));
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
    notificationActions() {
      console.log(this.avatar);
      // TODO: this should route to tournament, by tournament id
    },
    accept(id) {
      // axios.put(`/api/tournament/${id}`);
      console.log("accepted", id);
    },
    decline(id) {
      // axios.put(`/api/tournament/${id}`);
      console.log("declined", id);
    }
  }
};
</script>
     
<style>
a {
  text-decoration: none;
}
</style>