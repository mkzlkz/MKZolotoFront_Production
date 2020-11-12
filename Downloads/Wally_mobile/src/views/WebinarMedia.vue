<template>
<div>
    <a class="btn btn-close" href="/webinars">Закрыть</a>
    <div class="container mediafiles" style="margin-top:0;">
        <div class="doc-container" v-for="doc in docs">
            <img src="../assets/img/icon/ic_file.png" class="file">
            <div class="doc">
                <p class="text">Документ 1</p>
                <p class="subtext">09:09</p>
            </div>
            <div class="load">
                <span>11мб</span>
                <button class="btn btn-download"><img src="../assets/img/icon/ic_download.png" class="img-load"></button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'WebinarMedia',
    data () {
        return {
            docs: [1,2,3] //для проверки верстки
        }
    }
}
</script>