<template>
  <transition-group name="messages-list" tag="div">
    <div v-for="message in feed" :key="messageKey(message)" class="messages-list-item">
      <message-own
        v-if="message.id === $store.state.user.user_id"
        :date="message.date"
        :image-url="message.imageUrl"
        :contents="message.contents"
      />
      <message-foreign
        v-else
        :author="message.author"
        :date="message.date"
        :image-url="message.imageUrl"
        :contents="message.contents"
      />
    </div>
  </transition-group>
</template>

<script>
import MessageOwn from "./MessageOwn.vue";
import MessageForeign from "./MessageForeign.vue";

export default {
  name: "MessagesList",
  components: {
    MessageOwn,
    MessageForeign
  },
  props: {
    feed: {
      type: Array,
      default: function() {
        return [];
      },
      required: false
    }
  },
  methods: {
    messageKey(message) {
      return message.contents + message.date;
    }
  }
};

// <style lang="scss" scoped>

// </style>
</script>


