<template>
  <div>
    <span class="title">
      <span class="font-weight-light">Recent</span>
      <span class="orange--text">Matches</span>
    </span>
         <v-list>
           <v-list-tile>

            <v-list-tile-content>
              <v-list-tile-title>Winner: {{wmatches.username}} </v-list-tile-title>
            </v-list-tile-content>
                        <v-list-tile-content>
              <v-list-tile-title>Score: {{wmatches.winning_score}} </v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-content>
              <v-list-tile-sub-title>Loser: {{lmatches.username}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-content>
              <v-list-tile-title>Score: {{lmatches.losing_score}} </v-list-tile-title>
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
            wmatches: { username:"ethan" ,
            winning_score: 21}           ,
            lmatches: { username:"jerry",
             losing_score:20} 
        }
    }
    // mounted(){
    //     axios.get("/api/winmatches").then(res=>{
    //         console.log(res.data)
    //         this.wmatches = res.data;
    //     }).catch(err=>console.log(err))
    //       axios.get("/api/losematches").then(res=>{
    //         console.log(res.data)
    //         this.lmatches = res.data;
    //     }).catch(err=>console.log(err))
    // } 
}
</script>