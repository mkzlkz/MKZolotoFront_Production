<template>
    <div class="container production">
        <div id="accordion" v-for="(webinar, index) in webinars" :key="webinar.ID">
            <div class="card production-card">
                <a class="btn card-link collapsed link-1" data-toggle="collapse" :href="'#collapseOne' + index">
                    {{webinar.Webinarname}}
                </a>
                <div :id="'collapseOne' + index" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                        <div class="card-content">
                            <div class="card-inside">
                                <p class="card-text">Наименование плана</p>
                                <p class="card-subtext">{{webinar.Planname}}</p>
                                <p class="card-text">Наименование темы</p>
                                <p class="card-subtext">{{webinar.Topicname}}</p>
                                <p class="card-text">Дата начала</p>
                                <p class="card-subtext">{{webinar.Startdate | formatDate3}}</p>
                               <!--  <button class="btn btn-start" v-if="current_date>webinar.EndDate">Начать</button>
                                <button class="btn btn-start" v-if="current_date<=webinar.EndDate">Завершен</button> -->
                                <span style="font-size: 14px;" v-if="webinar.Status === 'Ожидается'">{{ $t('webinar_started_through') }} {{timeToStart(webinar)}}</span>
            <button v-if="webinar.Status === 'В процессе'" class="btn btn-start" @click="startWebinar(webinar.ID)">{{ $t('start') }}</button>
            <button v-if="webinar.Status === 'Завершен'" class="btn btn-start" style="background: #5E6C84;">{{ $t('completed') }}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
export default {
    name: 'WebinarsInstructor',
    data () {
        return {
            webinars: [],
            current_date: '',
            now: moment()
        }
    },
    mounted () {
        this.getWebinars()
        this.getDate ()
    },
    created () {
    setInterval(() => this.now = moment(), 1000)
  },
      filters: {
    momentDate (date) {
      let q = moment(date)
      return q.format('DD.MM.YY') + ' | ' + q.format('HH:mm')
    }
  },
    methods: {
        getWebinars () { //вывод листа вебинаров
            this.$axios.get(this.$axios.baseURL + '/api/web/teacherweb')
            .then(response => {
                this.webinars = response.data.data
            })
        },
        getDate () { //нынешняя дата для сравнения с датой окончания вебинара
            this.current_date = new Date().toLocaleString()
        },
            startWebinar (id) {
      this.$axios.post(this.$axios.baseURL + '/api/web/startweb', {WebID: id})
        .then(response => {
          this.$router.push('/webinar-start/' + id)
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
    }
}
</script>