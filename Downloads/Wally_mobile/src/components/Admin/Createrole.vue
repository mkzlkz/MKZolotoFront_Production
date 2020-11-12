<template>
    <div class="createPlan padding-30">
        <div class="title"><router-link to="/admin/role"><img :src="require('@/assets/img/icon/back.svg')" alt="" class="img"></router-link>Новая роль</div>

        <div class="bg-white createPlan-form">
            <div class="form">
                <div class="form-1">
                    <span>{{ $t('login') }}</span>
                    <input type="text" :placeholder="$t('login')">
                </div>
                                <div class="form-1">
                    <span>{{ $t('password') }}</span>
                    <input type="text" :placeholder="$t('password')">
                </div>
                                <div class="form-1">
                    <span>Разделы</span>
                    <select name="" id="">
                        <option value="">Множественный выбор разделов</option>
                        <option value="">Множественный выбор разделов</option>
                    </select>
                    <div></div>
                </div>
                                <div class="form-1">
                    <span>IP Address</span>
                    <input type="text" placeholder="x.x.x.x">
                </div>
                <button class="button-blue">{{ $t('create') }}</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CreateRole'
}
</script>

<style scoped>

</style>
