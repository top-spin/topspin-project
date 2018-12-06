<template>
  <div>
    <h1 class="text-xs-center">Enter Tournament Info</h1>
    <v-container class="newtournamentcontainer">
      <div>
        <!-- Tournament Name and Desciption -->
        <v-form v-model="valid">
          <v-text-field
            v-model="tournamentname"
            :rules="tournamentnameRules"
            :counter="40"
            label="Tournament Name"
            required
            box
          ></v-text-field>
          <v-text-field
            v-model="description"
            :rules="descriptionRules"
            :counter="100"
            label="Description"
            required
            box
          ></v-text-field>
        </v-form>

        <!-- Dropdown for Number of Players -->
        <v-select
          :items="playercount"
          :rules="playercountRules"
          label="Number of Players"
          required
          box
          v-model="count"
        ></v-select>

        <!-- Select Date -->
        <v-layout>
          <v-date-picker
            v-model="picker"
            color="success"
            header-color="primary"
            landscape
            scrollable
          ></v-date-picker>
        </v-layout>

        <!-- Button for the next page -->
        <router-link to="/addtournamentplayers">
          <div class="text-xs-center">
            <v-btn @click="createTournament" color="success">Next</v-btn>
          </div>
        </router-link>
      </div>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import Geocoder from "@pderas/vue2-geocoder";
import Vue from "vue";
import dropzone from "../components/Dropzone";
import moment from "moment";

export default {
  name: "NewTournament",
  components: {
    dropzone
  },
  data: () => ({
    valid: false,
    tournamentname: "",
    description: "",
    playercount: ["2", "4", "8", "16"],
    count:["2", "4", "8", "16"],
    picker: new Date().toISOString().substr(0, 10),
    tournamentnameRules: [
      v => !!v || "Name is required",
      v => v.length <= 40 || "Name must be less than 40 characters"
    ],
    descriptionRules: [
      v => !!v || "Description is required",
      v => v.length <= 100 || "Name must be less than 100 characters"
    ],
    playercountRules: [v => !!v || "Player count is required"],
    stateRules: [v => !!v || "Start date is required"]
  }),
  methods: {
    createTournament() {
      this.$store.commit("SET_TOURNAMENT",{
        name:this.tournamentname,
        description:this.description,
        count:+this.count,
        date:moment(this.picker).format("MM-DD-YYYY")
      })
      // console.log(this.$store.state)
    }
  }
};
</script>
 <style>
.newtournamentcontainer {
  width: 70%;
}
</style>