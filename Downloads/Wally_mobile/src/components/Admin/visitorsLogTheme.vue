<template>
  <div class="visitorsLogTheme padding-30">
    <div class="title-flex">
      <div class="title">
        <router-link :to="'/admin/visitors-log'"><img :src="require('@/assets/img/icon/back.svg')" alt=""
                                                                       class="img">
        </router-link>
        {{topic.Name}}
      </div>
      <a href="" download="" class="button-blue"><img :src="require('@/assets/img/icon/plus.svg')" alt="">{{ $t('download_excel') }}</a>
    </div>
    <div class="table-responsive">
      <table class="table table-main">
        <tr>
          <th>ID</th>
          <th>{{ $t('FIO_long') }}</th>
          <th>{{ $t('plan') }}</th>
          <th>{{ $t('position') }}</th>
          <th>{{ $t('iin') }}</th>
          <th>{{ $t('time_sheet') }}</th>
          <th v-html="$t('auth_date')"></th>
          <th>{{ $t('webinar') }}</th>
          <th>{{ $tc('test', 0) }}</th>
          <th></th>
        </tr>
        <tr v-for="(theme, index) in  themes" :key="index">
          <td>{{theme.ID}}</td>
          <td>{{theme.Fullname}}</td>
          <td>{{theme.Department}}</td>
          <td>{{theme.Duty}}</td>
          <td>{{theme.IIN}}</td>
          <td>{{theme.Tabel}}</td>
          <td>{{theme.Date | momentDate}} <br> {{theme.Date | momentTime}}</td>
          <td>
            <img v-if="theme.WebStatus" :src="require('@/assets/img/icon/suc.svg')" alt="">
            <img v-if="!theme.WebStatus" :src="require('@/assets/img/icon/denied.svg')" alt="">
          </td>
          <td>
            40/40
            <router-link tag="button" :to="'/admin/visitors-log-user/' + theme.ID + '/' + id" v-if="theme.IsManyTest" class="next"><i class="fa fa-chevron-right" aria-hidden="true"></i></router-link>
          </td>
          <td>
            <div class="dropdown calendar">
              <button v-if="!theme.IsManyTest" class="dropdown-toggle button-blue-purple" data-toggle="dropdown" data-boundary="window"
                      aria-haspopup="true" aria-expanded="false" @click="activeStudent = theme">{{ $t('retake') }}
              </button>
              <router-link :to="'/admin/visitors-log-user/' + theme.ID + '/' + id" v-if="theme.IsManyTest" tag="button" class="button-blue-purple">
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
                <button class="button-blue" @click="setRetake(theme)">{{ $t('assign') }}</button>
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
  name: 'visitorsLogTheme',
  components: {DatePicker},
  data () {
    return {
      value1: '',
      value2: '',
      themes: [],
      id: this.$route.params.id,
      activeStudent: null,
      error: null,
      success: null,
      topic: null
    }
  },
  filters: {
    momentDate (date) {
      let q = moment(date)
      return q.format('DD.MM.YY')
    },
    momentTime (date) {
      let q = moment(date)
      return q.format('HH:mm')
    }
  },
  mounted () {
    $('.dropdown-menu').click(function (e) {
      e.stopPropagation()
    })
    this.getVisitorsLogThemes()
    this.getTheme()
  },
  methods: {
    getVisitorsLogThemes () {
      this.$axios.get(this.$axios.baseURL + '/api/attendance/topicattend?id=' + this.id)
        .then(response => {
          this.themes = response.data.data
        })
    },
    setRetake (theme) {
      this.error = null
      this.success = null
      let data = {
        UserID: this.activeStudent.ID,
        TestID: this.activeStudent.Tests[0].ID,
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
    },
    getTheme () {
      this.$axios.get(this.$axios.baseURL + '/api/subject/gettopic/' + this.id)
        .then(response => {
          this.topic = response.data.data
        })
    }
  }
}
</script>
