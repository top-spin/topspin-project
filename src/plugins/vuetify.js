import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";

Vue.use(Vuetify, {
  iconfont: "md",
  //theme for material design
  theme: {
    // purple, teal, orange, strawberry pink red
    primary: "#424242", // grey darken-3
    success: "#F57C00", // orange darken-2
    info: "#0D47A1", // blue darken-4
    error: "#D32F2F" //red darken-2
  }
});
