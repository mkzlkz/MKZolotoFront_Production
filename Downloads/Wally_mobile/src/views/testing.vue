<template>
  <div class="testing">
    <div class="testing-right">
      <div class="name" v-if="testInfo">{{testInfo.Name}}</div>
      <div class="date">
        <p>{{ $t('before_exam_end') }}: </p>
        <span>{{timeLeft}}</span>
      </div>
<div class="bg-white">
        <div class="number">{{currentQuestion + 1}} из {{questions.length}}</div>
      <div class="question">{{activeQuestion.QuestionText}}
      </div>
</div>
            <div class="img" v-if="activeQuestion.Image && activeQuestion.Image.ID">
        <img :src="'http://138.68.103.82:8085/' + activeQuestion.Image.Path" alt="">
      </div>
      <div class="answer-list">
        <div class="answer" v-for="(a, index) in activeAnswers" :key="index">
          <label class="ans"><span>{{a.text}}</span>
            <input type="radio" name="radio" :value="a.value" v-model="answer">
            <span class="checkmark"></span>
          </label>
        </div>
      </div>
      <div class="width-558">
        <button class="button-blue" @click="submitAnswer">{{btnText}}</button>
      </div>
      <button data-toggle="modal" data-target="#Modal2" ref="myBtn" style="display: none"></button>
    </div>
    <div class="modal-testlist">
      <div id="Modal2" class="modal fade">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <div class="title-m">{{ $t('test_time_up') }}</div>
              <router-link class="button-blue" to="/test">{{ $t('ok') }}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Testing',
  data () {
    return {
      answer: '',
      testId: parseInt(this.$route.params.id),
      questions: [],
      test: null,
      testInfo: null
    }
  },
  computed: {
    activeQuestion () {
      if (this.questions.length) {
        return this.questions[this.currentQuestion]
      } else {
        return {}
      }
    },
    activeAnswers () {
      if (this.questions.length) {
        let q = this.questions[this.currentQuestion]
        let r = []
        if (q.VariantA) {
          r.push({text: q.VariantA, value: 'A'})
        }
        if (q.VariantB) {
          r.push({text: q.VariantB, value: 'B'})
        }
        if (q.VariantC) {
          r.push({text: q.VariantC, value: 'C'})
        }
        if (q.VariantD) {
          r.push({text: q.VariantD, value: 'D'})
        }
        if (q.VariantE) {
          r.push({text: q.VariantE, value: 'E'})
        }
        if (q.VariantF) {
          r.push({text: q.VariantF, value: 'F'})
        }
        return this.shuffle(r)
      } else {
        return []
      }
    },
    currentQuestion () {
      return this.$store.state.test.currentQuestion
    },
    currentTimer () {
      return this.$store.state.test.lifetime
    },
    timeLeft () {
      let result = ''
      let lifetime = this.$store.state.test.lifetime
      let h = Math.floor(lifetime / 3600)
      h = h < 10 ? '0' + h : h
      let m = Math.floor((lifetime - h * 3600) / 60)
      m = m < 10 ? '0' + m : m
      let s = (lifetime - h * 3600 - m * 60)
      s = s < 10 ? '0' + s : s
      result += h ? h + ':' : ''
      result += m ? m + ':' : ''
      result += s
      return result
    },
    isTestRunning () {
      return this.$store.state.test.isRunning && (this.testId === this.$store.state.test.testId)
    },
    isLastQuestion () {
      return this.questions.length === this.currentQuestion + 1
    },
    btnText () {
      return 'Далее'
    }
  },
  watch: {
    currentTimer (newVal) {
      if (newVal === 0 && this.isTestRunning) {
        this.showModal()
        this.$store.commit('stopTest')
      }
    }
  },
  methods: {
    getTestQuestions () {
      this.$axios.get(this.$axios.baseURL + '/api/questions/test:' + this.testId)
        .then(response => {
          this.questions = response.data.data
          console.log(this.questions)
        })
    },
    getTest () {
      this.$axios.get(this.$axios.baseURL + '/api/exam/gettest/' + this.testId)
        .then(response => {
          this.test = response.data.data
          this.testInfo = response.data.data
          if (!this.isTestRunning) {
            this.$store.dispatch('setTimer', this.testInfo)
            this.$store.dispatch('startTest', this.testId)
          }
        })
    },
    submitAnswer () {
      let data = {
        QuestionID: this.activeQuestion.ID,
        TestID: this.testId,
        UserAnswer: this.answer
      }
      this.$axios.post(this.$axios.baseURL + '/api/answer/new', data)
      this.answer = null
      if (this.isLastQuestion) {
        this.$store.commit('stopTest')
        this.getTestResult()
      } else {
        this.$store.commit('setCurrentQuestion', this.currentQuestion + 1)
      }
    },
    getTestResult () {
      this.$axios.get(this.$axios.baseURL + '/api/gettestresult?test=' + this.testId)
        .then(response => {
          this.$router.push('/test')
        })
    },
    showModal () {
      const elem = this.$refs.myBtn
      elem.click()
    },
    shuffle (array) {
      var currentIndex = array.length, temporaryValue, randomIndex

      // While there remain elements to shuffle...
      while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        // And swap it with the current element.
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
      }

      return array
    }
  },
  mounted () {
    this.getTest()
    this.getTestQuestions()
  }
}
</script>
