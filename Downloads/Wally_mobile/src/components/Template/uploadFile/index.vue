<template>
  <div class="form-1">
    <span v-html="title"></span>
    <div class="form-file">
      <input type="text" placeholder="" v-model="fileNames" disabled>
      <label for="upload">
        {{ $t('upload') }}
        <input :multiple="multiple" id="upload" ref="uploadInput" type="file" @change="fileDetect">
      </label>
    </div>
    <small v-if="help" v-html="help"></small>
    <div class="users-admin-box-img" v-if="files.length > 0">
      <div v-for="(photo, index) in files" :key="index" class="img mr-2">
        <img
          :src="imageMimes.includes(photo.type) ? photo.url : require('./NoImage.jpg')"
          class="img-ps"
        />
        <button @click="removeUploadFile(index)">
          <img :src="require('@/assets/img/icon/delete-red.svg')" alt="">
        </button>
        <span>{{ photo.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'uploadFile',
  model: {
    prop: 'stateValue',
    event: 'change'
  },
  props: {
    stateValue: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    multiple: {
      type: Boolean,
      default () {
        return false
      }
    },
    mimeType: {
      type: Array,
      default () {
        return null
      }
    },
    uploadFileSize: {
      type: [String, Number],
      default () {
        return null
      }
    },
    help: {
      type: String,
      default () {
        return null
      }
    }
  },
  computed: {
    files: {
      get () {
        return this.stateValue
      },
      set (value) {
        this.$emit('change', value)
      }
    },
    fileNames () {
      const data = this.files
      return data.map(elem => elem.name).join(', ')
    },
    imageMimes () {
      return ['image/jpeg', 'image/png']
    }
  },
  methods: {
    fileDetect: function () {
      for (const file of this.$refs.uploadInput.files) {
        if (this.uploadFileSize && file.size > this.uploadFileSize) {
          continue
        }
        if (this.mimeType && !this.mimeType.includes(file.type)) {
          continue
        }
        if (this.imageMimes.includes(file.type)) {
          file.url = URL.createObjectURL(file)
        }
        if (!this.multiple) {
          this.removeUploadFile(0)
        }
        this.files.push(file)
      }
    },
    removeUploadFile (index) {
      this.files.splice(index, 1)
    }
  }
}
</script>

<style scoped>

  .users-admin-box-img {
    display: flex;
    margin: 0 -15px;
  }
  .users-admin-box-img .img {
    position: relative;
    padding: 15px;
    width: 120px;
    height: 120px;
    overflow: hidden;
  }
  .users-admin-box-img .img .img-ps {
    border-radius: 3px;
    object-fit: cover;
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    border: solid 1px #DDDDDD;
  }
  .users-admin-box-img .img button {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
  .users-admin-box-img .img span {
    font-size: 14px;
    color: #878890;
    display: block;
  }
</style>
