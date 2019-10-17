<template>
    <div class="editMyData">
                                <div v-if="loader" class="loader loader-admin">
            <img :src="require('@/assets/img/loader1.gif')" alt="">
        </div>
        <div class="emd">
            <div class="title">{{$t('change_details')}}</div>
            <div class="form-1">
                <p>{{$t('fio')}}</p>
                <div class="input-1">
                    <input type="text" name="input_un" :value="user.name" disabled>
                    <span><img :src="require('@/assets/img/icon/key.svg')" alt=""></span>
                </div>
            </div>
            <div class="form-1">
                <p>{{$t('date_birth')}}</p>
                <div class="input-1">
                    <input type="text" name="input_ub" :value="user.birthday" disabled>
                    <span><img :src="require('@/assets/img/icon/key.svg')" alt=""></span>
                </div>
            </div>
            <div class="form-1">
                <p>{{$t('iin')}}</p>
                <div class="input-1">
                    <input type="text" name="input_ui" :value="user.iin" disabled>
                    <span><img :src="require('@/assets/img/icon/key.svg')" alt=""></span>
                </div>
            </div>
            <div class="text" v-html="$t('text_3')"></div>
            <div class="form-1">
                <p>{{$t('number_phone')}}</p>
                <div class="input-1">
                    <input type="text" name="input_up" :value="user.phone" disabled>
                    <button data-toggle="modal" data-target="#modal-edit">{{$t('change')}}</button>
                </div>
            </div>
            <div class="form-1">
                <p>Email</p>
                <div class="input-1">
                    <input type="email" name="input_ue" :value="user.email" disabled>
                    <button data-toggle="modal" data-target="#modal-edit-mail">{{$t('change')}}</button>
                </div>
            </div>
        </div>
        <div class="modal-edit2">
            <div id="modal-edit" class="modal fade">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div class="cont-1" v-if="tab === 1">
                                <p>{{$t('new_phone')}}</p>
                                <masked-input name="mi_nkn" v-model="new_phone" mask="\+\7(111)-111-11-11" placeholder="+7 (___) ___-__-__" />
                                <button @click="changePhone" class="button-yellow" :class="(this.new_phone!='' && this.new_phone.length == 17 && (/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/.test(this.new_phone))) ? 'button-orange':'button-orange disabled'">{{$t('further')}}</button>
                                <div v-if="errorReset" class="er-text">
                                    {{errorReset}}
                                </div>
                            </div>
                            <div class="cont-2" v-if="tab === 2">
                                <p>{{$t('sms_code')}}</p>
                                <input type="text" maxlength="6" name="mi_sk" v-model="sms_code" class="sms-code"placeholder="______" />

                                <button class="button-yellow" @click="smsVerify()">{{$t('complete')}}</button>
                                <div class="text_modal" v-if="!seconds"><span v-html="$t('fpassword_text')"></span> {{ currentTime }} <span v-html="$t('seconds')"></span></div>
                                <div class="text_modal txt-dec" @click="changePhone" v-if="seconds" v-html="$t('send_code_again')"></div>
                                <div v-if="errorset" class="er-text">
                                    {{errorset}}
                                </div>
                            </div>
                            <div class="cont-3" v-if="tab === 3">
                                <div class="text">{{$t('your_number_changed')}}</div>
                                <button class="button-yellow"  type="button" data-dismiss="modal" aria-hidden="true" @click="getUser()">ok</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="modal-edit-mail" class="modal fade">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div class="cont-1" v-if="step === 1">
                                <p>{{$t('new_e_mail_address')}}</p>
                                <input type="email" name="input_nm" v-model="new_mail">
                                <button @click="changeEmail()" class="button-yellow" :class="(this.new_mail!='' && (/^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i.test(this.new_mail))) ? 'button-orange':'button-orange disabled'">{{$t('save')}}</button>
                                <div v-if="errorEmail" class="er-text">
                                    {{errorEmail}}
                                </div>
                            </div>
                            <div class="cont-3" v-if="step === 2">
                                <div class="text">{{$t('your_mail_changed')}}</div>
                                <button class="button-yellow"  type="button" data-dismiss="modal" aria-hidden="true" @click="getUser()">ok</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MaskedInput from 'vue-masked-input'
    export default {
        name: "editMyData",
        components: {
            MaskedInput
        },
        data() {
            return{
                user: '',
                new_phone: '',
                new_mail: '',
                currentTime: 60,
                tab: 1,
                step: 1,
                errorReset: '',
                seconds: false,
                loader: false,
                sms_code: '',
                errorset: '',
                errorEmail: '',
                loader: true
            }
        },
        mounted () {
            var obj = this;
            $('#modal-edit').on('hidden.bs.modal', function () {
                obj.new_phone = '';
                obj.new_mail = '';
                obj.currentTime = 60;
                obj.tab = 1;
                obj.step = 1;
                obj.errorReset = '';
                obj.seconds = false;
                obj.loader = false;
                obj.sms_code = '';
                obj.errorset = '';
                obj.errorEmail = '';
            });
            $('#modal-edit-mail').on('hidden.bs.modal', function () {
                obj.new_phone = '';
                obj.new_mail = '';
                obj.currentTime = 60;
                obj.tab = 1;
                obj.step = 1;
                obj.errorReset = '';
                obj.seconds = false;
                obj.loader = false;
                obj.sms_code = '';
                obj.errorset = '';
                obj.errorEmail = '';
            });
        },
        created(){
            this.getUser();
        },
        methods: {
            getUser () {
                this.$axios.post('/auth/me')
                .then((response) => {
                    let $response = response.data
                    if ($response.code === 0) {
                        console.log($response)
                    } else {
                        this.user = $response.data
                        this.loader = false
                    }
                })
                .catch((e) => {
                    this.errorLog = e.response.status;
                    if(this.errorLog == 401){
                        localStorage.clear()
                        window.location.reload()
                    }
                    console.log(e)
                })
            },
            changePhone() {
                this.currentTime = 60
                if (this.new_phone!='' && this.new_phone.length == 17 && (/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/.test(this.new_phone))) {
                    this.loader = true
                    let obj = {}
                    obj['new_phone'] = this.new_phone
                    this.$axios.post('/auth/change_phone', obj)
                    .then((response) => {
                        let $response = response.data
                        if ($response.code === 0) {
                            this.errorReset = $response.error
                        } else {
                            this.tab = 2
                            this.seconds = false
                            setInterval(() => {
                                this.currentTime--
                            }, 1000)
                            this.secondsFunc();
                        }
                        this.loader = false
                    })
                    .catch((e) => {
                        this.loader = false
                        this.errorLog = e.response.status;
                        if(this.errorLog == 401){
                            localStorage.clear()
                            window.location.reload()
                        }
                        console.log(e)
                    })
                }
            },
            smsVerify() {
                if (this.sms_code!='' && this.sms_code.length == 6) {
                    this.loader = true
                    this.errorReset = ''
                    let obj = {}
                    obj['sms_code'] = this.sms_code
                    this.$axios.post('/auth/phone_verification', obj)
                    .then((response) => {
                        let $response = response.data
                        if ($response.code === 0) {
                            this.errorset = $response.error
                            this.currentTime = 60
                        } else {
                            this.tab = 3
                            this.currentTime = 60
                            this.secondsFunc();
                        }
                        this.loader = false
                    })
                    .catch((e) => {
                        this.loader = false
                        this.errorLog = e.response.status;
                        if(this.errorLog == 401){
                            localStorage.clear()
                            window.location.reload()
                        }
                        console.log(e)
                    })
                }
            },
            changeEmail(){
                if(this.new_mail!='' && (/^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i.test(this.new_mail))) {}
                    this.loader = true
                let obj = {}
                obj['new_mail'] = this.new_mail
                this.$axios.post('/auth/change_email', obj)
                .then((response) => {
                    let $response = response.data
                    if ($response.code === 0) {
                        this.errorEmail = $response.error.message
                    } else {
                        this.step = 2
                    }
                    this.loader = false
                })
                .catch((e) => {
                    this.loader = false
                    this.errorLog = e.response.status;
                    if(this.errorLog == 401){
                        localStorage.clear()
                        window.location.reload()
                    }
                    console.log(e)
                })
            },
            secondsFunc() {
                this.seconds = false;
                var self = this;
                setTimeout(function(){
                    self.seconds = true;
                }, 60000);
            }
        }
    }
</script>

<style scoped>
.sms-code {
    letter-spacing: 4px;
}
</style>
