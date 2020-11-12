<template>
  <div class="questions padding-30">
    <div class="title-flex mb-20">
      <div class="title">{{ $t('questions') }}</div>
      <div class="dflex">
        <a href="" class="button-gray-line"><img :src="require('@/assets/img/icon/import.svg')" alt="">{{ $t('export') }}</a>
        <a href="" class="button-gray-line"><img :src="require('@/assets/img/icon/import.svg')" alt="">{{ $t('import') }}</a>
        <router-link to="/admin/create-question" class="button-blue"><img :src="require('@/assets/img/icon/plus.svg')"
                                                                          alt="">{{ $t('create') }}
        </router-link>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-main">
        <tr>
          <th class="width-1">{{ $t('question_text') }}</th>
          <th class="width-2">{{ $t('timetable') }}</th>
          <th class="width-3">{{ $t('nomination_test') }}</th>
          <th class="width-4">{{ $tc('question', 0)}} №</th>
          <th class="width-5"></th>
        </tr>
        <tr v-for="(question, index) in questions" :key="index">
          <td class="width-1">{{question.Question}}</td>
          <td class="width-2">{{question.Plan}}</td>
          <td class="width-3">{{question.Test}}</td>
          <td class="width-4">{{question.Position}}</td>
          <td class="width-5">
            <router-link :to="'/admin/edit-question/' + question.ID">
              <button class="button-blue-purple"><img :src="require('@/assets/img/icon/pencil.svg')" alt=""></button>
            </router-link>
          </td>
          <td class="width-5">
            <button @click="deleteQuestion(question.ID)" class="button-pink-line">
              <img :src="require('@/assets/img/icon/delete.svg')" alt="">
            </button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Questions',
  data () {
    return {
      questions: []
    }
  },
  created () {
    this.getQuestions()
  },
  methods: {
    getQuestions () {
      this.$axios.get(this.$axios.baseURL + '/api/question/getquestions')
        .then(response => {
          this.questions = response.data.data
        })
    },
    deleteQuestion (id) {
      this.$axios.delete(this.$axios.baseURL + '/api/question/deletequestion/' + id)
        .then(resp => {
          this.questions = this.questions.filter(e => e.ID !== id)
        })
    }
  }
}
</script>

<style scoped>

</style>
