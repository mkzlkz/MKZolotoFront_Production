<template>
<div class="auth">
        <div class="auth-form">
            <div class="file">
                <label for=""><span>Выбрать ЭЦП</span> <img :src="require('@/assets/img/icon/download.svg')" alt=""></label>
                <input type="file">
            </div>
            <input type="text" placeholder="ФИО Экзаменатора">
            <input type="password" placeholder="Введите пароль ЭЦП">
            <button class="button-blue" @click="$router.push('/admin/exam-results')">Подписать табель</button>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'edsAuthorization'
  }
</script>

<style scoped>

</style>
