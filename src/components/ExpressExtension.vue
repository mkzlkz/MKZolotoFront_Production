<template>
    <div>
        <div class="modal-extension">
            <div id="modalExtension" class="modal fade">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div class="slider-extension">
                                <div class="extension" v-if="step === 1">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><img :src="require('@/assets/img/icon/close-mb.svg')" alt=""></button>
                                        <div class="modal-title">Экспресс-продление</div>
                                    </div>
                                    <div class="form-1">
                                        <p>ИИН</p>
                                        <input type="text" placeholder="Введите ваш ИИН" v-mask="'############'" v-model="iin">
                                    </div>
                                    <div class="form-1">
                                        <p>Номер залогового билета</p>
                                        <input type="text" placeholder="Введите номер залогового билета" v-mask="'################'" v-model="loan_id" >
                                    </div>
                                    <button :class="(this.iin!='' && this.loan_id!='' && this.iin.length==12 && this.loan_id.length==16) ? 'button-orange':'button-orange disabled'" @click="prolongForm()" >Продлить заём</button>
                                    <!-- <div class="text">В любой момент вы можете продлить <br> заем в личном кабинете, а также <br> получить полную информацию <br> о всех своих займах.</div> -->
                                    <div class="img"><img :src="require('@/assets/img/ex1.png')" alt=""></div>
                                </div>


                                <div v-if="step === 2">
                                    <div v-if="loader" class="loader">
                                        <img :src="require('@/assets/img/loader1.gif')" alt="">
                                    </div>
                                    <div class="extension" v-if="errors">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><img :src="require('@/assets/img/icon/close-mb.svg')" alt=""></button>
                                            <h1 class="modal-title" v-if="!errorMsg">Что-то пошло не так</h1>
                                        </div>
                                        <div class="text" v-if='!errorMsg'>ИИН или Номер Залогового билета <br> не верные, следует повторить.</div>
                                        <div v-if="timeout">Сервис временно недоступен. Попробуй позже.</div>
                                        <div class="text" v-else>{{errorMsg}}</div>

                                        <div class="img pr-20" v-if='!errorMsg'><img :src="require('@/assets/img/ex2.png')" alt=""></div>
                                        <div class="img pr-20" v-else><img :src="require('@/assets/img/ex4.png')" alt=""></div>
                                    </div>
                                    <div class="extension" v-if="!errors">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><img :src="require('@/assets/img/icon/close-mb.svg')" alt=""></button>
                                            <h1 class="modal-title">Экспресс-продление</h1>
                                        </div>
                                        <div class="form-2 mb-0">
                                            <span>Номер залогового билета:</span>
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
                                            <input type="text"  placeholder="или введите срок вручную" v-model="count_days" @change="calculationForm(); defaultValue();" @input="calculationForm()" @keyUp="calculationForm()" @keydown="keyDays">
                                        </div>
                                        <div class="total">
                                            <p>Итого к оплате:</p>
                                            <div class="price" :class="(this.count_days < this.minTerm) ? 'price transparent':'price'">{{amount}} тг</div>
                                        </div>
                                        <button :class="(this.count_days < this.minTerm) ? 'button-orange disabled':'button-orange'" @click="countDaysForm()">Оплатить</button>
                                        <div class="img"><img :src="require('@/assets/img/ex1.png')" alt=""></div>
                                    </div>
                                </div>

                                <div v-if="step === 3">
                                    <div class="extension" v-if="!this.successful">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><img :src="require('@/assets/img/icon/close-mb.svg')" alt=""></button>
                                            <h1 class="modal-title">Что-то пошло не так</h1>
                                        </div>
                                        <div class="text">Кажется, в процесс вкралась ошибка. <br> Может, еще разок?</div>
                                        <div class="img pr-20"><img :src="require('@/assets/img/ex4.png')" alt=""></div>
                                    </div>
                                    <div class="extension" v-if="this.successful">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><img :src="require('@/assets/img/icon/close-mb.svg')" alt=""></button>
                                            <h1 class="modal-title">Заем успешно продлен</h1>
                                        </div>
                                        <div class="text">Супер! </div>
                                        <a :href="`https://mk-prod.mars.studio/api/pdf_generate?id=${this.Idreceipt}`" target="_blank" class="link">Посмотреть квитанцию</a>
                                        <div class="img pr-20"><img :src="require('@/assets/img/ex3.png')" alt=""></div>
                                    </div>
                                </div>
                                <div class="button-click" v-if="step != 3">
                                    <button v-bind:class="{ active: step == 1 }" @click="clickSteps(1)"></button>
                                    <button v-bind:class="{ active: step == 2 }" @click="clickSteps(2)"></button>
                                    <button v-bind:class="{ active: step == 3 }" @click="clickSteps(3)"></button>
                                </div>
                                <div class="button-click button-none-click" v-if="step === 3">
                                    <button v-bind:class="{ active: step == 1 }" @click="clickSteps(1)"></button>
                                    <button v-bind:class="{ active: step == 2 }" @click="clickSteps(2)"></button>
                                    <button v-bind:class="{ active: step == 3 }" @click="clickSteps(3)"></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import VueSlider from 'vue-slider-component'
    import 'vue-slider-component/theme/antd.css'
    export default {
        name: 'ExpressExtension',
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
                Idreceipt: ''
            }
        },
        mounted () {
            var url = window.location.href;
            if (url.indexOf('status=successful') != -1) {
                $("#modalExtension").modal('show');
                this.step=3;
                this.successful=true;
            }
            if (url.indexOf('status=fail') != -1) {
                $("#modalExtension").modal('show');
                this.successful=false
                this.step=3;
            }
            var obj = this;
            $('#modalExtension').on('hidden.bs.modal', function () {
                window.history.pushState(null, null, window.location.pathname);
                obj.iin="";
                obj.loan_id="";
                obj.prolong="";
                obj.step=1;
                obj.timeout=false;
                obj.errors="";
                obj.errorMsg="";
                obj.successful=true;
                obj.Idreceipt="";
            });
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
if (newDays <= this.maxTerm) { // Проверяем (сравниваем введеное число и лимит если введеное число меньше иили равно тогда присваеваем  значение ) если число уддовелтворяет нас тогда оно становится тикущем
//  this.showAnsverDays = true
this.count_days = newDays
} else if (newDays.length <= this.maxTermLength) { //(Проверяем если длина строки меньше или равна длине строки макс значения тогда присваеваем значение максимума)
    this.count_days = this.maxTerm
} else {
this.count_days = Number(String(newDays).substring(0, this.maxTermLength)) // (Если значение не попадает по пред проверки тогда значение обрезается по количеству символов которое задано в макс)
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
// console.log(response)
let $response = response.data
if ($response.code === 0) {
    console.log($response.error)
    this.errors = $response.error
    this.errorMsg = $response.error.message
} else {
    this.prolong = $response.data
    this.count_days = $response.data.max_renewal
    this.amount = $response.data.max
    this.maxTerm = $response.data.max_renewal
    this.minTerm = $response.data.min_renewal
}
this.loader = false
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
        this.$axios.post('/en/auth/generate_order', obj)
        .then((response) => {
// console.log(response)
let $response = response.data
if ($response.code === 0) {
    console.log($response.error)
} else {
    this.order = $response.data
    location.href = this.order.url
}
})
        .catch((e) => console.log(e))
    }
    },
    calculationForm () {
        // console.log('test', this.count_days);
        if ( this.count_days >= this.minTerm) {
        let obj = {}
        obj['client_count_day'] = this.count_days
        obj['loan_id'] = this.loan_id
        this.$axios.post('/en/auth/exp_calculation', obj)
        .then((response) => {
// console.log(response)
let $response = response.data
if ($response.code === 0) {
    console.log($response.error)
} else {
    this.total = $response.data
    this.amount = this.total[this.count_days - 1].amount
}
})
        .catch((e) => console.log(e))
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
// console.log(charCode);
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
}
}
}
</script>

<style scoped>

</style>