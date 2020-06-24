<template>
    <div class="modal-extension modal-auth">
        <div id="modalAuth" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="slider-extension">
                            <div class="extension">
                                <div class="tab-1" v-if="step === 1" id="tab1">
                                    <div v-if="loader" class="loader">
                                        <img :src="require('@/assets/img/loader1.gif')" alt="">
                                    </div>
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><img :src="require('@/assets/img/icon/close-mb.svg')" alt=""></button>
                                        <div class="modal-title">{{ $t('personal_cabinet') }}</div>
                                    </div>
                                    <div class="modal-tab">
                                        <button class="mt" v-bind:class="{ active: step == 1 }" @click="clickSteps(1)">{{ $t('login_a') }}</button>
                                        <button class="mt" v-bind:class="{ active: step == 2 }" @click="clickSteps(2)">{{ $t('check_in') }}</button>
                                    </div>
                                    <form @submit.prevent="authForm">
                                        <div class="form-1">
                                            <p>{{ $t('iin') }}</p>
                                            <input type="text" name="iin" :placeholder="$t('enter_iin')" v-model="iin" v-mask="'############'" autocomplete="off">
                                        </div>
                                        <div class="form-1">
                                            <p>{{ $t('password') }}</p>
                                            <input type="password" name="password" :placeholder="$t('enter_password')" v-model="password" autocomplete="off">
                                        </div>
                                        <button :class="(this.iin!='' && this.password!='' && this.iin.length==12 && this.password.length >= 8) ? 'button-orange':'button-orange disabled'">{{ $t('login') }}</button>
                                    </form>
                                    <div class="forgot-password" @click="clickSteps(4)">{{ $t('forgot_password') }} —></div>
                                </div>

                                <div class="tab-2 pdm-15" v-if="step === 2" id="tab2">
                                    <div v-if="loader" class="loader">
                                        <img :src="require('@/assets/img/loader1.gif')" alt="">
                                    </div>
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><img :src="require('@/assets/img/icon/close-mb.svg')" alt=""></button>
                                        <div class="modal-title">{{ $t('personal_cabinet') }}</div>
                                    </div>
                                    <div class="modal-tab">
                                        <button class="mt" v-bind:class="{ active: step == 1 }" @click="clickSteps(1)">{{ $t('login_a') }}</button>
                                        <button class="mt" v-bind:class="{ active: step == 2 }" @click="clickSteps(2)">{{ $t('check_in') }}</button>
                                    </div>
                                    <div>
                                        <form @submit.prevent="regisForm">
                                            <div class="form-1">
                                                <p>{{ $t('iin') }}</p>
                                                <input type="text" name="iin" v-model="iin" v-mask="'############'" :placeholder="$t('enter_iin')">
                                            </div>
                                            <div class="form-1">
                                                <p>{{ $t('number_phone') }}</p>
                                                <masked-input type="tel" v-model="phone" mask="\+\7(111)-111-11-11" placeholder="+7 (___) ___-__-__" />
                                            </div>
                                            <button :class="(this.iin!='' && this.phone!='' && this.iin.length==12 && this.phone.length == 17 && (/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/.test(this.phone))) ? 'button-orange':'button-orange disabled'">
                                                {{ $t('signup') }}
                                            </button>
                                        </form>
                                    </div>
                                </div>

                                <div class="tab-3" v-if="step === 6">
                                    <div v-if="loader" class="loader">
                                        <img :src="require('@/assets/img/loader1.gif')" alt="">
                                    </div>
                                    <div class="pdm-15">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><img :src="require('@/assets/img/icon/close-mb.svg')" alt=""></button>
                                            <div class="modal-title">{{ $t('check_in') }}</div>
                                        </div>
                                        <div class="tab3_2">
                                            <div class="form-1">
                                                <p>{{ $t('sms_code') }}</p>
                                                <masked-input type="tel" v-model="sms_code" class="sms-code" mask="111111" placeholder="______" />
                                            </div>
                                            <button :class="(this.iin!='' && this.sms_code!='' && this.iin.length==12 && this.sms_code.length == 6) ? 'button-orange':'button-orange disabled'" @click="smsVerifyAuth()">{{ $t('further') }}</button>
                                            <div v-if="errorset" class="er-text">
                                                {{errorset}}
                                            </div>
                                            <div class="text_modal" v-if="!seconds"><span v-html="$t('fpassword_text')"></span> {{ currentTime }} <span v-html="$t('seconds')"></span></div>
                                            <div class="text_modal txt-dec" @click="resendSms()" v-if="seconds" v-html="$t('send_code_again')"></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="tab-3" v-if="step === 7">
                                    <div v-if="loader" class="loader">
                                        <img :src="require('@/assets/img/loader1.gif')" alt="">
                                    </div>
                                    <div class="pdm-15">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><img :src="require('@/assets/img/icon/close-mb.svg')" alt=""></button>
                                            <div class="modal-title">{{ $t('check_in') }}</div>
                                        </div>
                                        <div class="tab3_3">
                                            <form @submit.prevent="setPasswordRegis">
                                                <div class="form-1">
                                                    <p>{{ $t('ent_password') }}</p>
                                                    <input name="new_password" type="password" v-model="new_password" :placeholder="$t('ent_your_password')">
                                                </div>
                                                <div class="form-1">
                                                    <p>{{ $t('rep_password') }}</p>
                                                    <input name="repeat_new_password" type="password" v-model="repeat_new_password" :placeholder="$t('re_enter_your_password')">
                                                </div>
                                                <button :class="(this.new_password!='' && this.phone!='' && this.new_password == this.repeat_new_password && this.new_password.length >= 8 && this.phone.length == 17 && (/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/.test(this.phone))) ? 'button-orange':'button-orange disabled'">{{ $t('save') }}</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div class="tab-errors" v-if="step === 3">
                                    <div v-if="loader" class="loader">
                                        <img :src="require('@/assets/img/loader1.gif')" alt="">
                                    </div>
                                    <div class="extension" v-if="errors">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><img :src="require('@/assets/img/icon/close-mb.svg')" alt=""></button>
                                            <h1 class="modal-title">{{ $t('something_went_wrong') }}</h1>
                                        </div>
                                        <div class="text" v-if="!timeout">{{errors}}</div>
                                        <div v-if="timeout">{{ $t('service_unavailable') }}</div>
                                        <div class="forgot-password" @click="clickSteps(1)"><— {{ $t('back') }}</div>
                                    </div>
                                    <div class="extension" v-if="errorRegis">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><img :src="require('@/assets/img/icon/close-mb.svg')" alt=""></button>
                                            <h1 class="modal-title">{{ $t('something_went_wrong') }}</h1>
                                        </div>
                                        <div class="text">{{errorRegis}}</div>
                                        <div v-if="timeout">{{ $t('service_unavailable') }}</div>
                                        <div class="forgot-password" @click="clickSteps(2)"><— {{ $t('back') }}</div>
                                    </div>
                                </div>

                                <div class="tab-3" v-if="step === 4">
                                    <div v-if="loader" class="loader">
                                        <img :src="require('@/assets/img/loader1.gif')" alt="">
                                    </div>
                                    <div class="pdm-15">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><img :src="require('@/assets/img/icon/close-mb.svg')" alt=""></button>
                                            <div class="modal-title">{{ $t('forgot_password') }}</div>
                                        </div>
                                        <div class="tab3_1" v-if="tab === 1">
                                            <div class="form-1">
                                                <p>{{ $t('iin') }}</p>
                                                <input type="text" name="iin" :placeholder="$t('enter_iin')" v-mask="'############'" v-model="iin">
                                            </div>
                                            <div class="form-1">
                                                <p>{{ $t('number_phone') }}</p>
                                                <masked-input type="tel" v-model="phone" mask="\+\7(111)-111-11-11" placeholder="+7 (___) ___-__-__" />
                                            </div>
                                            <button :class="(this.iin!='' && this.phone!='' && this.iin.length==12 && this.phone.length == 17 && (/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/.test(this.phone))) ? 'button-orange':'button-orange disabled'" @click="resetPassword()">{{ $t('code') }}</button>
                                            <div v-if="errorReset" class="er-text">
                                                {{errorReset}}
                                            </div>
                                            <div class="forgot-password" @click="clickSteps(1)"><— {{ $t('back') }}</div>
                                        </div>

                                        <div class="tab3_2" v-if="tab === 2">
                                            <div class="form-1">
                                                <p>{{ $t('sms_code') }}</p>
                                                <masked-input type="tel" v-model="sms_code" class="sms-code" mask="111111" placeholder="______" />
                                            </div>
                                            <button :class="(this.iin!='' && this.sms_code!='' && this.iin.length==12 && this.sms_code.length == 6) ? 'button-orange':'button-orange disabled'" @click="smsVerify()">{{ $t('further') }}</button>
                                            <div v-if="errorset" class="er-text">
                                                {{errorset}}
                                            </div>
                                            <div class="text_modal" v-if="!seconds"><span v-html="$t('fpassword_text')"></span> {{ currentTime }} <span v-html="$t('seconds')"></span></div>
                                            <div class="text_modal txt-dec" @click="resendSms()" v-if="seconds" v-html="$t('send_code_again')"></div>
                                        </div>
                                        <div class="tab3_3" v-if="tab === 3">
                                            <form @submit.prevent="setPassword">
                                                <div class="form-1">
                                                    <p>{{ $t('new_password') }}</p>
                                                    <input name="new_password" type="password" v-model="new_password" :placeholder="$t('enter_new_password')">
                                                </div>
                                                <div class="form-1">
                                                    <p>{{ $t('repeat_new_password') }}</p>
                                                    <input name="repeat_new_password" type="password" v-model="repeat_new_password" :placeholder="$t('enter_repeat_new_password')">
                                                </div>
                                                <button :class="(this.new_password!='' && this.phone!='' && this.new_password == this.repeat_new_password && this.new_password.length >= 8 && this.phone.length == 17 && (/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/.test(this.phone))) ? 'button-orange':'button-orange disabled'">{{ $t('save') }}</button>
                                            </form>
                                            <div class="er-text2" v-if="set_pass">
                                                {{set_pass}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-4" v-if="step === 5">
                                    <div v-if="loader" class="loader">
                                        <img :src="require('@/assets/img/loader1.gif')" alt="">
                                    </div>
                                    <div class="form-1">
                                        <p>{{ $t('sms_code') }}</p>
                                        <masked-input type="tel" v-model="sms_code" class="sms-code" mask="111111" placeholder="______" />
                                    </div>
                                    <button class="button-orange" @click="clickSteps(6)">{{ $t('further') }}</button>
                                    <div class="text_modal" v-html="$t('fpassword_text')"></div>
                                    <div class="text_modal txt-dec" v-html="$t('send_code_again')"></div>
                                </div>
                                <div class="img"><img :src="require('@/assets/img/ex.png')" alt=""></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import MaskedInput from 'vue-masked-input'
    export default {
        name: 'Auth',
        components: {
            MaskedInput
        },
        data () {
            return {
                step:1,
                tab: 1,
                iin: '',
                phone: '',
                password: '',
                loader: false,
                timeout: false,
                errors: '',
                sms_code: '',
                new_password: '',
                repeat_new_password: '',
                errorReset: '',
                seconds: false,
                currentTime: 60,
                errorset: '',
                regis: 1,
                set_pass: '',
                errorRegis: ''
            }
        },
        mounted () {
            var obj = this;
            $('#modalAuth').on('hidden.bs.modal', function () {
                obj.step = 1;
                obj.tab = 1;
                obj.iin="";
                obj.phone="";
                obj.password="";
                obj.loader=false;
                obj.timeout=false;
                obj.errors="";
                obj.sms_code="";
                obj.new_password="";
                obj.repeat_new_password="";
                obj.errorReset="";
                obj.seconds=false;
                obj.currentTime=60;
                obj.errorset ="";
                obj.regis = 1;
                obj.errorRegis = ""
            });
            $("#modalAuth").on('shown.bs.modal', function(e) {
                var tab = e.relatedTarget.hash;
                var tab1 = "#tab1"
                var tab2 = "#tab2"
                if(tab == tab1){
                    obj.step = 1
                }
                if(tab == tab2){
                    obj.step = 2
                    obj.iin = ""
                }
            })
        },
        methods: {
            clickSteps(index){
                if (index == 1){
                    this.step=1;
                    this.errors = '';
                    this.errorRegis = '';
                    this.phone = '';
                }
                if (index == 2) {
                    this.step = 2;
                    this.iin = "";
                    this.errors = '';
                    this.errorRegis = '';
                    this.phone = "";
                }
                if (index == 3) {
                    this.step = 3;
                }
                if (index == 4){
                    this.step=4;
                    this.errors = '';
                    this.errorRegis = '';
                }
                if (index == 6) {
                    this.tab = 2;
                }
            },
            authForm () {
                if (this.iin!='' && this.password!='' && this.iin.length==12 && this.password.length >= 8) {
                    this.loader = true
                    let formData = new FormData(),
                    vc = this
                    formData.append('iin', this.iin);
                    formData.append('password', this.password)
                    formData.append('platform', 'web')
                    axios.post('/auth/login', formData, {timeout: 30000})
                    .then((response) => {
                        console.log(response.data)
                        let $response = response.data
                        if ($response.code === 0) {
                            console.log($response.error)
                            this.errors = $response.error
                            this.step = 3
                            this.loader = false
                        } else {
                            this.$auth.saveUser($response.data)
                            this.$auth.saveToken('Bearer ' + $response.data.access_token)
                            let step = vc.$auth.verifiedUser()
                            if (step) {
                                window.location.replace('/cabinet/my-loans')
                            } else {
                                window.location.replace('/')
                            }
                            this.loader = true
                        }

                    })
                    .catch((e) => {
                        this.loader = false
                        if(e.toString().includes("timeout")) {
                            this.step = 3
                            this.errors = true
                            this.timeout = true
                        }
                        console.log(e)
                    })
                }
            },
            resetPassword() {
                this.currentTime = 60
                if (this.iin!='' && this.phone!='' && this.iin.length==12 && this.phone.length == 17 && (/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/.test(this.phone))) {
                    this.loader = true
                    let obj = {}
                    obj['iin'] = this.iin
                    obj['phone'] = this.phone
                    this.$axios.post('/auth/reset_password', obj, {timeout: 30000})
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
                        if(e.toString().includes("timeout")) {
                            this.step = 3
                            this.errors = true
                            this.timeout = true
                        }
                        console.log(e)
                    })
                }
            },
            resendSms() {
                if (this.iin!='' && this.phone!='' && this.iin.length==12 && this.phone.length == 17 && (/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/.test(this.phone))) {
                    this.loader = true
                    this.seconds = false
                    this.sms_code = ''
                    this.errorset = ''
                    let obj = {}
                    obj['iin'] = this.iin
                    obj['phone'] = this.phone
                    this.$axios.post('/auth/resend_sms', obj, {timeout: 30000})
                    .then((response) => {
                        let $response = response.data
                        if ($response.code === 0) {
                            this.errorReset = $response.error
                        } else {
                            this.tab = 2
                            this.currentTime = 60
                            this.secondsFunc();
                        }
                        this.loader = false
                    })
                    .catch((e) => {
                        this.loader = false
                        if(e.toString().includes("timeout")) {
                            this.step = 3
                            this.errors = true
                            this.timeout = true
                        }
                        console.log(e)
                    })
                }
            },

            smsVerify() {
                if (this.iin!='' && this.sms_code!='' && this.iin.length==12 && this.sms_code.length == 6) {
                    this.loader = true
                    let obj = {}
                    obj['iin'] = this.iin
                    obj['sms_code'] = this.sms_code
                    this.$axios.post('/auth/sms_verify', obj, {timeout: 30000})
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
                        if(e.toString().includes("timeout")) {
                            this.step = 3
                            this.errors = true
                            this.timeout = true
                        }
                        console.log(e)
                    })
                }
            },
            smsVerifyAuth() {
                if (this.iin!='' && this.sms_code!='' && this.iin.length==12 && this.sms_code.length == 6) {
                    this.loader = true
                    let obj = {}
                    obj['iin'] = this.iin
                    obj['sms_code'] = this.sms_code
                    this.$axios.post('/auth/sms_verify', obj, {timeout: 30000})
                    .then((response) => {
                        let $response = response.data
                        if ($response.code === 0) {
                            this.errorset = $response.error
                            this.currentTime = 60
                        } else {
                            this.step = 7
                            this.currentTime = 60
                            this.secondsFunc();
                        }
                        this.loader = false
                    })
                    .catch((e) => {
                        this.loader = false
                        if(e.toString().includes("timeout")) {
                            this.step = 3
                            this.errors = true
                            this.timeout = true
                        }
                        console.log(e)
                    })
                }
            },
            setPassword() {
                if (this.new_password!='' && this.phone!='' && this.new_password == this.repeat_new_password && this.new_password.length >= 8 && this.phone.length == 17 && (/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/.test(this.phone))) {
                    this.loader = true
                    let obj = {}
                    obj['password'] = this.new_password
                    obj['phone'] = this.phone
                    this.$axios.post('/auth/set_password', obj, {timeout: 30000})
                    .then((response) => {
                        let $response = response.data
                        if ($response.code === 0) {
                            console.log($response.error)
                        } else {
                            this.set_pass = $response.data
                            this.set_pass = $response.data
                            this.$axios.post('/auth/login', {"iin":this.iin, "password":this.new_password}).then((r) => {
                                let $r = r.data
                                this.$auth.saveUser($r.data)
                                console.log($r.data);
                                this.$auth.saveToken('Bearer ' + $r.data.access_token)
                                setTimeout(function(){
                                    window.location.replace('/cabinet/my-loans')
                                },2000);
                            })
                        }
                        this.loader = false
                    })
                    .catch((e) => {
                        this.loader = false
                        if(e.toString().includes("timeout")) {
                            this.step = 3
                            this.errors = true
                            this.timeout = true
                        }
                        console.log(e)
                    })
                }
            },
            setPasswordRegis() {
                if (this.new_password!='' && this.phone!='' && this.new_password == this.repeat_new_password && this.new_password.length >= 8 && this.phone.length == 17 && (/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/.test(this.phone))) {
                    this.loader = true
                    let obj = {}
                    obj['password'] = this.new_password
                    obj['phone'] = this.phone
                    this.$axios.post('/auth/set_password', obj, {timeout: 30000})
                    .then((response) => {
                        let $response = response.data
                        if ($response.code === 0) {
                            console.log($response.error)
                        } else {
                            this.step = 1
                            this.iin = ''
                        }
                        this.loader = false
                    })
                    .catch((e) => {
                        this.loader = false
                        if(e.toString().includes("timeout")) {
                            this.step = 3
                            this.errors = true
                            this.timeout = true
                        }
                        console.log(e)
                    })
                }
            },
            secondsFunc() {
                this.seconds = false;
                var self = this;
                setTimeout(function(){
                    self.seconds = true;
                }, 60000);
            },
            regisForm(){
                if (this.iin!='' && this.phone!='' && this.iin.length==12 && this.phone.length == 17 && (/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/.test(this.phone))) {
                    this.loader = true
                    let obj = {}
                    obj['iin'] = this.iin
                    obj['phone'] = this.phone
                    axios.post('/auth/register', obj, {timeout: 30000})
                    .then((response) => {
                        console.log(response.data)
                        let $response = response.data
                        if ($response.code === 0) {
                            this.errorRegis = $response.error
                            this.step = 3
                        } else {
                            this.$auth.saveUser($response.data)
                            this.$auth.saveToken('Bearer ' + $response.data.access_token)
                            this.step = 6
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
                        if(e.toString().includes("timeout")) {
                            this.step = 3
                            this.errors = true
                            this.timeout = true
                        }
                        console.log(e)
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>
