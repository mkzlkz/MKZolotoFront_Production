<template>
  <div class="plan-education padding-30">
    <div class="title">{{ $t('educationPlan') }}</div>
    <div class="bg-white padding-20">
      <div class="table-responsive" v-if="plan">
        <table class="table box-1">
          <tr>
            <th>{{ $t('planName') }}</th>
            <th>{{ $t('verification_method') }}</th>
            <th>{{ $t('subdivision') }}</th>
<!--            <th>{{ //('certificate') }}</th>-->
            <th>{{ $t('professions_list') }}</th>
          </tr>
          <tr>
            <td><span v-if="plan">{{plan.Name}}</span></td>
            <td>{{ $t('exam') }}</td>
            <td><span v-if="userInfo">{{userInfo.Position.Name}}</span></td>
<!--            <td>-->
<!--              <a :href="axios.baseOriginURL + '/docs/file-516990876.jpeg'"-->
<!--                 download-->
<!--                 target="_blank"-->
<!--                 class="button-blue"-->
<!--                 v-if="plan && plan.CertificateID && !isExamPassed"-->
<!--              >{{ $t('download') }}</a>-->
<!--            </td>-->
            <td><span v-if="plan">{{plan.Duty.join(',')}}</span></td>
          </tr>
        </table>
      </div>
      <loader v-if="!plan"/>
    </div>
    <div class="box-2">
      <div class="table-responsive">
        <table class="table table1">
          <tr>
            <th class="width-1">#</th>
            <th class="width-2">{{ $t('education_type') }}</th>
            <th class="width-3">{{ $tc('hour', 5) }}</th>
            <th class="width-4">% {{ $t('walkthrough') }}</th>
            <th class="width-5"></th>
          </tr>
        </table>
      </div>
      <div class="table-content" v-for="(row, index) in rows" :key="index">
        <div class="table-responsive">
          <table class="table table2">
            <tr>
              <td class="width-1">{{row.id}}</td>
              <td class="width-2">{{row.title}}</td>
              <td class="width-3">{{row.hours}}</td>
              <td class="width-4" v-html="row.percent ? row.percent + '%' : '-'">{{row.percent}}%</td>
              <td class="width-5">
                <button class="button-blue" v-if="row.id !== 3" @click="toggle(row.id)" :class="{ opened: opened.includes(row.id) }">
                  {{ $t('thematic_plan') }}
                </button>
                <router-link tag="button" to="/user/tests" class="button-blue" v-if="row.id === 3">{{ $t('more') }}</router-link>
              </td>
            </tr>
          </table>
        </div>
        <div class="table3" v-if="opened.includes(row.id)">
          <div class="table-responsive">
            <table class="table">
              <tr>
                <th class="width-1a">#</th>
                <th class="width-2a">{{ $t('themeName') }}</th>
                <th class="width-3a">{{ $tc('hour', 5) }}</th>
                <th class="width-4a">{{ $t('date') }}</th>
                <th class="width-5a">{{ $t('time') }}</th>
                <th class="width-6a">{{ $t('check_type') }}</th>
                <th class="width-7a">{{ $t('education_type_1') }}</th>
                <th class="width-8a">{{ $t('status') }}</th>
                <th class="width-9a"></th>
                <th class="width-10a"></th>
              </tr>
              <tr v-for="(theme, index) in  row.themes" :key="index">
                <td class="width-1a"><span class="number">{{theme.ID}}</span></td>
                <td class="width-2a">{{theme.Topic}}</td>
                <td class="width-3a">{{theme.Studyhour}}ч</td>
                <td class="width-4a">{{theme.Date | momentDate}}</td>
                <td class="width-5a">{{theme.Date | momentTime}}</td>
                <td class="width-6a">Тест</td>
                <td class="width-7a">{{getEduType(theme.EduType)}}</td>
                <td class="width-8a"><img :src="require('@/assets/img/icon/suc.svg')" alt=""></td>
                <td class="width-9a">
                  <div class="dropdown">
                    <button class="dropdown-toggle button-blue-purple" data-toggle="dropdown" data-boundary="window"
                            aria-haspopup="true" aria-expanded="false">{{ $t('about_theme') }}
                    </button>
                    <div class="dropdown-menu dropdown-menu-right">
                      <button type="button" class="close" aria-hidden="true">x</button>
                      <div class="title-d">{{ $t('theme_info') }}</div>
                      <table>
                        <tr>
                          <th>{{ $t('planName') }}</th>
                          <th>{{ $t('lesson_type') }}</th>
                          <th>{{ $t('lesson_plan') }}</th>
                        </tr>
                        <tr>
                          <td>{{plan.Name}}</td>
                          <td>{{theme.TextOne}}</td>
                          <td>{{theme.TextTwo}}</td>
                        </tr>
                        <tr>
                          <th>{{ $t('outline') }}</th>
                          <th>{{ $t('benefits') }}</th>
                          <th>{{ $t('equipment') }}</th>
                        </tr>
                        <tr>
                          <td>{{theme.TextThree}}</td>
                          <td>{{theme.Thematic}}</td>
                          <td>{{theme.TextOne}}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </td>
                <td class="width-10a">
                  <div class="dropdown" v-if="theme.Tests">
                    <button class="dropdown-toggle button-blue-purple" data-toggle="dropdown" data-boundary="window"
                            aria-haspopup="true" aria-expanded="false">{{ $t('about_test') }}
                    </button>
                    <div class="dropdown-menu dropdown-menu-right">
                      <button type="button" class="close" aria-hidden="true">x</button>
                      <div class="title-d">{{ $t('test_info') }}</div>
                      <table>
                        <tr>
                          <th>{{ $t('nomination') }}</th>
                          <th>{{ $t('conditions_passage') }}</th>
                          <th>{{ $t('duration_1') }}</th>
                        </tr>
                        <tr>
                          <td>{{theme.Tests.Name}}</td>
                          <td>>{{theme.Tests.PassMarks}}%</td>
                          <td>{{theme.Tests.Duration | duration}}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table1 table4">
          <tr>
            <th class="width-1"></th>
            <th class="width-2">Итого</th>
            <th class="width-3">{{rows[0].hours + rows[1].hours}}ч</th>
            <th class="width-4">{{(rows[0].percent + rows[1].percent)/2}}%</th>
            <th class="width-5"></th>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'planEducation',
  components: {
    loader: () => import('../Template/Loader')
  },
  data () {
    return {
      opened: [],
      user: {},
      userInfo: null,
      plans: [],
      plan: null,
      themes: null,
      totalHours: 0,
      types: [],
      tests: [],
      eduTypes: [],
      isExamPassed: false,
      rows: [
        {
          id: 1,
          title: this.$t('industrial'),
          hours: 0,
          percent: 0,
          themes: []
        },
        {
          id: 2,
          title: this.$t('theoretical'),
          hours: 0,
          percent: 0,
          themes: []
        },
        {
          id: 3,
          title: this.$t('exam'),
          hours: '-',
          percent: 0
        }
      ]
    }
  },
  mounted () {
    this.getEduTypes()
    this.getThemeTypes()
    this.getUser()
  },
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
  methods: {
    toggle (id) {
      const index = this.opened.indexOf(id)
      if (index > -1) {
        this.opened.splice(index, 1)
      } else {
        this.opened.push(id)
      }
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
          let exam = response.data.exam
          this.themes = response.data.data
          this.sortThemes(this.themes)
          this.sortStatistic(response.data.statistic)
          this.rows[2].percent = exam.PassMarks
          if (exam.PassMarks) {
            this.isExamPassed = true
          }
        })
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
    },
    getEduTypes () {
      this.$axios.get(this.$axios.baseURL + '/api/gettopicedutype')
        .then(response => {
          this.eduTypes = response.data.data
        })
    },
    getEduType (id) {
      if (id === 11) {
        return this.eduTypes[0].Name
      } else if (id === 12) {
        return this.eduTypes[1].Name
      } else {
        return this.eduTypes[2].Name
      }
    }
  }
}
</script>
