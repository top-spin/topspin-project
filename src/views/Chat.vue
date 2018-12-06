<template>
  <div>
    <h1 class="text-xs-center">Chat (might change to Messages)</h1>
    <!-- <v-container> -->
    <MessageList class="messagelist"/>
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
.messagelist {
  height: 75vh;
}
</style>

