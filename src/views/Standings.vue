<template>
    <div>
        <h1 class="text-xs-center ma5" v-if="players.length === 0">Loading Standings...</h1>
        
        <div class="text-xs-center" v-for="player in players" :key="player.user_id"  >
   
            <div class="playerrank">
            <v-divider
                :inset="player.inset"
            ></v-divider>
            <v-subheader
                :key="player.username"
            >
                {{ player.username }}
            </v-subheader>


            <v-list-tile 
                :key="player.title"
                avatar
                @click="viewProfile(player.username)"
            >
            <v-list-tile-avatar>
            <img :src="player.avatar">
            </v-list-tile-avatar>

            <v-list-tile-content>
            <v-list-tile-title v-html="player.name" style="font-size:1.2em;"></v-list-tile-title>
            <v-list-tile-sub-title v-html="player.city" ></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
            <v-list-tile-sub-title v-if="player.rank"  class="success--text" style="font-size:1.3em;">Rank: # {{player.rank}} </v-list-tile-sub-title>
            </v-list-tile-action>
            </v-list-tile>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    name:"Standings",
    data(){
        return{
            players:[]
        }
    },
        methods:{
    viewProfile(username){
      this.$router.push("/profile/"+username)
    }
  },
    mounted(){
        axios.get("/api/all-players").then(res=>{
            this.players = res.data;
        }).catch(err=>console.log(err))
    }
}
</script>
<style>
@media only screen and (min-width: 500px){
    .playerrank{
        width:95%;
         margin-left:3%
}}
</style>