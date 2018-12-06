<template>
  <div>
    <h1 class="text-xs-center">Tournament</h1>

   <v-container class="hidden-sm-and-down">
      <v-layout row wrap>
        <v-flex v-bind:class="classObject" v-for="(round,i) in rounds" :key="i">
          <v-btn class="success">Start Round</v-btn>
          <v-layout class="vertical_align">
            <MatchBox v-for="(matches,index) in round.matches" :key="index" :match="matches"/>
          </v-layout>
        </v-flex>
        <v-flex xs2 ml-2>
          <v-btn>Round 3 Done</v-btn>
          <v-layout class="vertical_align">
            <WinnerBox :match="matches[matches.length-1]"/>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>


    <v-container class="hidden-md-and-up">
      <v-layout column wrap>
        <v-flex v-for="(round,i) in rounds" :key="i" xs3>
          <v-btn class="success">Start Round</v-btn>
          <v-layout class="vertical_align">
            <MatchBox v-for="(matches,index) in round.matches" :key="index" :match="matches"/>
          </v-layout>
        </v-flex>
        <!-- <v-flex xs3 ml-2>
          <v-btn depressed color="#f57c00">Round 1 Done</v-btn>
          <v-layout class="vertical_align">
            <MatchBox :match="matches[4]"/>
            <MatchBox :match="matches[5]"/>
          </v-layout>
        </v-flex>
        <v-flex xs3 ml-2>
          <v-btn flat color="success">Round 2 Done</v-btn>
          <v-layout class="vertical_align">
            <MatchBox :match="matches[6]"/>
          </v-layout>
        </v-flex> -->
        <v-flex xs2 ml-2>
          <v-btn>Round 3 Done</v-btn>
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
import WinnerBox from "@/components/WinnerBox.vue";
import axios from "axios";

export default {
  name: "TournamentView",
  components: {
    MatchBox,
    WinnerBox
  },
  data() {
    return {
      matches:[],
      rounds:[]
    };
  },
  mounted(){
    axios.get("/api/tournament-matches/"+this.$route.params.id).then(res=>{
      console.log(res.data)
      if(res.data.length === 15){
        this.rounds = [
          {
            matches:res.data.slice(0,8)
          },
          {
            matches:res.data.slice(8,12)
          },
          {
            matches:res.data.slice(12,14)
          },
          {
            matches:res.data.slice(14)
          }
        ]
      }
      else if(res.data.length === 7){
        this.rounds = [
          {
            matches:res.data.slice(0,4)
          },
          {
            matches:res.data.slice(4,6)
          },
          {
            matches:res.data.slice(6)
          }
        ]
      }
      if(res.data.length === 3){
        this.rounds = [
          {
            matches:res.data.slice(0,3)
          },
          {
            matches:res.data.slice(3)
          }
        ]
      }
      if(res.data.length === 1){
        this.rounds = [
          {
            matches:res.data.slice(0,1)
          }
        ]
      }
      // console.log(this.rounds)
      this.matches = res.data
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
