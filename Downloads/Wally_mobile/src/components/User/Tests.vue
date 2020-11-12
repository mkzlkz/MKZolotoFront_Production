<template>
  <div class="plan-education padding-30">
    <div class="dflex-link">
      <div class="title">{{ $t('exams_and_tests') }}</div>
      <div class="link" v-if="isMainPage">
        <router-link :to="{ name: 'UserTests' }">{{ $t('all_name', { name: $t('exams_and_tests').toLowerCase() }) }}</router-link>
      </div>
    </div>
    <div class="table-responsive" v-if="tests">
      <table class="table table-main">
        <tr>
          <th>{{ $t('date') }}</th>
          <th>{{ $t('time') }}</th>
          <th>{{ $t('nomination_exam') }}</th>
          <th>{{ $t('theme') }}</th>
          <th>{{ $t('description') }}</th>
          <th>{{ $t('duration') }}</th>
          <th>{{ $t('terms') }}</th>
          <th>{{ $tc('question', 5) }}</th>
          <th>{{ $t('status') }}</th>
          <th colspan="2">{{ $t('results') }}</th>
        </tr>
        <tr class="border" v-for="(test, index) in tests" :key="index">
          <td>{{test.Date | momentDate}}</td>
          <td>{{test.Date | momentTime}}</td>
          <td>{{test.Test}}</td>
          <td>{{test.Topic}}</td>
          <td>{{test.Description}}</td>
          <td>{{test.Duration}} {{ $t('min') }}</td>
          <td>>{{test.Passmarks}}%</td>
          <td>{{test.Questions}}</td>
          <td><span :class="statusClass(test)">{{test.Status}}</span></td>
          <td colspan="2" v-if="test.Status === 'Ожидается'">
            <button v-if="1==2 && isTestAvailableTime(test)"
                    class="button-blue"
                    @click="$router.push({name: 'testing', params: {id: test.ID, testInfo: test}})">
              {{ $t('start_testing') }}
            </button>
            <!-- v-if="isTestAvailableTime(test)"-->
          </td>
          <td v-if="test.Status !== 'Ожидается'">
            <span class="result-text">Результат {{testResult(test)}}%</span>
            <span class="result">
                <span class="green">+{{test.Result}}</span>
                <span class="purple">/</span>
                <span class="pink">-{{test.Questions - parseInt(test.Result)}}</span>
              </span>
          </td>
          <td v-if="test.Status !== 'Ожидается'">
            <div class="dropdown">
              <button
                class="dropdown-toggle button-blue-purple"
                data-toggle="dropdown"
                data-boundary="window"
                aria-haspopup="true"
                aria-expanded="false">
                {{ $t('analytic') }}
              </button>
              <div class="dropdown-menu dropdown-menu-right">
                <button type="button" class="close" aria-hidden="true">x</button>
                <div class="title-d">{{ $t('exam_analytic') }}</div>
                <table>
                  <tr>
                    <th>{{ $t('topics_wrong_answers') }}</th>
                    <th>{{ $t('topics_right_answers') }}</th>
                  </tr>
                  <tr v-for="(item, index) in getFormattedAnalytics(test.Analytics)" :key="index">
                    <td v-if="item[0]">{{item[0].Number}} - {{item[0].Name}} - {{item[0].Percent}}%</td>
                    <td v-if="item[1]">{{item[1].Number}} - {{item[1].Name}} - {{item[1].Percent}}%</td>
                  </tr>
                </table>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <loader v-if="!tests" />
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Tests',
  components: {
    loader: () => import('../Template/Loader')
  },
  data () {
    return {
      testsList: null,
      isMainPage: window.location.href.includes('user/main')
    }
  },
  filters: {
    momentDate (date) {
      return moment(date).format('DD.MM.YY')
    },
    momentTime (date) {
      return moment(date).format('HH:mm')
    }
  },
  mounted () {
    this.$axios.get(this.$axios.baseURL + '/api/exam/user/test')
      .then(response => {
        this.testsList = response.data.data
        if (this.isMainPage) {
          this.testsList = this.testsList.slice(0, 2)
        }
      })
  },
  computed: {
    tests () {
      const list = this.testsList
      if (!list) {
        return null
      }
      return list.sort((a, b) => b.ID - a.ID)
    }
  },
  methods: {
    statusClass (test) {
      if (test.Status === 'Ожидается') {
        return 'blue'
      } else if (test.Status === 'Не пройден') {
        return 'pink'
      } else if (test.Status === 'Пересдача') {
        return 'orange'
      } else {
        return 'green'
      }
    },
    testResult (test) {
      let result = parseInt(test.Result)

      return Math.round(result * 100 / test.Questions)
    },
    isTestAvailableTime (test) {
      // let testDate = moment(test.Date)
      // let now = moment()
      // let diffStart = now.diff(testDate, 'minutes')
      // let testEnd = testDate.add(parseInt(test.Duration), 'm')
      // let diffEnd = testEnd.diff(now, 'minutes')
      // return diffStart > 0 && diffEnd > 0
      return ['Ожидается', 'Пересдача'].includes(test.Status)
    },
    getFormattedAnalytics (analytics) {
      let l = analytics.length / 2
      let result = []
      for (let i = 0; i < l; i++) {
        if (i === 0) {
          result[i] = [
            analytics[0],
            analytics[1]
          ]
        } else if (i === 1) {
          result[i] = [
            analytics[2],
            analytics[3]
          ]
        } else {
          result[i] = [
            analytics[(i * 2) - 2],
            analytics[(i * 2) - 1]
          ]
        }
      }
      return result
    },
    getExams () {
      this.$axios.get(this.$axios.baseURL + '/api/exam/getexam')
        .then(response => {
          this.exams = response.data.data
        })
    }
  }
}
</script>
