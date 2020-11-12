<template>
  <div :class="['uploaded', { 'file-download': showDownload }]">
    <div class="l">
      <img :src="require('../../../assets/img/icon/file.svg')">
      <div class="info">
        <div class="name" v-html="name"></div>
        <div class="mime" v-if="mime" v-html="mime"></div>
      </div>
    </div>
    <div class="r">
      <div class="size" v-html="fileSize"></div>
      <div class="download" v-if="showDownload" @click="downloadURI">
        <img :src="require('../../../assets/img/icon/save.svg')">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UploadedFiles',
    props: {
      name: {
        type: String,
        required: true
      },
      mime: {
        type: String,
        default () {
          return null
        }
      },
      size: {
        type: [String, Number],
        required: true
      },
      url: {
        type: String
      },
      showDownload: {
        type: Boolean,
        default () {
          return false
        }
      }
    },
    computed: {
      fileSize () {
        const b = this.size
        const fsizekb = Math.ceil(b / 1024)
        const fsizemb = Math.ceil(fsizekb / 1024)
        const fsizegb = Math.ceil(fsizemb / 1024)
        const fsizetb = Math.ceil(fsizegb / 1024)
        let fsize

        if (fsizekb <= 1024) {
          fsize = fsizekb + ' кб'
        } else if (fsizekb >= 1024 && fsizemb <= 1024) {
          fsize = fsizemb + ' мб'
        } else if (fsizemb >= 1024 && fsizegb <= 1024) {
          fsize = fsizegb + ' гб'
        } else {
          fsize = fsizetb + ' тб'
        }

        return fsize
      }
    },
    methods: {
      downloadURI () {
        this.$axios({
          url: `https://cors-any-kz.herokuapp.com/${this.url}`,
          method: 'GET',
          responseType: 'blob'
        }).then((response) => {
          const fileURL = window.URL.createObjectURL(new Blob([response.data]))
          const fileLink = document.createElement('a')
          fileLink.href = fileURL
          fileLink.setAttribute('download', this.name)
          document.body.appendChild(fileLink)
          fileLink.click()
        })
      }
    }

  }
</script>

<style scoped>
  .uploaded {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 200px;
    height: auto;
    padding: 5px;
    background: #f8f8f8;
    border-radius: 3px;
  }
  .uploaded.file-download {
    width: 250px;
  }
  .uploaded > div {
    display: flex;
    align-items: center;
  }
  .uploaded > div.r {
    justify-content: flex-end;
  }
  .name {
    color: #535875;
    font-size: 12px;
    margin: 0;
    word-break: break-word;
  }
  .mime {
    font-size: 8px;
    color: #bbbdc8;
  }
  .info {
    margin-left: 5px;
  }
  .size {
    color: #bbbdc8;
    font-size: 12px;
    white-space: nowrap;
  }
  .download {
    margin-left: 5px;
    cursor: pointer;
  }
  .uploaded img {
    width: 25px;
    height: 25px;
  }
  .chat-add-messages textarea {
    border: 1px solid #9a9eae;
  }
</style>
