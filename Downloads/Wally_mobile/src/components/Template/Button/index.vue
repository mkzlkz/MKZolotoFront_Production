<template>
  <button class="button-blue" :disabled="loading" @click="$emit('click')">
    <div class="loader" v-if="loading"></div>
    <!-- <span v-else v-html="text"></span> -->
    <img src="@/assets/img/icon/ic_send.svg" alt="">
  </button>
</template>

<script>
  export default {
    name: "Button",
    props: {
      text: {
        type: String,
        required: true
      },
      loading: {
        type: Boolean,
        default() {
          return false
        }
      }
    }
  }
</script>

<style scoped>
  .loader {
    border: 5px solid #d6d6d6;
    border-top: 5px solid #fff;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    animation: spin 1s linear infinite;
    position: absolute;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
