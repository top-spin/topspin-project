<template>
  <v-app v-if="status === 'loggedIn'">
    <Navbar/>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>

  <v-app v-else-if="status === 'needsInfo'">
    <MoreInfo></MoreInfo>
  </v-app>

  <v-app v-else>
    <LandingPage></LandingPage>
  </v-app>
</template>

<script>
import LandingPage from "./views/LandingPage.vue";
import MoreInfo from "./views/MoreInfo.vue";
import axios from "axios";
import Navbar from "@/components/Navbar";

export default {
  name: "App",
  components: {
    LandingPage,
    MoreInfo,
    Navbar
  },
  data() {
    return {
      status: ""
    };
  },
  mounted(){
      axios.get("/api/status").then(res=>{
        console.log(res.data)
        this.status = res.data;
      }).catch(err=>{console.log(err)})
    }
};
</script>
