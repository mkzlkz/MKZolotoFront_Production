<template>
  <div class="webinarsAdmin padding-30">
    <div class="title-flex mb-20">
      <div class="title">{{ $t('webinars') }}</div>
      <router-link to="/admin/create-webinar" class="button-blue"><img :src="require('@/assets/img/icon/plus.svg')"
                                                                       alt="">{{ $t('create') }}
      </router-link>
    </div>
    <div class="table-responsive">
      <table class="table table-main table-admin">
        <tr>
          <th class="width-1">{{ $t('nomination_webinar') }}</th>
          <th class="width-2">{{ $t('theme') }}</th>
          <th class="width-3">{{ $t('nomination_theme') }}</th>
          <th class="width-4">{{ $t('start_date') }}</th>
          <th class="width-5">{{ $t('duration_1') }}</th>
          <th class="width-6">{{ $t('examiner_fio_1') }}</th>
          <th class="width-7"></th>
          <th class="width-8"></th>
          <th class="width-9"></th>
        </tr>
        <tr v-for="webinar in webinars" :key="webinar.ID">
          <td class="width-1">{{webinar.Webinarname}}</td>
          <td class="width-2">{{webinar.Planname}}</td>
          <td class="width-3">{{webinar.Topicname}}</td>
          <td class="width-4">{{webinar.Startdate | momentDate}}</td>
          <td class="width-5">{{webinar.Duration}}мин</td>
          <td class="width-6">{{webinar.Teacher}}</td>
          <td class="width-7">
            <router-link :to="'/admin/edit-webinar/' + webinar.ID">
              <button class="button-blue-purple"><img :src="require('@/assets/img/icon/pencil.svg')" alt=""></button>
            </router-link>
          </td>
          <td class="width-8">
            <button class="button-pink-line" @click="deleteWebinar(webinar.ID)"><img :src="require('@/assets/img/icon/delete.svg')" alt=""></button>
          </td>
          <td class="width-9">
              <button class="button-blue-line"><img
                :src="require('@/assets/img/icon/eye.svg')" alt=""></button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'WebinarsAdmin',
  data () {
    return {
      webinars: []
    }
  },
  filters: {
    momentDate (date) {
      let q = moment(date)
      return q.format('DD.MM.YY') + ' | ' + q.format('HH:mm')
    }
  },
  mounted () {
    this.getWebinars()
  },
  methods: {
    getWebinars () {
      this.$axios.get(this.$axios.baseURL + '/api/web/getwebinars')
        .then(response => {
          this.webinars = response.data.data
        })
    },
    deleteWebinar (id) {
      this.$axios.delete(this.$axios.baseURL + '/api/web/deleteweb/' + id)
        .then(response => {
          this.webinars = this.webinars.filter(e => e.ID !== id)
        })
    }
  }
}
</script>
