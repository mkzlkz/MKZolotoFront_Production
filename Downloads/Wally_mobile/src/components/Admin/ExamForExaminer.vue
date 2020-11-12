<template>
    <div class="webinars webinarView examForExaminer padding-30">
        <div class="bg-white padding-20 mb-10" v-if="exam">
            <div class="title-n">{{exam.Name}}</div>
            <div class="table-responsive">
                <table class="table">
                    <tr>
                        <th class="width-1">{{ $t('examiner_name_surname') }}</th>
                        <th class="width-2">{{ $t('exam_start_date') }}</th>
                        <th class="width-3">{{ $t('passed_start_exam') }}</th>
                        <th class="width-4">{{ $t('before_exam_end') }}</th>
                        <th rowspan="2" class="width-5">
                            <button class="button-blue">{{ $t('complete_exam') }}</button>
                        </th>
                    </tr>
                    <tr>
                        <td class="width-1">{{exam.Examenator.Fullname}}</td>
                        <td class="width-2">{{exam.BeginTime}}</td>
                        <td class="width-3"><span class="blue">{{timeFromStart}}</span></td>
                        <td class="width-4"><span class="blue">{{timeToEnd}}</span></td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="bg-white padding-20" v-if="exam">
            <div class="boxi-dflex" v-if="!isRegionActive">
                <div class="box-i" v-for="(region, index) in exam.Regions" :key="index">
                    <a @click="toggleRegion(region)">
                        <div class="tt">{{region.Fullname}}</div>
                        <img :src="require('@/assets/img/region1.png')" alt="">
                    </a>
                </div>
            </div>
            <div class="region-content" v-if="isRegionActive">
                <div class="title">
                    <a @click="toggleRegion"><img :src="require('@/assets/img/icon/back.svg')" alt="" class="img">{{ $t('prev') }}</a>
                </div>
                <div class="reg">
                    <div class="tit">{{activeRegion.Fullname}}</div>
                    <img :src="require('@/assets/img/region-lg.jpg')" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'ExamForExaminer',
  data () {
    return {
      id: this.$route.params.id,
      exam: null,
      now: moment(),
      isRegionActive: false,
      activeRegion: null
    }
  },
  filters: {
    momentDate (date) {
      let q = moment(date)
      return q.format('DD.MM.YY') + ' | ' + q.format('HH:mm')
    }
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
  mounted () {
    this.getExam()
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
    },
    toggleRegion (region = null) {
      if (this.isRegionActive) {
        this.isRegionActive = false
        this.activeRegion = null
      } else {
        this.isRegionActive = true
        this.activeRegion = region
      }
    }
  },
  created () {
    setInterval(() => this.now = moment(), 1000)
  }
}
</script>
