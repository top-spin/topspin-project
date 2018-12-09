<template>
  <div>
    <h1 v-if="tournament" class="text-xs-center">{{tournament.name}}</h1>
    <p v-if="tournament" class="text-xs-center">{{tournament.description}}</p>
    <p v-if="tournament" class="text-xs-center">{{tournament.size/2-1}} Rounds</p>
    <h1 v-else class="text-xs-center">Tournament</h1>


    <v-container v-if="!finished">
      <v-layout column wrap>
        <v-flex xs3>
          <v-btn @click="submitRound" v-if="tournament.user_id === this.$store.state.user.user_id" class="success">Submit Round</v-btn>
          <!-- <v-btn @click="toEdit" v-if="tournament.user_id === this.$store.state.user.user_id" class="success">Edit</v-btn> -->
          <v-layout class="vertical_align">
            <StartedMatch v-for="(match,index) in tournamentArray" :key="index" :match="match"/>
          </v-layout>
        </v-flex>
        <!-- <v-flex xs2 ml-2>
          <v-layout class="vertical_align">
            <WinnerBox :match="matches[matches.length-1]"/>
          </v-layout>
        </v-flex> -->
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import MatchBox from "@/components/MatchBox.vue";
import StartedMatch from "@/components/StartedMatch.vue";
import WinnerBox from "@/components/WinnerBox.vue";
import axios from "axios";

export default {
  name: "StartedTournament",
  components: {
    MatchBox,
    WinnerBox,
    StartedMatch
  },
  data() {
    return {
      matches:[],
      rounds:[],
      tournament:{},
      pendingPlayers:[],
      acceptedPlayers:[],
      finished:true,
      tournamentArray:[]
    };
  },
  mounted(){
    axios.get("/api/tournament-matches/"+this.$route.params.id).then(res=>{
      if(res.data.acceptedPlayers){
        this.tournament = res.data.tournament
        this.pendingPlayers = res.data.pendingPlayers
        this.acceptedPlayers = res.data.acceptedPlayers
        this.finished = res.data.finished
        // debugger;
        let pending = this.pendingPlayers.map(player=>{
          if(player.rejected){
            player.type = "rejected"
          }
          else{
            player.type = "pending"
          }
          return player
        })
        let accepted = this.acceptedPlayers.map(player=>{
          player.type = "accepted"
          return player
        })
        let allPlayers = accepted.concat(pending)
        let newArray = []
        for(let i = 0;(res.data.tournament.size)>i;i=i+2){
          // debugger
          newArray.push({
            player1:allPlayers[i],
            player2:allPlayers[i+1],
            score1:0,
            score2:0
          })
        }
        this.tournamentArray = newArray
        // console.log(this.tournamentArray)
      }
    }).catch(err=>console.log(err))
  },
  methods:{
    submitRound(){
    //   console.log(this.tournamentArray)
        axios.post("/api/submit-round",{
            matchesToBe:this.tournamentArray,
            tournament:this.tournament
        }).then(res=>{
        //     let count = this.tournament.size
        // if(res.data.length===(this.tournament.size/2)){
        //     count = 
        // }
        // else if(+matchCount===(this.tournament.size/4)){
        //     return rounds3[i]
        // }
        // else if(+matchCount===(req.body.tournament.size/8)){
        //     return rounds4[i]
        // }
        let newArray = []
        for(let i = 0;(res.data.length)>i;i=i+2){
          // debugger
          newArray.push({
            player1:res.data[i],
            player2:res.data[i+1],
            score1:0,
            score2:0
          })
        }
        this.tournamentArray = newArray
        }).catch(err=>console.log(err))
    }
  }
}
</script>

<style>
/* .horizonalalign{
  
} */
.vertical_align {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-content: center;
}
</style>
