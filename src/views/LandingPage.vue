<template>
  <div class="hero_img_background">
    <div class = "title_container">
      <h1 class="project_title">Top<span class="success--text">Spin</span></h1>
      <v-btn class= "text-capitalize" flat color="success" @click="login">Login/Signup</v-btn>
      </div>

  </div>
</template>
<script>
export default {
  name:"LandingPage",
  methods:{
    login(){
      window.open(process.env.VUE_APP_SERVER+"/login","_self")
    }
  }
}
</script>
<style>
.hero_img_background{
  background: url("https://s3.amazonaws.com/devmountaintopspin/pong+blank2.jpg");
  height: 100vh;
  width: 100vw;
  background-size: cover;
  background-color: black;
  background-repeat: no-repeat;
  background-position: center;
} 
.project_title{
  font-size: 70px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 450;
}
.title_container{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  /* height: 170px; */
  margin-top: 7%;
}
</style>
