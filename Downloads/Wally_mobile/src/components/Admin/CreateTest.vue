<template>
  <div class="createPlan padding-30">
    <div class="title">
      <router-link to="/admin/tests"><img :src="require('@/assets/img/icon/back.svg')" alt="" class="img">
      </router-link>
      {{ $t('new_test') }}
    </div>
    <div class="bg-white createPlan-form">
      <div class="form">
        <div class="form-checkbox">
          <label for="webinar">{{ $t('test_relate_webinar') }} </label>
          <input type="checkbox" id="webinar" v-model="Type">
        </div>
        <div class="form-1">
          <span>{{ $t('nomination_test') }}</span>
          <input type="text" :placeholder="$t('nomination_test')" v-model="Name">
        </div>
        <div class="form-1">
          <span>{{ $t('description') }}</span>
          <input type="text" :placeholder="$t('description')" v-model="Description">
        </div>
        <div class="form-1">
          <span>{{ $t('educationPlan') }}</span>
          <select name="" id="PlanId" v-model="planID">
            <option v-for="plan in plans" :key="plan.ID" :value="plan.ID">{{plan.Name}}</option>
          </select>
        </div>
        <div class="form-1">
          <span>{{ $t('nomination_theme') }}</span>
          <select name="" id="ThemeId" v-model="TopicID">
            <option v-for="theme in themes" :value="theme.ID" :key="theme.ID">{{theme.Name}}</option>
          </select>
        </div>
        <div class="form-1">
          <span>{{ $t('test_duration') }}</span>
          <div class="dtext">
            <input type="text" :placeholder="$t('test_duration')" class="pr-75" v-model="Duration">
            <span>{{ $tc('minute', 10) }}</span>
          </div>
        </div>
        <div class="form-1">
          <span>{{ $t('condition_passing') }}</span>
          <div class="dtext">
            <input type="text" :placeholder="$t('condition_passing')" class="pr-280" v-model="PassMarks">
            <span>{{ $t('condition_passing_test') }}</span>
          </div>
        </div>
        <div class="form-1" v-if="Type">
          <span>{{ $t('position_1') }}</span>
          <div class="dtext">
            <input type="number" :placeholder="$t('position_1')" v-model="Position">
          </div>
        </div>
        <Button :text="$t('create')" @click="createTest" :loading="loading"/>
        <small class="text-danger" v-if="error">{{error}}</small>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'

export default {
  name: 'CreateTest',
  components: {
    DatePicker,
    Button: () => import('../Template/Button')
  },
  data () {
    return {
      value1: '',
      value2: '',
      plans: [],
      themes: [],
      Name: '', // string 		`gorm:"type:varchar(255);not null"`
      Description: '', // string 		`gorm:"type:varchar(255);not null"`
      PassMarks: 0, //   int
      ExamDay: '', //   *time.Time
      BeginTime: '', //
      EndTime: '', //     *time.Time
      Position: 0, // 	uint
      Duration: 60, // 	int
      WebID: 0, //		uint
      PlanID: 0, // 		uint
      TopicID: 0, // 	uint,
      error: '',
      Type: false,
      loading: false
    }
  },
  mounted () {
    this.getPlansTopics()
  },
  computed: {
    planID: {
      get () {
        return this.PlanID
      },
      set (value) {
        this.PlanID = value
        this.setTopicList()
      }
    }
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
    createTest: function () {
      const formData = {
        'Name': this.Name,
        'Description': this.Description,
        'PassMarks': parseInt(this.PassMarks, 10),
        'Duration': parseInt(this.Duration, 10),
        'PlanID': this.PlanID,
        'TopicID': this.TopicID,
        'Type': !this.Type,
        'Position': this.Position
      }
      this.loading = true
      this.$axios.post(this.$axios.baseURL + '/api/exam/newtest', formData)
        .then(response => {
          if (!response.data.status) {
            this.loading = false
            this.error = response.data.message
          } else {
            this.$router.push('/admin/tests')
          }
        })
    }
  }
}
</script>
