<template>
  <div class="certificates padding-30">
    <div class="title-flex mb-20">
      <div class="title">{{ $t('scorm_package') }}</div>
      <router-link to="/admin/create-scorm" class="button-blue"><img
        :src="require('@/assets/img/icon/plus.svg')" alt="">{{ $t('create') }}
      </router-link>
    </div>
    <div class="table-responsive">
      <table class="table table-main table-admin">
        <tr></tr>
        <tr v-for="scorm in scorms" :key="scorm.ID">
          <td class="width-1">{{scorm.Name}}</td>
          <td class="width-2">{{scorm.Topic.Name}}</td>
          <td class="width-3"></td>
          <td class="width-4">
            <router-link :to="'/admin/edit-scorm/' + scorm.ID" tag="button" class="button-blue-purple"><img :src="require('@/assets/img/icon/pencil.svg')" alt=""></router-link>
          </td>
          <td class="width-5">
            <button @click="deleteScorm(scorm.ID)" class="button-pink-line"><img :src="require('@/assets/img/icon/delete.svg')" alt=""></button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Scorms',
  data () {
    return {
      scorms: []
    }
  },
  methods: {
    getScorms () {
      this.$axios.get(this.$axios.baseURL + '/api/scorm/get')
        .then(response => {
          this.scorms = response.data.data
        })
    },
    deleteScorm (id) {
      this.$axios.delete(this.$axios.baseURL + '/api/scorm/delete/id:' + id)
        .then(() => {
          this.scorms = this.scorms.filter(e => e.ID !== id)
        })
    }
  },
  mounted () {
    this.getScorms()
  }
}
</script>
