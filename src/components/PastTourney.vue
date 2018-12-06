<template>
  <div>
    <span class="title">
      <span class="font-weight-light">Previous</span>
      <span class="orange--text">Tournaments</span>
    </span>
    <div v-if="tournaments.length!==0">
    <!-- <h1 v-for="tournament in tournaments" :key="tournament.id">{{tournament.name}}</h1> -->
        <v-list subheader>
          <!-- <v-subheader>Recent chat</v-subheader> -->
          <v-list-tile
             v-for="(tournament,i) in tournaments" 
            :key="i"
            @click="selectTournament(tournament.tournament_id)"
          >

            <v-list-tile-content>
              <v-list-tile-title v-html="tournament.tournament_name"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-list-tile-sub-title>Created By: {{tournament.creator}}</v-list-tile-sub-title>
            </v-list-tile-action>

          </v-list-tile>
      </v-list>

      <v-divider></v-divider>
      </div>
        <v-list subheader v-else>
          <!-- <v-subheader>Recent chat</v-subheader> -->
        <v-list-tile
        >

            <v-list-tile-content>
              <v-list-tile-title class="xs-text-center">No Previous Tournaments</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <!-- <v-list-tile-sub-title>Created By: {{tournament.creator}}</v-list-tile-sub-title> -->
            </v-list-tile-action>

          </v-list-tile>
      </v-list>
  </div>
</template>

<script>
import axios from "axios";
export default {
    name:"PastTourney",
    data(){
        return{
            tournaments:[]
        }
    },
    mounted(){
        axios.get("/api/past-tournaments").then(res=>{
            this.tournaments = res.data;
        }).catch(err=>console.log(err))
    },
    methods:{
      selectTournament(id){
        this.$router.push("/tournament/view/"+id)
      }
    }
}
</script>
