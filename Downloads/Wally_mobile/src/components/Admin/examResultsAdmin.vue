<template>
  <div class="testsAdmin examResults examResultsAdmin padding-30">
    <div class="title-flex mb-20">
      <div class="title">{{ $t('exam_result') }}</div>
      <div class="dflex">
        <a href="" class="button-gray-line"><img :src="require('@/assets/img/icon/download.svg')" alt="">{{ $t('download') }} {{ $t('report_card') }}</a>
      </div>
    </div>
    <div class="exam-result-region" v-for="(exam, indexExam) in exams" :key="indexExam">
      <div class="title-r">{{exam.Region.Fullname}}</div>
      <div class="table-responsive">
        <table class="table table-main">
          <tr>
            <th>ID</th>
            <th>{{ $t('fio_small') }}</th>
            <th>{{ $t('plan') }}</th>
            <th>{{ $t('position') }}</th>
            <th>{{ $t('region') }}</th>
            <th>{{ $t('iin') }}</th>
            <th>{{ $t('personnel_number') }}</th>
            <th>{{ $t('results') }}</th>
            <th colspan="2">
            </th>
          </tr>
          <tr v-for="(student, studentIndex) in exam.Student" :key="studentIndex" :indexExam="indexExam">
            <td>{{student.ID}}</td>
            <td>{{student.Fullname}}</td>
            <td>{{student.Department}}</td>
            <td>{{student.Duty}}</td>
            <td>{{exam.Region.Fullname}}</td>
            <td>{{student.IIN}}</td>
            <td>{{student.Tabel}}</td>
            <td>
              <span class="result-text">Результат {{testResult(student.Results)}}%</span>
              <span class="result">
                <span class="green">+{{testResult(student.Results)}}</span>
                <span class="purple">/</span>
                <span class="pink">-{{100 - testResult(student.Results)}}</span>
              </span>
            </td>
            <td v-if="student.ExamenatorVote === 'true'">
              <div class="del-button">
                <button class="button-green">{{ $t('accept') }}</button>
              </div>
            </td>
            <td v-if="!student.ExamenatorVote === 'false'">
              <div class="del-button">
                <button class="button-pink">{{ $t('rejected') }}</button>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'examResultsAdmin',
  data () {
    return {
      id: this.$route.params.id,
      exams: []
    }
  },
  mounted () {
    this.getExam()
  },
  methods: {
    getExam () {
      this.$axios.get(this.$axios.baseURL + '/table/get?id=' + this.id)
        .then(response => {
          this.exams = response.data.data
        })
    },
    testResult (results) {
      let result = results.Passed

      return Math.round(result * 100 / results.Total)
    }
  }
}
</script>
