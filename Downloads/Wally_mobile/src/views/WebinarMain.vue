<template>
    <div class="container webinarMain">
        <router-link class="btn btn-main" to="/webinars-instructor">
            Вебинары
        </router-link>
        <router-link to="/questions-webinars"  class="btn btn-main">
            Вопросы по вебинару
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'WebinarMain',
    data () {
        return {

        }
    }
}
</script>