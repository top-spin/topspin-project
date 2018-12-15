<template>
  <div>
    <!-- Following Button Active -->
    <v-layout column align-center v-model="showfollowing" v-if="showfollowing">
      <v-flex>
        <v-btn large color="orange">Following
          <v-chip small>{{followingCount}}</v-chip>
        </v-btn>
        <v-btn @click="followersbutton" large color="grey white--text">Followers
          <v-chip small class="friendsChip">{{followersCount}}</v-chip>
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
      followingCount: "",
      followersCount: ""
    };
  },
  mounted() {
    axios
      .get("/api/friendcount")
      .then(res => {
        let counts = res.data;
        this.followingCount = counts[0];
        this.followersCount = counts[1];
      })
      .catch(err => console.log(err));
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
</style>

 
 