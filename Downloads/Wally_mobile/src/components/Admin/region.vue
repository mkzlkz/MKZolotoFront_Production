<template>
    <div class="webinars webinarView examForExaminer padding-30">
        <div class="bg-white padding-20 mb-10">
            <div class="title-n">{{ $t('nomination_exam') }}</div>
            <div class="table-responsive">
                <table class="table">
                    <tr><th class="width-1">{{ $t('examiner_name_surname') }}</th><th class="width-2">{{ $t('exam_start_date') }}</th><th class="width-3">{{ $t('passed_start_exam') }}</th><th class="width-4">{{ $t('before_exam_end') }}</th><th rowspan="2" class="width-5"><button class="button-blue" @click="$router.push('/user/chat-webinar')">{{ $t('complete_exam') }}</button></th></tr>
                    <tr><td class="width-1">{{ $t('examiner_fio') }}</td><td class="width-2">09.28.19 | 12:00</td><td class="width-3"><span class="blue">21:01:18</span></td><td class="width-4"><span class="blue">00:33:18</span></td></tr>
                </table>
            </div>
        </div>
        <div class="bg-white padding-20">
            <div class="region-content">
                <div class="title"><router-link to="/admin/exam-for-examiner"><img :src="require('@/assets/img/icon/back.svg')" alt="" class="img">{{ $t('prev') }}</router-link></div>
               <div class="reg">
                    <div class="tit">{{ $t('region') }}</div>
                <img :src="require('@/assets/img/region-lg.jpg')" alt="">
               </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'region'
}
</script>

<style scoped>

</style>
