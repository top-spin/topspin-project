<template>
  <div v-if="status === 'loggedIn'" id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/friends">Friends</router-link>
      <router-link to="/players">Players</router-link>
      <router-link to="/chat">Chat</router-link>
      <router-link to="/tournaments">Tournaments</router-link>
      <router-link to="/account">Account</router-link>
    </div>
    <router-view/>
  </div>
  <div v-else-if="status === 'moreInfo'" id="app">
    <MoreInfo></MoreInfo>
  </div>
  <div v-else id="app">
    <LandingPage></LandingPage>
  </div>
</template>
<script>
import LandingPage from "./views/LandingPage.vue";
import MoreInfo from "./views/MoreInfo.vue";
import axios from "axios";
export default {
  name:"App",
  components:{
    LandingPage,
    MoreInfo
  },
  data(){
    return{
      status:""
    }
  },
  mounted(){
      axios.get("/api/status").then(res=>{
        console.log(res.data)
        this.status = res.data;
      }).catch(err=>{console.log(err)})
    }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
