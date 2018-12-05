<template>
  <div class="input__button" @click="send">Send</div>
</template>

<script>
export default {
  name: "InputButton",
  methods: {
    send(event) {
      this.$emit("newOwnMessage");
    }
  }
};
</script>

<style>
.input__button {
  width: 20%;
  padding: 5px 10px;
  border-radius: 12px;
  background-color: orange;
  /* color: light-text-color; */
  color: white;
  font-weight: bold;
  cursor: pointer;
}
</style>
