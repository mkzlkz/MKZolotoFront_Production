<template>
  <div class="createPlan padding-30">
    <div class="title"><router-link to="/admin/conducting-webinar"><img :src="require('@/assets/img/icon/back.svg')" alt="" class="img"></router-link>
      {{ $t('change_recording_webinar') }}</div>
    <div class="bg-white createPlan-form">
      <div class="form">
        <div class="form-1">
          <span>{{ $t('surname') }}</span>
          <input type="text" :placeholder="$t('surname')" v-model="user.Lastname">
        </div>
        <div class="form-1">
          <span>{{ $t('name_1') }}</span>
          <input type="text" :placeholder="$t('name_1')" v-model="user.Firstname">
        </div>
        <div class="form-1">
          <span>{{ $t('middle_name') }}</span>
          <input type="text" :placeholder="$t('middle_name')" v-model="user.Patronomyc">
        </div>
        <div class="form-1">
          <span>{{ $t('login') }}</span>
          <input type="text" :placeholder="$t('login')" v-model="user.Username">
        </div>
        <div class="form-1">
          <span>{{ $t('iin') }}</span>
          <input type="text" :placeholder="$t('iin')" v-model="user.iin">
        </div>
        <button class="button-blue" @click="editUser">{{ $t('save') }}</button>
        <small class="text-danger" v-if="error">{{error}}</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditRecordingWebinar',
  data () {
    return {
      user: {
        Username: '',
        Lastname: '',
        Firstname: '',
        Patronomyc: ''
      },
      userID: this.$route.params.id,
      error: ''
    }
  },
  computed: {
    fullName () {
      return this.user.Firstname + ' ' + this.user.Lastname + ' ' + this.user.Patronomyc
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    editUser () {
      this.user.Fullname = this.fullName
      this.$axios.put(this.$axios.baseURL + '/api/user/updateuser/' + this.userID, this.user)
        .then(response => {
          if (response.data.status) {
            this.$router.push('/admin/conducting-webinar')
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
    }
  }
}
</script>
