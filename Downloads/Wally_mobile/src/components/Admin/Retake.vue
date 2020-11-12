<template>
  <div class="retake padding-30">
    <div class="title-flex mb-20">
      <div class="title">{{ $t('retakes') }}</div>
      <router-link to="/admin/create-retake" class="button-blue"><img :src="require('@/assets/img/icon/plus.svg')"
                                                                      alt="">{{ $t('create') }}
      </router-link>
    </div>
    <div class="table-responsive">
      <table class="table table-main">
        <tr>
          <th class="width-1">{{ $t('fio_small') }}</th>
          <th class="width-2">{{ $t('nomination_test') }}</th>
          <th class="width-3">{{ $t('class_room') }}</th>
          <th class="width-4">{{ $t('subject') }}</th>
          <th class="width-5">{{ $t('theme') }}</th>
          <th class="width-6">{{ $t('retake_date') }}</th>
          <th class="width-7"></th>
          <th class="width-8"></th>
        </tr>
        <tr v-for="(retake, index) in retakes" :key="index">
          <td class="width-1">{{retake.User.Fullname}}</td>
          <td class="width-2">{{retake.Test.Test}}</td>
          <td class="width-3">{{retake.User.Department}}</td>
          <td class="width-4">{{retake.User.Duty}}</td>
          <td class="width-5">{{retake.Test.Plan}}</td>
          <td class="width-6">{{retake.Date | momentDate}}</td>
          <td class="width-7">
            <router-link tag="button" :to="'/admin/edit-retake/' + retake.ID" class="button-blue-purple"><img :src="require('@/assets/img/icon/pencil.svg')" alt=""></router-link>
          </td>
          <td class="width-8">
            <button @click="deleteRetake(retake.ID)" class="button-pink-line"><img :src="require('@/assets/img/icon/delete.svg')" alt=""></button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Retake',
  data () {
    return {
      retakes: []
    }
  },
  filters: {
    momentDate (date) {
      let q = moment(date)
      return q.format('DD.MM.YY') + ' | ' + q.format('HH:mm')
    }
  },
  mounted () {
    this.getRetakes()
  },
  methods: {
    getRetakes () {
      this.$axios.get(this.$axios.baseURL + '/api/retake/get')
        .then(response => {
          this.retakes = response.data.exam
        })
    },
    deleteRetake (id) {
      this.$axios.delete(this.$axios.baseURL + '/api/retake/delete/id:' + id)
        .then(response => {
          this.retakes = this.retakes.filter(e => e.ID !== id)
        })
    }
  }
}
</script>
