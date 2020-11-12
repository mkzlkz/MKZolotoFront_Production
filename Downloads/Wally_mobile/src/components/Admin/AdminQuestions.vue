<template>
  <div class="questionsWebinars chat padding-30">
    <div class="title mb-20">{{ $t('admin_questions') }}</div>
    <div class="chat-flex" v-if="problems">
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
            <span class="gray">{{problem.CreatetAt | momentDate}}</span>
          </div>
          <div class="qw1-text">
            <p>
              <span>{{problem.QuestionText}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="chat-right">
        <div class="chat-messages">
          <div class="messages" v-for="answer in activeProblem.Answer" :key="answer.ID" v-if="answer.User && answer.User.ID">
            <div class="messages-title">
              <span :class="answer.User.RoleID === 3 ? 'blue-purple' : 'green'">{{answer.User.Fullname}}</span>
              <span class="gray">{{answer.CreatedAt | momentDate}}</span>
            </div>
            <p>{{answer.AnswerText}}</p>
          </div>
        </div>
      </div>
    </div>
    <loader v-if="!problems" />
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'AdminQuestions',
  components: {
    loader: () => import('../Template/Loader')
  },
  data () {
    return {
      problems: null,
      activeProblem: {
        ID: 0,
        Answer: []
      }
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
  methods: {
    getProblem () {
      this.$axios.get(this.$axios.baseURL + '/problem/get')
        .then(response => {
          this.problems = response.data.data
          this.activeProblem = this.problems[0]
        })
    },
    toggle (problem) {
      this.activeProblem = problem
    }
  }
}
</script>
