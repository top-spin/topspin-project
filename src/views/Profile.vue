<template>
  <div class="profile">

    <v-container>
          <h1  >{{username}}</h1>

      <!-- pic -->
      <v-layout row wrap>
        <v-flex xs12 sm4 md3>
          <!-- <img height="128" width="128" :src="avatar"> -->
          <v-dialog v-model="dialog" width="900">
            <!-- <v-btn  color="red lighten-2" dark>Click Me</v-btn> -->
            <img height="128" width="auto" :src="avatar" slot="activator">

            <v-card>
               

              <!-- <v-card-text>Lorem</v-card-text> -->
              <img height="600" width="auto" :src="avatar">

 
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click="dialog = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>

        <!-- edit button -->
        <v-flex xs6 sm3 md3 v-if="user_id == this.$store.state.user.user_id">
          <v-btn flat class="success" @click="editProfile">Edit Profile</v-btn>
        </v-flex>

        <div v-else>
          <!-- add button -->
          <v-flex xs6 sm3 md3 v-if="!friendList.includes(user_id)">
            <v-btn flat class="success" @click="addFriend(user_id)">Add Friend</v-btn>
          </v-flex>

          <v-snackbar
            v-model="snackbaradd"
            :timeout="1500"
            :right="true"
            :bottom="true"
          >Friend Added
            <v-btn dark flat @click="snackbaradd = false">Close</v-btn>
          </v-snackbar>

          <!-- delete button -->
          <v-flex xs6 sm3 md3 v-if="friendList.includes(user_id)">
            <v-btn flat class="success" @click="deleteFriend(user_id)">Remove Friend</v-btn>
          </v-flex>
        </div>
      </v-layout>

      <v-snackbar v-model="snackbardel" :timeout="1500" :right="true" :bottom="true">Friend Removed
        <v-btn dark flat @click="snackbardel = false">Close</v-btn>
      </v-snackbar>

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
import Axios from "axios";
export default {
  name: "Profile",
  data() {
    return {
      rank: "",
      name: "",
      username: "",
      organization: "",
      city: "",
      state: "",
      dominantHand: "",
      winCount: "",
      winPercent: "",
      avatar: "",
      user_id: "",
      friendList: [],
      snackbardel: false,
      snackbaradd: false,
      dialog: false
    };
  },
  mounted() {
    this.getProfile();
    this.getFriendList();
  },
  methods: {
    getProfile() {
      Axios.get("/api/profile/" + this.$route.params.username)
        .then(res => {
          console.log(res.data);
          (this.rank = res.data.rank),
            (this.name = res.data.user.name),
            (this.username = res.data.user.username),
            (this.organization = res.data.user.organization),
            (this.city = res.data.user.city),
            (this.state = res.data.user.state),
            (this.dominantHand = res.data.user.dominant_hand),
            (this.winCount = res.data.winCount),
            (this.winPercent = res.data.winPercent.toFixed(1)),
            (this.avatar = res.data.user.avatar),
            (this.user_id = res.data.user.user_id);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getFriendList() {
      Axios.get("/api/following/")
        .then(res => {
          // console.log(res.data);
          this.friendList = res.data.map(e => e.user_id);
          // console.log("friendList:", this.friendList);
        })
        .catch(err => {
          console.log(err);
        });
    },
    addFriend(id) {
      Axios.post(`/api/friend/${id}`);
      // alert("Friend added!");
      this.snackbaradd = true;
      this.getFriendList();
    },
    deleteFriend(id) {
      Axios.delete(`/api/deletefriend/${id}`);
      // add alert
      // alert("Friend removed.");
      this.snackbardel = true;
      this.getFriendList();
    },
    editProfile() {
      console.log("editProfile Hit");
      // Axios.put(){}
    }
  }
};
</script>

<style>

</style>
