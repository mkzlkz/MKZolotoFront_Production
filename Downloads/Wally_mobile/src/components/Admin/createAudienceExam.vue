<template>
  <div class="createPlan padding-30">
    <div class="title">
      <router-link to="/admin/audience-exam"><img :src="require('@/assets/img/icon/back.svg')" alt="" class="img">
      </router-link>
      {{ $t('new_audience_exam') }}
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
        <div class="form-1">
          <span>{{ $t('password_for_auth') }}</span>
          <input type="text" :placeholder="$t('password_for_auth')" v-model="user.password">
        </div>
        <button class="button-blue" @click="createUser">{{ $t('save') }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'createAudienceExam',
  data () {
    return {
      user: {
        username: '',
        password: '',
        roleID: 5,
        fullName: ''
      }
    }
  },
  methods: {
    createUser () {
      this.$axios.post(this.$axios.baseURL + '/api/user/new', this.user)
        .then(() => {
          this.$router.push('/admin/audience-exam')
        })
    }
  }
}
</script>
