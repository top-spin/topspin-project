
<template>
  <div class="followers">
    <v-list class="allfollowers">
      <v-list-tile v-for="avatar in avatars" :key="avatar.name" router :to="avatar.route">
        <v-list-tile-avatar>
          <img :src="avatar.image">
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{avatar.name}}</v-list-tile-title>
        </v-list-tile-content>
                <v-list-tile-content>
          <v-list-tile-title>{{avatar.rating}}</v-list-tile-title>
        </v-list-tile-content>
        <!-- <v-btn small fab dark color="orange" depressed>x</v-btn> -->
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
          image: "https://randomuser.me/api/portraits/men/89.jpg",
          name: "Nate Spade",
           rating: "Rank:"+ 3
        },
        {
          image: "https://randomuser.me/api/portraits/men/80.jpg",
          name: "Keelan Tanley",
          rating: "Rank:"+5

         
        }
      ]
    };
  }
};
</script>

<style>
.followers {
  display: flex;
  /* border: 1px #424242 solid; */
}
.allfollowers {
  width: 36%;
  /* border: 1px #424242 solid; */
}
</style>