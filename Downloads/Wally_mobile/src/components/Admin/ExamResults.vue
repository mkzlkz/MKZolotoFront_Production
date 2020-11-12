<template>
  <div class="testsAdmin examResults padding-30">
    <div class="title-flex mb-20">
      <div class="title">{{ $t('exam_result') }}</div>
      <div class="dflex">
        <a href="" class="button-gray-line"><img :src="require('@/assets/img/icon/download.svg')" alt="">{{ $t('download') }} {{ $t('report_card') }}</a>
        <!--<router-link to="/eds-authorization" class="button-blue">{{ $t('sign_ecp') }}</router-link>-->
        <button class="button-blue" @click="save">{{ $t('sign_ecp') }}</button>
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
              <button v-if="!exam.status" class="button-green-line width-100" @click="updateVoteAll(exam, indexExam)">{{ $t('accept_entire_region') }}</button>
              <div class="del-button" v-if="exam.status">
                <button class="button-green width-100">{{ $t('accept_entire_region') }}</button>
                <span class="del" @click="updateVoteAll(exam, indexExam)">
                  <img :src="require('@/assets/img/icon/delete-dark.svg')" alt="">
                </span>
              </div>
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
            <td v-if="!student.ExamenatorVote">
              <button class="button-pink-line" @click="updateVote(studentIndex, indexExam, 'false')">{{ $t('reject') }}</button>
            </td>
            <td v-if="!student.ExamenatorVote">
              <button class="button-green-line" @click="updateVote(studentIndex, indexExam, 'true')">{{ $t('accept') }}</button>
            </td>
            <td v-if="student.ExamenatorVote === 'false'">
              <div class="del-button">
                <button class="button-pink">{{ $t('rejected') }}</button>
                <span class="del" @click="updateVote(studentIndex, indexExam, '')">
                  <img :src="require('@/assets/img/icon/delete-dark.svg')" alt="">
                </span>
              </div>
            </td>
            <td v-if="student.ExamenatorVote === 'true'">
              <div class="del-button">
                <button class="button-green">{{ $t('accept') }}</button>
                <span class="del" @click="updateVote(studentIndex, indexExam, '')">
                  <img :src="require('@/assets/img/icon/delete-dark.svg')" alt="">
                </span>
              </div>
            </td>
            <td v-if="student.ExamenatorVote"></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExamResults',
  data () {
    return {
      id: this.$route.params.id,
      exams: [],
      checkData: {
        Data: []
      }
    }
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
    },
    updateVote (studentIndex, examIndex, value) {
      let student = this.exams[examIndex]
      student.Student[studentIndex].ExamenatorVote = value
      this.$set(this.exams, examIndex, student)
    },
    updateVoteAll (exam, index) {
      if (!exam.status) {
        exam.status = true
      } else {
        exam.status = !exam.status
      }
      exam.Student.forEach((student, index) => exam.Student[index].ExamenatorVote = exam.status ? 'true' : '')
      this.$set(this.exams, index, exam)
    },
    save () {
      for (let exam of this.exams) {
        for (let student of exam.Student) {
          if (student.ExamenatorVote) {
            this.checkData.Data.push({
              UserID: student.ID,
              ExamID: parseInt(this.id),
              Vote: student.ExamenatorVote
            })
          }
        }
      }
      this.$axios.post(this.$axios.baseURL + '/api/examenatorcheck', this.checkData)
        .then(response => {
          location.replace('/admin/eds-authorization')
        })
    }
  },
  mounted () {
    this.getExam()
  }
}
</script>
