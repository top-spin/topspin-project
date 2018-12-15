<template>
  <div>
    <MessageList class="messagelist"/>
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
  height: calc(100vh - 15vh);
}
</style>

