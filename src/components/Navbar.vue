<template>
  <nav>
    <v-toolbar flat app>
      <!-- hamburger menu -->
      <v-toolbar-side-icon class="grey--text" @click="drawer=!drawer"></v-toolbar-side-icon>
      <!-- title option 1 -->
      <v-toolbar-title>
        <span class="font-weight-light">Top</span>
        <span class="orange--text">Spin</span>
      </v-toolbar-title>
      <!-- title option 2 -->
      <v-toolbar-title>
        <span class="font-weight-light">Top</span>
        <span>Spin</span>
      </v-toolbar-title>
      <!-- title option 3 -->
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Top</span>
        <span>Spin</span>
      </v-toolbar-title>

      <!-- spaces left and right -->
      <v-spacer></v-spacer>

      <!-- sign out button -->
      <v-btn flat color="grey">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>

    <!-- Side Navigation -->
    <!-- Note: we can add temporary. Temporary = click away to close side nav. -->
    <v-navigation-drawer v-model="drawer" app class="primary">
      <!-- LIST tiles, good for sidenav and pages -->
      <v-list>
        <!-- // need to figure out router for this tile. -->
        <!-- // avatar tile on top -->
        <v-list-tile v-for="av in avatar" :key="av.name" router :to="av.route">
          <v-list-tile-avatar>
            <img :src="av.image">
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
        { icon: "people", text: "Players", route: "/players" },
        { icon: "question_answer", text: "Chat", route: "/chat" },
        { icon: "account_circle", text: "Account ", route: "/account" }
      ]
    };
  },
  mounted(){
    axios.get("/api/navbar-info").then(res=>{
      this.avatar = [{
        image:res.data.image,
        username:res.data.username,
        route:"/profile/"+res.data.username
      }]
    }).catch(err=>console.log(err))
  }
};
</script>
