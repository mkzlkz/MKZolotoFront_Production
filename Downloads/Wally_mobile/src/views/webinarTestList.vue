<template>
  <div class="testList padding-30">
    <div class="title">
      <router-link :to="'/webinar-view/' + id"><img :src="require('@/assets/img/icon/back.svg')" alt="" class="img">
      </router-link>
      {{ $t('tests') }}
    </div>
    <div class="table-responsive" v-if="tests">
      <table class="table table-main">
        <tr>
          <th>{{ $t('nomination_test') }}</th>
          <th>{{ $t('nomination_theme') }}</th>
          <th>{{ $t('duration_1') }}</th>
          <th>{{ $tc('question', 10) }}</th>
          <th>{{ $t('status') }}</th>
          <th>{{ $t('results') }}</th>
        </tr>
        <tr v-for="(test, index) in tests" :key="index">
          <td>{{test.Test}}</td>
          <td>{{test.Topic}}</td>
          <td>{{test.Duration}} {{ $t('min') }}</td>
          <td>{{test.Questions}}</td>
          <td><span :class="statusClass(test)">{{test.Status}}</span></td>
          <td v-if="test.Status === 'Пройден' || test.Status === 'Не пройден'">
            <span class="result-text">Результат {{testResult(test)}}%</span>
            <span class="result">
                <span class="green">+{{test.Result}}</span>
                <span class="purple">/</span>
                <span class="pink">-{{test.Questions - parseInt(test.Result)}}</span>
              </span>
          </td>
          <td v-if="test.Status === 'В процессе'">
            <button class="button-blue" data-toggle="modal" data-target="#Modal2" @click="activeTest = test">{{ $t('start_testing') }}</button>
          </td>
          <td v-if="test.Status === 'Ожидается'">- - -</td>
        </tr>
        <tr v-if="exam">
          <td>{{exam.Name}}</td>
          <td>{{exam.Topic}}</td>
          <td>{{exam.Duration}}</td>
          <td>{{exam.Questions}}</td>
          <td><span :class="statusClass(exam)">{{exam.Status}}</span></td>
          <td v-if="exam.Status === 'Пройден' || exam.Status === 'Не пройден'">
            <span class="result-text">Результат {{testResult(exam)}}%</span>
            <span class="result">
              <span class="green">+{{exam.Result}}</span>
              <span class="purple">/</span>
              <span class="pink">-{{exam.Questions - parseInt(exam.Result)}}</span>
            </span>
          </td>
          <td v-if="test.Status === 'В процессе'">
            <button class="button-blue" data-toggle="modal" data-target="#Modal2" @click="activeTest = exam">{{ $t('start_exam') }}</button>
          </td>
          <td v-if="test.Status === 'Ожидается'">- - -</td>
        </tr>
      </table>
    </div>
    <div class="modal-testlist">
      <div id="Modal2" class="modal fade">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <div class="title-m">{{ $t('testing_time') }}</div>
              <button class="button-blue" @click="startTest()">{{ $t('start_testing') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loader v-if="!tests" />
  </div>
</template>

<script>
export default {
  name: 'testList',
  components: {
    loader: () => import('../Template/Loader')
  },
  data () {
    return {
      id: this.$route.params.id,
      tests: null,
      activeTest: {},
      exam: null
    }
  },
  methods: {
    routerPage () {
      location.replace('/user/testing')
    },
    getWebinarTests () {
      this.$axios.get(this.$axios.baseURL + '/api/test/webinar/id:' + this.id)
        .then(response => {
          this.tests = response.data.data
          let exam = response.data.exam
          if (exam.ID) {
            this.exam = exam
          }
        })
    },
    statusClass (test) {
      if (test.Status === 'Ожидается') {
        return 'blue'
      } else if (test.Status === 'Не пройден') {
        return 'pink'
      } else if (test.Status === 'Пересдача') {
        return 'orange'
      } else {
        return 'green'
      }
    },
    startTest () {
      this.$router.push({name: 'testing', params: {id: this.activeTest.ID, testInfo: this.activeTest}})
    },
    testResult (test) {
      let result = parseInt(test.Result)
      return Math.round((result * 100 / test.Questions) * 100) / 100
    }
  },
  mounted () {
    this.getWebinarTests()
  }
}
</script>
