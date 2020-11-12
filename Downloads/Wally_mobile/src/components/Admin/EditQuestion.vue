<template>
  <div class="createPlan padding-30">
    <div class="title">
      <router-link to="/admin/questions"><img :src="require('@/assets/img/icon/back.svg')" alt="" class="img">
      </router-link>
      {{ $t('change_question') }}
    </div>
    <div class="bg-white createPlan-form">
      <div class="form">
        <div class="form-1">
          <span>{{ $t('nomination_test') }}</span>
          <select name="tests" v-model="question.TestID">
            <option v-for="(test, index) in tests" :key="index" :value="test.ID">{{test.Test}}</option>
          </select>
        </div>
        <div class="form-1">
          <span>{{ $t('question_text') }}</span>
          <textarea :placeholder="$t('question_text')" v-model="question.Question"></textarea>
        </div>
        <div class="form-1">
          <span>{{ $t('photo') }} ({{ $t('optional') }})</span>
          <div class="form-file">
            <input type="text" placeholder="">
            <label for="file1">{{ $t('upload') }}<input type="file" id="file1"></label>
          </div>
        </div>
        <div class="form-1">
          <span>{{ $t('position_1') }}</span>
          <input type="number" :placeholder="$t('position_1')" name="position" v-model="question.Position" min="0">
        </div>
        <div class="form-1">
          <span>{{ $t('possible_answer') }} 1</span>
          <input type="text" :placeholder="$t('answer')" name="variantA" v-model="question.VariantA">
        </div>
        <div class="form-1">
          <span>{{ $t('possible_answer') }} 2</span>
          <input type="text" :placeholder="$t('answer')" name="variantB" v-model="question.VariantB">
        </div>
        <div class="form-1">
          <span>{{ $t('possible_answer') }} 3</span>
          <input type="text" :placeholder="$t('answer')" name="variantC" v-model="question.VariantC">
        </div>
        <div class="form-1">
          <span>{{ $t('possible_answer') }} 4</span>
          <input type="text" :placeholder="$t('answer')" name="variantD" v-model="question.VariantD">
        </div>
        <div class="form-1">
          <span>{{ $t('correct_answer') }}</span>
          <select name="correctAnswer" v-model="question.CorrectAnswer">
            <option value="A">{{ $t('possible_answer') }} 1</option>
            <option value="B">{{ $t('possible_answer') }} 2</option>
            <option value="C">{{ $t('possible_answer') }} 3</option>
            <option value="D">{{ $t('possible_answer') }} 4</option>
          </select>
        </div>
        <button class="button-blue" @click="update">{{ $t('change') }}</button>
        <small class="text-danger" v-if="error">{{error}}</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditQuestion',
  data () {
    return {
      question: {},
      questionId: this.$route.params.id,
      tests: [],
      error: ''
    }
  },
  methods: {
    getQuestion () {
      this.$axios.get(this.$axios.baseURL + '/api/question/getquestions?id=' + this.questionId)
        .then(response => {
          this.question = response.data.data[0]
        })
    },
    update () {
      let data = {
        TestID: this.question.TestID,
        QuestionText: this.question.Question,
        VariantA: this.question.VariantA,
        VariantB: this.question.VariantB,
        VariantC: this.question.VariantC,
        VariantD: this.question.VariantD,
        VariantE: this.question.VariantE,
        VariantF: this.question.VariantF,
        CorrectAnswer: this.question.CorrectAnswer,
        Position: this.question.Position
      }
      this.$axios.put(this.$axios.baseURL + '/api/question/updatequestion/' + this.questionId, data)
        .then(resp => {
          if (!resp.data.status) {
            this.error = resp.data.message
          } else {
            this.$router.push('/admin/questions')
          }
        })
    },
    getTests () {
      this.$axios.get(this.$axios.baseURL + '/api/exam/gettests')
        .then(response => {
          this.tests = response.data.data
        })
    }
  },
  created () {
    this.getQuestion()
    this.getTests()
  }
}
</script>
