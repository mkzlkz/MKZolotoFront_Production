<template>
  <div class="dflex">
    <uploadedFile
      v-if="file"
      :name="file.name"
      :mime="file.type"
      :size="file.size"
    />
    <input type="file" ref="file" style="display: none" @change="photoDetect">
    <Button text="Отправить" @click="$emit('submit')" :loading="loading"/>
    <button class="button-gray-line" @click="$refs.file.click()" v-if="!file" >
      <img :src="require('@/assets/img/icon/add-file.svg')" alt="">
    </button>
    <button v-if="file" class="button-gray-line remove-file" @click="clearUpload">
      <img :src="require('@/assets/img/icon/delete-gray.svg')" alt="">
    </button>
  </div>
</template>

<script>
  import webinarChatMixin from '../../../mixins/webinarChatMixin'
  export default {
    name: 'WebinarAction',
    mixins: [webinarChatMixin],
    props: {
      loading: {
        type: Boolean
      }
    }
  }
</script>

<style scoped>
  .remove-file {
    padding: 0;
    border: none;
  }
  .remove-file img {
    width: 32px;
    height: 32px;
  }
</style>
