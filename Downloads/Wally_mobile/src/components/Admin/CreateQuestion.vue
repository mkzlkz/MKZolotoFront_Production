<template>
  <div class="createPlan padding-30">
    <div class="title">
      <router-link to="/admin/questions"><img :src="require('@/assets/img/icon/back.svg')" alt="" class="img">
      </router-link>
      {{ $t('new_question') }}
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
          <textarea :placeholder="$t('question_text')" v-model="question.QuestionText"></textarea>
        </div>

        <uploadFiles
          v-model="file"
          :title="`${$t('photo')} (${$t('optional')})`"
          :uploadFileSize="1000000"
          :mimeType="['image/jpeg', 'image/png']"
          :help="$t('max_upload', { size: `1 ${$t('size.mb')}` })"
        />

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
        <Button :text="$t('create')" @click="create" :loading="loading"/>
        <small class="text-danger" v-if="error">{{error}}</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateQuestion',
  components: {
    uploadFiles: () => import('../Template/uploadFile'),
    Button: () => import('../Template/Button')
  },
  data () {
    return {
      tests: null,
      photosTitle: '',
      file: [],
      question: {
        TestID: null,
        QuestionText: null,
        VariantA: null,
        VariantB: null,
        VariantC: null,
        VariantD: null,
        VariantE: '',
        VariantF: '',
        CorrectAnswer: 'A',
        Position: null
      },
      error: '',
      loading: false
    }
  },
  created () {
    this.getTests()
    this.setCreatedAnswerData()
  },

  methods: {
    create () {
      this.question.Position = parseInt(this.question.Position)
      this.loading = true
      this.$axios.post(this.$axios.baseURL + '/api/question/new', this.question)
        .then(response => {
          if (response.data.data) {
            let id = response.data.data.ID
            this.loading = false
            if (this.photosTitle) {
              let formData = new FormData()
              formData.append('file', this.file[0])
              formData.append('QuestionID', id)
              this.$axios.post(this.$axios.baseURL + '/uploadI', formData)
                .then(r => {
                  if (!r.data.status) {
                    this.loading = false
                    this.error = r.data.message
                  } else {
                    this.$router.push('/admin/questions')
                  }
                })
            } else {
              this.$router.push('/admin/questions')
            }
          } else {
            this.loading = false
            this.error = response.data.message
          }
        })
    },
    getTests () {
      this.$axios.get(this.$axios.baseURL + '/api/exam/gettests')
        .then(response => {
          this.tests = response.data.data
          this.question.TestID = this.tests[0].ID
        })
    },
    photoDetect () {
      this.file = this.$refs.file.files
      this.photosTitle = ''
      for (let i = 0; i < this.$refs.file.files.length; i++) {
        this.photosTitle += this.$refs.file.files[i].name + ' '
      }
    }
  },
  created () {
    this.getTests()
  }
}
</script>

<style scoped>
  .correct-answer {
    margin-top: 16px;
  }
</style>
