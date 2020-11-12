<template>
  <div>
    <div class="reportСard padding-30">
      <div class="title">{{ $t('admin_report_card') }}</div>
      <div class="table-responsive">
        <table class="table table-main table-admin">
          <tr>
            <th class="width-1">{{ $t('nomination_exam') }}</th>
            <th class="width-2">{{ $t('exam_date') }}</th>
            <th class="width-3">{{ $t('type') }}</th>
            <th class="width-4">{{ $t('examiner_fio') }}</th>
            <th class="width-5">{{ $t('theme') }}</th>
            <th class="width-6">{{ $t('status') }}</th>
            <th class="width-7"></th>
          </tr>
          <tr v-for="(exam, index) in exams" :key="index">
            <td class="width-1">{{exam.Name}}</td>
            <td class="width-2">{{exam.BeginTime}}</td>
            <td class="width-3">{{exam.Type}}</td>
            <td class="width-4">{{exam.Examenator.Fullname}}</td>
            <td class="width-5">{{exam.Plan.Name}}</td>
            <td class="width-6"><span class="blue">{{exam.Status}}</span></td>
            <td class="width-7">
              <button class="button-blue-grey" @click="$router.push('/admin/exam-results-admin/' + exam.ID)" v-if="exam.Status === 'Завершен'">
                {{ $t('results') }}
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'reportСardAdministrator',
  data () {
    return {
      exams: []
    }
  },
  filters: {
    momentDate (date) {
      let q = moment(date)
      return q.format('DD.MM.YY') + ' | ' + q.format('HH:mm')
    }
  },
  methods: {
    getExams () {
      this.$axios.get(this.$axios.baseURL + '/api/exam/getexam')
        .then(response => {
          this.exams = response.data.data
        })
    }
  },
  mounted () {
    this.getExams()
  }
}
</script>
