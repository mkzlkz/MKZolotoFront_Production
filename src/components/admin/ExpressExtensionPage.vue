<template>
    <div class="ExpressExtensionPage">
        <div v-if="loader" class="loader loader-admin">
            <img :src="require('@/assets/img/loader1.gif')" alt="">
        </div>
<!--         <div class="errorsServer" v-if="errorsServer">
            {{errorsServer}}
        </div> -->
        <div class="slider-extension">
            <div class="extension" v-if="step === 1">
                <div class="modal-header">
                    <div class="modal-title">{{ $t('expressExtension') }}</div>
                </div>
                <div class="form-width">
                    <div class="form-1">
                        <p>{{ $t('iin') }}</p>
                        <input type="text" name="input_ei" :placeholder="$t('enter_iin')" v-mask="'############'" v-model="iin">
                    </div>
                    <div class="form-1">
                        <p>{{ $t('number_zb') }}</p>
                        <input type="text" name="input_ez" autocomplete="new-password" :placeholder="$t('enter_zb')" v-mask="'################'" v-model="loan_id" >
                    </div>
                    <button :class="(this.iin!='' && this.loan_id!='' && this.iin.length==12 && this.loan_id.length==16) ? 'button-orange':'button-orange disabled'" @click="prolongForm()" >{{ $t('extent_loan') }}</button>
                    <!-- <div class="text" v-html="$t('express_text1')"></div> -->
                </div>
                <div class="img"><img :src="require('@/assets/img/ex1.png')" alt=""></div>
            </div>


            <div v-if="step === 2">
                <div v-if="loader" class="loader">
                    <img :src="require('@/assets/img/loader1.gif')" alt="">
                </div>
                <div class="extension" v-if="errors">
                    <div class="modal-header pb-30">
                        <h1 class="modal-title"><button class="back" @click="clickSteps(1)"><img :src="require('@/assets/img/icon/exit.svg')" alt=""></button>{{ $t('something_went_wrong') }}</h1>
                    </div>
                    <div class="text" v-if='!errorMsg'>{{errors}}</div>
                    <div v-if="timeout">{{ $t('service_unavailable') }}</div>
                    <div class="text" v-else>{{errorMsg}}</div>

                    <div class="img pr-20" v-if='!errorMsg'><img :src="require('@/assets/img/ex2.png')" alt=""></div>
                    <div class="img pr-20" v-else><img :src="require('@/assets/img/ex4.png')" alt=""></div>
                </div>
                <div class="extension" v-if="!errors">
                    <div class="modal-header">
                        <h1 class="modal-title">{{ $t('expressExtension') }}</h1>
                    </div>
                    <div class="form-width1">
                        <div class="form-2 mb-0">
                            <span>{{ $t('number_zb') }}:</span>
                            <div class="number-ex"><the-mask :mask="['#### #### #### ####']" v-model="loan_id" /></div>
                        </div>
                        <div class="exten-slider" :class="(this.prolong.max_renewal==this.prolong.min_renewal) ? 'left-100':''">
                            <div class="ex-flex">
                                <div class="min-ex">{{prolong.min_renewal}}</div>
                                <div class="max-ex">{{prolong.max_renewal}}</div>
                            </div>
                            <vue-slider v-model="count_days" :min='prolong.min_renewal' :max='prolong.max_renewal' :tooltip="'always'" @change="calculationForm" />
                            <div class="border"></div>
                        </div>
                        <div class="form-1">
                            <input type="text" name="input_eet"  :placeholder="$t('enter_term')" v-model="count_days" @change="calculationForm(); defaultValue();" @input="calculationForm()" @keyUp="calculationForm()" @keydown="keyDays">
                        </div>
                        <div class="total">
                            <p>{{ $t('total_payment') }}</p>
                            <div class="price" :class="(this.count_days < this.minTerm) ? 'price transparent':'price'">{{amount}} ₸</div>
                        </div>
                        <button :class="(this.count_days < this.minTerm) ? 'button-orange disabled':'button-orange'" @click="countDaysForm()">{{ $t('pay') }}</button>
                    </div>
                    <div class="img"><img :src="require('@/assets/img/ex1.png')" alt=""></div>
                </div>
            </div>

<!--             <div v-if="step === 3">
<div class="extension" v-if="!this.successful">
<div class="modal-header">
<h1 class="modal-title">{{ $t('something_went_wrong') }}</h1>
</div>
<div class="text" v-html="$t('express_text3')"></div>
<div class="img pr-20"><img :src="require('@/assets/img/ex4.png')" alt=""></div>
</div>
<div class="extension" v-if="this.successful">
<div class="modal-header">
<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><img :src="require('@/assets/img/icon/close-mb.svg')" alt=""></button>
<h1 class="modal-title">{{ $t('loan_successfully_extended') }}</h1>
</div>
<div class="text">{{ $t('super') }}</div>
<a :href="`https://mk-backend.mars.studio/api/pdf_generate?id=${this.Idreceipt}`" target="_blank" class="link">{{ $t('view_receipt') }}</a>
<div class="img pr-20"><img :src="require('@/assets/img/ex3.png')" alt=""></div>
</div>
</div> -->
</div>
</div>
</template>

