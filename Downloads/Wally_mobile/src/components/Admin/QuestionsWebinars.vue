<template>
  <div class="questionsWebinars chat padding-30">
    <div class="title mb-20">Вопросы</div>
    <loader v-if="!problems" />
    <h3 v-else-if="problems.length === 0">Список вопросов путс</h3>
    <div class="chat-flex" v-else>
      <div class="chat-left">
        <div
          class="qw-1"
          :class="activeProblem.ID === problem.ID ? 'active' : ''"
          v-for="problem in problems"
          :key="problem.ID"
          @click="toggle(problem)"
        >
          <div class="qw1-title">
            <p>
              <span class="blue-purple">{{problem.User.Fullname}}</span>
              <span class="gray">{{problem.User.Duty}}</span>
            </p>
            <span class="gray">{{problem.CreatedAt | momentDate}}</span>
          </div>
          <div class="qw1-text">
            <p>
              <img :src="require('@/assets/img/icon/circle.svg')" alt="">
              <span>{{problem.QuestionText}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="chat-right">
        <div class="chat-messages">
          <div class="chat-right-title" v-if="webinar">
            <div class="mr-50"><span class="gray">{{ $t('webinar_name') }}:</span> {{webinar.Webinarname}}</div>
            <div><span class="gray">{{ $t('webinar_date') }}:</span> {{webinar.Startdate | momentDate}}</div>
          </div>
          <div class="messages" v-for="answer in chat" :key="answer.ID" v-if="answer.User && answer.User.ID">
            <div class="messages-title">
              <span :class="answer.User.RoleID === 3 ? 'blue-purple' : 'green'">{{answer.User.Fullname}}</span>
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
          <div class="chat-add-messages">
            <div class="title-c">Ответ: <span class="blue-purple">{{activeProblem.User.Fullname}}</span></div>
            <textarea v-model="questionText" style="border:1px solid #eee"></textarea>
            <actions @submit="sendAnswer" :loading="loading" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import webinarChatMixin from '../../mixins/webinarChatMixin'
  import moment from 'moment'
  export default {
    name: 'QuestionsWebinars',
    mixins: [webinarChatMixin],
    components: {
      loader: () => import('../Template/Loader'),
      actions: () => import('../Template/webinarAction')
    },
    data () {
      return {
        problems: null,
        activeProblem: {
          ID: 0,
          Answer: []
        },
        user: JSON.parse(localStorage.getItem('user')),
        questionText: null,
        webinar: null,
        loading: true
      }
    },
    filters: {
      momentDate (date) {
        let q = moment(date)
        return q.format('DD.MM.YY') + ' | ' + q.format('HH:mm')
      }
    },
    mounted () {
      this.getProblem()
    },
    computed: {
      chat () {
        const problem = this.activeProblem.Answer
        return problem ? problem.sort((a, b) => a.ID - b.ID) : []
      }
    },
    methods: {
      async getProblem (activeID = null) {
        await this.$axios.get(this.$axios.baseURL + '/problem/get')
          .then(response => {
            this.problems = response.data.data
            if (response.data.data.length > 0) {
              const activeProblem = () => {
                if (activeID) {
                  const find = this.problems.find(i => i.ID === activeID)
                  return find || this.problems[0]
                }
                return this.problems[0]
              }
              this.activeProblem = activeProblem()
              this.getWebinar(this.activeProblem.WebID)
              this.loading = false
            }
          })
      },
      toggle (problem) {
        this.activeProblem = problem
        this.getWebinar(this.activeProblem.WebID)
      },
      sendAnswer () {
        this.loading = true
        const data = {
          AnswerText: this.questionText,
          ProblemID: this.activeProblem.ID
        }
        this.$axios.post(this.$axios.baseURL + '/problem/answer/new', data)
          .then(response => {
            if (this.file) {
              this.fileUpload(response.data.data.ID).then(() => {
                this.questionText = null
                this.getProblem(data.ProblemID)
              })
            } else {
              this.questionText = null
              this.getProblem(data.ProblemID)
            }
          })
      },
      getWebinar (id) {
        this.$axios.get(this.$axios.baseURL + '/api/web/getweb/' + id)
          .then(response => {
            this.webinar = response.data.data
          })
      }
    }
  }
</script>
