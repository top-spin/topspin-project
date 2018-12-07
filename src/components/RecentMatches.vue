<template>
  <div>
    <span class="title">
      <span class="font-weight-light">Recent</span>
      <span class="orange--text">Matches</span>
    </span>
         <v-list>
           <v-list-tile v-for="match in matches" :key="match.match_id">

            <v-list-tile-content>
              <v-list-tile-title>Winner: {{match.match_winner.username}} </v-list-tile-title>
            </v-list-tile-content>
                        <v-list-tile-content>
              <v-list-tile-title>Score: {{match.winning_score}} </v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-content>
              <v-list-tile-sub-title>Loser: {{match.match_loser.username}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-content>
              <v-list-tile-title>Score: {{match.losing_score}} </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
 
         </v-list>
       
       
  </div>
</template>
<script>
import axios from "axios";
export default {
    name:"RecentMatches",
    data(){
        return{
            matches:[]
        }
    },
    mounted(){
        axios.get("/api/get-my-matches").then(res=>{
          console.log(res.data)
          this.matches = res.data.slice(0,3)
        }).catch(err=>console.log(err))

    } 
}
</script>