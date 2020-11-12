<template>
  <div class="createPlan padding-30">
    <div class="title">
      <router-link to="/admin/examiners"><img :src="require('@/assets/img/icon/back.svg')" alt="" class="img">
      </router-link>
      {{ $t('new_examiner') }}
    </div>

    <div class="bg-white createPlan-form">
      <div class="form">
        <div class="form-1">
          <span>{{ $t('examiner_surname') }}</span>
          <input type="text" :placeholder="$t('examiner_surname')" v-model="user.Lastname">
        </div>
        <div class="form-1">
          <span>{{ $t('examiner_name') }}</span>
          <input type="text" :placeholder="$t('examiner_name')" v-model="user.Firstname">
        </div>
        <div class="form-1">
          <span>{{ $t('examiner_middle_name') }}</span>
          <input type="text" :placeholder="$t('examiner_middle_name')" v-model="user.Patronomyc">
        </div>
        <div class="form-1">
          <span>{{ $t('iin') }}</span>
          <input type="text" :placeholder="$t('examiner_iin')" v-model="user.IIN">
        </div>
        <div class="form-1">
          <span>{{ $t('examiner_login') }}</span>
          <input type="text" :placeholder="$t('examiner_login')" v-model="user.username">
        </div>
        <div class="form-1">
          <span>{{ $t('examiner_password') }}</span>
          <input type="password" :placeholder="$t('examiner_password')" v-model="user.Password">
        </div>
        <div class="form-1">
          <span>{{ $t('password_for_ecp') }}</span>
          <input type="text" :placeholder="$t('password_for_ecp')">
        </div>
        <uploadFiles
          v-model="file"
          :title="$t('photo')"
          :uploadFileSize="1000000"
          :mimeType="['image/jpeg', 'image/png']"
          :help="$t('max_upload', { size: `1 ${$t('size.mb')}` })"
        />
        <Button :text="$t('create')" @click="createUser" :loading="loading"/>
        <small class="text-danger" v-if="error">{{error}}</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateExaminer',
  components: {
    uploadFiles: () => import('../Template/uploadFile'),
    Button: () => import('../Template/Button')
  },
  data () {
    return {
      user: {
        Username: '',
        Lastname: '',
        Firstname: '',
        Patronomyc: '',
        Password: '',
        roleID: 2,
        fullName: '',
        IIN: ''
      },
      file: [],
      loading: false,
      error: ''
    }
  },
  computed: {
    fullName () {
      return this.user.Firstname + ' ' + this.user.Lastname + ' ' + this.user.Patronomyc
    }
  },
  methods: {
    createUser () {
      this.user.Fullname = this.fullName
      this.loading = true
      this.$axios.post(this.$axios.baseURL + '/api/user/new', this.user)
        .then(response => {
          if (response.data.status) {
            this.loading = false
            let id = response.data.user.ID
            if (this.file[0]) {
              let formData = new FormData()
              formData.append('file', this.file[0])
              formData.append('UserID', id)
              this.$axios.post(this.$axios.baseURL + '/uploadI', formData)
                .then(() => {
                  this.$router.push( '/admin/Examiners')
                })
            } else {
              this.$router.push('/admin/Examiners')
            }
          } else {
            this.loading = false
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
  }
}
</script>
