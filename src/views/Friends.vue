<template>
  <div>
    <!-- added code -->
    <!-- <v-btn dark>
      <v-badge color="grey">
        <span slot="badge">12</span>
        <v-icon large color="grey">notifications</v-icon>
      </v-badge>
    </v-btn>-->
    <!-- Following Button Active -->
    <v-layout column align-center v-model="showfollowing" v-if="showfollowing">
      <v-flex>
        <v-btn large color="orange">Following
          <v-chip small>{{followingCount}}</v-chip>
        </v-btn>
        <v-btn @click="followersbutton" large color="grey white--text">Followers
          <v-chip small>{{followersCount}}</v-chip>
        </v-btn>
      </v-flex>
      <Followinglist/>
    </v-layout>

    <!-- Followers Button Active -->
    <v-layout column align-center v-model="showfollowing" v-if="!showfollowing">
      <v-flex>
        <v-btn @click="followingbutton" large color="grey white--text">Following
          <v-chip small>{{followingCount}}</v-chip>
        </v-btn>
        <v-btn large color="orange">Followers
          <v-chip small>{{followersCount}}</v-chip>
        </v-btn>
      </v-flex>
      <Followerslist/>
    </v-layout>

    <!-- previous code -->
    <!-- <v-radio-group light v-model="showfollowing" :mandatory="false">
      <v-radio color="primary" label="Following" :value="true"></v-radio>
      <v-radio color="primary" label="Followers" :value="false"></v-radio>
    </v-radio-group>
    <h1 v-if="showfollowing" class="text-xs-left">Following</h1>
    <Followinglist v-if="showfollowing"/>

    <h1 v-if="!showfollowing" class="text-xs-left">Followers</h1>

    <Followerslist v-if="!showfollowing"/>-->
  </div>
</template>


<script>
import axios from "axios";
import Followinglist from "@/components/Followinglist";
import Followerslist from "@/components/Followerslist";
export default {
  name: "Friends",
  components: {
    Followinglist,
    Followerslist
  },
  data() {
    return {
      showfollowing: true,
      followingCount: "" ,
      followersCount: ""
    };
  },
  mounted() {
          axios.get("/api/friendcount").then(res=>{
            let counts=res.data 
            this.followingCount = counts[0]
            this.followersCount = counts[1]
         }).catch(err=>console.log(err))
  },
  methods: {
    followingbutton() {
      this.showfollowing = true;
    },
    followersbutton() {
      this.showfollowing = false;
    }
  }
};
</script>

<style>
/* .players */
</style>

 
 