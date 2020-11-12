<template>
  <div>
    <div class="reportСard padding-30">
      <div class="title">{{ $t('report_card') }}</div>
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
          <tr v-for="exam in exams" :key="exam.ID">
            <td class="width-1">{{exam.Name}}</td>
            <td class="width-2">{{exam.BeginTime | momentDate}}</td>
            <td class="width-3">{{exam.Type}}</td>
            <td class="width-4">{{exam.Examenator.Fullname}}</td>
            <td class="width-5">{{exam.Plan.Name}}</td>
            <td class="width-6"><span class="blue">{{exam.Status}}</span></td>
            <td class="width-7">
              <button v-if="exam.Status === 'В процессе'" class="button-blue" data-toggle="modal" data-target="#Modal1">
                {{ $t('start') }}</button>
              <button v-if="exam.Status === 'Завершен'" class="button-blue-grey" @click="$router.push('/admin/exam-results/' + exam.ID)">{{ $t('results') }}</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="modal-webinar">
      <div id="Modal1" class="modal fade">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <div class="modal-flex">
                <div class="modal-left">
                  <div class="title-m">{{ $t('camera') }}</div>
                  <div class="img"><img :src="require('@/assets/img/1.png')" alt="">
                    <div class="line"></div>
                  </div>
                  <button class="button-blue-two" data-dismiss="modal">{{ $t('cancel') }}</button>
                </div>
                <div class="modal-right">
                  <div class="title-m">{{ $t('image') }}</div>
                  <div class="img">
                    <img :src="userMainImage" alt="" class="img-main">
                    <div class="img-list">
                      <img :src="image" alt="" v-for="(image, index) in userImages" :key="index">
                    </div>
                  </div>
                  <div class="box-4">
                    <div class="title-4">{{ $t('important') }}!</div>
                    <div class="bx4" v-for="(txt, index) in $t('check_camera')" :key="index">
                      <span>{{ index + 1 }}</span> {{ txt }}
                    </div>
                  </div>
                </div>
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
  name: 'reportСard',
  data () {
    return {
      exams: [],
      user: JSON.parse(localStorage.getItem('user')),
      userPhoto: null
    }
  },
  filters: {
    momentDate (date) {
      let q = moment(date)
      return q.format('DD.MM.YY') + ' | ' + q.format('HH:mm')
    }
  },
  computed: {
    userMainImage () {
      return this.user.Image.length ? this.user.Image[0] : null
    },
    userImages () {
      return this.user.Image.length > 1 ? this.user.Image.subarray(1) : []
    }
  },
  methods: {
    routerPage () {
      location.replace('/admin/exam-for-examiner')
    },
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
