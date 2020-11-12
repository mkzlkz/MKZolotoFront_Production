<template>
  <div class="createPlan padding-30">
    <div class="title">
      <router-link to="/admin/exam"><img :src="require('@/assets/img/icon/back.svg')" alt="" class="img"></router-link>
      {{ $t('change_exam') }}
    </div>
    <div class="bg-white createPlan-form">
      <div class="form">
        <div class="form-1">
          <span>{{ $t('nomination_exam') }}</span>
          <input type="text" :placeholder="$t('nomination_exam')" v-model="exam.Name">
        </div>
        <div class="form-1">
          <span>{{ $t('nomination_theme') }}</span>
          <select name="plan" v-model="exam.PlanID">
            <option v-for="(plan, index) in plans" :key="index" :value="plan.ID">{{plan.Plan}}</option>
          </select>
        </div>
        <div class="form-1">
          <span>{{ $t('exam_type') }}</span>
          <select name="type" v-model="exam.TypeID">
            <option v-for="(type, index) in types" :key="index" :value="type.ID">{{type.Name}}</option>
          </select>
        </div>
        <div class="form-1" :loading="loading" style="margin-bottom: 20px">
          <span>{{ $t('examiner_fio') }}</span>
          <multiselect
            v-model="examinersVal"
            :options="examiners"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :placeholder="$t('enter')"
            label="Fullname"
            track-by="Fullname"
            :preselect-first="false"
            :preserve-search="false"
            :taggable="false"
          >
            <template slot="selection" slot-scope="{ values, search, isOpen }">
              <span class="multiselect__single" v-if="examinersVal && examinersVal.length && !isOpen">{{ examinersVal.length }} options selected</span>
            </template>
          </multiselect>
          <div class="multiple-tags">
            <div class="tag" v-for="(tag, index) in examinersVal" :key="index">
              {{tag.Fullname}}
            </div>
          </div>
        </div>
        <div class="form-1" v-if="audiences && audiences.length" style="margin-bottom: 20px">
          <span>{{ $t('exam_audience') }}</span>
          <multiselect
            v-model="audienceVal"
            :options="audiences"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :placeholder="$t('enter')"
            label="Fullname"
            track-by="Fullname"
            :preselect-first="false"
            :preserve-search="false"
            :taggable="false"
          >
            <template slot="selection" slot-scope="{ values, search, isOpen }">
              <span class="multiselect__single" v-if="audienceVal.length && !isOpen">{{ audienceVal.length }} options selected</span>
            </template>
          </multiselect>
          <div class="multiple-tags">
            <div class="tag" v-for="(tag, index) in audienceVal" :key="index">
              {{tag.Fullname}}
            </div>
          </div>
        </div>
        <div class="form-1">
          <span>{{ $t('condition_passing') }}</span>
          <div class="dtext">
            <input type="number" :placeholder="$t('condition_passing')" class="pr-280" v-model="exam.PassMarks">
            <span>{{ $t('condition_passing_test') }}</span>
          </div>
        </div>
        <div class="form-1">
          <span>{{ $t('exam_date') }}</span>
          <date-picker v-model="value1" :lang="lang" format="DD.MM.YYYY" placeholder="08.08.2019"></date-picker>
        </div>
        <div class="form-1 cal-time">
          <span>{{ $t('exam_time') }}</span>
          <date-picker v-model="value2" :lang="lang" type="time" format="HH:mm" :show-second="false" placeholder="15:00"></date-picker>
        </div>
        <button class="button-blue" @click="editExam">{{ $t('save') }}</button>
        <small class="text-danger" v-if="error">{{error}}</small>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import moment from 'moment'
export default {
  name: 'EditExam',
  components: {DatePicker},
  data () {
    return {
      exam: {
        Name: '',
        PlanID: '',
        TypeID: '',
        PassMarks: '',
        ExamenatorID: ''
      },
      plans: [],
      types: [],
      examiners: [],
      value1: '',
      value2: '',
      examId: this.$route.params.id,
      audiences: [],
      audienceVal: [],
      examinersVal: [],
      loading: false,
      error: ''
    }
  },
  computed: {
    beginTime () {
      return moment(this.value1).format('YYYY-MM-DD') + 'T' + moment(this.value2).format('HH:mm:ss') + '+06:00'
    },
    lang () {
      const locale = localStorage.getItem('i18n')
      return locale || 'ru'
    }
  },
  methods: {
    getPlansList () {
      this.$axios.get(this.$axios.baseURL + '/api/subject/getplans')
        .then(response => {
          this.plans = response.data.data
        })
    },
    getTypes () {
      this.$axios.get(this.$axios.baseURL + '/api/gettopictype')
        .then(response => {
          this.types = response.data.data
        })
    },
    getExaminers () {
      this.loading = true
      this.$axios.get(this.$axios.baseURL + '/api/user/getusers?role=2&page=1')
        .then(response => {
          this.examiners = response.data.data
          this.loading = false
        })
    },
    getAudiences () {
      this.$axios.get(this.$axios.baseURL + '/api/user/getusers?role=5&page=1')
        .then(response => {
          this.audiences = response.data.data
        })
    },
    editExam () {
      let data = {
        ID: this.exam.ID,
        Name: this.exam.Name,
        PlanID: this.exam.PlanID,
        TypeID: this.exam.TypeID,
        PassMarks: this.exam.PassMarks,
        BeginTime: this.beginTime,
        Examenators: this.examinersVal,
        Regions: this.audienceVal
      }
      this.$axios.put(this.$axios.baseURL + '/api/exam/updateexam/' + this.examId, data)
        .then(response => {
          if (response.data.status) {
            this.$router.push('/admin/exam')
          } else {
            this.error = response.data.message
          }
        })
    },
    getExam () {
      this.$axios.get(this.$axios.baseURL + '/api/exam/getexam?id=' + this.examId)
        .then(response => {
          this.exam = response.data.data[0]
          this.value1 = this.exam.BeginTime
          this.value2 = this.exam.BeginTime
          this.audienceVal = this.exam.Regions
          this.examinersVal = this.exam.Examenators
        })
    }
  },
  mounted () {
    this.getExam()
    this.getPlansList()
    this.getTypes()
    this.getExaminers()
    this.getAudiences()
  }
}
</script>
