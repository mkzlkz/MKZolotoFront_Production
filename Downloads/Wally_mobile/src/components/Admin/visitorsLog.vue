<template>
  <div class="Statistics visitorsLog padding-30">
    <div class="title-flex">
      <div class="title">{{ $t('visits_log') }}</div>
      <a href="" download="" class="button-blue"><img :src="require('@/assets/img/icon/plus.svg')" alt="">{{ $t('download_excel') }}</a>
    </div>
    <div class="box-2">
      <div class="table-responsive">
        <table class="table table1">
          <tr>
            <th class="width-1">{{ $t('education_theme') }}</th>
            <th class="width-2">{{ $t('visit') }}</th>
            <th class="width-3"></th>
          </tr>
        </table>
      </div>
      <div class="table-content" v-for="(log, index) in logs" :key="index">
        <div class="table-responsive">
          <table class="table table2">
            <tr>
              <td class="width-1">{{log.Plan.Plan}}</td>
              <td class="width-2">{{log.Status.Passed}}/{{log.Status.Total}}</td>
              <td class="width-3">
                <button class="button-blue-purple" @click="toggle(log.Plan.ID)" :class="{ opened: opened.includes(log.Plan.ID) }">
                  {{ $t('more') }}
                </button>
              </td>
            </tr>
          </table>
        </div>
        <div class="table3" v-if="opened.includes(log.Plan.ID)">
          <div class="table-responsive">
            <table class="table">
              <tr>
                <th class="width-1">#</th>
                <th class="width-2">{{ $t('nomination') }}</th>
                <th class="width-3">{{ $t('type') }}</th>
                <th class="width-4">{{ $t('education_times') }}</th>
                <th class="width-5">{{ $t('date') }}</th>
                <th class="width-6">{{ $t('time') }}</th>
                <th class="width-7">{{ $t('visit') }}</th>
                <th class="width-8"></th>
              </tr>
              <tr v-for="(topic, index) in log.Plan.Topics" :key="index">
                <td class="width-1"><span class="number">{{index+1}}</span></td>
                <td class="width-2">{{topic.Name}}</td>
                <td class="width-3">{{ type(topic.TypeID) }}</td>
                <td class="width-4">{{topic.TotalHour}}ч</td>
                <td class="width-5">{{topic.Date | momentDate}}</td>
                <td class="width-6">{{topic.Date | momentTime}}</td>
                <td class="width-7">{{topic.Attendance.Passed}}/{{topic.Attendance.Total}}</td>
                <td class="width-8">
                  <button class="button-blue-purple" @click="$router.push('/admin/visitors-log-theme/' + topic.ID)">
                    {{ $t('more') }}
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'visitorsLog',
  data () {
    return {
      opened: [],
      logs: [],
      themes: []
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
  methods: {
    type (id) {
      return id === 9 ? this.$t('industrial_1') : this.$t('theoretical_1')
    },
    toggle (id) {
      const index = this.opened.indexOf(id)
      if (index > -1) {
        this.opened.splice(index, 1)
      } else {
        this.opened.push(id)
      }
    },
    getVisitorsLogPlans () {
      this.$axios.get(this.$axios.baseURL + '/api/attendance/planattend')
        .then(response => {
          this.logs = response.data.data
        })
    }
  },
  mounted () {
    this.getVisitorsLogPlans()
  }
}
</script>
