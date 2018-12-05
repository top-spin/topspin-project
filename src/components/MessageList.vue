
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
      <!-- might want to move this to its own component -->
      <!-- https://vuejsexamples.com/tag/chat/ -->
    </div>
  </div>
</template>

<script>
export default {
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
          name: "Master Splinter",
          route: "/messages/profile"
        }
      ]
    };
  }
};
</script>

<style>
.convocontainer {
  display: flex;
  /* border: 1px #424242 solid; */
}
.allconversations {
  width: 36%;
  /* border: 1px #424242 solid; */
}
.conversation {
  width: 60%;
  /* border: 1px #424242 solid; */
  margin-left: 5px;
}
</style>