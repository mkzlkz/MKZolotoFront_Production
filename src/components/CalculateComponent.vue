<template>
  <div>
    <banner-component></banner-component>

    <div class="bg-1 tab-pane1">
      <div class="bg-calc">
        <!--<button class="closes"><img :src="require('@/assets/img/close.svg')" alt=""></button>-->
        <!-- <router-link class="closes" :to="{ name: 'Home' }"><img :src="require('@/assets/img/close.svg')" alt=""></router-link> -->
        <div class="tab-text">
          <h1 class="title">Посчитаем?</h1>
          <div class="content_block">
            <div class="calc_block">
              <div class="calc-dflex">
                <div v-for="(pP, index) in  postedPrice" class="df"><span class="df1">{{pP.title}}</span><span class="df2">{{nicePrice(pP.value)}}</span></div>
              </div>
              <form action="" class="calc-form">
                <div class="form-1">
                  <span>Проба золота:</span>
                  <select v-model="GoldProbes" name="" id="">
                    <option v-for="(probe, index) in probes" :key="probe.id" :value="probe.value">{{ probe.key }}
                    </option>
                  </select>
                </div>
                <div class="form-1">
                  <span>Вес золота, грамм:</span>
                  <input type="text" placeholder="0" @blur="saveEdit" @keydown="getkey" ref="inWeight"
                  v-model="weight">
<!-- <input type="text" placeholder="0" @keydown="getkey" ref="inWeight" @focus="getAnsver" @blur="saveEdit"
  v-model="weight"> -->
  <div v-if="showAnsver" class="hint-cl">
    Вес золота не может превышать {{maxWeight}} грамм
  </div>
</div>
<div class="form-1">
  <span>Срок займа, дни:</span>
  <!-- <the-mask v-model="days" @focus="getAnsverDays" @blur="saveEditDays" :masked="true" mask="##" /> -->
<!-- <input type="text" min="0" placeholder="0" @focus="getAnsverDays" @blur="saveEditDays" @keydown="getkeyDays"
  v-model="days"> -->
  <input type="text" min="0" placeholder="0" @blur="saveEditDays" @keydown="getkeyDays"
  v-model="days">
  <div v-if="showAnsverDays && maxTerm && defaultDays && days != 0" class="hint-cl">
    Срок займа не может превышать {{maxTerm}} дней
  </div>

</div>
<div class="line"></div>
<div class="total"><span>Сумма на руки:</span>
  <div class="price"><span>{{nicePrice(heandSum)}}</span><span>₸</span></div>
</div>
<div class="total"><span>Сумма к возврату:</span>
  <div class="price"><span v-if="days">{{nicePrice(returndeSum)}}</span><span v-if="!days">0</span> <span>₸</span></div>
</div>
</form>
</div>
<Social> </Social>
</div>
<div class="box box1" v-if="visible">
  <div class="closes_box closes_box1" @click="visible = !visible"><img :src="require('@/assets/img/close.svg')"
    alt=""></div>
    <img :src="require('@/assets/img/1.png')" alt="" class="img">
  </div>
</div>
</div>
</div>
</div>
</template>
<script>
  import BannerComponent from '@/components/BannerComponent.vue'
  import Social from '@/components/Social.vue'
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
      BannerComponent,
      Social
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
        opengraph_image: ''
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
    created() {
      this.getMaxData();
      this.GetGoldprobes();
      this.getDefaultDate();
    },
    watch: {
      days: function (newDays, oldDays) {

        if (String(newDays[0]) == '0' ) {
          newDays=oldDays
        }
if (newDays <= this.maxTerm) { // Проверяем (сравниваем введеное число и лимит если введеное число меньше иили равно тогда присваеваем  значение ) если число уддовелтворяет нас тогда оно становится тикущем
//  this.showAnsverDays = true
this.days = newDays
} else if (newDays.length <= this.maxTermLength) { //(Проверяем если длина строки меньше или равна длине строки макс значения тогда присваеваем значение максимума)
  this.days = this.maxTerm
  this.showAnsverDays = true
} else {
this.days = Number(String(newDays).substring(0, this.maxTermLength)) // (Если значение не попадает по пред проверки тогда значение обрезается по количеству символов которое задано в макс)
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
// console.log(this.betPlus);

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
// console.log(this.showAnsver, newWeight);
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
// console.log(this.rates);

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
        this.rates = $response.data.rates
        this.title_page = $response.data.menus[1].title_page
        this.description_page = $response.data.menus[1].description
        this.opengraph_image = $response.data.menus[1].opengraph_image
      }
    })
    .catch((e) => console.log(e))
  },
  getkeyDays(evt) {

    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
// console.log(charCode);
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
// if (this.weight < 0) {
//   this.showAnsver = false
// } else if (this.weight == 0) {
//   this.showAnsver = false
// }
this.showAnsver = false
},
saveEditDays(e) {
  this.showAnsverDays = false
// console.log(e);
// if (this.days < 0) {
//   this.showAnsverDays = false
// } else
// if (this.days == 0) {
//   this.showAnsverDays = false
// }
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
// console.log(charCode)
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
//   console.log("2");
}
} else {
  return true;
}
}
},
getDefaultDate() {
  this.$axios.get('/default_term')
  .then(response => {
    setTimeout(()=>{
      this.defaultDays = Number(response.data.value)
    },100);
    setTimeout(()=>{
      this.days = this.defaultDays
    },500);
  })

},
getMaxData() {
  this.$axios.get('/max_term')
  .then(maxTerm => {
    this.maxTerm = Number(maxTerm.data.value)
    this.maxTermLength = Number(maxTerm.data.value.length)
    this.$axios.get('/max_weight')
    .then(maxWeight => {
      this.maxWeight = Number(maxWeight.data.value)

    }).catch((err) => {
      console.log(err);
    })
  }).catch((err) => {
    console.log(err);
  })
},
GetGoldprobes() {
  this.$axios.get('/probes')
  .then((response) => {
    let $response = response.data
    if ($response.code === 0) {
      console.log($response)
    } else {
      this.probes = $response.data
      this.GoldProbes = $response.data[0].value
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
        }
      }
    }
  })
  .catch((e) => console.log(e))
}
}
}

</script>

<style scoped>

</style>
