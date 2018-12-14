<template>
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
  width: 70%;
  flex-grow: 9999;
  padding: 5px 10px;
  margin-right: 5px;
  border-radius: 12px;
  background-color: #eeeeee;
  width: 100%;
  outline: none;
}
</style>
