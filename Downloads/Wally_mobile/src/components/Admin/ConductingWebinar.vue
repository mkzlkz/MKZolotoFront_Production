<template>
  <div class="certificates padding-30">
    <div class="title-flex mb-20">
      <div class="title">{{ $t('webinar_teachers') }}</div>
      <div class="title-flex">
        <a class="button-blue" style="margin-right: 16px" :href="report" download target="_blank">
          <img :src="require('@/assets/img/icon/plus.svg')" alt="">{{ $t('download_report') }}
        </a>
        <router-link to="/admin/create-recording-webinar" class="button-blue"><img
          :src="require('@/assets/img/icon/plus.svg')" alt="">{{ $t('create') }}
        </router-link>
      </div>
    </div>
    <div class="table-responsive" v-if="teachers">
      <table class="table table-main table-admin">
        <tr>
          <th class="width-1">{{ $t('fio_small') }}</th>
          <th class="width-2">{{ $t('registration_date') }}</th>
          <th class="width-3">{{ $t('teacher_login') }}</th>
          <th class="width-4"></th>
          <th class="width-5"></th>
        </tr>
        <tr v-for="(teacher, index) in teachers" :key="index">
          <td class="width-1">{{teacher.Fullname}}</td>
          <td class="width-2">10.03.19</td>
          <td class="width-3">{{teacher.Login}}</td>
          <td class="width-4">
            <router-link :to="'/admin/edit-recording-webinar/' + teacher.ID">
              <button class="button-blue-purple"><img :src="require('@/assets/img/icon/pencil.svg')" alt=""></button>
            </router-link>
          </td>
          <td class="width-5">
            <button @click="deleteTeacher(teacher.ID)" class="button-pink-line">
              <img :src="require('@/assets/img/icon/delete.svg')" alt="">
            </button>
          </td>
        </tr>
      </table>
    </div>
    <loader v-if="!teachers" />
  </div>
</template>

<script>
export default {
  name: 'ConductingWebinar',
  components: {
    loader: () => import('../Template/Loader')
  },
  data () {
    return {
      teachersList: null,
      report: ''
    }
  },
  mounted () {
    this.getTeachers()
    this.getReport()
  },
  computed: {
    teachers () {
      const list = this.teachersList
      if (!list) {
        return null
      }
      return list.sort((a, b) => b.ID - a.ID)
    }
  },
  methods: {
    getTeachers () {
      this.$axios.get(this.$axios.baseURL + '/api/user/getteachers')
        .then(response => {
          this.teachersList = response.data.data
        })
    },
    deleteTeacher (id) {
      this.$axios.delete(this.$axios.baseURL + '/api/user/deleteuser/' + id)
      this.teachersList = this.teachersList.filter(e => e.ID !== id)
    },
    getReport () {
      this.$axios.get(this.$axios.baseURL + '/api/report/teacher')
        .then(response => {
          this.report = response.data.data
        })
    }
  }
}
</script>
