import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status:"",
    avatar:"https://www.w3schools.com/howto/img_avatar.png",
    pending_tournament:{}
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
    }
  },
  actions: {
    getStatus(){
      axios.get("/api/status").then(res=>{
        //console.log(res.data)
        this.commit('SET_STATUS',res.data)
      }).catch(err=>{console.log(err)})
    }
  }
})
