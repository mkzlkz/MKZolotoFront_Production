<template>
  <div class="exam padding-30">
    <div class="title-flex mb-20">
      <div class="title">{{ $t('exams_ml') }}</div>
      <router-link to="/admin/create-exam" class="button-blue"><img :src="require('@/assets/img/icon/plus.svg')" alt="">{{ $t('create') }}
      </router-link>
    </div>
    <div class="table-responsive">
      <table class="table table-main table-admin">
        <tr>
          <th class="width-1">{{ $t('nomination_exam') }}</th>
          <th class="width-2">{{ $t('theme') }}</th>
          <th class="width-3">{{ $t('exam_date') }}</th>
          <th class="width-4">{{ $t('type') }}</th>
          <th class="width-5">{{ $t('examiner') }}</th>
          <th class="width-6">{{ $t('status') }}</th>
          <th class="width-7"></th>
          <th class="width-8"></th>
        </tr>
        <tr v-for="exam in exams" :key="exam.ID">
          <td class="width-1">{{exam.Name}}</td>
          <td class="width-2">{{exam.Plan.Name}}</td>
          <td class="width-3">{{exam.BeginTime | momentDate}}</td>
          <td class="width-4">{{exam.Type}}</td>
          <td class="width-5">
            <span v-for="examenator in exam.Examenators" :key="examenator.ID">
              {{examenator.Fullname}}
            </span></td>
          <td class="width-6">
            <span class="blue">{{exam.Status}}</span>
          </td>
          <td class="width-7">
            <router-link tag="button" :to="'/admin/edit-exam/' + exam.ID" class="button-blue-purple"><img :src="require('@/assets/img/icon/pencil.svg')" alt=""></router-link>
          </td>
          <td class="width-8">
            <button class="button-pink-line" @click="deleteExam(exam.ID)"><img :src="require('@/assets/img/icon/delete.svg')" alt=""></button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Exam',
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
    },
    deleteExam (id) {
      this.$axios.delete(this.$axios.baseURL + '/api/exam/deleteexam/' + id)
        .then(() => {
          this.exams = this.exams.filter(e => e.ID !== id)
        })
    }
  },
  mounted () {
    this.getExams()
  }
}
</script>
