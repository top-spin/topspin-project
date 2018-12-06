<template>
  <div class="following">
    <v-list class="allfollowing">
      <v-list-tile v-for="profile in profiles" :key="profile.name" router :to="profile.route" @click="viewProfile(profile)">
        <v-list-tile-avatar>
          <img :src="profile.avatar">
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{profile.username}}</v-list-tile-title>
        </v-list-tile-content>
                <v-list-tile-content>
          <v-list-tile-title>Rating: {{profile.rating}}</v-list-tile-title>
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
import Axios from 'axios';
export default {
   data(){
    return{
      profiles:[]
    }
  },
  props: {
    addPlayer:Function
  },
    methods:{
    viewProfile(player){
      if(this.addPlayer){
        this.addPlayer(player)
        return
      }
      this.$router.push("/profile/"+player.username)
    }
  },
  mounted(){
    Axios.get("/api/following/").then(res=>{
      console.log(res.data)
      this.profiles=res.data
      // this.rank = res.data.rank,
      // this.username = res.data.user.username,
      // this.avatar = res.data.user.avatar
    }).catch(err=>{console.log(err)})
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