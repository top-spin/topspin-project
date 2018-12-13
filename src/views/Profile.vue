<template>
  <div class="profile">
    <v-container>
      <h1>{{username}}</h1>
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
          <!-- <v-btn flat class="success" @click="editProfile">Edit Profile</v-btn> -->
          <!-- edit pop up modal -->
          <v-dialog v-model="dialogeditprofile" persistent max-width="600px">
            <v-btn slot="activator" color="success" dark>Edit Profile</v-btn>
            <!-- <v-btn flat class="success" @click="editProfile">Edit Profile</v-btn> -->
            <v-card>
              <v-card-title>
                <span class="headline">Edit Profile</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout column wrap>
                    <v-flex xs12 sm6 md4>
                      <v-text-field label="Name*" v-model="name_edit" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field label="Username*" v-model="username_edit" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field label="E-mail*" v-model="email_edit" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field label="Organization" v-model="organization_edit"></v-text-field>
                    </v-flex>
                    <v-flex xs4 sm2 md2 row>
                      <v-text-field label="City" v-model="city_edit"></v-text-field>
                      <v-text-field label="State" v-model="state_edit"></v-text-field>
                    </v-flex>
                    <v-radio-group light v-model="dominantHand_edit" :mandatory="false">
                      <v-radio color="primary" label="Right handed player" value="Right"></v-radio>
                      <v-radio color="primary" label="Left handed player" value="Left"></v-radio>
                    </v-radio-group>
                    <dropzone></dropzone>
                  </v-layout>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="orange darken-2" flat @click="cancelChanges">Cancel</v-btn>
                <v-btn color="orange darken-2" flat @click="saveChanges">Save Changes</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
import Vue from "vue";
import Axios from "axios";
import Geocoder from "@pderas/vue2-geocoder";
import dropzone from "../components/Dropzone";

export default {
  name: "Profile",
  components: {
    dropzone
  },
  data() {
    return {
      rank: "",
      name: "",
      username: "",
      email: "",
      organization: "",
      city: "",
      state: "",
      dominantHand: "",
      winCount: "",
      winPercent: "",
      avatar: "",
      user_id: "",
      lat: "",
      lng: "",
      friendList: [],
      snackbardel: false,
      snackbaradd: false,
      dialog: false,
      dialogeditprofile: false,
      name_edit: "",
      username_edit: "",
      email_edit: "",
      organization_edit: "",
      city_edit: "",
      state_edit: "",
      dominantHand_edit: "",
      avatar_edit: ""
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
            (this.email = res.data.user.email),
            (this.organization = res.data.user.organization),
            (this.city = res.data.user.city),
            (this.state = res.data.user.state),
            (this.dominantHand = res.data.user.dominant_hand),
            (this.winCount = res.data.winCount),
            (this.winPercent = res.data.winPercent),
            (this.avatar = res.data.user.avatar),
            (this.user_id = res.data.user.user_id),
            (this.name_edit = this.name),
            (this.username_edit = this.username),
            (this.email_edit = this.email),
            (this.organization_edit = this.organization),
            (this.city_edit = this.city),
            (this.state_edit = this.state),
            (this.dominantHand_edit = this.dominantHand),
            (this.dialogeditprofile = false);
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
    // editProfile() {
    // this.$router.push("/profile/edit/" + this.username);
    // console.log("editProfile Hit");
    // Axios.put(){}
    // }
    cancelChanges() {
      (this.name_edit = this.name),
        (this.username_edit = this.username),
        (this.email_edit = this.email),
        (this.organization_edit = this.organization),
        (this.city_edit = this.city),
        (this.state_edit = this.state),
        (this.dominantHand_edit = this.dominantHand),
        (this.dialogeditprofile = false);
    },
    saveChanges() {
      Vue.use(Geocoder, {
        googleMapsApiKey: process.env.VUE_APP_GOOGLE_MAPS_API_KEY
      });
      Vue.$geocoder.setDefaultMode("address");
      var addressObj = {
        city: this.city_edit,
        state: this.state_edit
      };
      Vue.$geocoder.send(addressObj, response => {
        this.lat = response.results[0].geometry.location.lat;
        this.lng = response.results[0].geometry.location.lng;
        console.log(this.lat, this.lng);

        Axios.put("/api/profile/", {
          user_id: this.user_id,
          name: this.name_edit,
          username: this.username_edit,
          email: this.email_edit,
          organization: this.organization_edit,
          city: this.city_edit,
          state: this.state_edit,
          dominant_hand: this.dominantHand_edit,
          avatar: this.$store.state.avatar,
          lat: this.lat,
          lng: this.lng
        })
          .then(res => {
            console.log(res.data);
            (this.name = res.data.name),
              (this.username = res.data.username),
              (this.email = res.data.email),
              (this.organization = res.data.organization),
              (this.city = res.data.city),
              (this.state = res.data.state),
              (this.dominantHand = res.data.dominant_hand),
              (this.dialogeditprofile = false);
            this.getProfile();
            this.$store.dispatch("getUser");
          })
          .catch(err => console.log(err));
      });
    }
  }
};
</script>

<style>
</style>
