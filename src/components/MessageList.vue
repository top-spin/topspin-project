
<template>
  <div class="convocontainer">
    <v-list class="allconversations">
      <v-list-tile
        v-for="player in players"
        :key="player.username"
        @click="getConversationNames('Jery',  player.username)"
      >
        <v-list-tile-avatar>
          <img :src="player.avatar">
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{player.username}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <div class="conversation">
      <BasicVueChat :new-message="message"/>
    </div>
  </div>
</template>

<script>
import BasicVueChat from "./basicvuechat/BasicVueChat.vue";
import Axios from "axios";

export default {
  components: {
    BasicVueChat
  },
  data() {
    return {
      players: []
    };
  },
  mounted() {
    Axios.get("/api/all-players")
      .then(res => {
        this.players = res.data;
        console.log(this.players);
      })
      .catch(err => console.log(err));
  },
  methods: {
    getConversationNames(currentUsername, clickedUsername) {
      // get user endpoint
      console.log(currentUsername, clickedUsername);
    }
  }
};
</script>

<style>
.convocontainer {
  /* height: 500px; */
  display: flex;
  /* border: 1px #424242 solid; */
}
.allconversations {
  width: 35%;
  overflow: auto;
  /* border: 1px #424242 solid; */
}
.conversation {
  width: 65%;
  height: 100%;
  /* border: 1px pink solid; */
  margin-left: 3px;
}
</style>