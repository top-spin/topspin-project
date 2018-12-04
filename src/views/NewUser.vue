<template>
  <div class="enter_profile_background">
      <h1 class="text-xs-center">Enter Profile Info</h1>
    <div class="transparent2">
      <v-container  >
        <div >
        <!-- <v-flex xs9 sm8 md6> -->
        <v-form v-model="valid">
          <v-text-field 
            v-model="name"
            :rules="nameRules"
            :counter="20"
            label="Name"
            required
            box
          ></v-text-field>
              <v-text-field
            v-model="username"
            :rules="usernameRules"
            :counter="15"

            label="Username"
            required
            box

          ></v-text-field>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
            box

          ></v-text-field>

          <v-text-field
            v-model="organization"
            label="Organization"
            box

          ></v-text-field>
          <v-text-field
            v-model="city"
            label="City"
            required
            box

          ></v-text-field>
          <v-text-field
            v-model="state"
            :rules="stateRules"
            :counter="2"

            label="State "
            required
            box

          ></v-text-field>
          
          <v-radio-group light v-model="dominant_hand" :mandatory="false">
            <v-radio color="primary" label="Right handed player" value="Right"></v-radio>
            <v-radio color="primary" label="Left handed player" value="Left"></v-radio>
          </v-radio-group>
        </v-form>
        <!-- </v-flex> -->
        <div class="text-xs-center">
          <v-btn @click="createUser" color="success">Submit</v-btn>
        </div>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Geocoder from "@pderas/vue2-geocoder";
import Vue from "vue";
  export default {
    data: () => ({
      valid: false,
      name: '',
      state:'',
      email: '',
      username:"",
      organization:"",
      city:"",
      dominant_hand:"",
      avatar:"https://www.w3schools.com/howto/img_avatar.png",
      lat:"",
      lng:"",
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 30 || 'Name must be less than 20 characters'
      ],
      usernameRules: [
        v => !!v || 'Username is required',
        v => v.length <= 15 || 'Name must be less than 15 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      stateRules: [
        v => !!v || 'State is required',
        v => v.length <= 2 || 'Name must be 2 letter abbreviation'
      ]
 
    }),
    methods:{
      createUser(){
        Vue.use(Geocoder, {
            googleMapsApiKey: process.env.VUE_APP_GOOGLE_MAPS_API_KEY
                });
        Vue.$geocoder.setDefaultMode('address');
        var addressObj = {
            city: this.city,
            state: this.state
        }
        Vue.$geocoder.send(addressObj, response => {
          this.lat = response.results[0].geometry.location.lat;
          this.lng = response.results[0].geometry.location.lng;
        // console.log(this.lat,this.lng)
          axios.post("/api/user",{
            name:this.name,
            username:this.username,
            email:this.email,
            organization:this.organization,
            city:this.city,
            state:this.state,
            dominant_hand:this.dominant_hand,
            avatar:this.avatar,
            lat:this.lat,
            lng:this.lng
          }).then(res=>{
            console.log(res.data)
          })
        });
      }
    }
  }
</script>
 <style>
 .enter_profile_background{
   /* background: url( "https://s3.amazonaws.com/devmountaintopspin/accountinfobg2.jpg"); */
  height: 100vh;
  width: 100vw;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
 }
 .transparent {
   background-color: white!important;
   opacity: .85;
   border-color: transparent!important;
 }
 .transparent2 {
   background-color: white!important;
   /* opacity: 0.85; */
   border-color: transparent!important;
 } 
 </style>