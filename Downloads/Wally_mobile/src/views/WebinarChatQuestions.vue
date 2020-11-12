<template>
  <div>
    <div class="webinar-chat chat new-chat-class" v-if="webinar">
      <div class="btn-close" @click="nextPage">Закрыть</div>
      <div class="chat-flex">
        <div class="chat-right" style="width: 100%;">
          <div class="chat-messages text">
            <div class="bx6" v-for="(answer, index) in chat" :key="index" :class="problem.UserID === answer.User.ID ? '' : 'blue'">
              <p>{{answer.AnswerText}}</p>
              <span class="gray">{{answer.CreatedAt | momentDate}}</span>
              <uploadedFile
              class="new-upload"
              :class="problem.UserID === answer.User.ID ? '' : 'blue'"
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
          <div class="send">
            <!-- <textarea v-model="questionText" style="border:1px solid grey"></textarea> -->
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
      <loader v-if="!webinar && !problem" />
    </div>
  </div>
</template>

<script>
  import webinarChatMixin from '../mixins/webinarChatMixin'
  import moment from 'moment'
  export default {
    name: 'WebinarChatQuestions',
    mixins: [webinarChatMixin],
    components: {
      actions: () => import('../components/Template/webinarAction'),
      loader: () => import('../components/Template/Loader')
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
  nextPage(){
window.location.replace('/webinars')
  },
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
  this.getProblem();
  this.getWebinar();
}
}
</script>

<style scoped="">
  .textarea-chat{
    border: 1px solid #D5D5DC !important;
    border-radius: 3px;
    padding: 5px;
    margin: 0 !important;
  }
</style>
