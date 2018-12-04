<template>
  <div >
    <h1>This is the Landing Page</h1>
    <button @click="login">Login/Signup</button>
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
