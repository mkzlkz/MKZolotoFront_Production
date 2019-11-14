<template>
  <div>
    <div class="desktop-banner">
      <slick ref="slick" :options="slickOptions" class="slider_banner">
        <div class="banner" v-for="banner in banners">
          <a v-if="banner.link" :href="banner.link" target="_blank" class="banner-flex">
            <div class="text">
              <div class="text1" v-if="banner.text1">{{banner.text1}}</div>
                    <div class="text2" v-if="banner.text2">{{banner.text2}}</div>
                    <div class="text3" v-if="banner.text3">{{banner.text3}}</div>
                    <div class="text4" v-if="banner.text4">{{banner.text4}}</div>
            </div>
            <div class="img">
              <img :src="banner.desktop" alt="" class="img-deck_i">
              <img :src="banner.mobile" alt="" class="img-mob_b">
            </div>
          </a>
          <div v-else class="banner-flex">
            <div class="text">
             <div class="text1" v-if="banner.text1">{{banner.text1}}</div>
                    <div class="text2" v-if="banner.text2">{{banner.text2}}</div>
                    <div class="text3" v-if="banner.text3">{{banner.text3}}</div>
                    <div class="text4" v-if="banner.text4">{{banner.text4}}</div>
            </div>
            <div class="img">
              <img :src="banner.desktop" alt="" class="img-deck_i">
              <img :src="banner.mobile" alt="" class="img-mob_b">
            </div>
          </div>
        </div>
      </slick>
    </div>

    <div class="bg-1 tab-pane1">
      <div class="bg-calc">
        <div class="tab-text">
          <h1 class="title">{{ $t('calculate_title') }}</h1>
          <div class="content_block">
            <div class="calc_block">
              <div class="calc-dflex">
                <div v-for="(pP, index) in  postedPrice" class="df"><span class="df1">{{pP.title}}</span><span class="df2">{{nicePrice(pP.value)}}</span></div>
              </div>
              <form action="" class="calc-form">
                <div class="form-1">
                  <span>{{ $t('gold_content') }}</span>
                  <select v-model="GoldProbes" name="" id="">
                    <option v-for="(probe, index) in probes" :key="probe.id" :value="probe.value">{{ probe.key }}
                    </option>
                  </select>
                </div>
                <div class="form-1">
                  <span>{{ $t('gold_weight_grams') }}</span>
                  <input type="text" placeholder="0" @blur="saveEdit" @keydown="getkey" ref="inWeight"
                  v-model="weight">
                  <div v-if="showAnsver" class="hint-cl">
                    {{ $t('gold_weight_exceed') }} {{maxWeight}} {{ $t('gram_text') }}
                  </div>
                </div>
                <div class="form-1">
                  <span>{{ $t('loan_term_days') }}</span>
                  <input type="text" min="0" placeholder="0" @blur="saveEditDays" @keydown="getkeyDays"
                  v-model="days">
                  <div v-if="showAnsverDays && maxTerm && defaultDays && days != 0" class="hint-cl">
                    {{ $t('loan_term_exceed') }} {{maxTerm}} {{ $t('days_text') }}
                  </div>

                </div>
                <div class="line"></div>
                <div class="total"><span>{{ $t('amount_on_hand') }}</span>
                  <div class="price"><span>{{nicePrice(heandSum)}}</span><span>₸</span></div>
                </div>
                <div class="total"><span>{{ $t('refund_amount') }}</span>
                  <div class="price"><span v-if="days">{{nicePrice(returndeSum)}}</span><span v-if="!days">0</span> <span>₸</span></div>
                </div>
              </form>
            </div>
            <div class="social deskk">
  <ul>
    <li v-for="social in socials" :key="social.id" v-bind:class="{appl : social.isApplication == true}">
      <a :href="social.link" target="_blank"><img :src="social.img_white" alt=""></a>
    </li>
  </ul>
</div>
            <div class="social mobb">
  <ul>
    <li v-for="social in socials" :key="social.id" v-bind:class="{appl : social.isApplication == true}">
      <a :href="social.link" target="_blank"><img :src="social.img_dark" alt=""></a>
    </li>
  </ul>
