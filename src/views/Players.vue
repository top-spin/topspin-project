<template>
  <v-form>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            v-model="message"
            outline
            clearable
            label="Message"
            type="text"
          >
            <v-tooltip
              slot="prepend"
              bottom
            >
              <v-icon slot="activator">mdi-help-circle-outline</v-icon>
              I'm a tooltip
            </v-tooltip>

            <v-fade-transition slot="append">
              <v-progress-circular
                v-if="loading"
                size="24"
                color="info"
                indeterminate
              ></v-progress-circular>
              <img v-else width="24" height="24" src="https://cdn.vuetifyjs.com/images/logos/v-alt.svg"/>
            </v-fade-transition>

            <v-menu
              slot="append-outer"
              style="top: -12px"
              offset-y
            >
              <v-btn slot="activator">
                <v-icon left>menu</v-icon>
                Menu
              </v-btn>
              <v-card>
                <v-card-text class="pa-4">
                  <v-btn large flat color="primary" @click="clickMe"><v-icon left>mdi-target</v-icon>Click me</v-btn>
                </v-card-text>
              </v-card>
            </v-menu>
          </v-text-field>
        </v-flex>

      </v-layout>
    </v-container>
  </v-form>
</template>
