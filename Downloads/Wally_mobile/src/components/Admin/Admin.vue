<template>
    <div class="block">
    <div class="block-left">
        <aside2Component />
    </div>
    <div class="block-right">
    <header2Component />
        <router-view />
    </div>
    </div>
</template>

<script>
import header2Component from '@/components/Template/Header2Component.vue'
import aside2Component from '@/components/Template/Aside2Component.vue'
export default {
  name: 'Admin',
  components: {
    aside2Component,
    header2Component
  },
  created () {
    const locale = localStorage.getItem('i18n')
    this.$i18n.locale = locale || 'ru'
  }
}
</script>

<style scoped>

</style>
