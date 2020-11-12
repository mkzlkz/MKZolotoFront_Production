<template>
  <div class="Statistics padding-30">
    <div class="title-flex">
      <div class="title">{{ $t('statistics') }}</div>
      <a class="button-blue" :href="file" download target="_blank"><img :src="require('@/assets/img/icon/plus.svg')"
                                  alt="">{{ $t('download_report') }}</a>
    </div>
    <div class="box-2">
      <div class="table-content" v-for="(row, index) in rows" :key="index">
        <div class="table-responsive">
          <table class="table table2">
            <tr>
              <td class="width-1">{{row.title}}</td>
              <td class="width-2">{{row.passed}} из {{row.total}}</td>
              <td class="width-3">
                <button class="button-blue" @click="toggle(row.id)" :class="{ opened: opened.includes(row.id) }">
                  {{ $t('more') }}
                </button>
              </td>
            </tr>
          </table>
        </div>
        <div class="table3" v-if="opened.includes(row.id)">
          <div class="table-responsive">
            <table class="table">
              <tr v-for="(item, index) in row.items" :key="index">
                <td class="width-1">{{item.Deptament.Name}}</td>
                <td class="width-2">{{item.Status.Passed}} из {{item.Status.Total}}</td>
                <td class="width-3"></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Statistics',
  data () {
    return {
      opened: [],
      rows: [
        {
          id: 1,
          title: this.$t('course_attendance'),
          items: [],
          passed: 0,
          total: 0
        },
        {
          id: 2,
          title: this.$t('test_turnout'),
          items: [],
          passed: 0,
          total: 0
        },
        {
          id: 3,
          title: this.$t('received_certification'),
          items: [],
          passed: 0,
          total: 0
        }
      ],
      report: null,
      file: "http://185.22.65.39:8085/docs/resultStat.xlsx",
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
    getReport () {
      this.$axios.get(this.$axios.baseURL + '/api/attendance/statistic')
        .then(response => {
          this.report = response.data.data
          this.rows[0].passed = this.report.TotalCourse.Passed
          this.rows[0].total = this.report.TotalCourse.Total
          this.rows[0].items = this.report.AttendanceCourse
          this.rows[1].passed = this.report.TotalTest.Passed
          this.rows[1].total = this.report.TotalTest.Total
          this.rows[1].items = this.report.AttendanceTest
          this.rows[2].passed = this.report.TotalCertificate.Passed
          this.rows[2].total = this.report.TotalCertificate.Total
          this.rows[2].items = this.report.GetCerificate
          console.log(this.rows)
        })
    },
    getFile () {
      this.$axios.get(this.$axios.baseURL + '/api/report/admin')
        .then(response => {
          this.file = response.data.data
        })
    }
  },
  mounted () {
    this.getReport()
    this.getFile()
  }
}
</script>
