<template>
    <div class="createPlan padding-30">
        <div class="title"><router-link to="/admin/plan-education">
          <img :src="require('@/assets/img/icon/back.svg')" alt="" class="img"></router-link>
          {{ $t('Создать Курс') }}</div>

    <div class="bg-white createPlan-form">
      <div class="form">
        <div class="form-1">
          <span>{{ $t('education_plan_name') }}</span>
          <textarea :placeholder="$t('nomination_plan')" v-model="name"></textarea>
        </div>
        <div class="form-1">
          <span>{{ $t('professions_list') }}</span>
          <textarea :placeholder="$t('professions_list')" v-model="Duty"></textarea>
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
        <Button :text="$t('create')" @click="createPlan" :loading="loading"/>
        <small class="text-danger" v-if="error">{{error}}</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreatePlan',
  components: {
    Button: () => import('../Template/Button')
  },
  data: function () {
    return {
      certificates: [],
      name: '',
      description: '',
      Duty: '',
      CertificateID: 0,
      error: '',
      type: '',
      loading: false
    }
  },
  mounted: function () {
    this.getCertificates()
  },
  methods: {
    getCertificates () {
      this.$axios.get(this.$axios.baseURL + '/api/cer/getcers')
        .then(response => {
          this.certificates = response.data.data
          this.CertificateID = this.certificates[0].ID
        })
    },
    createPlan () {
      var formData = {
        'name': this.name,
        'description': this.description,
        'CertificateID': this.CertificateID,
        'Duty': this.Duty.split(','),
        'Types': this.type
      }
      this.loading = true
      this.$axios.post(this.$axios.baseURL + '/api/subject/newplan', formData)
        .then(response => {
          if (response.data.status) {
            this.$router.push( "/admin/plan-education")
          } else {
            this.loading = false
            this.error = response.data.message
          }
        })
    }
  }
}
</script>
