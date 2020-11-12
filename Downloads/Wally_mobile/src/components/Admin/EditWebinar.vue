<template>
  <div class="createPlan padding-30">
    <div class="title">
      <router-link to="/admin/webinars"><img :src="require('@/assets/img/icon/back.svg')" alt="" class="img">
      </router-link>
      {{ $t('change_webinar') }}
    </div>
    <div class="bg-white createPlan-form">
      <div class="form">
        <div class="form-1">
          <span>{{ $t('nomination_webinar') }}</span>
          <input type="text" :placeholder="$t('nomination_webinar_1')" v-model="webinar.Webinarname">
        </div>
        <div class="form-1">
          <span>{{ $t('description') }}</span>
          <input type="text" :placeholder="$t('description')" v-model="webinar.Description"/>
        </div>
        <div class="form-1">
          <span>{{ $t('timetable') }}</span>
          <select id="PlanId" v-model="webinar.PlanID">
            <option v-for="plan in plans" :key="plan.ID" :value="plan.ID">{{plan.Plan}}</option>
          </select>
        </div>
        <div class="form-1">
          <span>{{ $t('nomination_theme') }}</span>
          <select id="ThemeId" v-model="webinar.TopicID">
            <option v-for="theme in themes" :value="theme.ID" :key="theme.ID">{{theme.Topic}}</option>
          </select>
        </div>
        <div class="form-1">
          <span>{{ $t('webinar_date') }}</span>
          <date-picker v-model="value1" lang="ru" format="DD.MM.YYYY" placeholder="08.08.2019"></date-picker>
        </div>
        <div class="form-1 cal-time">
          <span>{{ $t('webinar_time') }}</span>
          <date-picker v-model="value2" lang="ru" type="time" format="HH:mm" :show-second="false" placeholder="15:00"></date-picker>
        </div>
        <div class="form-1">
          <span>{{ $t('webinar_duration') }}</span>
          <input type="number" min="0" :placeholder="$t('webinar_duration')" v-model="webinar.Duration">
        </div>
        <div class="form-1">
          <span>{{ $t('examiner_fio_1') }}</span>
          <select name="teacher" v-model="webinar.TeacherID">
            <option v-for="teacher in teachers" :value="teacher.ID" :key="teacher.ID">{{teacher.Fullname}}</option>
          </select>
        </div>
        <div class="form-1">
          <span>{{ $t('max_upload', { size: `10 ${$t('size.mb')}` }) }}</span>
          <div class="form-file">
            <input type="text" v-model="photosTitle">
            <label for="file">{{ $t('upload') }} <input type="file" id="file" ref="file" @change="fileDetect"></label>
          </div>
        </div>
        <button class="button-blue" @click="editWebinar">{{ $t('save') }}</button>
        <small class="text-danger" v-if="error">{{error}}</small>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import DatePicker from 'vue2-datepicker'

export default {
  name: 'EditWebinar',
  components: { DatePicker },
  data () {
    return {
      id: this.$route.params.id,
      webinar: {
        Webinarname: '',
        Description: '',
        PlanID: 0,
        TopicID: 0,
        BeginTime: '',
        Duration: 0,
        TeacherID: 0
      },
      value1: '',
      value2: '',
      plans: [],
      themes: [],
      teachers: [],
      photosTitle: '',
      error: ''
    }
  },
  computed: {
    beginTime () {
      return moment(this.value1).format('YYYY-MM-DD') + 'T' + moment(this.value2).format('HH:mm:ss') + '+06:00'
    }
  },
  mounted () {
    this.getWebinar()
    this.getPlansList()
    this.getThemeList()
    this.getTeachers()
  },
  methods: {
    getWebinar () {
      this.$axios.get(this.$axios.baseURL + '/api/web/getweb/' + this.id)
        .then(response => {
          this.webinar = response.data.data
          this.value1 = this.webinar.Startdate
          this.value2 = this.webinar.Startdate
          this.photosTitle = this.webinar.Preview.ID ? this.webinar.Preview.Name : ''
        })
    },
    editWebinar () {
      this.webinar.BeginTime = this.beginTime
      this.webinar.TeacherID = parseInt(this.webinar.TeacherID)
      let formData = {
        'Name': this.webinar.Webinarname,
        'Description': this.webinar.Description,
        'BeginTime': this.webinar.BeginTime,
        'Duration': parseInt(this.webinar.Duration, 10),
        'PlanID': this.webinar.PlanID,
        'TopicID': this.webinar.TopicID,
        'TeacherID': this.webinar.TeacherID
      }
      this.$axios.put(this.$axios.baseURL + '/api/web/updateweb/' + this.id, formData)
        .then(response => {
          if (response.data.status) {
            let id = this.webinar.ID
            if (this.file) {
              let formData = new FormData()
              formData.append('file', this.file[0])
              formData.append('WebID', id)
              formData.append('Types', 'preview')
              this.$axios.post(this.$axios.baseURL + '/uploadF', formData)
                .then(() => {
                  this.$router.push('/admin/webinars')
                })
            } else {
              this.$router.push('/admin/webinars')
            }
          } else {
            this.error = response.data.message
          }
        })
    },
    getPlansList () {
      this.$axios.get(this.$axios.baseURL + '/api/subject/getplans')
        .then(response => {
          this.plans = response.data.data
        })
    },
    getThemeList () {
      this.$axios.get(this.$axios.baseURL + '/api/subject/gettopics')
        .then(response => {
          this.themes = response.data.data
        })
    },
    getTeachers () {
      this.$axios.get(this.$axios.baseURL + '/api/user/getteachers')
        .then(response => {
          this.teachers = response.data.data
        })
    },
    fileDetect () {
      this.file = this.$refs.file.files
      this.photosTitle = ''
      for (let i = 0; i < this.$refs.file.files.length; i++) {
        this.photosTitle += this.$refs.file.files[i].name + ' '
      }
    }
  }
}
</script>
