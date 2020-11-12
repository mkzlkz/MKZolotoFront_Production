<template>
  <div class="webinarAdmin padding-30">
    <div class="title">Вебинар</div>
    <div class="table-responsive">
      <table class="table table-main table-admin">
        <tr>
          <th class="width-1">{{ $t('nomination_webinar') }}</th>
          <th class="width-2">{{ $t('theme') }}</th>
          <th class="width-3">{{ $t('nomination_theme') }}</th>
          <th class="width-4">{{ $t('fio_small') }}</th>
          <th class="width-5">{{ $t('start_date') }}</th>
          <th class="width-6"></th>
        </tr>
        <tr v-for="(webinar, index) in webinars" :key="index">
          <td class="width-1">{{webinar.Webinarname}}</td>
          <td class="width-2">{{webinar.Planname}}</td>
          <td class="width-3">{{webinar.Topicname}}</td>
          <td class="width-4">{{webinar.Teacher}}</td>
          <td class="width-5">{{webinar.Startdate | momentDate}}</td>
          <td class="width-6">
            <span v-if="webinar.Status === 'Ожидается'">{{ $t('webinar_started_through') }} {{timeToStart(webinar)}}</span>
            <button v-if="webinar.Status === 'В процессе'" class="button-blue" @click="startWebinar(webinar.ID)">{{ $t('start') }}</button>
            <button v-if="webinar.Status === 'Завершен'" class="button-blue-grey">{{ $t('completed') }}</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>


<script>
import moment from 'moment'
export default {
  name: 'WebinarAdmin',
  data () {
    return {
      webinars: [],
      now: moment()
    }
  },
  filters: {
    momentDate (date) {
      let q = moment(date)
      return q.format('DD.MM.YY') + ' | ' + q.format('HH:mm')
    }
  },
  mounted () {
    this.getWebinars()
  },
  methods: {
    getWebinars () {
      this.$axios.get(this.$axios.baseURL + '/api/web/teacherweb')
        .then(response => {
          this.webinars = response.data.data
        })
    },
    startWebinar (id) {
      this.$axios.post(this.$axios.baseURL + '/api/web/startweb', {WebID: id})
        .then(response => {
          this.$router.push('/admin/start-webinar/' + id)
        })
    },
    timeToStart (webinar) {
      let date = moment(webinar.Startdate).subtract(30, 'minutes')
      let diff = date.diff(this.now, 'seconds')
      return this.timeFormatted(diff)
    },
    timeFormatted (time) {
      let result = ''
      let h = Math.floor(time / 3600)
      h = h < 10 ? '0' + h : h
      let m = Math.floor((time - h * 3600) / 60)
      m = m < 10 ? '0' + m : m
      let s = (time - h * 3600 - m * 60)
      s = s < 10 ? '0' + s : s
      result += h ? h + ':' : ''
      result += m ? m + ':' : ''
      result += s
      return result
    }
  },
  created () {
    setInterval(() => this.now = moment(), 1000)
  }
}
</script>
