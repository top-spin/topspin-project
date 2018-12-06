<template>
  <div>
                <v-radio-group light v-model="showfollowing" :mandatory="false">
              <v-radio color="primary" label="Following" :value="true"></v-radio>
              <v-radio color="primary" label="Followers" :value="false"></v-radio>
            </v-radio-group>
        <h1 v-if="showfollowing"  class="text-xs-left">Following</h1>
    <Followinglist v-if="showfollowing"/>

    
        <h1 v-if="!showfollowing" class="text-xs-left">Followers</h1>

        <Followerslist v-if="!showfollowing"  />

  </div>
</template>


<script>
import Followinglist from "@/components/Followinglist";
import Followerslist from "@/components/Followerslist";
export default {
  name: "Friends",
  components: {
    Followinglist,
    Followerslist
  },
  data() {
    return {
      showfollowing:true
    };
  }
};
</script>

<style>
</style>

