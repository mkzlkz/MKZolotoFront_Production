<template>
  <div>
    <div class="header">
      <img style="max-width:250px;" :src="require('@/assets/img/logo_wally_genius.svg')" alt="">
      <div class="_right">
        <ChangeLanguage />
        <div class="user">
          <div>
            <p v-if="user">{{user.Fullname}}</p>
            <button data-toggle="modal" data-target="#modal-change-password" class="user-button">{{ $t('change_password') }}</button>
          </div>
          <img v-if="hasImage" :src="user.Image[0]" alt="">
        </div>
      </div>
    </div>
    <div class="modal-window">
      <div id="modal-change-password" class="modal fade">
        <div class="modal-dialog modal-dialog-10">
          <div class="modal-content">
            <div class="modal-body">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
              <div>
                <div class="form-1">n
                  <p>{{ $t('current_password') }}</p>
                  <input type="password" :placeholder="$t('current_password')" v-model="oldPassword">
                </div>
                <div class="form-1">
                  <p>{{ $t('new_password') }}</p>
                  <input type="password" :placeholder="$t('Новый пароль')" v-model="password">
                </div>
                <div class="form-1">
                  <p>{{ $t('repeat_new_password') }}</p>
                  <input type="password" :placeholder="$t('repeat_new_password')" v-model="passwordCheck">
                </div>
                <button class="button-blue">{{ $t('save') }}</button>
                <span class="small text-danger" v-if="error">{{error}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'headerComponent',
  data () {
    return {
      fullname: 'Ромащенко Василий',
      plans: [],
      user: null,
      error: '',
      password: '',
      passwordCheck: '',
      oldPassword: ''
    }
  },
  components: {
    ChangeLanguage: () => import('./changeLanguage')
  },
  computed: {
    hasImage () {
      if (!this.user) {
        return false
      }
      return this.user && this.user.Image && this.user.Image.length
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    getUser () {
      this.user = JSON.parse(localStorage.getItem('user'))
    },
    getPlans () {
      this.$axios.get(this.$axios.baseURL + '/api/subject/getuserplans/{id}')
        .then(response => {
          this.plans = response.data.data
        })
    },
    updatePassword () {
      if (this.password !== this.passwordCheck) {
        this.error = this.$t('password_mismatch')
        return
      }
      let data = {
        Password: this.oldPassword,
        Newpassword: this.password
      }
      this.$axios.put(this.$axios.baseURL + '/api/user/changepass', data)
        .then(response => {
          if (response.data.status) {
            this.error = ''
            this.password = ''
            this.oldPassword = ''
            this.passwordCheck = ''
          } else {
            this.error = response.data.message
          }
        })
    }
  }
}
</script>

<style scoped>
  ._right {
    display: flex;
    align-items: center;
  }
  ._right .lang {
    padding-right: 33px;
  }
</style>
