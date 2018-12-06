<template>
  <div>
    <h1 class="text-xs-center">Enter Tournament Info</h1>
    <v-container class="newtournamentcontainer">
      <div>
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

        <v-layout>
          <v-date-picker
            v-model="picker"
            color="success"
            header-color="primary"
            landscape
            scrollable
          ></v-date-picker>
        </v-layout>

        <div class="text-xs-center">
          <v-btn @click="createTournament" color="success">Create New Tournament</v-btn>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import Geocoder from "@pderas/vue2-geocoder";
import Vue from "vue";
import dropzone from "../components/Dropzone";

export default {
  name: "NewTournament",
  components: {
    dropzone
  },
  data: () => ({
    valid: false,
    tournamentname: "",
    description: "",
    email: "",
    username: "",

    picker: new Date().toISOString().substr(0, 10),

    tournamentnameRules: [
      v => !!v || "Name is required",
      v => v.length <= 40 || "Name must be less than 40 characters"
    ],
    descriptionRules: [
      v => !!v || "Description is required",
      v => v.length <= 100 || "Name must be less than 100 characters"
    ],
    stateRules: [v => !!v || "Start date is required"]
  }),
  methods: {
    createTournament() {}
  }
};
</script>
 <style>
.newtournamentcontainer {
  width: 70%;
}
</style>