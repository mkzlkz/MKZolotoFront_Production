<template>
  <div class="webinars webinarView examForExaminer padding-30">
    <div class="bg-white padding-20 mb-10">
      <div class="title-n">{{ $t('nomination_exam') }}</div>
      <div class="table-responsive">
        <table class="table">
          <tr>
            <th class="width-1">{{ $t('examiner_name_surname') }}</th>
            <th class="width-2">{{ $t('exam_start_date') }}</th>
            <th class="width-3">{{ $t('passed_start_exam') }}</th>
            <th class="width-4">{{ $t('before_exam_end') }}</th>
            <th rowspan="2" class="width-5"></th>
          </tr>
          <tr v-if="exam">
            <td class="width-1">{{exam.Examenator.Fullname}}</td>
            <td class="width-2">{{exam.BeginTime | momentDate}}</td>
            <td class="width-3"><span class="blue">{{timeFromStart}}</span></td>
            <td class="width-4"><span class="blue">{{timeToEnd}}</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="bg-white padding-20">
      <div class="region-content">
        <div class="title">
          <router-link to="/admin/audience"><img :src="require('@/assets/img/icon/back.svg')" alt="" class="img">
            {{ $t('prev') }}
          </router-link>
        </div>
        <div class="reg">
          <div class="tit">{{ $t('region') }}</div>
          <img :src="require('@/assets/img/region-lg.jpg')" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'audienceRegion',
  data () {
    return {
      id: parseInt(this.$route.params.id),
      exam: null,
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
    this.getExam()
  },
  computed: {
    timeFromStart () {
      let date = moment(this.exam.BeginTime)
      let diff = this.now.diff(date, 'seconds')
      return diff < 0 ? '-' : this.timeFormatted(diff)
    },
    timeToEnd () {
      let date = moment(this.exam.BeginTime).add(this.exam.Duration, 'minutes')
      let diff = date.diff(this.now, 'seconds')
      return diff < 0 ? '-' : this.timeFormatted(diff)
    }
  },
  methods: {
    getExam () {
      this.$axios.get(this.$axios.baseURL + '/api/exam/getexam?id=' + this.id)
        .then(response => {
          this.exam = response.data.data[0]
        })
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
