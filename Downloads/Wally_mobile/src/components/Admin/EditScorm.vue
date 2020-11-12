<template>
  <div class="createPlan padding-30">
    <div class="title">
      <router-link to="/admin/scorms"><img :src="require('@/assets/img/icon/back.svg')" alt="" class="img"></router-link>
      {{ $t('change_mediafile') }}
    </div>

    <div class="bg-white createPlan-form">
      <div class="form">
        <div class="form-1">
          <span>{{ $t('nomination') }} {{ $t('scorm_package_1') }}</span>
          <input type="text" :placeholder="$t('nomination_certificate')" v-model="scorm.Name">
        </div>
        <div class="form-1">
          <span>{{ $t('nomination_theme') }}</span>
          <select id="ThemeId" v-model="scorm.TopicID">
            <option v-for="(theme, index) in themes" :value="theme.ID" :key="index">{{theme.Topic}}</option>
          </select>
        </div>
        <div class="form-1">
          <span>{{ $t('file') }}</span>
          <div class="form-file">
            <input type="text" placeholder=" " v-model="photosTitle">
            <label for="file">{{ $t('upload') }} <input type="file" id="file" ref="file" @change="fileDetect"></label>
          </div>
        </div>
        <button class="button-blue" @click="editScorm">{{ $t('update') }}</button>
        <small class="text-danger" v-if="error">{{error}}</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditScorm',
  data () {
    return {
      scorm: {
        TopicID: '',
        Name: ''
      },
      themes: [],
      photosTitle: '',
      file: null,
      scormId: this.$route.params.id,
      error: ''
    }
  },
  methods: {
    getThemeList () {
      this.$axios.get(this.$axios.baseURL + '/api/subject/gettopics')
        .then(response => {
          this.themes = response.data.data
        })
    },
    editScorm () {
      this.$axios.post(this.$axios.baseURL + 'api/scorm/update/id:' + this.scormId, this.scorm)
        .then(response => {
          if (response.data.status) {
            let id = response.data.scorm.ID
            if (this.file) {
              let formData = new FormData()
              formData.append('file', this.file[0])
              formData.append('ScormID', id)
              this.$axios.post(this.$axios.baseURL + '/uploadF', formData)
                .then(() => {
                  this.$router.push('/admin/scorms')
                })
            } else {
              this.$router.push('/admin/scorms')
            }
          } else {
            this.error = response.data.message
          }
        })
    },
    getScorm () {
      this.$axios.get(this.$axios.baseURL + '/api/scorm/get?id=' + this.scormId)
        .then(response => {
          this.scorm = response.data.data[0]
          if (this.scorm.Document.ID) {
            this.photosTitle = this.scorm.Document.Name
          }
        })
    },
    fileDetect () {
      this.file = this.$refs.file.files
      this.photosTitle = ''
      for (let i = 0; i < this.$refs.file.files.length; i++) {
        this.photosTitle += this.$refs.file.files[i].name + ' '
      }
    }
  },
  mounted () {
    this.getThemeList()
    this.getScorm()
  }
}
</script>
