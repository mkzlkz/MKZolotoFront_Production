<template>
    <div class="createPlan padding-30">
        <div class="title"><router-link to="/admin/conducting-webinar"><img :src="require('@/assets/img/icon/back.svg')" alt="" class="img"></router-link>{{ $t('create_recording_webinar') }}</div>
        <div class="bg-white createPlan-form">
            <div class="form">
                <div class="form-1">
                    <span>{{ $t('surname') }}</span>
                    <input type="text" :placeholder="$t('surname')" v-model="user.lastName">
                </div>
                <div class="form-1">
                    <span>{{ $t('name_1') }}</span>
                    <input type="text" :placeholder="$t('name_1')" v-model="user.firstName">
                </div>
                <div class="form-1">
                    <span>{{ $t('middle_name') }}</span>
                    <input type="text" :placeholder="$t('middle_name')" v-model="user.patronymic">
                </div>
                <div class="form-1">
                    <span>{{ $t('login') }}</span>
                    <input type="text" :placeholder="$t('login')" v-model="user.username">
                </div>
                <div class="form-1">
                    <span>{{ $t('iin') }}</span>
                    <input type="tel" minlength="12" :placeholder="$t('iin')" v-model="user.iin">
                </div>
                <div class="form-1">
                    <span>{{ $t('password') }}</span>
                    <input type="password" :placeholder="$t('password')" v-model="user.password">
                </div>
                <button class="button-blue" :disabled="loading" @click="createUser">{{ $t('create') }}</button>
                <small class="text-danger" v-if="error">{{error}}</small>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CreateRecordingWebinar',
  data () {
    return {
      user: {
        username: '',
        lastName: '',
        firstName: '',
        patronymic: '',
        password: '',
        roleID: 4,
        fullName: '',
        iin: '',
        loading: false,
        error: '',
        IDNumber: '',
      }
    }
  },
  computed: {
    fullName () {
      return this.user.firstName + ' ' + this.user.lastName + ' ' + this.user.patronymic
    }
  },
  methods: {
    createUser () {
      this.user.fullName = this.fullName
      this.loading = true
      this.user.IDNumber=this.user.username
      this.$axios.post(this.$axios.baseURL + '/api/user/new', this.user)
        .then(response => {
          this.loading = false
          if (response.data.status) {
            this.$router.push('/admin/conducting-webinar')
          } else {
            this.error = response.data.message
          }
        })
    }
  }
}
</script>
