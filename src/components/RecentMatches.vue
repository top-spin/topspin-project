<template>
  <div>
    <span class="title">
      <span class="font-weight-light">Recent</span>
      <span class="orange--text">Matches</span>
    </span>
     
             <v-list  >
           <v-list-tile v-for="match in matches" :key="match.match_id">     

            <div class="recentmatches"  >
             <v-divider  ></v-divider>
              
              <div class="recentmatchescontent"   >
              <div  class="name">Winner: {{match.match_winner.username}}</div>                  
              <div class="score" >Score:  {{match.winning_score}}  </div>
               </div>
              <div class = "recentmatchescontent">
              <div class="name" >Loser: {{match.match_loser.username}}</div>
              <div class="score"> Score:  {{match.losing_score}}  </div>
              </div>
             
              
              
               </div>
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
          this.matches = res.data.slice(0,10)
        }).catch(err=>console.log(err))

    } 
}
</script>
<style>
.recentmatches{
  display: flex;
  flex-direction: column;
  width: 100%;

}

.recentmatchescontent{
  display: flex;
  flex-direction: row;
}
.score{
  align-items: right;
}
.name{
  width: 77%;
}
</style>
