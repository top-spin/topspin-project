<template>
  <div class="map_container">
    <GmapMap
  :center="{lat:32.7767, lng:-96.7970}"
  :zoom="2"
  map-type-id="terrain"
  style="width: 100%; height: 100%"
>
  <GmapMarker
    :key="index"
    v-for="(m, index) in markers"
    :position="m.position"
    :clickable="true"
    :draggable="true"
    @click="center=m.position"
  />
</GmapMap>
  </div>
</template>
<style>
.map_container{
    width: 80%;
    height: 300px;
    background: lightblue;
    margin: auto;
}
</style>
<script>
 import axios from "axios";
 
export default {
  data(){
    return{
      center:{lat:32.7767, lng:-96.7970},
      markers:[
        {
          position:{lat:32.77 , lng:-96.799 }
        },
         {
          position:{lat:32.7967, lng:-96.8070 }
        }
        
        ],
    }
    },
    mounted(){
        axios.get("/api/all-players").then(res=>{
            this.markers = res.data.map(player=>{
                return{
                   position:{
                       lat:+player.lat,
                       lng:+player.lng
                   }
                }
            });
        }).catch(err=>console.log(err))
    }
}
  
  
</script>