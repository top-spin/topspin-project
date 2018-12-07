<template>

  <div class="profile">
    <h1>{{username}}</h1>

    <v-container v-for="p in profile" :key="p.user_id">
      <!-- pic and add friend button -->
      <v-layout row wrap>
        <v-flex xs12 sm3 md3>
          <img height="128" width="128" :src="avatar">
        </v-flex>
        <v-flex xs6 sm3 md3>
          <v-btn flat class="success" @click="addFriend(p.user_id)">Add Friend </v-btn>
        </v-flex>
        <v-flex xs6 sm3 md3>
          <v-btn flat class="success" @click="deleteFriend(p.user_id)">Remove Friend </v-btn>
        </v-flex>
      </v-layout>

      <!-- ranking and win count -->
      <v-layout row wrap>
        <v-flex xs12 md1>
          <h3>Ranking</h3>
        </v-flex>
        <v-flex xs12 md2>
          <h3 class="grey--text">#{{rank}}</h3>
        </v-flex>
      </v-layout>

      <!-- using cards for players. padding of 3 -->
      <v-card class="pa-3" flat>
        <v-layout row wrap>
          <v-flex xs12 sm4 md4 my-1>
            <div>Name</div>
            <div class="caption grey--text">{{name}}</div>
          </v-flex>
          <v-flex xs12 sm4 md4 my-1>
            <div>Hometown</div>
            <div class="caption grey--text">{{city}}, {{state}}</div>
          </v-flex>
          <v-flex xs12 sm4 md4 my-1>
            <div>Playing Hand</div>
            <div class="caption grey--text">{{dominantHand}}</div>
          </v-flex>
          <v-flex xs12 sm4 md4 my-1>
            <div>Organization</div>
            <div class="caption grey--text">{{organization}}</div>
          </v-flex>
          <v-flex xs12 sm4 md4 my-1>
            <div>Win Rate</div>
            <div class="caption grey--text">{{winPercent}}%</div>
          </v-flex>
          <v-flex xs12 sm4 md4 my-1>
            <div>Win Count</div>
            <v-chip class="success white--text">{{winCount}}</v-chip>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Axios from 'axios';
export default {
  name:"Profile",
  data(){
    return{
      profile:[],
      rank:"",
      name:"",
      username:"",
      organization:"",
      city:"",
      state:"",
      dominantHand:"",
      winCount:"",
      winPercent:"",
      avatar:"",
      user_id:""
    }
  },
  mounted(){
    Axios.get("/api/profile/"+this.$route.params.username).then(res=>{
      console.log(res.data)
      this.rank = res.data.rank,
      this.name = res.data.user.name,
      this.username = res.data.user.username,
      this.organization = res.data.user.organization,
      this.city = res.data.user.city,
      this.state = res.data.user.state,
      this.dominantHand = res.data.user.dominant_hand,
      this.winCount = res.data.winCount,
      this.winPercent = res.data.winPercent,
      this.avatar = res.data.user.avatar,
      this.user_id = res.data.user.user_id,
      this.profile=res.data
console.log(this.profile)
    }).catch(err=>{console.log(err)})
    
  },
  methods:{
    addFriend(id){
      Axios.post(`/api/friend/${id}`)
      console.log(id)
    },
    deleteFriend(id){
      Axios.delete(`/api/deletefriend/${id}`)
    }
  }
};
</script>

<style>
</style>
