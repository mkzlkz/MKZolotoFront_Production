<template>
  <div class="audience padding-30">
    <div class="title">{{ $t('exams_ml') }}</div>
    <div class="table-responsive">
      <table class="table table-main table-admin">
        <tr>
          <th class="width-1">{{ $t('nomination_exam') }}</th>
          <th class="width-2">{{ $t('theme') }}</th>
          <th class="width-3">{{ $t('exam_date') }}</th>
          <th class="width-4"></th>
          <th class="width-5">{{ $t('status') }}</th>
          <th class="width-6"></th>
          <th class="width-7"></th>
        </tr>
        <tr v-for="(exam, index) in exams" :key="index">
          <td class="width-1">{{exam.Name}}</td>
          <td class="width-2">{{exam.Plan.Name}}</td>
          <td class="width-3">{{exam.BeginTime | momentDate}}</td>
          <td class="width-4"></td>
          <td class="width-5"><span :class="getStatusClass(exam.Status)">{{exam.Status}}</span></td>
          <td class="width-6"></td>
          <td class="width-7">
            <button class="button-blue" @click="$router.push('/admin/audience-region/' + exam.ID)">{{ $t('connect') }}</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'audience',
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
  mounted () {
    this.getExams()
  },
  methods: {
    getExams () {
      this.$axios.get(this.$axios.baseURL + '/api/user/getregions')
        .then(response => {
          this.exams = response.data.data
        })
    },
    getStatusClass (status) {
      return status === 'В процессе' ? 'blue' : 'gray'
    }
  }
}
</script>