</div>
          </div>
          <div class="box box1" v-if="visible">
            <div class="closes_box closes_box1" @click="visible = !visible"><img :src="require('@/assets/img/close.svg')"
              alt=""></div>
              <img v-if="this.$auth.getLanguage() === 'ru'" :src="require('@/assets/img/1.png')" alt="" class="img">
              <img v-if="this.$auth.getLanguage() === 'kz'" :src="require('@/assets/img/1k.png')" alt="" class="img">
              <img v-if="this.$auth.getLanguage() === 'qaz'" :src="require('@/assets/img/1q.png')" alt="" class="img">
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
    import Slick from 'vue-slick'
    import {
      TheMask
    } from 'vue-the-mask'
    import _ from 'lodash';
    import {
      log
    } from 'util';
    export default {
      components: {
        TheMask,
        Slick
      },
      name: "calculate-component",
      data() {
        return {
          weight: '',
          days: '',
          probes: [],
          GoldProbes: null,
          rates: [],
          visible: true,
          heandSum: '',
          returndeSum: '',
          bet: null,
          betPlus: null,
          postedPrice: [],
          maxWeight: '',
          maxTerm: '',
          maxTermLength: '',
          showAnsver: false,
          showAnsverDays: false,
          num:'',
          defaultDays:'',
          title_page: '',
          description_page: '',
          opengraph_image: '',
          slickOptions: {
            dots: true,
            arrows: false,
            fade: false,
            autoplay: true,
            infinite: true,
            autoplaySpeed: 5000
          },
          banners: {},
          socials: ''
        }
      },
      metaInfo() {
        return {
          title: this.title_page,
          meta: [
          { 'property': 'og:title', 'content': this.title_page, 'vmid': 'og:title'},
          { name: 'description', content: this.description_page },
          { 'property': 'og:description', 'content': this.description_page, 'vmid': 'og:description'},
          { 'property': 'og:image', 'content': this.opengraph_image, 'vmid': 'og:image'},
          { 'property': 'og:image:secure_url', 'content': this.opengraph_image, 'vmid': 'og:image:secure_url'}
          ]
        }
      },
      beforeUpdate() {
        if (this.$refs.slick) {
          this.$refs.slick.destroy();
        }
      },
      updated() {
        if (this.$refs.slick && !this.$refs.slick.$el.classList.contains('slick-initialized')) {
          this.$refs.slick.create();
        }
      },
      created() {
        this.getLayout();
      },
      watch: {
        days: function (newDays, oldDays) {

          if (String(newDays[0]) == '0' ) {
            newDays=oldDays
          }
          if (newDays <= this.maxTerm) {
            this.days = newDays
          } else if (newDays.length <= this.maxTermLength) {
            this.days = this.maxTerm
            this.showAnsverDays = true
          } else {
            this.days = Number(String(newDays).substring(0, this.maxTermLength))
            this.showAnsverDays = true
          }

          this.heandSum = Math.round(this.GoldProbes * this.weight)
          if (this.days <= 30) {
            for (let i = 0; i < this.rates.length; i++) {
              if (this.rates[i].key == 'Stavka30') {
                this.bet = this.rates[i].value
                break
              }
            }
            this.returndeSum = Math.round(this.heandSum * (1 + Number(this.bet) * this.days / 100))
          }
          if (this.days > 30) {
            for (let i = 0; i < this.rates.length; i++) {
              if (this.rates[i].key == 'Stavka30Plus') {
                this.betPlus = this.rates[i].value
              } else if (this.rates[i].key == 'Stavka30') {
                this.bet = this.rates[i].value
              }
            }
            this.returndeSum = Math.round(this.heandSum * (1 + Number(this.bet) * 30 / 100 + Number(this.betPlus) * (
              this.days - 30) / 100))
          }
        },
        weight: function (newWeight, oldWeight) {
          if (String(newWeight[0]) == '0' ) {
            this.weight=oldWeight
          }

          if (newWeight == parseFloat(newWeight).toFixed(3)) {
            this.weight = oldWeight
          }
          if (Number(newWeight) > this.maxWeight) {
            this.showAnsver = true
            this.weight = oldWeight
          }
          this.heandSum = Math.round(this.GoldProbes * this.weight)
          if (this.days <= 30) {
            for (let i = 0; i < this.rates.length; i++) {
              if (this.rates[i].key == 'Stavka30') {
                this.bet = this.rates[i].value
                break
              }
            }
            this.returndeSum = Math.round(this.heandSum * (1 + Number(this.bet) * this.days / 100))
          }
          if (this.days > 30) {
            for (let i = 0; i < this.rates.length; i++) {
              if (this.rates[i].key == 'Stavka30plus') {
                this.betPlus = this.rates[i].value
              }
              if (this.rates[i].key == 'Stavka30') {
                this.bet = this.rates[i].value
                break
              }
            }
            this.returndeSum = Math.round(this.heandSum * (1 + Number(this.bet) * 30 / 100 + Number(this.betPlus) * (
              this.days - 30) / 100))
          }

        },
        GoldProbes: function (newProbe, oldProbe) {
          this.heandSum = Math.round(this.GoldProbes * this.weight)
          if (this.days <= 30) {
            for (let i = 0; i < this.rates.length; i++) {
              if (this.rates[i].key == 'Stavka30') {
                this.bet = this.rates[i].value
                break
              }
            }
            this.returndeSum = Math.round(this.heandSum * (1 + Number(this.bet) * this.days / 100))
          }
          if (this.days > 30) {
            for (let i = 0; i < this.rates.length; i++) {
              if (this.rates[i].key == 'Stavka30plus') {
                this.betPlus = this.rates[i].value
              }
              if (this.rates[i].key == 'Stavka30') {
                this.bet = this.rates[i].value
                break
              }
            }
            this.returndeSum = Math.round(this.heandSum * (1 + Number(this.bet) * 30 / 100 + Number(this.betPlus) * (
              this.days - 30) / 100))
          }
        }
      },
      methods: {
        getLayout () {
          this.$axios.get('/layout-data')
          .then((response) => {
            let $response = response.data
            if ($response.code === 0) {
              console.log($response)
            } else {
              setTimeout(()=>{
                this.defaultDays = Number($response.data.default_term.value)
              },100);
              setTimeout(()=>{
                this.days = this.defaultDays
              },500);

              this.maxTerm = Number($response.data.max_term.value)
              this.maxTermLength = Number($response.data.max_term.value.length)

              this.maxWeight = Number($response.data.max_weight.value)

              this.rates = $response.data.rates
              this.title_page = $response.data.menus[1].title_page
              this.description_page = $response.data.menus[1].description
              this.opengraph_image = $response.data.menus[1].opengraph_image

              this.probes = $response.data.probes
              this.GoldProbes = $response.data.probes[0].value
              this.postedPrice
              for (let i = 0; i < this.probes.length; i++) {
                if (this.probes[i].key == 'AU999') {
                  let obj = {}
                  obj.title = 'AU 999'
                  obj.value = this.probes[i].value
                  this.postedPrice.push(obj)
                } else if (this.probes[i].key == 'AU750') {
                  let obj = {}
                  obj.title = 'AU 750'
                  obj.value = this.probes[i].value
                  this.postedPrice.push(obj)
                } else
                if (this.probes[i].key == 'AU585') {
                  let obj = {}
                  obj.title = 'AU 585'
                  obj.value = this.probes[i].value
                  this.postedPrice.push(obj)
                  this.GoldProbes = this.probes[i].value
                  this.banners = $response.data.banners
                  this.scroll = $response.data.autoscrolling
                  this.slickOptions.autoplaySpeed = $response.data.autoscrolling.value
                  this.socials = $response.data.social
                }
              }
            }
          }).catch((e) => console.log(e))
        },
        getkeyDays(evt) {
          evt = (evt) ? evt : window.event;
          var charCode = (evt.which) ? evt.which : evt.keyCode;
          if ( (this.days.length == 0 && charCode == 48) || (charCode == 96 && this.days.length == 0)) {
            evt.preventDefault()
          }
          if (charCode == 46 || charCode == 8 && this.showAnsverDays == true) {
            this.showAnsverDays = false
          }
          if (charCode == 190) {
            evt.preventDefault();
          }
          if (charCode == 188) {
            evt.preventDefault();
          }
          if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
            if (charCode >= 96 && charCode <= 105) {

            }else{
              evt.preventDefault();
            }
          }
        },
        saveEdit(e) {
          this.showAnsver = false
        },
        saveEditDays(e) {
          this.showAnsverDays = false
        },
        retFunc() {
          this.days = this.maxTerm
        },
        lastNum(oldDays) {
          this.days = oldDays
        },
        getAnsver() {
          if (this.weight.length > 0) {
            this.showAnsver = false
          } else {
            this.showAnsver = true
          }
        },
        getAnsverDays() {
          if (this.days.length > 0) {
            this.showAnsverDays = false
          }
          else {
            this.showAnsverDays = true
          }
        },
        nicePrice(money) {
          var nice = String(money).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ");
          return nice
        },
        getkey(evt) {
          evt = (evt) ? evt : window.event;
          var charCode = (evt.which) ? evt.which : evt.keyCode;
          if ( (this.weight.length == 0 && charCode == 48) || (charCode == 96 && this.weight.length == 0)) {
            evt.preventDefault()
          }
          if (charCode == 46 || charCode == 8 && this.showAnsver == true) {
            this.showAnsver = false
          }
          if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 190 && charCode !== 188 && charCode != 110) {
            if (charCode >= 96 && charCode <= 105) {

            }else{
              evt.preventDefault();
            }
          } else {
            if (charCode == 188 || charCode == 190 || charCode ==110) {
              evt.preventDefault()
              if (this.weight.length == 0) {
                evt.preventDefault()
              }
              if (this.weight.split(".").length < 2 && this.weight.length != 0) {
                this.weight = this.weight + "."
              }
            } else {
              return true;
            }
          }
        }
      }
    }
  </script>

  <style scoped>

</style>
