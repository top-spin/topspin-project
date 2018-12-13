<template>
  <v-app v-if="this.$store.state.status === 'loggedIn'">
    <Navbar/>
    <v-content>
      <router-view :key="$route.fullPath"/>
    </v-content>
  </v-app>

  <v-app v-else-if="this.$store.state.status === 'needsInfo'">
    <NewUser></NewUser>
  </v-app>

  <v-app v-else>
    <LandingPage></LandingPage>
  </v-app>
</template>

<script>
import LandingPage from "./views/LandingPage.vue";
import NewUser from "./views/NewUser.vue";
import axios from "axios";
import Navbar from "@/components/Navbar";

export default {
  name: "App",
  components: {
    LandingPage,
    NewUser,
    Navbar
  },
  mounted(){
      this.$store.dispatch('getStatus')
    }
};
</script>
