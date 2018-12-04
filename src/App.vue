<template>
  <v-app v-if="status === 'loggedIn'">
    <!-- <router-link to="/">Home</router-link>| -->
    <router-link to="/">Dashboard</router-link>
    <router-link to="/friends">Friends</router-link>
    <router-link to="/players">Players</router-link>
    <router-link to="/chat">Chat</router-link>
    <router-link to="/tournaments">Tournaments</router-link>
    <router-link to="/account">Account</router-link>

    <v-content>
      <!-- <HelloWorld/> -->
      <router-view/>
    </v-content>
  </v-app>

  <v-app v-else-if="status === 'needsInfo'"></v-app>

  <v-app v-else></v-app>
</template>

<script>
import LandingPage from "./views/LandingPage.vue";
import MoreInfo from "./views/MoreInfo.vue";
import axios from "axios";
export default {
  name: "App",
  components: {
    LandingPage,
    MoreInfo
  },
  data() {
    return {
      status: "loggedIn"
    };
  }
  // mounted(){
  //     axios.get("/api/status").then(res=>{
  //       console.log(res.data)
  //       this.status = res.data;
  //     }).catch(err=>{console.log(err)})
  //   }
};
</script>
