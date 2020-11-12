<template>
    <div class="createPlan padding-30">
        <div class="title"><router-link to="/admin/webinars"><img :src="require('@/assets/img/icon/back.svg')" alt="" class="img"></router-link>
          {{ $t('create_webinar_1') }}</div>
        <div class="bg-white createPlan-form">
            <div class="form">
                <div class="form-1">
                    <span>{{ $t('nomination_webinar') }}</span>
                    <input type="text" :placeholder="$t('nomination_webinar')" v-model="Name">
                </div>
                <div class="form-1">
                    <span>{{ $t('description') }}</span>
                    <input type="text" :placeholder="$t('description')" v-model="Description"/>
                </div>
                <div class="form-1">
                    <span>{{ $t('educationPlan') }}</span>
                    <select id="PlanId" v-model="planIDComputes">
                        <option v-for="plan in plans" :key="plan.ID" :value="plan.ID">{{plan.Name}}</option>
                    </select>
                </div>
                <div class="form-1">
                    <span>{{ $t('nomination_theme') }}</span>
                    <select id="ThemeId" v-model="TopicID">
                        <option v-for="theme in themes" :value="theme.ID" :key="theme.ID">{{theme.Name}}</option>
                    </select>
                </div>

                <div class="form-1">
                    <span>{{ $t('webinar_date') }}</span>
                    <datetime v-model="value1" format="dd.MM.yyyy" class="datetime" auto/>
                </div>

                <div class="form-1 cal-time">
                    <span>{{ $t('webinar_time') }}</span>
                    <datetime type="time" v-model="value2" :minute-step="5" class="datetime" auto/>
                </div>
                <div class="form-1">
                    <span>{{ $t('webinar_duration') }}</span>
                    <div class="dtext">
                        <input type="number" min="0" :placeholder="$t('webinar_duration')" class="pr-75" v-model="Duration">
                        <span>{{ $tc('minute', 10) }}</span>
                    </div>
                </div>
                <div class="form-1">
                    <span>{{ $t('examiner_fio_1') }}</span>
                    <select name="teacher" v-model="TeacherID">
                        <option v-for="teacher in teachers" :value="teacher.ID" :key="teacher.ID">{{teacher.Fullname}}</option>
                    </select>
                </div>
                <uploadFiles
                        v-if="1==2"
                        v-model="file"
                        :title="$t('max_upload', { size: `10 ${$t('size.mb')}` })"
                        :uploadFileSize="10000000"
                />
                <Button :text="$t('create')" @click="createWebinar" :loading="loading"/>
                <small class="text-danger" v-if="error">{{error}}</small>
            </div>
        </div>
    </div>
</template>

<script>
import {Datetime} from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import moment from 'moment'
import {Settings} from 'luxon'
Settings.defaultLocale = 'ru'

export default {
  name: 'CreateWebinars',
  components: {
    datetime: Datetime,
    uploadFiles: () => import('../Template/uploadFile'),
    Button: () => import('../Template/Button')
  },
  data () {
    return {
      value1: new Date().toISOString(),
      value2: new Date().toISOString(),
      plans: [],
      themes: [],
      teachers: [],
      Name: '',
      Description: '',
      Duration: 60,
      PlanID: 0,
      TopicID: 0,
      TeacherID: 0,
      error: '',
      // photosTitle: '',
      file: [],
      loading: false
    }
  },
  computed: {
    beginTime () {
      return moment(this.value1).format('YYYY-MM-DD') + 'T' + moment(this.value2).format('HH:mm:ss') + '+06:00'
    },
    planIDComputes: {
      get () {
        return this.PlanID
      },
      set (value) {
        this.PlanID = value
        this.setTopicList()
      }
    }
  },
  mounted () {
    this.getTeachers()
    this.getPlansTopics()
  },
  methods: {
    getPlansTopics () {
      this.$axios.get(`${this.$axios.baseURL}/api/getplanandtopics`)
        .then(response => {
          this.plans = response.data.data
          this.PlanID = this.plans[0].ID
          this.setTopicList()
        })
    },
    setTopicList () {
      const find = this.plans.find(i => i.ID === this.PlanID)
      this.themes = find.Topics
      if (find.Topics.length > 0) {
        this.TopicID = find.Topics[0].ID
      }
    },

    getThemeList () {
      this.$axios.get(this.$axios.baseURL + '/api/subject/gettopics')
        .then(response => {
          this.themes = response.data.data
          this.TopicID = this.themes[0].ID
        })
    },
    getTeachers () {
      this.$axios.get(this.$axios.baseURL + '/api/user/getteachers')
        .then(response => {
          this.teachers = response.data.data
          this.TeacherID = this.teachers[0].ID
        })
    },
    createWebinar () {
      let formData = {
        'Name': this.Name,
        'Description': this.Description,
        'BeginTime': this.beginTime,
        'Duration': parseInt(this.Duration, 10),
        'PlanID': this.PlanID,
        'TopicID': this.TopicID,
        'TeacherID': this.TeacherID
      }
      this.loading = true
      this.$axios.post(this.$axios.baseURL + '/api/web/new', formData)
        .then(response => {
          if (!response.data.status) {
            this.loading = false
            this.error = response.data.message
          } else {
            let id = response.data.web.ID
            if (this.file[0]) {
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
          }
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
<style>
  .datetime .vdatetime-popup__header,
  .datetime .vdatetime-calendar__month__day--selected > span > span,
  .datetime .vdatetime-calendar__month__day--selected:hover > span > span {
    background: #2A4077;
  }

  .datetime .vdatetime-calendar__month__day--selected > span > span,
  .datetime .vdatetime-calendar__month__day--selected:hover > span > span {
    color: #FFF;
  }

  .datetime .vdatetime-calendar__month__day span {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .datetime .vdatetime-year-picker__item--selected,
  .datetime .vdatetime-time-picker__item--selected,
  .datetime .vdatetime-popup__actions__button {
    color: #2A4077;
  }
</style>
