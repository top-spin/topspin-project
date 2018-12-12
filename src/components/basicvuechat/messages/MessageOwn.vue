<template>
  <div class="message--own">
    <div class="message__author">{{ author }}</div>
    <div class="message__date">{{ date }}</div>
    <div class="message__contents">
      <img v-if="imageUrl" :src="imageUrl" alt style="width: 100%">
      {{ contents }}
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageOwn",
  props: {
    author: {
      type: String,
      default: "",
      required: false
    },
    date: {
      type: String,
      default: "16:30:00",
      required: false
    },
    imageUrl: {
      type: String,
      default: "",
      required: false
    },
    contents: {
      type: String,
      default: "",
      required: false
    }
  }
};
</script>

<style>
.message--own {
  border-radius: 12px;
  background-color: lightskyblue;
  color: white;
  padding: 3px 5px;
  width: 60%;
  float: right;
  margin-bottom: 10px;
  margin-right: 3px;
}
</style>
