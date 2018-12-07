import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status:"",
    avatar:"https://www.w3schools.com/howto/img_avatar.png",
    pending_tournament:{},
    user:{}
  },
  mutations: {
    SET_STATUS(state,status){
      state.status = status;
    },
    SET_AVATAR(state,avatar){
      state.avatar = avatar;
    },
    SET_TOURNAMENT(state,pending_tournament){
      state.pending_tournament = pending_tournament;
    },
    SET_USER(state,user){
      state.user = user;
    }
  },
  actions: {
    getStatus(){
      axios.get("/api/status").then(res=>{
        //console.log(res.data)
        this.commit('SET_STATUS',res.data)
      }).catch(err=>{console.log(err)})
    },
    getUser(){
      axios.get("/api/current-user").then(res=>{
        //console.log(res.data)
        this.commit('SET_USER',res.data)
      }).catch(err=>{console.log(err)})
    }
  }
})
