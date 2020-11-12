<template>
  <div class="createPlan padding-30">
    <div class="title">
      <router-link to="/admin/audience-exam"><img :src="require('@/assets/img/icon/back.svg')" alt="" class="img">
      </router-link>
      {{ $t('change_audience_exam') }}
    </div>

    <div class="bg-white createPlan-form">
      <div class="form">
        <div class="form-1">
          <span>{{ $t('nomination_audience') }}</span>
          <input type="text" :placeholder="$t('nomination_audience')" v-model="user.fullName">
        </div>
        <div class="form-1">
          <span>{{ $t('login_for_auth') }}</span>
          <input type="text" :placeholder="$t('login_for_auth')" v-model="user.username">
        </div>
        <button class="button-blue" :disabled="loading" @click="editUser">{{ $t('save') }}</button>
        <small class="text-danger" v-if="error">{{error}}</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'editAudienceExam',
  data () {
    return {
      user: {
        username: '',
        password: '',
        roleID: 5,
        fullName: ''
      },
      userID: this.$route.params.id,
      error: '',
      loading: false
    }
  },
  methods: {
    editUser () {
      this.loading = true
      this.$axios.put(this.$axios.baseURL + '/api/user/updateuser/' + this.userID, this.user)
        .then(response => {
          if (response.data.status) {
            this.$router.push('/admin/audience-exam')
          } else {
            this.loading = false
            this.error = response.data.message
          }
        })
    },
    getUser () {
      this.$axios.get(this.$axios.baseURL + '/api/user/getuser/' + this.userID)
        .then(response => {
          this.user = response.data.data
        })
    }
  },
  mounted () {
    this.getUser()
  }
}
</script>
