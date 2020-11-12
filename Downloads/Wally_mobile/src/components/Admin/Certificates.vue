<template>
  <div class="certificates padding-30">
    <div class="title-flex mb-20">
      <div class="title">{{ $t('certificates') }}</div>
      <router-link to="/admin/create-certificate" class="button-blue"><img
        :src="require('@/assets/img/icon/plus.svg')" alt="">{{ $t('create') }}
      </router-link>
    </div>
    <div class="table-responsive" v-if="certificatesArr">
      <table class="table table-main table-admin certificates-table">
        <tr>
          <th class="width-1">{{ $t('nomination_certificate') }}</th>
          <th class="width-2">{{ $t('educationPlan') }}</th>
          <th class="width-3">{{ $t('nomination_file') }}</th>
          <th class="width-4"></th>
          <th class="width-5"></th>
        </tr>
        <tr v-for="cert in certificatesArr" :key="cert.ID">
          <td class="width-1">{{cert.Name}}</td>
          <td class="width-2">{{ $t('educationPlan') }}</td>
          <td class="width-3">{{cert.FileName}}</td>
          <td class="width-4">
            <router-link :to="'/admin/edit-certificate/' + cert.ID">
              <button class="button-blue-purple"><img :src="require('@/assets/img/icon/pencil.svg')" alt="">
              </button>
            </router-link>
          </td>
          <td class="width-5">
            <button @click="deleteCert(cert.ID)" class="button-pink-line"><img
              :src="require('@/assets/img/icon/delete.svg')" alt="">
            </button>
          </td>
        </tr>
      </table>
    </div>
    <loader v-if="!certificatesArr" />
  </div>
</template>

<script>
export default {
  name: 'Сertificates',
  components: {
    loader: () => import('../Template/Loader')
  },
  data () {
    return {
      certificatesArrList: null
    }
  },
  mounted () {
    this.getCertificates()
  },
  computed: {
    certificatesArr () {
      const list = this.certificatesArrList
      if (!list) {
        return null
      }
      return list.sort((a, b) => b.ID - a.ID)
    }
  },
  methods: {
    getCertificates () {
      this.$axios.get(this.$axios.baseURL + '/api/cer/getcers')
        .then(response => {
          this.certificatesArrList = response.data.data
        })
    },
    deleteCert (id) {
      this.$axios.delete(this.$axios.baseURL + '/api/cer/deletecer/' + id)
      this.certificatesArrList = this.certificatesArrList.filter(e => e.ID !== id)
    }
  }
}
</script>
