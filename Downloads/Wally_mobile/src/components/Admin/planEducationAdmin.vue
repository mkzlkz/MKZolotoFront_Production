<template>
    <div class="planEducationAdmin padding-30">
        <div class="title-flex mb-20">
            <div class="title">{{ $t('timetable') }}</div>
            <div class="dflex">
                <a href="" class="button-gray-line"><img :src="require('@/assets/img/icon/import.svg')" alt="">{{ $t('export') }}</a>
                <a href="" class="button-gray-line"><img :src="require('@/assets/img/icon/import.svg')" alt="">{{ $t('import') }}</a>
                <router-link to="/admin/create-plan" class="button-blue"><img :src="require('@/assets/img/icon/plus.svg')" alt="">{{ $t('create_plan') }}</router-link>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table table-main">
                <tr>
                  <th class="width-1">{{ $t('theme') }}</th>
                  <th class="width-2">{{ $t('occupational_professions') }}</th>
                  <th class="width-3">{{ $t('themes_count') }}</th>
                  <th class="width-4">{{ $t('students') }}</th>
                  <th class="width-5">{{ $t('education_times') }}</th>
                  <th class="width-6">{{ $t('description') }}</th>
                  <th class="width-7"></th>
                  <th class="width-8"></th>
                </tr>
                <tr v-for="(plan, index) in plans" :key="index">
                    <td class="width-1">{{plan.Plan}}</td>
                    <td class="width-2">
                        <span class="button-blue-purple">Выбрано: {{plan.Duty.split(',').length}}</span>
                    </td>
                    <td class="width-3">{{plan.Topiccount}}</td>
                    <td class="width-4">{{plan.Studentcount}}</td>
                    <td class="width-5">{{plan.Totalhour}}ч</td>
                    <td class="width-6">{{plan.Description}}</td>
                    <td class="width-7">
                        <router-link :to="'/admin/edit-plan/' + plan.ID">
                            <button  class="button-blue-purple"><img :src="require('@/assets/img/icon/pencil.svg')" alt=""></button>
                        </router-link>
                    </td>
                    <td class="width-8">
                        <button @click="deletePlan(plan.ID)" class="button-pink-line"><img :src="require('@/assets/img/icon/delete.svg')" alt=""></button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
export default {
  name: 'planEducationAdmin',
  data () {
    return {
      'plans': []
    }
  },
  mounted () {
    this.getPlans()
  },
  methods: {
    getPlans () {
      this.$axios.get(this.$axios.baseURL + '/api/subject/getplans')
        .then(response => {
          this.plans = response.data.data
        })
    },
    deletePlan (id) {
      this.$axios.delete(this.$axios.baseURL + '/api/subject/deleteplan/' + id)
        .then(response => {
          this.plans = this.plans.filter(e => e.ID !== id)
        })
    }
  }
}
</script>
