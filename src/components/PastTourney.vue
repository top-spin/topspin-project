<template>
  <div>
    <span class="title">
      <span class="font-weight-light">Previous</span>
      <span class="orange--text">Tournaments</span>
    </span>
    <h1 v-for="tournament in tournaments" :key="tournament.id">{{tournament.name}}</h1>
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
    }
}
</script>
