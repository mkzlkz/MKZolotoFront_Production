<template>
  <div class="aside">
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
            <ul class="nav nav-pills nav-stacked">
              <li>
                <router-link to="/user/main"><img :src="require('@/assets/img/icon/main.svg')" alt="">{{ $t('main') }}
                </router-link>
              </li>
              <li>
                <router-link to="/user/plan-education"><img :src="require('@/assets/img/icon/plan.svg')" alt="">{{ $t('educationPlan') }}
                </router-link>
              </li>
              <li>
                <router-link to="/user/tests"><img :src="require('@/assets/img/icon/exam.svg')" alt="">{{ $t('tests') }}
                </router-link>
              </li>
              <li>
                <router-link to="/user/webinars"><img :src="require('@/assets/img/icon/vebinar.svg')" alt="">{{ $t('webinars') }}
                </router-link>
              </li>
              <li v-if="1==2">
                <router-link to="/user/scorm-package"><img :src="require('@/assets/img/icon/scorm.svg')" alt="">{{ $t('scorm_package') }}
                </router-link>
              </li>
              <li v-if="1==2">
                <router-link to="/user/vr"><img :src="require('@/assets/img/icon/vr.svg')" alt=""> VR</router-link>
              </li>
              <li>
                <router-link to="/user/media-files"><img :src="require('@/assets/img/icon/media.svg')" alt="">
                  {{ $t('mediafiles') }}
                </router-link>
              </li>
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
  name: 'asideComponent',
  methods: {
    logout () {
      location.href = '/'
    }
  }
}
</script>

<style scoped>

</style>
