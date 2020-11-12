<template>
    <div class="auth">
        <div class="auth-form">
            <img :src="require('@/assets/img/logo_kaztrans_oil.svg')" alt="" class="logo">
            <input type="text" placeholder="ИИН или Табельный номер" v-model="iin" @focus="clearError()" @keyup.enter="checkAuthData">
            <input type="password" :placeholder="$t('password')" v-model="password" @focus="clearError()" @keyup.enter="checkAuthData">
            <p class="error" v-if="error!=''">{{error}}</p>
            <button class="button-blue" @click="checkAuthData" v-html="$t('sign_in')"></button>
        </div>
    </div>
</template>

<script>
module.exports = {
  name: 'Auth',
  data: function () {
    return {
      'iin': '',
      'password': '',
      'error': ''
    }
  },
  created () {
    this.$i18n.locale = 'ru'
    localStorage.setItem('i18n', 'ru')
  },
  methods: {
    clearError: function () {
      this.error = ''
    },
    checkAuthData: function () {
      var data = {
        'iin': this.iin,
        'password': this.password
      }
      this.$axios.post(this.$axios.baseURL + '/api/user/login', data)
        .then(response => {
          console.log(response.data)
          if (response.data.status === false) {
            this.error = response.data.message
          } else {
            let user = response.data.user
            localStorage.setItem('user', window.JSON.stringify(user))
            this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.Token
            if (user.RoleID === 1 || user.RoleID === 4 || user.RoleID === 2) {
              this.$router.push('/admin')
            } else {
              this.$router.push('/user')
            }
          }
        }).catch((e) => {
          alert(e.message)
          this.error = e.message
        })
      //                this.$router.push('/user/plan-education')
    }
  }
}

</script>

<style scoped>
    .error {
        color: #b40000;
    }
    .logo {
        max-width:100%
    }
</style>
