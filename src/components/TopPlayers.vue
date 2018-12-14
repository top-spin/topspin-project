<template>
  <div>
    <span class="title">
      <span class="font-weight-light">Top</span>
      <span class="orange--text">Players</span>
    </span>

    <div style="height:550px">
      <v-app style="height:500px">
        <v-container>
          <v-carousel>
            <v-carousel-item v-for="player in players " :key="player.user_id">
              <v-layout row>
                <v-flex :key="j" v-for="j in 1">
                  <img :src="player.avatar" style="  width:100vh" alt>
                  <div class="titlea">{{player.rank}} : {{ player.username }}</div>
                </v-flex>
              </v-layout>
            </v-carousel-item>
          </v-carousel>
        </v-container>
      </v-app>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "TopPlayers",
  data() {
    return {
      players: []
    };
  },
  methods: {
    viewProfile(username) {
      this.$router.push("/profile/" + username);
    }
  },
  mounted() {
    axios
      .get("/api/all-players")
      .then(res => {
        this.players = res.data.slice(0, 5);
      })
      .catch(err => console.log(err));
  }
};
</script>
<style scoped>
img {
  max-width: 100%;
}
.titlea {
  position: absolute;
  bottom: 10%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 2em;
  padding: 5px;
  height: 50px;
  margin-bottom: 60px;
}
</style>

 