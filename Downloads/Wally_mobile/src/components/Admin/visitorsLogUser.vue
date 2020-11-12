<template>
  <div class="visitorsLogTheme padding-30">
    <div class="title">
      <router-link :to="'/admin/visitors-log-theme/' + themeId"><img :src="require('@/assets/img/icon/back.svg')" alt=""
                                                                     class="img">
      </router-link>
      {{fullName}}
    </div>
    <div class="table-responsive">
      <table class="table table-main">
        <tr>
          <th>{{ $t('nomination_test') }}</th>
          <th>{{ $t('nomination_theme') }}</th>
          <th>{{ $t('duration_1') }}</th>
          <th>{{ $tc('question', 5) }}</th>
          <th>{{ $t('status') }}</th>
          <th colspan="2">{{ $t('results') }}</th>
        </tr>
        <tr class="border" v-for="(test, index) in tests" :key="index">
          <td>{{test.Test}}</td>
          <td>{{test.Topic}}</td>
          <td>{{test.Duration}} мин</td>
          <td>{{test.Questions}}</td>
          <td><span :class="getStatusClass(test.Status)">{{test.Status}}</span></td>
          <td v-if="test.Status !== 'Ожидается'">
            <span class="result-text">{{ $t('result') }} {{testResult(test)}}%</span>
            <span class="result">
                <span class="green">+{{test.Result}}</span>
                <span class="purple">/</span>
                <span class="pink">-{{test.Questions - parseInt(test.Result)}}</span>
              </span>
          </td>
          <td>
            <div class="dropdown calendar">
              <button v-if="!test.IsManyTest" class="dropdown-toggle button-blue-purple" data-toggle="dropdown" data-boundary="window"
                      aria-haspopup="true" aria-expanded="false" @click="activeTest = test">{{ $t('retake') }}
              </button>
              <router-link :to="'/admin/visitors-log-user/' + test.ID + '/' + id" v-if="test.IsManyTest" tag="button" class="button-blue-purple">
                {{ $t('more') }}</router-link>
              <div class="dropdown-menu dropdown-menu-right">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
                <div class="title-d">{{ $t('assign_retake') }}</div>
                <div class="calen">
                  <div class="cal"><span>{{ $t('date') }}</span>
                    <date-picker v-model="value1" lang="ru" format="DD.MM.YYYY"
                                 placeholder="08.08.2019"></date-picker>
                  </div>
                  <div class="cal cal-time"><span>{{ $t('time') }}</span>
                    <date-picker v-model="value2" lang="ru" type="time" format="HH:mm"
                                 placeholder="15:00" :show-second="false"></date-picker>
                  </div>
                </div>
                <button class="button-blue" @click="setRetake(test)">{{ $t('assign') }}</button>
                <small class="text-danger" v-if="error">{{error}}</small>
                <small class="text-success" v-if="success">{{success}}</small>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import moment from 'moment'
export default {
  name: 'visitorsLogUser',
  components: {DatePicker},
  data () {
    return {
      value1: '',
      value2: '',
      userId: this.$route.params.id,
      themeId: this.$route.params.themeId,
      tests: [],
      fullName: null,
      activeTest: null,
      error: null,
      success: null
    }
  },
  mounted () {
    $('.dropdown-menu').click(function (e) {
      e.stopPropagation()
    })
    this.getUser()
    this.getUserTestsByTheme()
  },
  methods: {
    getUserTestsByTheme () {
      this.$axios.get(this.$axios.baseURL + '/api/attendance/testattend?id=' + this.userId)
        .then(response => {
          this.tests = response.data.data
        })
    },
    getUser () {
      this.$axios.get(this.$axios.baseURL + '/api/user/getuser/' + this.userId)
        .then(response => {
          this.fullName = response.data.data.Fullname
        })
    },
    getStatusClass (status) {
      if (status === 'Ожидается') {
        return 'gray'
      } else if (status === 'Не пройден') {
        return 'red'
      } else {
        return 'green'
      }
    },
    testResult (test) {
      let result = parseInt(test.Result)

      return Math.round(result * 100 / test.Questions)
    },
    setRetake (theme) {
      this.error = null
      this.success = null
      let data = {
        UserID: this.activeTest.ID,
        TestID: this.activeTest.Tests[0].ID,
        Date: moment(this.value1).format('YYYY-MM-DD') + 'T' + moment(this.value2).format('HH:mm:ss') + '+06:00'
      }
      this.$axios.post(this.$axios.baseURL + '/api/retake/new', data)
        .then(response => {
          if (response.data.status) {
            this.success = response.data.message
            this.error = null
          } else {
            this.success = null
            this.error = response.data.message
          }
        })
    }
  }
}
</script>
