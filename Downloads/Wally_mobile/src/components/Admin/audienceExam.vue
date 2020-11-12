<template>
  <div class="role padding-30">
    <div class="title-flex mb-20">
      <div class="title">{{ $t('audience_exam') }}</div>
      <router-link to="/admin/create-audience-exam" class="button-blue"><img
        :src="require('@/assets/img/icon/plus.svg')" alt="">{{ $t('create') }}
      </router-link>
    </div>
    <div class="table-responsive">
      <table class="table table-main spa-table">
        <tr></tr>
        <tr class="border" v-for="audience in  audiences" :key="audience.ID">
          <td class="width-1">{{audience.Fullname}}</td>
          <td class="width-2">{{audience.Username}}</td>
          <td class="width-3">
            <router-link tag="button" :to="'/admin/edit-audience-exam/' + audience.ID" class="button-blue-purple"><img :src="require('@/assets/img/icon/pencil.svg')" alt=""></router-link>
          </td>
          <td class="width-4">
            <button class="button-pink-line" @click="deleteAudience(audience.ID)"><img :src="require('@/assets/img/icon/delete.svg')" alt=""></button>
          </td>
        </tr>
      </table>
    </div>
    <paginate
      v-model="page"
      :pageCount="pageCount"
      :clickHandler="onPageChange"
      :prevText="$t('prev')"
      :nextText="$t('next')"
      :containerClass="'pagination'"
      v-if="pageCount > 1"
    >
    </paginate>
  </div>
</template>

<script>
export default {
  name: 'audienceExam',
  data () {
    return {
      audiences: [],
      page: 1,
      pageCount: 1
    }
  },
  methods: {
    getAudiences () {
      this.$axios.get(this.$axios.baseURL + '/api/user/getusers?role=5&page=' + this.page)
        .then(response => {
          this.audiences = response.data.data
        })
    },
    deleteAudience (id) {
      this.$axios.delete(this.$axios.baseURL + '/api/user/deleteuser/' + id)
        .then(response => {
          this.audiences = this.audiences.filter(e => e.ID !== id)
        })
    },
    onPageChange () {
      this.getAudiences()
    }
  },
  mounted () {
    this.getAudiences()
  }
}
</script>
