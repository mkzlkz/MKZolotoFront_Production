<template>
    <div class="createPlan padding-30">
        <div class="title"><router-link to="/admin/users"><img :src="require('@/assets/img/icon/back.svg')" alt="" class="img"></router-link>Новый медиафайл</div>

        <div class="bg-white createPlan-form">
            <div class="form">
                <div class="form-1">
                    <span>Наименование scorm пакета</span>
                    <input type="text" placeholder="Наименование scorm пакета">
                </div>
                                <div class="form-1">
                    <span>{{ $t('nomination_theme') }}</span>
                    <select name="" id="">
                        <option value="">{{ $t('nomination_theme') }}</option>
                        <option value="">{{ $t('nomination_theme') }}</option>
                    </select>
                </div>
                <div class="form-1">
                    <span>{{ $t('file') }}</span>
                    <div class="form-file">
                    <input type="text" placeholder="">
                    <label for="file">{{ $t('upload') }} <input type="file" id="file"></label>
                    </div>
                </div>
                <button class="button-blue">{{ $t('save') }}</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CreateMediaFile'
}
</script>

<style scoped>

</style>
