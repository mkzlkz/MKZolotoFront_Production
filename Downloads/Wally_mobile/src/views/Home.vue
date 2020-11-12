<template>
    <div class="container home">
        <a class="btn btn-home text-left" href="/plan">План обучения</a>
        <a class="btn btn-home text-left" href="/test">Экзамены и тесты</a>
        <a class="btn btn-home text-left" href="/webinars">Вебинары</a>
        <a class="btn btn-home text-left" href="/">Медиафайлы</a>
    </div>
</template>
<script>
export default {
    name: 'Home',
    data () {
        return {
            user: {},
            userInfo: {},
            plan: {}
        }
    },
    mounted () {
        // this.getUser ()
    },
    methods: {
        // getUser () {
        //     this.user = JSON.parse(localStorage.getItem('user'))
        //     if (this.user.RoleID === 1 || this.user.RoleID === 4 || this.user.RoleID === 2) {
        //         this.$router.push('/webinar-main')
        //     }
        // }
    }
}
</script>