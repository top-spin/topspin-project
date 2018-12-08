<template>
  <div class="hero_img_background">
    <div class = "title_container">
      <h1 class="project_title">Top<span class="success--text">Spin</span></h1>
      <v-btn class= "text-capitalize" large color="success" @click="login">Login/Signup</v-btn>
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
  	-webkit-animation: puff-in-center 1.2s ease-out ;
	  animation: puff-in-center 1s ease-out  ;
}
.text-capitalize {
	-webkit-animation: fade-in-bottom 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) 0.5s both;
	        animation: fade-in-bottom 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) 0.5s both;
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

@-webkit-keyframes project_title {
  0% {
    -webkit-transform: scale(2);
            transform: scale(2);
    -webkit-filter: blur(2px);
            filter: blur(2px);
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-filter: blur(0px);
            filter: blur(0px);
    opacity: 1;
  }
}
@keyframes puff-in-center {
  0% {
    -webkit-transform: scale(2);
            transform: scale(2);
    -webkit-filter: blur(2px);
            filter: blur(2px);
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-filter: blur(0px);
            filter: blur(0px);
    opacity: 1;
  }
}

@-webkit-keyframes fade-in-bottom {
  0% {
    -webkit-transform: translateY(50px);
            transform: translateY(50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
}
@keyframes fade-in-bottom {
  0% {
    -webkit-transform: translateY(50px);
            transform: translateY(50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
}

</style>
