<template>
    <div class="block">
    <div class="block-left">
        <asideComponent />
    </div>
    <div class="block-right">
    <headerComponent />
        <router-view />
    </div>
    </div>
</template>

<script>
import headerComponent from '@/components/Template/HeaderComponent.vue'
import asideComponent from '@/components/Template/AsideComponent.vue'
export default {
  name: 'User',
  components: {
    asideComponent,
    headerComponent
  },
  created () {
    const locale = localStorage.getItem('i18n')
    this.$i18n.locale = locale || 'ru'
  }
}
</script>

<style scoped>

</style>
