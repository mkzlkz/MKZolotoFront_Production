<template>
<div>
  <header class="sidebar-menu" v-bind:class="{ open: isMenuOpen }" v-click-outside="closeMenu">
    <div class="mobile-menu-bar">
      <button type="button" class="btn btn-modal" data-toggle="modal" data-target="#myModal">
        <img src="../assets/img/icon/ic-more.svg" class="lock-img">
      </button>
      <img :src="`${user.Image}`" class="icon" v-if="user.Image">
       <img src="../assets/img/icon/user.png" class="icon" v-if="!user.Image">
    </div>
    <button class="mobile-menu-trigger" v-on:click="handleMenuOpen" >
      <img src="../assets/img/icon/more2@2x.png" class="more" v-if="isMenuOpen===false"/>
    </button>
    <div class="menu-list">
        <button class="mobile-menu-trigger" v-on:click="handleMenuOpen" >
      <img src="../assets/img/icon/more@2x.png" class="more" v-if="isMenuOpen===true"/>
    </button>
    <div class="logo">
      <a href="/">
        <img src="../assets/img/icon/group-4@2x.png" alt="Logo" />
      </a>
    </div>
    <nav class="nav">
      <router-link to="/main" exact v-if="isUser">
        <div class="nav-item" @click="closeMenu">
          <div class="selected">&nbsp;</div>
          <div class="nav-item-text">Главная</div>
        </div>
      </router-link>
      <router-link to="/plan" v-if="isUser">
        <div class="nav-item" @click="closeMenu">
          <div class="selected">&nbsp;</div>
          <div class="nav-item-text">План обучения</div>
        </div>
      </router-link>
      <router-link to="/test" v-if="isUser">
        <div class="nav-item" @click="closeMenu">
          <div class="selected">&nbsp;</div>
          <div class="nav-item-text">Экзамены и тесты</div>
        </div>
      </router-link>
      <router-link to="/webinars" v-if="isUser">
        <div class="nav-item" @click="closeMenu">
          <div class="selected">&nbsp;</div>
          <div class="nav-item-text">Вебинары</div>
        </div>
      </router-link>
      <router-link to="/media" v-if="isUser">
        <div class="nav-item" @click="closeMenu">
          <div class="selected">&nbsp;</div>
          <div class="nav-item-text">Медиафайлы</div>
        </div>
      </router-link>
            <router-link to="/webinars-instructor" v-if="isTeacher">
        <div class="nav-item" @click="closeMenu">
          <div class="selected">&nbsp;</div>
          <div class="nav-item-text">Вебинары</div>
        </div>
      </router-link>
            <router-link to="/questions-webinars" v-if="isTeacher">
        <div class="nav-item" @click="closeMenu">
          <div class="selected">&nbsp;</div>
          <div class="nav-item-text">Вопросы по вебинару</div>
        </div>
      </router-link>
    </nav>
     <div class="logout-mob">
       <button class="button-pink2-line" @click="logout">{{ $t('logout') }}</button>
     </div>
    </div>
  </header>
  <SignInModal></SignInModal>
  <div class="modal-backdrop show sidebar-backdrop" :id="clicked()"></div>
</div>
</template>

<script>
import axios from 'axios'
import SignInModal from '../components/SignInModal'
import ClickOutside from 'vue-click-outside'
export default {
    name: 'SidebarMenu',
    data() {
        return {
          isMenuOpen: false,
          regions: [],
          loading: false,
          user: []
        }
    },
    mounted () {
        this.getUser ()
    },
      computed: {
    isAdmin () {
      return this.user.RoleID === 1
    },
    isTeacher () {
      return this.user.RoleID === 4
    },
        isUser () {
      return this.user.RoleID === 3
    },
    isExaminer () {
      return this.user.RoleID === 2
    },
    isRegion () {
      return this.user.RoleID === 5
    }
  },
    methods: {
      getUser () {
        this.user = JSON.parse(localStorage.getItem('user'))
        // if (this.user.RoleID === 1 || this.user.RoleID === 4 || this.user.RoleID === 2) {
        //   this.$router.push('/webinar-main')
        // }
      },
      loaded () {
        this.loading = true
      },
      handleMenuOpen () {
        this.isMenuOpen = !this.isMenuOpen
        return this.isMenuOpen
      },
          logout () {
      localStorage.removeItem('user')
      this.$axios.defaults.headers.common['Authorization'] = ''
      location.href = '/'
    },
      closeMenu () {
        if(this.isMenuOpen === true) {
          this.isMenuOpen = !this.isMenuOpen
        }
      },
        clicked () {
          if(this.isMenuOpen === true) {
            return 'opened'
          } else {
            ''
          }
        }
    },
    components: {
      SignInModal
    },
    directives: {
      ClickOutside
  }
}
</script>

<style scoped="">
  .logout-mob{
padding: 0 20px;
margin-bottom: 20px;
    width: 100%;
  }
</style>
