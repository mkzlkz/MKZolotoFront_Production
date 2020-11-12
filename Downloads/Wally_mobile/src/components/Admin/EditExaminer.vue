<template>
  <div class="createPlan padding-30">
    <div class="title">
      <router-link to="/admin/examiners"><img :src="require('@/assets/img/icon/back.svg')" alt="" class="img">
      </router-link>
      {{ $t('change_examiner') }}
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
          <input type="text" :placeholder="$t('examiner_iin')" v-model="user.iin">
        </div>
        <div class="form-1">
          <span>{{ $t('examiner_login') }}</span>
          <input type="text" :placeholder="$t('examiner_login')" v-model="user.Username">
        </div>
        <div class="form-1">
          <span>{{ $t('password_for_ecp') }}</span>
          <input type="text" :placeholder="$t('password_for_ecp')">
        </div>
        <div class="form-1">
          <span>{{ $t('photo') }}</span>
          <div class="form-file">
            <input type="text" placeholder="" v-model="photosTitle">
            <label for="file">{{ $t('upload') }}<input type="file" ref="file" id="file" @change="fileDetect"></label>
          </div>
        </div>
        <button class="button-blue" @click="editUser">{{ $t('save') }}</button>
        <small class="text-danger" v-if="error">{{error}}</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditExaminer',
  data () {
    return {
      user: {
        Lastname: '',
        Firstname: '',
        Username: '',
        Patronomyc: '',
        RoleID: 2,
        iin: ''
      },
      userID: this.$route.params.id,
      photosTitle: '',
      file: null,
      error: ''
    }
  },
  computed: {
    fullName () {
      return this.user.Firstname + ' ' + this.user.Lastname + ' ' + this.user.Patronomyc
    }
  },
  methods: {
    editUser () {
      this.user.Fullname = this.fullName
      this.$axios.put(this.$axios.baseURL + '/api/user/updateuser/' + this.userID, this.user)
        .then(response => {
          if (response.data.status) {
            let id = this.userID
            if (this.file) {
              let formData = new FormData()
              formData.append('file', this.file[0])
              formData.append('UserID', id)
              this.$axios.post(this.$axios.baseURL + '/uploadI', formData)
                .then(() => {
                  this.$router.push('/admin/examiners')
                })
            } else {
              this.$router.push('/admin/examiners')
            }
          } else {
            this.error = response.data.message
          }
        })
    },
    getUser () {
      this.$axios.get(this.$axios.baseURL + '/api/user/getuser/' + this.userID)
        .then(response => {
          this.user = response.data.data
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
    this.getUser()
  }
}
</script>
