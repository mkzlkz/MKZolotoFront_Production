<template>
  <div>
    <plan-education></plan-education>
    <tests></tests>
    <webinars></webinars>
    <!--<scorm-package></scorm-package>-->
    <div v-if="false" class="plan-education exam-tests padding-0-10-30">
      <div class="dflex-link">
        <div class="title">VR</div>
        <div class="link">
          <router-link to="/user/vr">{{ $t('all_name', { name: `VR ${$t('materials')}` }) }}</router-link>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-main">
          <tr>
            <th>{{ $t('date') }}</th>
            <th>{{ $t('time') }}</th>
            <th>{{ $t('nomination') }}</th>
            <th>{{ $t('theme') }}</th>
            <th>{{ $t('duration') }}</th>
            <th>{{ $t('status') }}</th>
            <th colspan="2"></th>
          </tr>

          <tr class="border">
            <td>08.03.19</td>
            <td>19:00</td>
            <td>{{ $t('nomination_package') }}</td>
            <td>Тема №1</td>
            <td>120мин</td>
            <td><span class="pink">Не пройден</span></td>
            <td>
              <button class="button-blue">Запустить</button>
            </td>
          </tr>
          <tr class="border">
            <td>08.03.19</td>
            <td>19:00</td>
            <td>Наименование пакета</td>
            <td>Тема №1</td>
            <td>120мин</td>
            <td><span class="blue">Ожидается</span></td>
            <td></td>
          </tr>
          <tr class="border">
            <td>08.03.19</td>
            <td>19:00</td>
            <td>Наименование пакета</td>
            <td>Тема №1</td>
            <td>120мин</td>
            <td><span class="blue">Ожидается</span></td>
            <td></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Webinars from './Webinars'
import planEducation from './planEducation'
import Tests from './Tests'
import ScormPackage from './scormPackage'
export default {
  name: 'Main',
  data () {
    return {
      opened: [],
      user: null,
      userInfo: null,
      plans: [],
      plan: null,
      themes: null,
      tests: [],
      totalHours: 0,
      types: [],
      rows: [
        {
          id: 1,
          title: 'Производственное',
          hours: 0,
          percent: 0,
          themes: []
        },
        {
          id: 2,
          title: 'Теоретическое',
          hours: 0,
          percent: 0,
          themes: []
        },
        {
          id: 3,
          title: 'Экзамен',
          hours: 0,
          percent: 0
        }
      ]
    }
  },
  components: {ScormPackage, planEducation, Webinars, Tests},
  filters: {
    momentDate (date) {
      let q = moment(date)
      return q.format('DD.MM.YY')
    },
    momentTime (date) {
      let q = moment(date)
      return q.format('HH:mm')
    },
    duration (time) {
      let r = ''
      let h = 0
      if (time >= 60) {
        h = time / 60
        r += (time / 60) + 'ч'
      }
      let m = time - h * 60
      if (m) {
        r += time - h * 60 + 'м'
      }
      return r
    }
  },
  computed: {
    currentWebinars () {
      return this.webinars.filter(w => w.Status === 'В процессе')
    },
    pastWebinars () {
      return this.webinars.filter(w => w.Status === 'Завершен')
    },
    futureWebinars () {
      return this.webinars.filter(w => w.Status === 'Ожидается')
    }
  },
  mounted () {
    this.getThemeTypes()
    this.getUser()
    this.getThemes()
    this.getTests()
    this.getWebinars()
  },
  methods: {
    toggle (id) {
      const index = this.opened.indexOf(id)
      if (index > -1) {
        this.opened.splice(index, 1)
      } else {
        this.opened.push(id)
      }
    },
    getTests () {
      this.$axios.get(this.$axios.baseURL + '/api/exam/user/test')
        .then(response => {
          this.tests = response.data.data
        })
    },
    getWebinars () {
      this.$axios.get(this.$axios.baseURL + '/api/web/getuserweb')
        .then(response => {
          this.webinars = response.data.data
        })
    },
    getUser () {
      this.user = JSON.parse(localStorage.getItem('user'))
      this.$axios.get(this.$axios.baseURL + '/api/userinfo')
        .then(response => {
          this.userInfo = response.data.data
          this.plan = this.userInfo.Plans[0]
          this.getThemes()
        })
    },
    getThemes () {
      this.$axios.get(this.$axios.baseURL + '/api/subject/plantopics')
        .then(response => {
          this.themes = response.data.data
          this.sortThemes(this.themes)
          this.sortStatistic(response.data.statistic)
        })
    },
    routerPage () {
      location.replace('/user/webinar-view')
    },
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

      return result * 100 / test.Questions
    },
    isTestAvailableTime (test) {
      let testDate = moment(test.Date)
      let now = moment()
      let diffStart = now.diff(testDate, 'minutes')
      let testEnd = testDate.add(parseInt(test.Duration), 'm')
      let diffEnd = testEnd.diff(now, 'minutes')
      return diffStart > 0 && diffEnd > 0
    },
    getThemeTypes () {
      this.$axios.get(this.$axios.baseURL + '/api/gettopictype')
        .then(response => {
          this.types = response.data.data
        })
    },
    sortThemes (themes) {
      for (let theme of themes) {
        if (theme.TypeID === 9) {
          this.rows[0].themes.push(theme)
        } else if (theme.TypeID === 10) {
          this.rows[1].themes.push(theme)
        }
      }
    },
    sortStatistic (statistic) {
      for (let stat of statistic) {
        if (stat.Typeid === 9) {
          this.rows[0].hours = stat.Hour
          this.rows[0].percent = Math.round(stat.Percent * 10) / 10
        } else if (stat.Typeid === 10) {
          this.rows[1].hours = stat.Hour
          this.rows[1].percent = Math.round(stat.Percent * 10) / 10
        }
      }
    }
  }
}
</script>
