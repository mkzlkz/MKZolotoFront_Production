<template>
  <div class="questionsWebinarsUsers new-chat-class webinar-chat">
    <loader v-if="!problems" />
    <h3 v-else-if="problems.length === 0">Список вопросов пуст</h3>

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

          <span class="blue-purple name">{{problem.User.Fullname}}</span>
          <span class="gray duty">{{problem.User.Duty}}</span>
          <span class="red" v-if="problem.Read === false">1</span>
          <span class="gray date">{{problem.CreatedAt | momentDate}}</span>
        </div>
      </div>
    </div>

    <div class="chat-right" v-if="showShat">
      <div class="btn-close"  @click="closeChat()">Закрыть</div>
      <div class="chat-messages text">
        <div class="chat-right-title" v-if="webinar">
          <div class="mr-50">{{webinar.Webinarname}}</div>
          <div><span>{{ $t('webinar_date') }}:</span> {{webinar.Startdate | momentDate}}</div>
        </div>
        <div class="messages bx6" v-for="answer in chat" :key="answer.ID" v-if="answer.User && answer.User.ID" :class="answer.User.RoleID === 3 ? '' : 'blue'">
          <div class="messages-title">
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
          class="new-upload"
           :class="answer.User.RoleID === 3 ? '' : 'blue'"
          />
        </div>
      </div>
      <div class="send">
          <textarea-autosize
            class="textarea-chat"
            placeholder="Задать вопрос"
            v-model="questionText"
            :min-height="32"
            :max-height="64"
            v-if="!file"
            />
          <actions @submit="sendAnswer" :loading="loading" />
      </div>
    </div>
  </div>
</div>
</template>

<script>

  import webinarChatMixin from '../mixins/webinarChatMixin'
  import moment from 'moment'
  export default {
    name: 'WebinarQuestionsUsers',
    mixins: [webinarChatMixin],
    components: {
      loader: () => import('../components/Template/Loader'),
      actions: () => import('../components/Template/webinarAction')
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
        loading: true,
        showShat: false
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
        this.getWebinar(this.activeProblem.WebID);
        this.showShat = true;
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
      },
      closeChat(){
        console.log(1)
        this.showShat = false
      }
    }
  }
</script>
