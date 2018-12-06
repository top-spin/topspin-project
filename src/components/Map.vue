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
    :draggable="false"
    @click="toggleInfoWindow(m,index)"
  />

        <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
        {{infoContent}}
      </gmap-info-window>
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
 infoContent: '',
          infoWindowPos: null,
          infoWinOpen: false,
          currentMidx: null,
          //optional: offset infowindow so it visually sits nicely on top of our marker
          infoOptions: {
            pixelOffset: {
              width: 0,
              height: -35
            }
          }

    }
    },
       methods: {
          toggleInfoWindow: function(marker, idx) {
            this.infoWindowPos = marker.position;
            this.infoContent = marker.infoText;

            //check if its the same marker that was selected if yes toggle
            if (this.currentMidx == idx) {
              this.infoWinOpen = !this.infoWinOpen;
            }
            //if different marker set infowindow to open and reset current marker index
            else {
              this.infoWinOpen = true;
              this.currentMidx = idx;

            }
          }

        },
    mounted(){
        axios.get("/api/all-players").then(res=>{
            this.markers = res.data.map(player=>{
                return{
                   position:{
                       lat:+player.lat,
                       lng:+player.lng
                   },
                   infoText:player.username

                   
                }
                  
            });
            console.log(this.markers)
        }).catch(err=>console.log(err))
    }
}
  
  
</script>