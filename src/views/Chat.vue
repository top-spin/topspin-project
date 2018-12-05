<template>
  <div>
    <h1 class="text-xs-center">Chat (might change to Messages)</h1>
    <!-- <v-container> -->
    <MessageList/>
    <!-- </v-container> -->
  </div>
</template>


<script>
import MessageList from "@/components/MessageList";

export default {
  name: "Chat",
  components: {
    MessageList
  },
  data() {
    return {};
  }
};
</script>

<style>
</style>

