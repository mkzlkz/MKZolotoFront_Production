<template>
  <div class="createPlan padding-30">
    <div class="title">
      <router-link to="/admin/exam"><img :src="require('@/assets/img/icon/back.svg')" alt="" class="img"></router-link>
      {{ $t('new_exam') }}
    </div>
    <div class="bg-white createPlan-form">
      <div class="form">
        <div class="form-1">
          <span>{{ $t('nomination_exam') }}</span>
          <input type="text" :placeholder="$t('nomination_exam')" v-model="exam.Name">
        </div>
        <div class="form-1">
          <span>{{ $t('education_plan_name') }}</span>
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
        <div class="form-1" v-if="examiners.length" style="margin-bottom: 20px">
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
              <span class="multiselect__single" v-if="examinersVal.length && !isOpen">{{ examinersVal.length }} options selected</span>
            </template>
          </multiselect>
          <div class="multiple-tags">
            <div class="tag" v-for="(tag, index) in examinersVal" :key="index">
              {{tag.Fullname}}
            </div>
          </div>
        </div>
        <div class="form-1" v-if="audiences.length" style="margin-bottom: 20px">
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
          <date-picker v-model="value2" :lang="lang" type="time" format="HH:mm" :show-second="false"
                       placeholder="15:00"></date-picker>
        </div>
        <Button :text="$t('create')" @click="createExam" :loading="loading"/>
        <small class="text-danger" v-if="error">{{error}}</small>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import moment from 'moment'

export default {
  name: 'CreateExam',
  components: {
    DatePicker,
    Button: () => import('../Template/Button')
  },
  data () {
    return {
      exam: {
        Name: '',
        PlanID: '',
        TypeID: '',
        PassMarks: ''
      },
      plans: [],
      types: [],
      examiners: [],
      examinersVal: [],
      value1: '',
      value2: '',
      audienceVal: [],
      audiences: [],
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
          this.exam.PlanID = this.plans[0].ID
        })
    },
    getTypes () {
      this.$axios.get(this.$axios.baseURL + '/api/gettopictype')
        .then(response => {
          this.types = response.data.data
          this.exam.TypeID = this.types[0].ID
        })
    },
    getExaminers () {
      this.$axios.get(this.$axios.baseURL + '/api/user/getusers?role=2&page=1')
        .then(response => {
          this.examiners = response.data.data
        })
    },
    createExam () {
      this.exam.Examenators = this.examinersVal
      this.exam.Regions = this.audienceVal
      this.exam.PassMarks = parseInt(this.exam.PassMarks)
      this.exam.BeginTime = this.beginTime
      this.loading = true
      this.$axios.post(this.$axios.baseURL + '/api/exam/newexam', this.exam)
        .then(response => {
          if (response.data.status) {
            this.loading = false
            this.$router.push('/admin/Exam')
          } else {
            this.error = response.data.message
            this.loading = false
          }
        })
    },
    getAudiences () {
      this.$axios.get(this.$axios.baseURL + '/api/user/getusers?role=5&page=1')
        .then(response => {
          this.audiences = response.data.data
        })
    }
  },
  mounted () {
    this.getPlansList()
    this.getTypes()
    this.getExaminers()
    this.getAudiences()
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
  .multiselect .multiselect__input {
    visibility: hidden;
  }

  .multiselect.multiselect--active .multiselect__input {
    visibility: visible;
  }

  .multiple-tags {
    display: flex;
    margin-top: 10px;
  }

  .multiple-tags .tag {
    background: #2A4077;
    border: 1px solid #2A4077;
    font-size: 12px;
    color: #FFFFFF;
    border-radius: 2px;
    margin-right: 8px;
    padding: 7px 10px;
  }
</style>
