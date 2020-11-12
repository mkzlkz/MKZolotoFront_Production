<template>
  <div class="chat padding-30">
    <div class="title">
      <router-link to="/user/webinars"><img :src="require('@/assets/img/icon/back.svg')" alt="" class="img">
      </router-link>
      {{ $t('webinar_chat') }}
    </div>
    <div class="chat-flex">
      <div class="chat-left" v-if="webinar">
        <div class="box-3"><span>{{ $t('webinar_name') }}</span>
          <p>{{webinar.Webinarname}}</p></div>
        <div class="box-3"><span>{{ $t('webinar_date') }}</span>
          <p>{{webinar.BeginTime | momentDate}}</p></div>
        <div class="box-3"><span>{{ $t('teacher_fullname') }}</span>
          <p>{{webinar.Teacher}}</p></div>
        <div class="box-3"><span>{{ $t('description') }}</span>
          <p>{{webinar.Description}}</p></div>
      </div>
      <div class="chat-right">
        <div class="chat-add-messages">
          <div class="title-c">{{ $t('webinar_question_for') }} <span class="green">{{webinar.Teacher}}</span></div>
          <textarea v-model="questionText"></textarea>
          <actions @submit="sendQuestion" :loading="loading" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import webinarChatMixin from '../../mixins/webinarChatMixin'
  import moment from 'moment'
  export default {
    name: 'chatWebinar',
    mixins: [webinarChatMixin],
    components: {
      actions: () => import('../Template/webinarAction')
    },
    data () {
      return {
        id: this.$route.params.id,
        webinar: {},
        questionText: '',
        problem: [],
        loading: false
      }
    },
    beforeDestroy () {
      this.id = null
      this.webinar = {}
      this.questionText = ''
      this.problem = []
      this.loading = false
    },
    filters: {
      momentDate (date) {
        let q = moment(date)
        return q.format('DD.MM.YY') + ' | ' + q.format('HH:mm')
      }
    },
    methods: {
      getWebinar () {
        this.$axios.get(this.$axios.baseURL + '/api/web/getweb/' + this.id)
          .then(response => {
            this.webinar = response.data.data
          })
      },
      sendQuestion () {
        this.loading = true
        const _id = this.id
        let data = {
          QuestionText: this.questionText,
          WebID: parseInt(_id)
        }
        this.$axios.post(this.$axios.baseURL + '/problem/new', data)
          .then(response => {
            if (this.file) {
              this.fileUpload(response.data.AnswerID, '/user/chat-webinar-messages/' + _id)
            } else {
              this.$router.push('/user/chat-webinar-messages/' + _id)
            }
          })
      },
      getProblem () {
        const _id = this.id
        this.$axios.get(this.$axios.baseURL + '/problem/get?web=' + _id)
          .then(response => {
            this.problem = response.data.data
            if (this.problem.length) {
              this.$router.push('/user/chat-webinar-messages/' + _id)
            }
          })
      }
    },
    mounted () {
      this.getProblem()
      this.getWebinar()
    }
  }
</script>
