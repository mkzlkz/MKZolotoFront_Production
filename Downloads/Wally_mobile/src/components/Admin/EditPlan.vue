<template>
  <div class="createPlan padding-30">
    <div class="title">
      <router-link to="/admin/plan-education"><img :src="require('@/assets/img/icon/back.svg')" alt="" class="img">
      </router-link>
      {{ $t('change_plan') }}
    </div>

    <div class="bg-white createPlan-form">
      <div class="form">
        <div class="form-1">
          <span>{{ $t('education_theme') }}</span>
          <textarea :placeholder="$t('theme')" v-model="name"></textarea>
        </div>
        <div class="form-1">
          <span>{{ $t('item_list') }}</span>
          <textarea :placeholder="$t('item_list')" v-model="Duty"></textarea>
        </div>
        <div class="form-1">
          <span>{{ $t('certificate') }}</span>
          <select name="" id="" v-model="CertificateID">
            <option :value="cert.ID" v-for="(cert, index) in certificates" :key="index">{{cert.Name}}</option>
          </select>
        </div>
        <div class="form-1">
          <span>{{ $t('education_type') }}</span>
          <textarea :placeholder="$t('education_type')" v-model="type"></textarea>
        </div>
        <div class="form-1">
          <span>{{ $t('education_plan_description') }}</span>
          <textarea :placeholder="$t('short_description')" v-model="description"></textarea>
        </div>
        <button class="button-blue" @click="editPlan">{{ $t('save') }}</button>
        <small class="text-danger" v-if="error">{{error}}</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditPlan',
  data () {
    return {
      'certificates': [],
      'name': '',
      'description': '',
      'Duty': '',
      'CertificateID': 0,
      'error': '',
      'planId': this.$route.params.id,
      'type': ''
    }
  },
  mounted () {
    this.getPlan()
    this.getCertificates()
  },
  methods: {
    getCertificates () {
      this.$axios.get(this.$axios.baseURL + '/api/cer/getcers')
        .then(response => {
          this.certificates = response.data.data
        })
    },
    getPlan () {
      this.$axios.get(this.$axios.baseURL + '/api/subject/getplan/' + this.planId)
        .then(response => {
          let plan = response.data.data
          this.CertificateID = plan.CertificateID
          this.name = plan.Name
          this.Duty = plan.Duty.join(', ')
          this.description = plan.Description
          this.type = plan.Types
        })
    },
    editPlan () {
      var formData = {
        'name': this.name,
        'description': this.description,
        'CertificateID': this.CertificateID,
        'Duty': this.Duty.split(',')
      }
      this.$axios.put(this.$axios.baseURL + '/api/subject/updateplan/' + this.planId, formData)
        .then(response => {
          if (response.data.status) {
            this.$router.push('/admin/plan-education')
          } else {
            this.error = response.data.message
          }
        })
    }
  }
}
</script>
