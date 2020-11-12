<template>
  <div class="aside admin-aside">
    <div class="logo"><img :src="require('@/assets/img/logo_kaztrans_oil.svg')" alt=""></div>
    <div class="menu">
      <nav>
        <div class="navbar nav-pills" role="navigation">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".sidebar-navbar-collapse">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>
          <div class="navbar-collapse collapse sidebar-navbar-collapse">
            <ul class="nav nav-pills nav-stacked admin-menu">
              <li v-if="isAdmin">
                <router-link to="/admin/statistics">{{ $t('statistics') }}</router-link>
              </li>
              <li v-if="isAdmin">
                <router-link to="/admin/visitors-log">{{ $t('visits_log') }}</router-link>
              </li>
              <li v-if="isAdmin">
                <router-link to="/admin/users">{{ $t('users') }}</router-link>
              </li>
              <li v-if="isAdmin">
                <router-link to="/admin/plan-education">{{ $t('educationPlan') }}</router-link>
              </li>
              <li v-if="isAdmin">
                <router-link to="/admin/themes">{{ $t('themes') }}</router-link>
              </li>
              <li v-if="isAdmin || isTeacher || isExaminer">
                <router-link to="/admin/tests">{{ $t('tests') }}</router-link>
              </li>
              <li v-if="isAdmin || isTeacher || isExaminer">
                <router-link to="/admin/questions">{{ $t('questions') }}</router-link>
              </li>
              <li v-if="(isAdmin  || isExaminer) ">
                <router-link to="/admin/retake">{{ $t('retakes') }}</router-link>
              </li>
              <li v-if="1===2 && (isAdmin || isTeacher || isExaminer)">
                <router-link to="/admin/exam">{{ $t('exams') }}</router-link>
              </li>
              <li v-if="1===2 && (isAdmin)">
                <router-link to="/admin/examiners">{{ $t('examiners') }}</router-link>
              </li>
              <li v-if="isExaminer">
                <router-link to="/admin/report-card">{{ $t('report_card') }}</router-link>
              </li>
              <li v-if="1===2 && isAdmin">
                <router-link to="/admin/report-card-administrator">{{ $t('admin_report_card') }}</router-link>
              </li>
              <li v-if="isAdmin || isTeacher || isExaminer">
                <router-link to="/admin/webinars">{{ $t('create_webinar') }}</router-link>
              </li>
              <li v-if="isAdmin">
                <router-link to="/admin/conducting-webinar">{{ $t('webinar_teachers') }}</router-link>
              </li>
              <li v-if="isTeacher">
                <router-link to="/admin/webinar">{{ $t('webinar') }}</router-link>
              </li>
              <li v-if="isTeacher">
                <router-link to="/admin/questions-webinars">{{ $t('webinar_questions') }}</router-link>
              </li>
              <li v-if="isAdmin">
                <router-link to="/admin/admin-questions">{{ $t('admin_questions') }}</router-link>
              </li>
              <li v-if="isAdmin">
                <router-link to="/admin/certificates">{{ $t('certificates') }}</router-link>
              </li>
              <li v-if="isAdmin">
                <router-link to="/admin/role">{{ $t('roles') }}</router-link>
              </li>
              <li v-if="1===2 && isAdmin">
                <router-link to="/admin/scorms">{{ $t('scorm_package') }}</router-link>
              </li>
              <li v-if="1===2 && isAdmin"><router-link to="/admin/audience-exam">{{ $t('audience_exam') }}</router-link></li>
              <li v-if="1===2 && isRegion"><router-link to="/admin/audience">{{ $t('audience') }}</router-link></li>
            </ul>
          </div>
        </div>
      </nav>
      <button class="button-pink2-line" @click="logout">{{ $t('logout') }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Aside2Component',
  data () {
    return {
      user: JSON.parse(localStorage.getItem('user'))
    }
  },
  computed: {
    isAdmin () {
      return this.user.RoleID === 1
    },
    isTeacher () {
      return this.user.RoleID === 4
    },
    isExaminer () {
      return this.user.RoleID === 2
    },
    isRegion () {
      return this.user.RoleID === 5
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('user')
      this.$axios.defaults.headers.common['Authorization'] = ''
      location.href = '/'
    }
  }
}
</script>
