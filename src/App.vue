<template>
  <v-app v-if="status === 'loggedIn'">
    <Navbar/>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>

  <v-app v-else-if="status === 'needsInfo'">
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
