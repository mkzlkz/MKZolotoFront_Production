<template>
  <div class="createPlan padding-30">
    <div class="title">
      <router-link to="/admin/retake"><img :src="require('@/assets/img/icon/back.svg')" alt="" class="img"></router-link>
      {{ $t('change_retake') }}
    </div>
    <div class="bg-white createPlan-form">
      <div class="form">
        <div class="form-1">
          <span>{{ $t('personnel_number') }}</span>
          <input type="text" :placeholder="$t('personnel_number')" v-model="tabel" @change="getUserByTabel">
        </div>
        <div class="form-1">
          <span>{{ $t('fio_small') }}</span>
          <input type="text" :placeholder="$t('fio_small')" v-model="user.Fullname" readonly>
        </div>
        <div class="form-1">
          <span>{{ $t('nomination_test') }}</span>
          <select name="tests" v-model="TestID">
            <option v-for="(test, index) in tests" :key="index" :value="test.ID">{{test.Test}}</option>
          </select>
        </div>
        <div class="form-1">
          <span>{{ $t('plan') }}</span>
          <input type="text" :placeholder="$t('plan')" v-model="user.Department" readonly>
        </div>
        <div class="form-1">
          <span>{{ $t('position') }}</span>
          <input type="text" :placeholder="$t('position')" v-model="user.Duty" readonly>
        </div>
        <div class="form-1">
          <span>{{ $t('retake_date') }}</span>
          <date-picker v-model="value1" :lang="lang" format="DD.MM.YYYY" placeholder="08.08.2019"></date-picker>
        </div>
        <div class="form-1 cal-time">
          <span>{{ $t('retake_time') }}</span>
          <date-picker v-model="value2" :lang="lang" type="time" format="HH:mm" placeholder="15:00"></date-picker>
        </div>
        <button class="button-blue" @click="editRetake">{{ $t('update') }}</button>
        <small class="text-danger" v-if="error">{{error}}</small>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import moment from 'moment'
export default {
  name: 'EditRetake',
  components: {DatePicker},
  data () {
    return {
      id: this.$route.params.id,
      value1: '',
      value2: '',
      tabel: '',
      error: '',
      tests: [],
      TestID: '',
      retake: null,
      user: {
        Fullname: '',
        Department: '',
        Duty: ''
      }
    }
  },
  mounted () {
    this.getRetake()
    this.getTests()
  },
  computed: {
    beginTime () {
      return moment(this.value1).format('YYYY-MM-DD') + 'T' + moment(this.value2).format('HH:mm:ss') + '+06:00'
    },
    lang () {
      const locale = localStorage.getItem('i18n')
      return locale || 'ru'
    }
  },
  methods: {
    getUserByTabel () {
      this.$axios.get(this.$axios.baseURL + '/api/retake/getuser?tabel=' + this.tabel)
        .then(response => {
          this.user = response.data.exam
        })
    },
    getRetake () {
      this.$axios.get(this.$axios.baseURL + '/api/retake/get?id=' + this.id)
        .then(response => {
          this.retake = response.data.exam[0]
          this.value1 = this.retake.Date
          this.value2 = this.retake.Date
          this.user = this.retake.User
          this.TestID = this.retake.Test.ID
        })
    },
    getTests () {
      this.$axios.get(this.$axios.baseURL + '/api/exam/gettests')
        .then(response => {
          this.tests = response.data.data
        })
    },
    editRetake () {
      let data = {
        UserID: parseInt(this.user.ID),
        TestID: this.TestID,
        Date: this.beginTime
      }
      this.$axios.put(this.$axios.baseURL + '/api/retake/update/id:' + this.id, data)
        .then(response => {
          if (response.data.status) {
            this.$router.push('/admin/retake')
          } else {
            this.error = response.data.message
          }
        })
    }
  }
}
</script>
