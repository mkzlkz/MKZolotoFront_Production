<template>
  <div>
    <div class="webinar-exams padding-30">
      <div class="title">
        <router-link :to="'/admin/start-webinar/' + id"><img :src="require('@/assets/img/icon/back.svg')" alt="" class="img">
        </router-link>
        {{ $t('tests') }}
      </div>

      <div class="table-responsive">
        <table class="table table-main table-admin">
          <tr>
            <th>{{ $t('nomination_test') }}</th>
            <th>{{ $t('nomination_theme') }}</th>
            <th>{{ $t('duration_1') }}</th>
            <th>{{ $tc('question', 10) }}</th>
            <th></th>
          </tr>
          <tr v-for="(test, index) in tests" :key="index">
            <td>{{test.Test}}</td>
            <td>{{test.Topic}}</td>
            <td>{{test.Duration}} {{ $t('min') }}</td>
            <td>{{test.Questions}}</td>
            <td class="span-td" v-if="test.Status === 'Пройден'">
              <span>{{ $t('completed_exam') }}</span><span>20 {{ $t('of') }} 30</span>
            </td>
            <td v-if="test.Status === 'Ожидается'">
              <button class="button-blue" data-toggle="modal" data-target="#Modal2" @click="startTest(test.ID)">{{ $t('start_testing') }}</button>
            </td>
            <td v-if="test.Status !== 'Ожидается'"><span class="empty"></span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="modal-window">
      <div id="Modal2" class="modal fade">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
              <div class="md-title">{{ $t('testing_started') }}</div>
              <button class="button-blue" data-dismiss="modal">Ок</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WebinarExams',
  data () {
    return {
      id: this.$route.params.id,
      tests: []
    }
  },
  methods: {
    getWebinarTest () {
      this.$axios.get(this.$axios.baseURL + '/api/test/webinar/id:' + this.id)
        .then(response => {
          this.tests = response.data.data
        })
    },
    startTest (id) {
      this.$axios.post(this.$axios.baseURL + '/api/test/starttest', {TestID: id})
        .then(response => {
          this.getWebinarTest()
        })
    }
  },
  mounted () {
    this.getWebinarTest()
  }
}
</script>
