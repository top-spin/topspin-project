<template>
  <div class="profile">
    <h1>Jerryasdfusername - (Player Profile Page)</h1>

    <v-container>
      <!-- pic and add friend button -->
      <v-layout row wrap>
        <v-flex xs12 sm3 md3>
          <img src="https://randomuser.me/api/portraits/men/85.jpg">
        </v-flex>
        <v-flex xs6 sm3 md3>
          <v-btn flat class="success">Add Friend</v-btn>
        </v-flex>
      </v-layout>

      <!-- ranking and win count -->
      <v-layout row wrap>
        <v-flex xs12 md1>
          <h3>Ranking</h3>
        </v-flex>
        <v-flex xs12 md2>
          <h3 class="grey--text">#21</h3>
        </v-flex>
      </v-layout>

      <!-- using cards for players. padding of 3 -->
      <v-card class="pa-3" flat>
        <v-layout row wrap>
          <v-flex xs12 sm4 md4 my-1>
            <div>Name</div>
            <div class="caption grey--text">Jerry Berry</div>
          </v-flex>
          <v-flex xs12 sm4 md4 my-1>
            <div>Hometown</div>
            <div class="caption grey--text">Los Angeles</div>
          </v-flex>
          <v-flex xs12 sm4 md4 my-1>
            <div>Left/Right Handedness</div>
            <div class="caption grey--text">Right</div>
          </v-flex>
          <v-flex xs12 sm4 md4 my-1>
            <div>Organization</div>
            <div class="caption grey--text">DevM</div>
          </v-flex>
          <v-flex xs12 sm4 md4 my-1>
            <div>Win Rate</div>
            <div class="caption grey--text">67%</div>
          </v-flex>
          <v-flex xs12 sm4 md4 my-1>
            <div>Win Count</div>
            <v-chip class="success white--text">216</v-chip>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
