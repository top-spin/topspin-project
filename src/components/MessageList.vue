
<template>
  <div class="convocontainer">
    <v-list class="allconversations">
      <div v-for="player in filteredPlayers" :key="player.username">
        <v-list-tile
          v-if="player.user_id===selectedPlayer.user_id"
          @click="getMessageFeed(player)"
          style="background-color:#eeeeee"
        >
          <v-list-tile-avatar>
            <img :src="player.avatar">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{player.username}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-else @click="getMessageFeed(player)">
          <v-list-tile-avatar>
            <img :src="player.avatar">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{player.username}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </div>
    </v-list>

    <div class="conversation">
      <BasicVueChat
        :updateFeed="updateFeed"
        :players="players"
        :getMessages="getMessageFeed"
        :player="selectedPlayer"
        :initialFeed="feed"
      />
    </div>
  </div>
</template>

<script>
import BasicVueChat from "./basicvuechat/BasicVueChat.vue";
import Axios from "axios";
import { scrollToBottom } from "../helpers/scroll.js";
import moment from "moment";

export default {
  components: {
    BasicVueChat
  },
  data() {
    return {
      players: [],
      feed: [],
      selectedPlayer: {},
      filteredPlayers: []
    };
  },
  mounted() {
    Axios.get("/api/chat-users")
      .then(res => {
        this.filteredPlayers = res.data.filter(
          player => player.user_id !== this.$store.state.user.user_id
        );
        this.players = res.data;
        this.selectedPlayer = this.filteredPlayers[0];
        this.getMessageFeed(this.selectedPlayer);
      })
      .catch(err => console.log(err));
  },
  methods: {
    getMessageFeed(player) {
      Axios.get("/api/messages/" + player.user_id).then(res => {
        this.feed = res.data.map(message => {
          return {
            id: message.from_user,
            author: (() => {
              return this.players.filter(
                player => player.user_id === message.from_user
              )[0].username;
            })(),
            contents: message.body,
            date: moment(message.date_sent).format("h:mm A MM-DD")
          };
        });
        scrollToBottom();
      });
      this.selectedPlayer = player;
    },
    updateFeed(newFeed) {
      this.feed = newFeed;
    }
  }
};
</script>

<style>
.convocontainer {
  display: flex;
}
.allconversations {
  width: 35%;
  overflow: auto;
}
.conversation {
  width: 65%;
  height: 100%;
  margin-left: 3px;
}
</style>