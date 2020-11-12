<template>
  <div class="testsAdmin padding-30">
    <div class="title-flex mb-20">
      <div class="title">{{ $t('tests') }}</div>
      <div class="dflex">
        <a href="" class="button-gray-line"><img :src="require('@/assets/img/icon/import.svg')" alt="">{{ $t('export') }}</a>
        <a href="" class="button-gray-line"><img :src="require('@/assets/img/icon/import.svg')" alt="">{{ $t('import') }}</a>
        <router-link to="/admin/create-test" class="button-blue"><img :src="require('@/assets/img/icon/plus.svg')"
                                                                      alt="">{{ $t('create') }}
        </router-link>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-main">
        <tr>
          <th class="width-1">{{ $t('nomination_test') }}</th>
          <th class="width-2">{{ $t('timetable') }}</th>
          <th class="width-3">{{ $t('nomination_theme') }}</th>
          <th class="width-4">{{ $t('duration_2') }}</th>
          <th class="width-5">{{ $t('condition_passing') }}</th>
          <th class="width-6">{{ $tc('question', 10) }}</th>
          <th class="width-7">{{ $t('date') }}</th>
          <th class="width-8">{{ $t('time') }}</th>
          <th class="width-9">{{ $t('passed') }}</th>
          <th class="width-10">{{ $t('average_result') }}</th>
          <th class="width-11"></th>
          <th class="width-12"></th>
        </tr>
        <tr v-for="(test, index) in tests" :key="index">
          <td class="width-1">{{test.Test}}</td>
          <td class="width-2">{{test.Plan}}</td>
          <td class="width-3">{{test.Topic}}</td>
          <td class="width-4">{{test.Duration}}</td>
          <td class="width-5">>{{test.Passmarks}}%</td>
          <td class="width-6">{{test.Questions}}</td>
          <td class="width-7">{{test.Date.split('T')[0]}}</td>
          <td class="width-8">{{test.Date.split('T')[1].split("Z")[0]}}</td>
          <td class="width-9">{{ $t('passed') }}</td>
          <td class="width-10">{{test.Passed}}</td>
          <td class="width-11">
            <router-link :to="'/admin/edit-test/' + test.ID">
              <button class="button-blue-purple"><img :src="require('@/assets/img/icon/pencil.svg')" alt=""></button>
            </router-link>
          </td>
          <td class="width-12">
            <button @click="deleteTest(test.ID)" class="button-pink-line">
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
  name: 'TestsAdmin',
  data () {
    return {
      tests: []
    }
  },
  mounted () {
    this.getTests()
  },
  methods: {
    getTests () {
      this.$axios.get(this.$axios.baseURL + '/api/exam/gettests')
        .then(response => {
          this.tests = response.data.data
        })
    },
    deleteTest (id) {
      this.$axios.delete(this.$axios.baseURL + '/api/exam/deletetest/' + id)
        .then(response => {
          this.tests = this.tests.filter(e => e.ID !== id)
        })
    }
  }
}
</script>

<style scoped>

</style>
