<template>
  <div class="profile">
    <h1>Player Profile Page</h1>

    <v-container>
      <!-- using cards for players. padding of 3 -->
      <v-card flat class="pa-3">
        <v-layout row wrap>
          <v-flex xs12 md6>
            <div>Players Name</div>
            <div class="caption grey--text">Players Ranking</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div>Hometown</div>
            <div class="caption grey--text">Los Angeles</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div>Left/Right Handedness</div>
            <div class="caption grey--text">Right</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div>Organization</div>
            <div class="caption grey--text">DevM</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div>Win Rate</div>
            <div class="caption grey--text">67%</div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>