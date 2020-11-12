<template>
  <div class="chat padding-30">
    <div class="title">
      <router-link to="/user/main"><img :src="require('@/assets/img/icon/back.svg')" alt="" class="img">
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
        <div class="chat-messages">

          <div class="messages" v-for="(answer, index) in chat" :key="index">

            <div class="messages-title">
              <span :class="problem.UserID === answer.User.ID ? 'green' : 'blue-purple'">{{answer.User.Fullname}}</span>
              <span class="gray">{{answer.CreatedAt | momentDate}}</span>
            </div>
            <p>{{answer.AnswerText}}</p>
            <uploadedFile
              v-if="answer.Documents"
              v-for="(doc, index) in answer.Documents"
              :key="index"
              :name="doc.Name"
              :mime="doc.type"
              :size="doc.Size"
              :url="doc.Path"
              :showDownload="true"
            />

          </div>
        </div>
        <div class="chat-add-messages">
          <div class="title-c">{{ $t('answer') }}: <span class="green">{{webinar.Teacher}}</span></div>
          <textarea v-model="questionText" style="border:1px solid grey"></textarea>
          <actions @submit="sendAnswer" :loading="loading" />
        </div>
      </div>
    </div>
    <loader v-if="!webinar && !problem" />
  </div>
</template>

<script>
  import webinarChatMixin from '../../mixins/webinarChatMixin'
  import moment from 'moment'
  export default {
    name: 'chatWebinarMessages',
    mixins: [webinarChatMixin],
    components: {
      actions: () => import('../Template/webinarAction'),
      loader: () => import('../Template/Loader')
    },
    data () {
      return {
        id: this.$route.params.id,
        webinar: null,
        problem: null,
        user: JSON.parse(localStorage.getItem('user')),
        questionText: null,
        loading: true
      }
    },
    filters: {
      momentDate (date) {
        let q = moment(date)
        return q.format('DD.MM.YY') + ' | ' + q.format('HH:mm')
      }
    },
    computed: {
      chat () {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return this.problem && this.problem.Answer ? this.problem.Answer.sort((a, b) => a.ID - b.ID) : []
      }
    },
    methods: {
      getWebinar () {
        this.$axios.get(this.$axios.baseURL + '/api/web/getweb/' + this.id)
          .then(response => {
            this.webinar = response.data.data
          })
      },
      async getProblem () {
        await this.$axios.get(this.$axios.baseURL + '/problem/get?web=' + this.id)
          .then(response => {
            this.problem = response.data.data[0]
            this.loading = false
          })
      },
      sendAnswer () {
        this.loading = true
        let data = {
          AnswerText: this.questionText,
          ProblemID: this.problem.ID
        }
        this.$axios.post(this.$axios.baseURL + '/problem/answer/new', data)
          .then(response => {
            if (this.file) {
              this.fileUpload(response.data.data.ID).then(() => {
                this.questionText = null
                this.getProblem()
              })
            } else {
              this.questionText = null
              this.getProblem()
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
