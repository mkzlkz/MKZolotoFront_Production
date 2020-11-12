<template>
  <div class="createPlan padding-30">
    <div class="title">
      <router-link to="/admin/certificates"><img :src="require('@/assets/img/icon/back.svg')" alt="" class="img"></router-link>
      {{ $t('mew_certificate') }}
    </div>

    <div class="bg-white createPlan-form">
      <div class="form">
        <div class="form-1">
          <span>{{ $t('nomination_certificate') }}</span>
          <input type="text" :placeholder="$t('nomination_certificate')" v-model="certificateName">
        </div>

        <uploadFiles
          v-model="file"
          :title="$t('file')"
          :uploadFileSize="10000000"
        />

        <Button :text="$t('create')" @click="createCertificate" :loading="loading"/>
        <small class="text-danger" v-if="error">{{error}}</small>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  name: 'CreateCertificate',
  components: {
    uploadFiles: () => import('../Template/uploadFile'),
    Button: () => import('../Template/Button')
  },
  data: function () {
    return {
      file: [],
      certificateName: '',
      error: '',
      loading: false
    }
  },
  methods: {
    createCertificate () {
      let formData = new FormData()
      formData.append('file', this.file[0])
      this.loading = true
      this.$axios.post(this.$axios.baseURL + '/uploadF', formData)
        .then(response => {
          let form = {
            Name: this.certificateName,
            FileName: response.data.Name,
            Path: response.data.Path
          }
          this.$axios.post(this.$axios.baseURL + '/api/cer/new', form)
            .then(r => {
              if (r.data.status) {
                this.$router.push('/admin/certificates')
              } else {
                this.error = response.data.message
                this.loading = false
              }
            })
        })
    }
  }
}
</script>
