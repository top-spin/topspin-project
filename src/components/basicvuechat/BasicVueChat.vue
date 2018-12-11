<template>
  <div class="basicvuechat">
    <!-- <section class="window"> -->
    <!-- show the name of the person you are talking to -->
    <header class="window__header__container">
      <slot name="header">Chat with {{ player.name }}</slot>
    </header>

    <!-- show messages -->
    <section id="window__messages__container" class="window__messages__container">
      <slot>
        <messages-list :feed="initialFeed" :author-id="$store.state.user.user_id" class="messages-list"/>
      </slot>
    </section>

    <!-- input container: input field and submit button -->
    <div class="window__input__container">
      <slot name="input-container">
        <input-container @newOwnMessage="onNewOwnMessage"/>
      </slot>
    </div>
    <!-- </section> -->
  </div>
</template>

<script>
import moment from "moment";
import { scrollToBottom } from "../../helpers/scroll.js";
import MessagesList from "./messages/MessagesList.vue";
import InputContainer from "./input/InputContainer.vue";
import axios from "axios";

export default {
  name: "BasicVueChat",
  components: {
    MessagesList,
    InputContainer
  },
  props: {
    title: {
      type: String,
      default: "Player",
      required: false
    },
    // initialAuthorId: {
    //   type: Number,
    //   default: 0,
    //   required: false
    // },
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
    },
    player:{
      type:Object,
      required:false
    },
    getMessages:{
      type:Function,
      required:false
    }
  },
  data: function() {
    return {
      feed: []
      // authorId: 0
    };
  },
  watch: {
    newMessage: function(newValue, oldValue) {
      this.pushToFeed(newValue);
      // console.log(newValue)
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
      // this.feed = this.initialFeed;
      this.authorId = this.initialAuthorId;
      console.log(this.feed)
    }
  },
  methods: {
    pushToFeed(element) {
      // this.feed.push(element);
      console.log(element)
      if(element.contents !== ""){
        axios.post("/api/add-message",{
          from_user:element.id,
          body:element.contents,
          to_user:this.player.user_id
        }).then(res=>{
          this.getMessages(this.player);
        })
      }
      else{
        return
      }
    },
    onNewOwnMessage(message) {
      const newOwnMessage = {
        id: this.$store.state.user.user_id,
        contents: message
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
.basicvuechat {
  height: 100%;
}
/* .window { */
/* height: 100%; */
/* border: 5px red solid; */
/* } */
.window__header__container {
  /* border: 5px orange solid; */
  background: linear-gradient(90deg, orange, seashell);
  padding: 10px 5px;
  color: seashell;
  font-weight: bold;
  z-index: 1;
}
.window__messages__container {
  width: 100%;
  overflow: auto;
  height: 420px;
  /* border: 5px green solid; */
}
/* .messages-list {
  border: 5px blue solid;
}
.window__input__container {
  border: 1px purple solid;
} */
</style>

