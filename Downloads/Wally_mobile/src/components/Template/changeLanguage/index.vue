<template>
  <div class="lang">
    <div
      v-for="(item, index) in langs"
      :key="index"
      :class="['item', {active: item.key === lang}]"
      @click="changeLanguage(item.key)">
      {{ item.value }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChangeLanguage',
  data: () => ({
    langs: [
      { value: 'Eng', key: 'en' },
      { value: 'Рус', key: 'ru' }
    ]
  }),
  computed: {
    lang () {
      const locale = localStorage.getItem('i18n')
      return locale || 'ru'
    }
  },
  methods: {
    changeLanguage (lang) {
      console.log('i18n', lang)
      localStorage.setItem('i18n', lang)
      window.location.reload()
    }
  }
}
</script>

<style scoped>
  .lang {
    display: flex;
    align-items: center;
  }

  .lang .item {
    font-family: Rubik-Light, sans-serif;
    font-size: 16px;
    color: #535875;
    line-height: 18px;
    padding: 0 4px;
    cursor: pointer;
  }

  .lang .item.active {
    color: #C0C1CC;
  }

  .lang .item:after {
    content: "/";
    color: #535875 !important;
  }

  .lang .item:last-child:after {
    content: none;
  }
</style>
