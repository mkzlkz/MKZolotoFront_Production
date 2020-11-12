<template>
  <div class="createPlan padding-30">
    <div class="title">
      <router-link to="/admin/scorms"><img :src="require('@/assets/img/icon/back.svg')" alt="" class="img"></router-link>
      {{ $t('create_mediafile') }}
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

        <uploadFiles
          v-model="file"
          :title="$t('file')"
          :uploadFileSize="10000000"
        />

        <Button :text="$t('create')" @click="createScorm" :loading="loading"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateScorm',
  components: {
    uploadFiles: () => import('../Template/uploadFile'),
    Button: () => import('../Template/Button')
  },
  data () {
    return {
      scorm: {
        TopicID: '',
        Name: ''
      },
      themes: [],
      file: [],
      loading: false
    }
  },
  methods: {
    getThemeList () {
      this.$axios.get(this.$axios.baseURL + '/api/subject/gettopics')
        .then(response => {
          this.themes = response.data.data
          this.scorm.TopicID = this.themes[0].ID
        })
    },
    createScorm () {
      this.loading = true
      this.$axios.post(this.$axios.baseURL + '/api/scorm/new', this.scorm)
        .then(response => {
          this.loading = false
          if (response.data.status) {
            let id = response.data.scorm.ID
            if (this.file[0]) {
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
  }
}
</script>
