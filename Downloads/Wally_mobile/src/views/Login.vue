<template>
  <div>
    <div class="container text-center login">
      <img src="../assets/img/icon/group-4@3x.png" class="logo">
      <h1 class="login-text mx-auto">Wally Education</h1>
      <form class="form-group" @submit.prevent="checkAuthData()">
        <input class="form-control" placeholder="ИИН" v-model="iin" @focus="clearError()">
        <input class="form-control" placeholder="Пароль" v-model="password" type="password" @focus="clearError()">
        <p class="error" v-if="error!=''">{{error}}</p>
        <button class="btn btn-login" type="submit" >Войти</button>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      iin: '',
      password: '',
      error: ''
    }
  },
  // created () {
  //   this.checkUser()
  // },
  methods: {
//     checkUser () {
//       let user = localStorage.getItem('user')
// if (user) {
//         this.$router.push('/main')
//       }
//     },
    clearError () { //при новом наведении на поле, убирает текст с ошибкой
      this.error = ''
    },
    checkAuthData () {
      var data = {
        'iin': this.iin,
        'password': this.password
      }
      this.$axios.post(this.$axios.baseURL + '/api/user/login', data)
        .then(response => {
          if (response.data.status === false) {
            this.error = response.data.message
          } else {
            let user = response.data.user
            localStorage.setItem('user', window.JSON.stringify(user))
            this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.Token
            if (user.RoleID === 1 || user.RoleID === 4 || user.RoleID === 2) { //проверяет роли и перенаправляет на соответствующие страницы
              window.location.replace('/webinar-main')
            } else {
              window.location.replace('/main')
            }
          }
        }).catch((e) => {
          alert(e.message)
          this.error = e.message
        })
    }

  }

}
</script>

