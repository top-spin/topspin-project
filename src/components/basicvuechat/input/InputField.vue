<template>
  <!-- <div > -->
  <input
    class="input__field"
    :value="value"
    type="text"
    name="message"
    aria-placeholder="Type message..."
    placeholder="Type message..."
    autofocus
    @input="$emit('input', $event.target.value)"
    @keyup.enter.prevent="send"
  >
  <!-- <br> -->
  <!-- </div> -->
</template>

<script>
export default {
  name: "InputField",
  props: {
    value: {
      type: String,
      default: "",
      required: false
    }
  },
  methods: {
    send(event) {
      this.$emit("newOwnMessage");
    }
  }
};
</script>

<style>
.input__field {
  /* border: red 2px solid; */
  width: 70%;
  flex-grow: 9999;
  padding: 5px 10px;
  margin-right: 5px;
  border-radius: 12px;
  background-color: #eeeeee;
  /* color: $dark-text-color; */
  width: 100%;
  outline: none;
}
</style>
