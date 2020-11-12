<template>
  <div class="plan-education exam-tests padding-30">
    <div class="dflex-link">
      <div class="title">{{ $t('scorm_package') }}</div>
      <div class="link" v-if="isMainPage">
        <router-link to="/user/scorm-package">{{ $t('all_name', { name: $t('scorm_package') })}}</router-link>
      </div>
    </div>
    <div class="table-responsive" v-if="scorms">
      <table class="table table-main">
        <tr>
          <th>{{ $t('date') }}</th>
          <th>{{ $t('time') }}</th>
          <th>{{ $t('nomination') }}</th>
          <th>{{ $t('theme') }}</th>
          <th>{{ $t('duration') }}</th>
          <th>{{ $t('status') }}</th>
          <th colspan="2"></th>
        </tr>

        <tr class="border" v-for="scorm in scorms" :key="scorm.ID">
          <td>{{scorm.CreatedAt | momentDate}}</td>
          <td>{{scorm.CreatedAt | momentTime}}</td>
          <td>{{scorm.Name}}</td>
          <td><span v-if="scorm.Topic.ID">{{scorm.Topic.Name}}</span></td>
          <td>120 {{ $t('min') }}</td>
          <td><span class="pink">{{ $t('not_passed') }}</span></td>
          <td>
            <button class="button-blue" @click="$router.push('/user/scorm-package-iframe')">{{ $t('run') }}</button>
          </td>
        </tr>
      </table>
    </div>
    <loader v-if="!scorms" />
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'scormPackage',
  components: {
    loader: () => import('../Template/Loader')
  },
  data () {
    return {
      isMainPage: window.location.href.includes('user/main'),
      scormsList: null
    }
  },
  filters: {
    momentDate (date) {
      let q = moment(date)
      return q.format('DD.MM.YY')
    },
    momentTime (date) {
      return moment(date).format('HH:mm')
    }
  },
  computed: {
    scorms () {
      const list = this.scormsList
      if (!list) {
        return null
      }
      return list.sort((a, b) => b.ID - a.ID)
    }
  },
  methods: {
    getScorm () {
      this.$axios.get(this.$axios.baseURL + '/api/scorm/get')
        .then(response => {
          this.scormsList = response.data.data
        })
    }
  },
  mounted () {
    this.getScorm()
  }
}
</script>

<style scoped>

</style>
