<template>
  <div class="createPlan padding-30">
    <div class="title">
      <router-link to="/admin/retake"><img :src="require('@/assets/img/icon/back.svg')" alt="" class="img"></router-link>
      {{ $t('new_retake') }}
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
          <span>{{ $t('subdivision') }}</span>
          <input type="text" :placeholder="$t('subdivision')" v-model="user.Department" readonly>
        </div>
        <div class="form-1">
          <span>{{ $t('position') }}</span>
          <input type="text" :placeholder="$t('position')" v-model="user.Duty" readonly>
        </div>
        <div class="form-1">
          <span>{{ $t('retake_date') }}</span>
          <date-picker v-model="value1" lang="ru" format="DD.MM.YYYY" placeholder="08.08.2019"></date-picker>
        </div>
        <div class="form-1 cal-time">
          <span>{{ $t('retake_time') }}</span>
          <date-picker
            v-model="value2"
            lang="ru" type="time"
            format="HH:mm"
            placeholder="15:00"
            :show-second="false">
          </date-picker>
        </div>
        <Button :text="$t('create')" @click="createRetake" :loading="loading"/>
        <small class="text-danger" v-if="error">{{error}}</small>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import moment from 'moment'
export default {
  name: 'CreateRetake',
  components: {
    DatePicker,
    Button: () => import('../Template/Button')
  },
  data () {
    return {
      value1: '',
      value2: '',
      tabel: '',
      error: '',
      tests: [],
      TestID: '',
      loading: false,
      user: {
        Fullname: '',
        Department: '',
        Duty: ''
      }
    }
  },

  mounted () {
    this.getTests()
  },
  computed: {
    beginTime () {
      return moment(this.value1).format('YYYY-MM-DD') + 'T' + moment(this.value2).format('HH:mm:ss') + '+06:00'
    }
  },
  methods: {
    getUserByTabel () {
      this.$axios.get(this.$axios.baseURL + '/api/retake/getuser?tabel=' + this.tabel)
        .then(response => {
          this.user = response.data.exam
        })
    },
    getTests () {
      this.$axios.get(this.$axios.baseURL + '/api/exam/gettests')
        .then(response => {
          this.tests = response.data.data
          this.TestID = this.tests[0].ID
        })
    },
    createRetake () {
      let data = {
        UserID: parseInt(this.user.ID),
        TestID: this.TestID,
        Date: this.beginTime
      }
      this.loading = true
      this.$axios.post(this.$axios.baseURL + '/api/retake/new', data)
        .then(response => {
          if (response.data.status) {
            this.$router.push('/admin/retake')
          } else {
            this.loading = false
            this.error = response.data.message
          }
        })
    }
  }
}
</script>
