<template>
  <footer class="page-footer font-small blue pt-4" id="foot">
    <div class="footer-desktop">
      <a href="tel:5070" class="social">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</a>
      <a href="mailto:info@litro.kz" class="social social-2">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</a>
      <a href="https://www.facebook.com/LITROinKZ" class="social social-3" target="_blank">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</a>
      <a href="https://www.instagram.com/litro.kz/" class="social social-4" target="_blank">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</a>
      <a href="https://prices.litro.kz/usingterms" class="btn footer-link" target="_blank"></a>
      <a href="https://prices.litro.kz/privacy" class="btn footer-link link-2" target="_blank"></a>
      <img src="@/assets/img/footer2.png">
      <form @submit.prevent="send()">
        <input class="form-control-2" placeholder="ФИО" v-model="fullName" required>
        <input class="form-control-2 mt-xl-4 mt-lg-2" placeholder="Номер телефона" v-mask="'+#(###)###-##-##'" v-model="phone" required>
        <input class="form-control-2 mt-xl-4 mt-lg-2" placeholder="Email" v-model="email" type="email" required>
        <div class="button-div">
          <textarea class="form-control-2 mt-xl-4 mt-lg-2 text-input" placeholder="Текстовое сообщение" name="Текстовое сообщение" v-model="text" required></textarea>
          <button class="btn ml-2 btn-send loader_button" type="submit" :class="{disabled : loader}"><span v-if="!loader">Отправить</span> <img src="@/assets/img/loader.gif" alt="" v-if="loader"></button>
        </div>
      </form>

    </div>
    <div class="footer-mobile">
      <a href="tel:5070" class="social">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</a>
      <a href="mailto:info@litro.kz" class="social social-2">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</a>
      <a href="https://www.facebook.com/LITROinKZ" class="social social-3" target="_blank">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</a>
      <a href="https://www.instagram.com/litro.kz/" class="social social-4" target="_blank">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</a>
      <img src="@/assets/img/mobile/Footer2.png">
      <form @submit.prevent="send()">
        <input class="form-control-2" placeholder="ФИО" v-model="fullName" required>
        <input class="form-control-2 mt-4" v-mask="'+#(###)###-##-##'" placeholder="Номер телефона" v-model="phone" required>
        <input class="form-control-2 mt-4" placeholder="Email" v-model="email" type="email" required>
        <textarea class="form-control-2 mt-4 text-input" placeholder="Текстовое сообщение" name="Текстовое сообщение" v-model="text" required></textarea>
        <button class="btn mt-4 ml-md-2 ml-0 loader_button" type="submit" :class="{disabled : loader}"><span v-if="!loader">Отправить</span> <img src="@/assets/img/loader.gif" alt="" v-if="loader"></button>
      </form>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'footerComponent',
    data () {
      return {
        fullName: '',
        phone: '',
        email: '',
        text: '',
        loader: false
      }
    },
    methods: {
      send () {
        this.loader = true;
        let obj = {}
        obj['fullname'] = this.fullName
        obj['phone'] = this.phone
        obj['email'] = this.email
        obj['text'] = this.text
        this.$axios.post('https://cors-any-kz.herokuapp.com/http://138.68.103.82:8078/sent/email', obj)
        .then((response) => {
          let $response = response.data
          if ($response.code === 0) {
            console.log($response)
          } else {
            console.log(response)
          }
          this.fullName = '';
          this.phone = '';
          this.email = '';
          this.text = '';
          this.loader = false;
        })
        .catch((e) => console.log(e))
      }
    }
  }
</script>

<style scoped="">
  .disabled{
    pointer-events: none;
    opacity: 0.8;
  }
  .loader_button img{
height: 24px;
    width: auto;
  }
</style>