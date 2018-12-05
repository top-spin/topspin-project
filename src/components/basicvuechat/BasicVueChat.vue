<template>
  <div class="basicvuechat">
    <section class="window">
      <!-- show the name of the person you are talking to -->
      <header class="window__header__container">
        <slot name="header">chat with {{ title }}</slot>
      </header>

      <!-- show messages -->
      <section id="window__messages__container" class="window__messages__container">
        <slot>
          <messages-list :feed="feed" :author-id="authorId" class="messages-list"/>
        </slot>
      </section>

      <!-- input container: input field and submit button -->
      <div class="window__input__container">
        <slot name="input-container">
          <input-container @newOwnMessage="onNewOwnMessage"/>
        </slot>
      </div>
    </section>
  </div>
</template>

<script>
import moment from "moment";
import { scrollToBottom } from "../../helpers/scroll.js";
import MessagesList from "./messages/MessagesList.vue";
import InputContainer from "./input/InputContainer.vue";

export default {
  name: "BasicVueChat",
  components: {
    MessagesList,
    InputContainer
  },
  props: {
    title: {
      type: String,
      default: "Team Maczan",
      required: false
    },
    initialAuthorId: {
      type: Number,
      default: 0,
      required: false
    },
    attachMock: {
      type: Boolean,
      default: false,
      required: false
    },
    initialFeed: {
      type: Array,
      default: function() {
        return [];
      },
      required: false
    },
    newMessage: {
      type: Object,
      default: function() {
        return {};
      },
      required: false
    }
  },
  data: function() {
    return {
      feed: [],
      authorId: 0
    };
  },
  watch: {
    newMessage: function(newValue, oldValue) {
      this.pushToFeed(newValue);
      scrollToBottom();
    }
  },
  mounted() {
    if (this.attachMock) {
      import("./mocks/mock-messages-list.js")
        .then(mockData => {
          this.feed = mockData.default.feed;
          this.setAuthorId(mockData.default.authorId);
        })
        .catch(error => {
          console.error("Failed to load mock data from file. ", error);
        });
    } else {
      this.feed = this.initialFeed;
      this.authorId = this.initialAuthorId;
    }
  },
  methods: {
    pushToFeed(element) {
      this.feed.push(element);
    },
    onNewOwnMessage(message) {
      const newOwnMessage = {
        id: this.authorId,
        contents: message,
        date: moment().format("H:m:s")
      };

      this.pushToFeed(newOwnMessage);

      scrollToBottom();

      this.$emit("newOwnMessage", message);
    }
  }
};

// <style lang="scss">
// @import "../../assets/scss/main.scss";
// </style>
</script>

<style>
.window {
  /* height: 100%; */
  /* border: 5px red solid; */
}
.window__header__container {
  /* border: 5px orange solid; */
  background: linear-gradient(90deg, purple, blue);
  padding: 10px 5px;
  color: seashell;
  font-weight: bold;
  z-index: 1;
}
.window__messages__container {
  height: 420px;
  overflow: auto;
  /* border: 5px green solid; */
}
.messages-list {
  /* border: 5px blue solid; */
}
.window__input__container {
  /* border: 1px purple solid; */
}
</style>

