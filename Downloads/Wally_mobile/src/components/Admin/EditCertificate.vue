<template>
  <div class="createPlan padding-30">
    <div class="title">
      <router-link to="/admin/certificates"><img :src="require('@/assets/img/icon/back.svg')" alt="" class="img"></router-link>
      {{ $t('change_certificate') }}
    </div>

    <div class="bg-white createPlan-form">
      <div class="form">
        <div class="form-1">
          <span>{{ $t('nomination_certificate') }}</span>
          <input type="text" :placeholder="$t('nomination_certificate')" v-model="certificateName">
        </div>
        <div class="form-1">
          <span>{{ $t('file') }}</span>
          <div class="form-file">
            <input type="text" v-model="photosTitle">
            <label for="file">{{ $t('upload') }} <input type="file" id="file" ref="file" @change="photoDetect"></label>
          </div>
        </div>
        <button class="button-blue" @click="editCertificate">{{ $t('save') }}</button>
        <small class="text-danger" v-if="error">{{error}}</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditCertificate',
  data () {
    return {
      file: null,
      certificateName: '',
      photosTitle: '',
      photosOldTitle: '',
      error: '',
      certId: this.$route.params.id,
      photoChanged: false
    }
  },
  mounted () {
    this.getCertificate()
  },
  computed: {
    isNewPhotoUploaded () {
      return this.photosTitle !== this.photosOldTitle
    }
  },
  methods: {
    getCertificate () {
      this.$axios.get(this.$axios.baseURL + '/api/cer/getcer/' + this.certId)
        .then(response => {
          let cert = response.data.data
          this.certificateName = cert.Name
          this.photosTitle = cert.FileName
          this.photosOldTitle = cert.FileName
        })
    },
    editCertificate () {
      if (this.isNewPhotoUploaded) {
        let formData = new FormData()
        formData.append('file', this.file[0])
        this.$axios.post(this.$axios.baseURL + '/uploadF', formData)
          .then(response => {
            if (response.data.status) {
              let form = {
                'Name': this.certificateName,
                'FileName': response.data.docs.Name,
                'Path': response.data.docs.Path
              }
              this.$axios.put(this.$axios.baseURL + '/api/cer/updatecer/' + this.certId, form)
                .then(r => {
                  if (r.data.status) {
                    this.$router.push('/admin/certificates')
                  } else {
                    this.error = response.data.message
                  }
                })
            } else {
              this.error = response.data.message
            }
          })
      } else {
        this.$axios.put(this.$axios.baseURL + '/api/cer/updatecer/' + this.certId, {
          'Name': this.certificateName,
          'FileName': this.photosTitle
        })
          .then(response => {
            this.$router.push('/admin/certificates')
          })
      }
    },
    photoDetect () {
      this.file = this.$refs.file.files
      this.photosTitle = ''
      for (let i = 0; i < this.$refs.file.files.length; i++) {
        this.photosTitle += this.$refs.file.files[i].name + ' '
      }
    }
  }
}
</script>
