<template>
  <div>
    <h1 v-if="tournament" class="text-xs-center">{{tournament.name}}</h1>
    <p v-if="tournament" class="text-xs-center">{{tournament.description}}</p>
    <p v-if="tournament" class="text-xs-center">{{numberOfRounds()}} Round(s)</p>
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
    this.getRounds();
  },
  methods:{
    submitRound(){
    //   console.log(this.tournamentArray)
        axios.post("/api/submit-round",{
            matchesToBe:this.tournamentArray,
            tournament:this.tournament
        }).then(res=>{
            console.log("response of tournament",res.data)
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
        // console.log(res.data)
        // let newArray = []
        // for(let i = 0;(res.data.length)>i;i=i+2){
        //   // debugger
        //   newArray.push({
        //     player1:res.data[i],
        //     player2:res.data[i+1],
        //     score1:0,
        //     score2:0
        //   })
        // }
        // this.tournamentArray = newArray
        // console.log(this.tournamentArray)
        this.getRounds();
        }).catch(err=>console.log(err))
    },
    numberOfRounds(){
        let size = this.tournament.size
        let count = 0
        let currentRound = 0;
        let numberOfMatches = this.matches.length
        if(this.tournament.size){
            while(size!==1){
                size = size/2;
                count++;
            }
        }
        return count;
    },
    getRounds(){
        axios.get("/api/started-matches/"+this.$route.params.id).then(res=>{
        console.log(res.data)
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
      else if(res.data.notFinished){
          console.log(res.data.winners)
          let finalSorted = res.data.winners.sort((a,b)=>{
              console.log(a.round.slice(1,2))
              let aVar = a.round.slice(1,2);
              let bVar = b.round.slice(1,2);
              return (aVar < bVar) ? -1 : (aVar > bVar) ? 1 : 0;
            })
        console.log("round",finalSorted)
        let newArray = []
        for(let i = 0;(res.data.winners.length)>i;i=i+2){
            // debugger
          newArray.push({
            player1:finalSorted[i],
            player2:finalSorted[i+1],
            score1:0,
            score2:0
          })
        }
          console.log(finalSorted)
        this.tournamentArray = newArray
        this.tournament = res.data.tournament,
        this.finished = res.data.finished
        // console.log(this.tournamentArray)
      }
      else if(res.data.matches.length === (res.data.tournament.size)-1){
          this.$router.push("/tournament/view/"+res.data.tournament.tournament_id)
      }
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
