
<template>
  <div class="convocontainer">
    <v-list class="allconversations">
      <v-list-tile v-for="avatar in avatars" :key="avatar.name" router :to="avatar.route">
        <v-list-tile-avatar>
          <img :src="avatar.image">
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{avatar.name}}</v-list-tile-title>
        </v-list-tile-content>
        <v-btn small fab dark color="orange" depressed>x</v-btn>
      </v-list-tile>
    </v-list>

    <div class="conversation">
      <BasicVueChat :new-message="message"/>
      <!-- might want to move this to its own component -->
      <!-- https://vuejsexamples.com/tag/chat/ -->
    </div>
  </div>
</template>

<script>
// import BasicVueChat from "../components/basicvuechat/BasicVueChat.vue";
import BasicVueChat from "./basicvuechat/BasicVueChat.vue";

export default {
  components: {
    BasicVueChat
  },
  data() {
    return {
      avatars: [
        {
          // need to make image dynamic
          image: "https://randomuser.me/api/portraits/men/85.jpg",
          name: "Jerry Berry",
          route: "/messages/profile"
        },
        {
          image: "https://randomuser.me/api/portraits/men/85.jpg",
          name: "Homer Simpson",
          route: "/messages/profile"
        },
        {
          image: "https://randomuser.me/api/portraits/men/85.jpg",
          name: "One Punch Man",
          route: "/messages/profile"
        },
        {
          image: "https://randomuser.me/api/portraits/men/85.jpg",
          name: "One Punch Man",
          route: "/messages/profile"
        },
        {
          image: "https://randomuser.me/api/portraits/men/85.jpg",
          name: "Master Splinter",
          route: "/messages/profile"
        },
        {
          image: "https://randomuser.me/api/portraits/men/85.jpg",
          name: "Homer Simpson",
          route: "/messages/profile"
        },
        {
          image: "https://randomuser.me/api/portraits/men/85.jpg",
          name: "One Punch Man",
          route: "/messages/profile"
        },
        {
          image: "https://randomuser.me/api/portraits/men/85.jpg",
          name: "One Punch Man",
          route: "/messages/profile"
        },
        {
          image: "https://randomuser.me/api/portraits/men/85.jpg",
          name: "One Punch Man",
          route: "/messages/profile"
        },
        {
          image: "https://randomuser.me/api/portraits/men/85.jpg",
          name: "Master Splinter",
          route: "/messages/profile"
        },
        {
          image: "https://randomuser.me/api/portraits/men/85.jpg",
          name: "Homer Simpson",
          route: "/messages/profile"
        },
        {
          image: "https://randomuser.me/api/portraits/men/85.jpg",
          name: "One Punch Man",
          route: "/messages/profile"
        }
      ]
    };
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