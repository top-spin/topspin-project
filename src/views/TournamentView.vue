<template>
  <div>
    <h1 v-if="tournament" class="text-xs-center">{{tournament.name}}</h1>
    <h1 v-else class="text-xs-center">Tournament</h1>
    <h3 v-if="tournament" class="text-xs-center">{{tournament.description}}</h3>

   <v-container v-if="finished" class="hidden-sm-and-down">
      <v-layout row wrap>
        <v-flex v-bind:class="classObject" v-for="(round,i) in rounds" :key="i">
          <!-- <v-btn class="success">Start Round</v-btn> -->
          <v-layout class="vertical_align">
            <MatchBox v-for="(matches,index) in round.matches" :key="index" :match="matches"/>
          </v-layout>
        </v-flex>
        <v-flex xs2 ml-2>
          <!-- <v-btn>Round 3 Done</v-btn> -->
          <v-layout class="vertical_align">
            <WinnerBox :match="matches[matches.length-1]"/>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>


    <v-container v-if="finished"  class="hidden-md-and-up">
      <v-layout column wrap>
        <v-flex v-for="(round,i) in rounds" :key="i" xs3>
          <!-- <v-btn class="success">Start Round</v-btn> -->
          <v-layout class="vertical_align">
            <MatchBox v-for="(matches,index) in round.matches" :key="index" :match="matches"/>
          </v-layout>
        </v-flex>
        <v-flex xs2 ml-2>
          <!-- <v-btn>Round 3 Done</v-btn> -->
          <v-layout class="vertical_align">
            <WinnerBox :match="matches[matches.length-1]"/>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  

    <v-container v-if="!finished">
      <v-layout column wrap>
        <v-flex xs3>
          <div v-if="devMode" class="btn_container">
            <v-switch v-if="canUseDevMode()" style="justify-content:center" v-model="devMode" :label="`Toggle Dev Mode`"></v-switch>
            <v-btn @click="toStart" v-if="tournament.user_id === this.$store.state.user.user_id" class="success">{{started?"Resume":"Start"}} Tournament</v-btn>
            <v-btn @click="toEdit" v-if="tournament.user_id === this.$store.state.user.user_id" class="success">Edit Players</v-btn>
          </div>
          <div v-else class="btn_container">
            <v-switch v-if="canUseDevMode()" style="justify-content:center" v-model="devMode" :label="`Toggle Dev Mode`"></v-switch>
            <v-btn @click="toStart" v-if="tournament.user_id === this.$store.state.user.user_id" :disabled="pendingPlayers.length!==0" class="success">{{started?"Resume":"Start"}} Tournament</v-btn>
            <v-btn @click="toEdit" v-if="tournament.user_id === this.$store.state.user.user_id" :disabled="started" class="success">Edit Players</v-btn>
          </div>
          <v-layout class="vertical_align">
            <PreMatchBox v-for="(match,index) in tournamentArray" :key="index" :match="match"/>
          </v-layout>
        </v-flex>

        <v-flex xs2 ml-2>
          <!-- <v-btn>Round 3 Done</v-btn> -->
          <v-layout class="vertical_align">
            <WinnerBox :match="matches[matches.length-1]"/>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import MatchBox from "@/components/MatchBox.vue";
import PreMatchBox from "@/components/PreMatchBox.vue";
import WinnerBox from "@/components/WinnerBox.vue";
import axios from "axios";

export default {
  name: "TournamentView",
  components: {
    MatchBox,
    WinnerBox,
    PreMatchBox
  },
  data() {
    return {
      matches:[],
      rounds:[],
      tournament:{},
      pendingPlayers:[],
      acceptedPlayers:[],
      finished:true,
      tournamentArray:[],
      started:false,
      devMode:false
    };
  },
  mounted(){
    axios.get("/api/tournament-matches/"+this.$route.params.id).then(res=>{
      console.log(res.data)
      if(res.data.acceptedPlayers){
        this.tournament = res.data.tournament
        this.pendingPlayers = res.data.pendingPlayers
        this.acceptedPlayers = res.data.acceptedPlayers
        this.finished = res.data.finished
        this.started = res.data.started
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
            let semiSorted = accepted.concat(pending).sort((a,b)=>{
              return +a.rank - +b.rank
            })
            let allPlayers = []
            for(let i = semiSorted.length/2; i>allPlayers.length; i=i){
                allPlayers.push([semiSorted.splice(0,1)[0],semiSorted.splice(semiSorted.length-1,1)[0]])
    
            }
            let finalSorted = []
            allPlayers.map((array,i,currentArray)=>{
            if(i%2!==0){
                finalSorted.push(array[0])
                finalSorted.push(array[1])
            }
            else{
                finalSorted.splice((currentArray/2),0,array[0])
                finalSorted.splice((currentArray/2),0,array[1])
            }
            })
            // console.log("final sort", finalSorted)
        let newArray = []
        for(let i = 0;(res.data.tournament.size)>i;i=i+2){
          // debugger
          newArray.push({
            player1:finalSorted[i],
            player2:finalSorted[i+1],
            score1:0,
            score2:0
          })
        }
        this.tournamentArray = newArray
        console.log(this.tournamentArray)
      }
      else{
        if(res.data.matches.length === 15){
          this.rounds = [
            {
              matches:res.data.matches.slice(0,8)
            },
            {
              matches:res.data.matches.slice(8,12)
            },
            {
              matches:res.data.matches.slice(12,14)
            },
            {
              matches:res.data.matches.slice(14)
            }
          ]
        }
        else if(res.data.matches.length === 7){
          this.rounds = [
            {
              matches:res.data.matches.slice(0,4)
            },
            {
              matches:res.data.matches.slice(4,6)
            },
            {
              matches:res.data.matches.slice(6)
            }
          ]
        }
        if(res.data.matches.length === 3){
          this.rounds = [
            {
              matches:res.data.matches.slice(0,2)
            },
            {
              matches:res.data.matches.slice(2)
            }
          ]
        }
        if(res.data.matches.length === 1){
          this.rounds = [
            {
              matches:res.data.matches.slice(0,1)
            }
          ]
        }
        // console.log(this.rounds)
        this.matches = res.data.matches
        this.tournament = res.data.tournament
      }
    }).catch(err=>console.log(err))
  },
  computed: {
    classObject: function () {
      return {
        'ml-2':true,
        'xs2':(this.matches.length===15),
        'xs3':(this.matches.length!==15)
      }
    }
  },
  methods:{
    toEdit(){
      this.$router.push("/tournament/edit/"+this.tournament.tournament_id)
    },
    toStart(){
      this.$router.push("/tournament/started/"+this.tournament.tournament_id)
    },
    canUseDevMode(){
      if(this.tournament.user_id === this.$store.state.user.user_id && this.$store.state.user.user_id === 'google-oauth2|117566912095890883904'){
        return true
      }
      else if(this.tournament.user_id === this.$store.state.user.user_id && this.$store.state.user.user_id === 'google-oauth2|107286519142944865068'){
        return true
      }
      else if(this.tournament.user_id === this.$store.state.user.user_id && this.$store.state.user.user_id === 'google-oauth2|108374143480245744572'){
        return true
      }
      else{
        return false;
      }
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
.btn_container{
  width: 100%;
  text-align: center;
}
</style>
