<template>
    <div class="PageNotFound clearfix">
        <div class="pnf-flex">
            <div class="pnf-1">
                <img :src="require('@/assets/img/404.png')" alt="" class="img img-responsive">
                <div class="pnf-right">
                    <p>Похоже, мы не можем найти такую страницу.</p>
                <p>Код ошибки: 404</p>
                <p>Возможно вам пригодятся эти полезные ссылки:</p>
                <ul>
                    <li><router-link :to="{ path: '/' }">Посчитаем?</router-link></li>
                    <li><router-link :to="{ path: 'form' }">Пообщаемся?</router-link></li>
                    <li><router-link :to="{ path: 'location' }">Загляни к нам</router-link></li>
                </ul>
                </div>
            </div>
            <div class="pnf-2">
                <img :src="require('@/assets/img/404p.png')" alt="" class="img img-responsive">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PageNotFound'
    }
</script>

<style scoped>

</style>
