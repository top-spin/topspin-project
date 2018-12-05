import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status:""
  },
  mutations: {
    SET_STATUS(state,status){
      state.status = status;
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
