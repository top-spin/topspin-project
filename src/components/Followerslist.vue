
<template>
  <div class="followers">
    <v-list class="allfollowers">
      <v-list-tile v-for="avatar in avatars" :key="avatar.name" router :to="avatar.route"  @click="viewProfile(avatar.username)"> 
        <v-list-tile-avatar>
          <img :src="avatar.avatar">
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{avatar.username}}</v-list-tile-title>
        </v-list-tile-content>
                <v-list-tile-content>
          <v-list-tile-title>Rating: {{avatar.rating}}</v-list-tile-title>
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
      avatars:[]
        
    }
  
  },
    methods:{
    viewProfile(username){
      this.$router.push("/profile/"+username)
    }
  },
  mounted(){
    Axios.get("/api/followers/").then(res=>{
      console.log(res.data)
      this.avatars=res.data
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