<script>
    import VueSlider from 'vue-slider-component'
    import 'vue-slider-component/theme/antd.css'
    export default {
        name: 'ExpressExtensionPage',
        components: {
            VueSlider
        },
        data () {
            return {
                iin: '',
                loan_id: '',
                step:1,
                count_days: 1,
                errors: '',
                prolong:'',
                order: '',
                loader: false,
                amount: '',
                total: '',
                maxTerm: '',
                minTerm: '',
                maxTermLength: 2,
                minTermLength: 0,
                successful:true,
                errorMsg:'',
                timeout: false,
                Idreceipt: '',
                errorsServer: '',
                max_renewal: 0
            }
        },
        mounted () {
            document.body.addEventListener('keydown', (e) => {
                if (e.keyCode === 39) {
                    if (this.count_days < this.maxTerm) {
                        this.count_days++
                        this.calculationForm();
                    }
                }
                if (e.keyCode === 37) {
                    if (this.count_days > this.minTerm) {
                        this.count_days--
                        this.calculationForm();
                    }
                }
            })
        },
        watch: {
            count_days: function (newDays, oldDays) {

                if (String(newDays[0]) == '0' ) {
                    newDays=oldDays
                }
                if (newDays <= this.maxTerm) {
                    this.count_days = newDays
                } else if (newDays.length <= this.maxTermLength) {
                    this.count_days = this.maxTerm
                } else {
                    this.count_days = Number(String(newDays).substring(0, this.maxTermLength))
                }
            }
        },
        created() {
            this.receiptId();
        },
        methods: {
            prolongForm () {
                if (this.iin!='' && this.loan_id!='' && this.iin.length==12 && this.loan_id.length==16) {
                    this.loader = true
                    this.step++;
                    let obj = {}
                    obj['iin'] = this.iin
                    obj['loan_id'] = this.loan_id
                    this.$axios.post('/express_prolongation', obj, {timeout: 30000})
                    .then((response) => {
                        let $response = response.data
                        if ($response.code === 0) {
                            console.log($response.error)
                            this.errors = $response.error
                            this.errorMsg = $response.error
                        } else {
                            this.prolong = $response.data
                            this.count_days = $response.data.max_renewal
                            this.amount = $response.data.max
                            this.maxTerm = $response.data.max_renewal
                            this.minTerm = $response.data.min_renewal
                        }
                        this.loader = false
                        this.expAmount();
                    })
                    .catch((e) => {
                        this.step = 3
                        this.successful = false
                        this.loader = false
                        if(e.toString().includes("timeout")) {
                            this.step = 2
                            this.errors = true
                            this.errorMsg = true
                            this.timeout = true
                        }
                        console.log(e)
                    })
                }
            },
            countDaysForm () {
                if ( this.count_days >= this.minTerm) {
                    let obj = {}
                    obj['count_days'] = this.count_days
                    obj['loan_id'] = this.loan_id
                    obj['place'] = 'ЭкспрессЛКСайт'
                    this.$axios.post('/generate_order', obj)
                    .then((response) => {
                        let $response = response.data
                        if ($response.code === 0) {
                            console.log($response.error)
                            this.errorsServer = $response.error
                            this.loader = false
                        } else {
                            this.order = $response.data
                            location.href = this.order.url
                            this.urlAddress();
                            this.loader = false
                        }
                    })
                    .catch((e) => console.log(e))
                }
            },
            expAmount() {
                let obj = {}
                obj['loan_id'] = this.loan_id
                this.$axios.post('/exp_calculation', obj)
                .then((response) => {
                    let $response = response.data
                    if ($response.code === 0) {
                        console.log($response.error)
                        this.errorsServer = $response.error
                        this.loader = false
                    } else {
                        this.total = $response.data
                        this.loader = false
                    }
                })
                .catch((e) => console.log(e))
            },
            calculationForm () {
                if ( this.count_days >= this.minTerm) {
                    this.amount = this.total[this.count_days - 1].amount
                }
            },
            receiptId () {
                this.Idreceipt = this.$route.query.id
            },
            defaultValue() {
                if (this.count_days.length == 0) {
                    this.count_days = this.minTerm
                }
                if (this.count_days < this.minTerm) {
                    this.count_days = this.minTerm
                }
            },
            keyDays(evt) {
                evt = (evt) ? evt : window.event;
                var charCode = (evt.which) ? evt.which : evt.keyCode;
                if ( (this.count_days.length == 0 && charCode == 48) || (charCode == 96 && this.count_days.length == 0)) {
                    evt.preventDefault()
                }
                if (charCode == 190) {
                    evt.preventDefault();
                }
                if (charCode == 188) {
                    evt.preventDefault();
                }
                if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
                    if (charCode >= 96 && charCode <= 105) {

                    }else{
                        evt.preventDefault();
                    }
                }
            },
            clickSteps(index){
                if (index == 1){
                    this.isActive = 1;
                    this.step=1;
                    this.errorMsg='';
                    this.errors='';
                    this.timeout=false;
                }
                if (index == 2 && ( this.prolong.length !== 0)) {
                    this.isActive = 2;
                    this.step = 2;
                }
            },
            urlAddress(){
                localStorage.setItem('url', this.$router.history.current.path);
            },
        }
    }
</script>

<style scoped>

</style>