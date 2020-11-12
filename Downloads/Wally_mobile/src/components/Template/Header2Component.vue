<template>
<div class="header">
    <img style="max-width:250px;" :src="require('@/assets/img/logo_wally_genius.svg')" alt="">
    <div class="_right">
      <ChangeLanguage />
      <div class="user">
          <p v-if="isAdmin">{{ $t('admin') }}</p>
          <p v-else>{{user.Fullname}}</p>
          <img v-if="user.Image && user.Image.length" :src="user.Image[0]" alt="">
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'Header2Component',
  data () {
    return {
      user: JSON.parse(localStorage.getItem('user'))
    }
  },
  components: {
    ChangeLanguage: () => import('./changeLanguage')
  },
  computed: {
    isAdmin () {
      return this.user.RoleID === 1
    },
    isTeacher () {
      return this.user.RoleID === 4
    }
  }
}
</script>

<style scoped>
  ._right {
    display: flex;
    align-items: center;
  }
  ._right .lang {
    padding-right: 33px;
  }
</style>
