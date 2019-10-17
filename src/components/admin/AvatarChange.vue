<template>
    <div class="avatarChange">
        <div id="modalAvatar" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                                            <div class="av-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><img :src="require('@/assets/img/close.svg')" alt=""></button>
                        <div class="modal-title">Смена аватарки</div>
                    </div>
                        <div class="av-change">
                            <div class="img">
                                <img :src="require('@/assets/img/user.svg')" alt="">
                            </div>
                            <button>Загрузить изображение</button>
                        </div>
                        <div class="av2-change">
                            <div class="title">Возьми себе одну из наших аватарок <img :src="require('@/assets/img/icon/avatar.svg')" alt=""></div>
                            <div class="av-list">
                                <img :src="require('@/assets/img/icon/avi.svg')" alt="">
                                <img :src="require('@/assets/img/icon/avi.svg')" alt="">
                                <img :src="require('@/assets/img/icon/avi.svg')" alt="">
                                <img :src="require('@/assets/img/icon/avi.svg')" alt="">
                                <img :src="require('@/assets/img/icon/avi.svg')" alt="">
                                <img :src="require('@/assets/img/icon/avi.svg')" alt="">
                                <img :src="require('@/assets/img/icon/avi.svg')" alt="">
                                <img :src="require('@/assets/img/icon/avi.svg')" alt="">
                            </div>
                            <button class="button-orange">Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AvatarChange"
    }
</script>

<style scoped>

</style>
