<template>
    <div>
        <div v-if="loader" class="loader loader-admin">
            <img :src="require('@/assets/img/loader1.gif')" alt="">
        </div>
        <div class="errorsServer" v-if="errorsServer">
            {{errorsServer}}
        </div>

        <div v-if="!errorsServer">
            <div class="errorsServer" v-if="loans.length<1">
                {{$t('text_zd')}}
            </div>
            <div class="loan-block1">
                <div class="loan-list">
                    <div>
                        <div class="loan-box" v-for="(loan, index) in loans" :key="loan.loan_id">
                            <div class="loan">
                                <div class="loan-title">
                                    <div class="zb"><span>{{$t('security_ticket')}}</span> <div class="num">№ <p v-html="$options.filters.subStr(loan.loan_id)"></p></div></div>
                                    <div class="red-text" v-if="loan.keep_price>0">{{$t('loan_expired')}}</div>
                                    <div class="switch" @click="toggleSwitch(index)" v-bind:class="{disabledSwitch : loan.default_pay === 0}">
                                        <switches v-model="loan.switch" type-bold="true" ></switches>
                                    </div>
                                </div>

                                <transition name="fade">
                                    <div v-if="loan.showModal" class="modal-message">
                                        <div v-if="message===1" class="message">
                                            <div v-if="loan.message">
                                                <p>{{loan.message.text}}</p>
                                            <a :href="loan.message.link" target="_blank">{{loan.message.link_text}}</a>
                                            <div class="message-bottom">
                                                <button class="button-yellow" @click="closeModal(loan)">ок</button>
                                            </div>
                                            </div>
                                            <div v-else>
                                             <p>{{$t('message_no_text')}}</p>
                                            </div>
                                        </div>
                                        <div v-if="message===2" class="message">
                                            <button class="close1" @click="closeModal(loan)"><img src="@/assets/img/icon/close-ad.svg" alt=""></button>
                                            <p>{{loan.message.text}}</p>
                                            <a :href="loan.message.link" target="_blank">{{loan.message.link_text}}</a>
                                            <div class="message-bottom">
                                                <button class="button-yellow" @click="consentModal(loan)">OK</button>
                                            </div>
                                        </div>

                                    </div>
                                </transition>

                                <div class="p-24">
                                    <div class="prog-bar">
                                        <div class="green"></div>
                                        <div class="pb" :class="{greens : loan.green === true, yellows : loan.yellow === true, oranges : loan.orange === true, red : loan.reds === true}">
                                            <progress-bar size="medium" :val="`${String(loan.days)}0`" :max="`${String(loan.maxDays)}0`" min="1"></progress-bar>
                                        </div>
                                        <div class="gray" v-if="loan.red === false"></div>
                                    </div>
                                </div>
                                <div class="loan-content p-24">
                                    <div class="dflex green-d" v-if="loan.green === true">
                                        <div class="l1"><img :src="require('@/assets/img/icon/oval1.svg')" alt="" class="rd"> {{$t('guaranteed_time_green')}}</div>
                                        <div class="l2">{{loan.loan_term}}</div>
                                    </div>
                                    <div class="dflex red-d" v-if="loan.red === true">
                                        <div class="red l1"><img :src="require('@/assets/img/icon/oval.svg')" alt="" class="rd"> {{$t('guaranteed_time_red')}}</div>
                                        <div class="red l2">{{loan.guaranty_time}}</div>
                                    </div>
                                    <div class="dflex yellow-d" v-if="loan.yellow === true">
                                        <div class="l1"><img :src="require('@/assets/img/icon/oval2.svg')" alt="" class="rd"> {{$t('guaranteed_time_yellow')}}</div>
                                        <div class="l2">{{loan.guaranty_time}}</div>
                                    </div>
                                    <div class="dflex orange-d" v-if="loan.orange === true">
                                        <div class="l1"><img :src="require('@/assets/img/icon/oval3.svg')" alt="" class="rd"> {{$t('guaranteed_time_orange')}}</div>
                                        <div class="l2">{{loan.guaranty_time}}</div>
                                    </div>


                                    <div class="dflex">
                                        <div class="l1">{{$t('loan_balance')}}</div>
                                        <div class="l2">{{nicePrice(loan.loan_balance)}} ₸</div>
                                    </div>
                                    <div class="dflex">
                                        <div class="l1">{{$t('on_loan')}}</div>
                                        <div class="l2">{{nicePrice(loan.loan_percent)}} ₸</div>
                                    </div>
                                    <div class="dflex">
                                        <div class="l1">{{$t('for_delay')}}</div>
                                        <div class="l2">{{nicePrice(loan.percent_delay_loan)}} ₸</div>
                                    </div>
                                    <div class="dflex">
                                        <div class="l1 bold">{{$t('interest_payable')}}</div>
                                        <div class="l2 bold">{{nicePrice(loan.percent_pay)}} ₸ </div>
                                    </div>
                                </div>
                                <div class="loan-save p-24" v-if="loan.keep_price>0">
                                    <div class="loan-title">
                                        <div class="zb"><span>{{$t('conservation_receipt')}}</span> <div class="num">№ <p v-html="$options.filters.subStr(loan.loan_id)"></p></div></div>
                                    </div>
                                    <div class="dflex">
                                        <div class="l1">{{$t('shelf_life')}}</div>
                                        <div class="l2">{{ moment(loan.keep_date).format('DD.MM.YYYY') }}</div>
                                    </div>
                                    <div class="dflex">
                                        <div class="l1">{{$t('keep_price')}}</div>
                                        <div class="l2">{{loan.keep_price}} ₸ </div>
                                    </div>
                                </div>
                                <div class="button-gray db">
                                    <button v-on:click="openDetail(index)" v-if="!detail.includes(index)"><span>{{$t('in_detail')}}</span></button>
                                    <button v-on:click="closeDetail(index)" v-if="detail.includes(index)"><img :src="require('@/assets/img/icon/right-arrow.svg')" alt=""></button>
                                </div>
                                <div class="loan-down" v-if="!loan.amountHide">
                                    <div class="dflex">
                                        <div class="l1 bold" v-if="loan.operation_type_1">{{$t('pay_for_renewal')}}</div>
                                        <div class="l1 bold" v-if="loan.operation_type_2">{{$t('for_partial_repayment')}}</div>

                                        <div class="l2 bold">{{nicePrice(loan.default_pay)}} ₸ </div>
                                    </div>
                                    <button class="button-yellow" v-bind:class="{ activeLoan: payments.includes(index)}" v-on:click="openPayments(index); expAmount(loan)" >{{$t('change_operation_parameters')}}</button>
                                    <div class="button-gray">
                                        <button v-on:click="openDetail(index)" v-if="!detail.includes(index)"><span>{{$t('in_detail')}}</span></button>
                                        <button v-on:click="closeDetail(index)" v-if="detail.includes(index)">{{$t('hide')}}</button>
                                    </div>
                                </div>
                            </div>
                            <div class="loan-1" v-if="payments.includes(index)">
                                <div class="dflex dflex3">
                                    <div class="dropdown">
                                        <button class="dropdown-toggle" type="button" data-toggle="dropdown" v-bind:class="{disabledDropdown : operations.length === 1}">
                                            <span v-if="renewal">{{$t('renewal')}}</span>
                                            <span v-if="partial_repayment">{{$t('partial_repayment')}}</span>
                                            <span class="bg"><span class="caret"></span></span></button>
                                            <ul class="dropdown-menu">
                                                <li v-if="operations.length > 1 && loan.partial_pay_option">
                                                    <a v-on:click="openPay">
                                                        <span v-if="!partial_repayment">{{$t('partial_repayment')}}</span>
                                                        <span v-if="!renewal">{{$t('renewal')}}</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <button class="close-l" v-on:click="closePayments(index)"><img :src="require('@/assets/img/icon/close-ad.svg')" alt=""></button>
                                    </div>
                                    <div class="ch-pog" v-if="partial_repayment">
                                        <div class="dflex">
                                            <div class="l1">{{$t('new_loan_term')}}</div>
                                            <div class="l2">{{ moment(loan.partial_date).format('DD.MM.YYYY') }}</div>
                                        </div>
                                        <div class="dflex">
                                            <div class="l1">{{$t('remuneration_amount')}}</div>
                                            <div class="l2">{{nicePrice(loan.percent_pay)}} ₸</div>
                                        </div>
                                        <div class="dflex dflex2">
                                            <div class="l1"><div v-html="$t('partial_redemption_amount')"></div>
                                            <span :class="{red : red_min === true}">{{$t('from')}} {{nicePrice(loan.min_amount_pay)}}</span>
                                            <span :class="{red : red_max === true}">{{$t('before')}} {{nicePrice(loan.max_amount_pay)}} ₸</span>
                                        </div>
                                        <div class="l2">
                                            <input type="number" pattern=" 0+\.[0-9]*[1-9][0-9]*$" :class="{red_border : red_max === true || red_min === true}" name="payment_sum" v-model="loan.payment_sum" v-on:keyup="checkSum(loan)" onkeypress="return event.charCode >= 48 && event.charCode <= 57">
                                        </div>
                                    </div>
                                    <div class="dflex">
                                        <div class="l1" v-html="$t('balance_loan_amount')"></div>
                                        <div class="l2"> {{nicePrice(loan.total_osz)}} ₸</div>
                                    </div>
                                    <div class="loan-down">
                                        <div class="dflex p-0">
                                            <div class="l1 bold">{{$t('pay_loan_partial_repayment')}}</div>
                                            <div class="l2 bold"> {{nicePrice(loan.total_iko)}} ₸</div>
                                        </div>
                                        <button class="button-yellow" v-on:click="changeDataLoans(loan);
                                        closePayments(index);">{{$t('to_apply')}}</button>
                                    </div>
                                </div>
                                <div class="prodl" v-if="renewal">
                                    <div class="pr-title">{{$t('how_many_days')}}</div>
                                    <div class="exten-slider" >
                                        <div class="ex-flex">
                                            <div class="min-ex">{{loan.min_days_extension}}</div>
                                            <div class="max-ex">{{loan.max_days_extension}}</div>
                                        </div>
                                        <vue-slider v-model="loan.count_days" :min='loan.min_days_extension' :max='loan.max_days_extension' :tooltip="'always'" @change="dayFunc(loan,index)"/>
                                        <div class="border"></div>
                                    </div>
                                    <div class="prod-input">
                                        <input type="number" pattern=" 0+\.[0-9]*[1-9][0-9]*$" :min="loan.min_days_extension" :max="loan.max_days_extension" v-model="loan.count_days" @change="defaultValue(loan);dayFunc(loan,index); " @input="dayFunc(loan,index)" @keyUp="dayFunc(loan,index)" name="input-vue-slider" onkeypress="return event.charCode >= 48 && event.charCode <= 57">
                                    </div>
                                    <div class="prod-text">
                                        <div class="pl-txt2"><span class="span">{{$t('new_term')}}</span>
                                            <div class="datepic" @click="datepickerFunc(loan)">
                                                <datepicker
                                                v-model="loan.partial_date"
                                                :format="formatDate"
                                                :language="ru"
                                                :monday-first="true"
                                                :disabled-dates="disabled"
                                                v-on:selected="changeDate(loan,index)"
                                                ></datepicker>
                                                <img :src="require('@/assets/img/icon/calendar.svg')" alt="" class="img">
                                            </div>
                                        </div>

                                        <div class="pl-txt"><span>{{$t('pay_loan_extension')}}</span> {{nicePrice(loans[index].amount)}} ₸</div>
                                    </div>
                                    <button class="button-yellow" v-on:click="changeDataLoansProd(loan); closePayments(index)">{{$t('to_apply')}}</button>
                                </div>
                            </div>
                            <div class="loan-2" v-if="detail.includes(index)">
                                <div class="loan2-1" v-if="description.length==0">
                                    <div class="contract-link" @click="checkContract(loan)"><span>{{$t('check_contract3')}}</span> <img src="@/assets/img/icon/contract.svg" alt=""></div>
                                    <div class="dflex2">{{$t('security_ticket')}} <div class="num">№ <p v-html="$options.filters.subStr(loan.loan_id)"></p></div></div>
                                    <div class="dflex">
                                        <div class="l1">{{$t('branch')}}</div>
                                        <div class="l2">
                                            <span >
                                                <router-link :to="`/cabinet/map?branch=${loan.branch.id}`">{{loan.branch.alias}}</router-link>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="dflex"><div class="l1">{{$t('loan_term')}}</div><div class="l2">{{loan.loan_term}}</div></div>
                                    <div class="dflex"><div class="l1">{{$t('guaranteed_term')}}</div><div class="l2">{{loan.guaranty_time}}</div></div>
                                    <div class="dflex"><div class="l1">{{$t('loan_balance')}}</div><div class="l2">{{nicePrice(loan.loan_balance)}} ₸</div></div>
                                    <div class="dflex"><div class="l1">{{$t('interest_payable')}}</div><div class="l2">{{nicePrice(loan.percent_pay)}} ₸</div></div>
                                    <div class="dflex"><div class="l1">{{$t('which_loan')}}</div><div class="l2">{{nicePrice(loan.loan_percent)}} ₸</div></div>
                                    <div class="dflex"><div class="l1">{{$t('for_delay')}}</div><div class="l2">{{nicePrice(loan.percent_delay_loan)}} ₸</div></div>
                                    <div class="loan-save" v-if="loan.keep_price>0">
                                        <div class="dflex2">{{$t('conservation_receipt')}} <div class="num">№ <p v-html="$options.filters.subStr(loan.loan_id)"></p></div></div>
                                        <div class="dflex">
                                            <div class="l1">{{$t('shelf_life')}}</div>
                                            <div class="l2">{{ moment(loan.keep_date).format('DD.MM.YYYY') }}</div>
                                        </div>
                                        <div class="dflex">
                                            <div class="l1">{{$t('keep_price')}}</div>
                                            <div class="l2">{{loan.keep_price}} ₸ </div>
                                        </div>
                                    </div>
                                    <div class="dflex"><div class="l1 bold">{{$t('total_return')}}</div><div class="l2 bold">{{nicePrice(loan.return_total)}} ₸</div></div>
                                </div>

                                <div class="loan2-3" v-if="description.includes(index)" v-for="(product,index) in loan.products" :key="product.id">
                                    <div class="dflex">
                                        <img v-img :src="product.image" alt="" class="img">

                                        <button class="close-l" v-on:click="closeDescription(index)"><img :src="require('@/assets/img/icon/close-ad.svg')" alt=""></button>
                                    </div>
                                    <div class="name">
                                        <p>{{$t('name')}}</p>
                                        <span>{{product.name}}</span>
                                    </div>
                                    <div class="text">
                                        <span class="des">{{$t('description')}}</span>
                                        <div class="text-p" v-bind:class="{'dnone-prod' : product.edit === false}">{{product.user_description}}</div>
                                        <div class="text-p" v-bind:class="{'dnone-prod' : product.edit === true}">----</div>

                                        <button class="button-yellow button-yellow2" data-toggle="modal" data-target="#modalEdit" @click="clickEdit(product)">
                                            <span v-if="product.edit">{{$t('edit')}}</span>
                                            <span v-if="!product.edit">{{$t('add_description')}}</span>
                                        </button>
                                    </div>
                                    <div class="modal-edit">
                                        <div id="modalEdit" class="modal fade">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-body">
                                                        <div class="modal-head">
                                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><img :src="require('@/assets/img/close.svg')" alt=""></button>
                                                            <div class="title">{{$t('product_description')}}</div>
                                                        </div>
                                                        <textarea class="textarea" v-model='product.message' @keyup="charCount(product)" v-bind:class="{'text-danger': hasError }" :placeholder="$t('product_description')"></textarea>
                                                        <div class="modal-foot">
                                                            <div class="dflex"><div v-bind:class="{'text-danger': hasError }">{{ letter }}</div>/{{ maxLetter }}</div>
                                                            <button class="button-yellow" :disabled="clickable" data-dismiss="modal" aria-hidden="true" @click="changeDescription(product)">{{$t('save')}}</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="loan2-2">
                                    <button class="close-l" v-on:click="closeDetail(index)"><img :src="require('@/assets/img/icon/close-ad.svg')" alt=""></button>
                                    <div class="table-1">
                                        <table>
                                            <tr><th>{{$t('products')}}</th><th>{{$t('probe')}}</th><th>{{$t('weight')}}</th><th>{{$t('content')}} <br> AU 999, {{$t('gr')}}</th></tr>
                                            <tr v-for="(product,index) in loan.products" :key="product.id">
                                                <td><button v-on:click="openDescription(index)">{{product.name}}</button></td><td>AU {{product.probe}}</td>
                                                <td>{{product.weight}}</td>
                                                <td>{{product.au999content}}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-extension modal-contract">
                                <div id="contract" class="modal fade">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-body">
                                                <div class="slider-extension">
                                                    <div class="extension" v-if="cont === 1">
                                                        <div v-if="loader" class="loader">
                                                            <img :src="require('@/assets/img/loader1.gif')" alt="">
                                                        </div>
                                                        <div class="modal-header modal-header-contract">
                                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><img :src="require('@/assets/img/icon/close-mb.svg')" alt=""></button>
                                                            <div class="modal-title">{{ $t('confirmation') }}</div>
                                                        </div>
                                                        <div class="text text-c">{{$t('contract_text2')}}</div>
                                                        <button class="button-orange button-orange-ex" @click="openPdf(loan)" >{{ $t('read_and_agree') }}</button>
                                                        <div class="img"><img :src="require('@/assets/img/ex.png')" alt=""></div>
                                                    </div>

                                                    <div class="extension" v-if="cont === 2">
                                                        <div v-if="loader" class="loader">
                                                            <img :src="require('@/assets/img/loader1.gif')" alt="">
                                                        </div>
                                                        <div class="modal-header modal-header-contract">
                                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><img :src="require('@/assets/img/icon/close-mb.svg')" alt=""></button>
                                                            <h1 class="modal-title">{{ $t('something_went_wrong') }}</h1>
                                                        </div>
                                                        <div class="text" v-if="errors">{{errors}}</div>
                                                        <div v-if="timeout" class="text">{{ $t('service_unavailable') }}</div>
                                                        <div class="img"><img :src="require('@/assets/img/ex.png')" alt=""></div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="button-yellow button-yellow-loan" v-bind:class="{disabled : payAll === 0}" @click="payAllLoans()" v-if="loans.length>0">{{$t('pay_total')}} <span> {{nicePrice(payAll)}} ₸</span></button>
            </div>
        </div>
    </div>
</template>

<script>
    import ProgressBar from 'vue-simple-progress'
    import VueSlider from 'vue-slider-component'
    import 'vue-slider-component/theme/antd.css'
    import moment from 'moment'
    import Switches from 'vue-switches';
    import Datepicker from 'vuejs-datepicker';
    import {en, ru, kk} from 'vuejs-datepicker/dist/locale'
    export default {
        name: 'myLoans',
        components: {
            ProgressBar,
            VueSlider,
            Datepicker,
            Switches
        },
        data() {
            return {
                payments: [],
                description: [],
                detail: [],
                message: '',
                letter: 0,
                maxLetter: 250,
                hasError: false,
                noclick: false,
                clickable: false,
                edit: true,
                loans: [],
                errorLog: '',
                partial_repayment: false,
                renewal: true,
                en: en,
                ru: ru,
                kk: kk,
                red_min: false,
                red_max: false,
                total: '',
                disabled: {
                    to: '',
                    from: '',
                },
                branch: '',
                payAll: 0,
                operations: [],
                loader: true,
                item_code: '',
                errorsServer: '',
                errors: '',
                op_type1: true,
                op_type2: false,
                cont: 1,
                timeout: false,
                iin: '',
                message: 1,
                mess: ''
            }
        },
        mounted() {
            var obj = this;
            $('#modalEdit').on('hidden.bs.modal', function () {
                obj.noclick = false;
                obj.hasError = false;
                obj.clickable = false;
            });
            $('#contract').on('hidden.bs.modal', function () {
                obj.cont = 1;
                obj.errors = '';
                obj.timeout = false;
                obj.loader = false;
            });
            if(window.screen.width > 767) {
                $(".loan-list").mCustomScrollbar({
                    autoHideScrollbar:false,
                    theme:"rounded",
                    scrollButtons:{
                        enable: true,
                        scrollAmount: 310,
                        scrollType: "stepped"
                    }
                });
                $(".dropdown-menu").click(function(e){
                    e.stopPropagation();
                })
            }
        },
        created() {
            this.getLoans();
            this.operationTypes();
            this.getUser();
        },
        watch:{
            'loans': {
                handler: function (after, before) {
                },
                deep: true
            }
        },
        filters:{
            subStr: function(loan_id) {
                var loan_string = String(loan_id)
                return loan_string = loan_string.substring(0,8) + loan_string.substring(8).bold();
            }
        },
        methods: {
            toggleSwitch: function(i) {
                this.loans[i].switch = !this.loans[i].switch
                if (this.loans[i].switch == false) {
                    this.loans[i].amountHide = true
                }
                if (this.loans[i].switch == true) {
                    this.loans[i].amountHide = false
                }
                if(this.loans[i].pay_restricted == true && this.loans[i].message == null){
                    this.loans[i].switch = false
                    this.loans[i].amountHide = true
                }
                if(this.loans[i].message != null && this.loans[i].pay_restricted == false){
                    this.loans[i].switch = false
                    this.loans[i].amountHide = true
                    this.loans[i].showModal = true
                    this.message = 2
                }
                if(this.loans[i].message != null && this.loans[i].pay_restricted == true){
                    this.loans[i].switch = false
                    this.loans[i].amountHide = true
                    this.loans[i].showModal = true
                    this.message = 1
                }
                if(this.loans[i].message==null && this.loans[i].pay_restricted == true){
                    this.loans[i].switch = false
                    this.loans[i].amountHide = true
                    this.loans[i].showModal = true
                    this.message = 1
                }
                if(this.loans[i].consent == true){
                    this.loans[i].showModal = false
                    this.loans[i].message = null
                    this.loans[i].pay_restricted = false
                }
                if(this.loans[i].switch == true && this.loans[i].message==null && this.loans[i].pay_restricted == false && this.loans[i].consent == true){
                    this.loans[i].switch = false
                    this.loans[i].amountHide = true
                    this.loans[i].message = this.loans[i].message_null
                    this.loans[i].showModal = true
                    this.message = 2
                    this.loans[i].consent = false
                }
                var tempLoans = this.loans;
                this.loans = [];
                this.loans = tempLoans;
                this.payAmount();
            },
            closeModal(loan){
                loan.showModal = false
                loan.switch = false
                loan.amountHide = true
                var tempLoans = this.loans
                this.loans=[];
                this.loans=tempLoans
            },
            consentModal(loan){
                loan.showModal = false
                loan.switch = true
                loan.amountHide = false
                loan.consent = true
                var tempLoans = this.loans
                this.loans=[];
                this.loans=tempLoans
                this.payAmount();
            },
            changeDate: function(data,i,x){
                var obj = this
                setTimeout(function(){
                    obj.loans[i].total.map(function (item) {
                        if(moment(obj.loans[i].partial_date).format("YYYY-MM-DD")==item.new_term) {
                            obj.loans[i].amount = item.amount;
                            obj.loans[i].count_days = item.id;
                        }
                    })
                    var tempLoans = obj.loans
                    obj.loans=[];
                    obj.loans=tempLoans;
                    if (!x) {
                        obj.changeDate(data,i,1)
                    }
                },100)

            },
            checkSum: function(loan) {
                if (loan.payment_sum >loan.max_amount_pay) {
                    this.red_max = true
                    this.red_min = false
                } else if(loan.payment_sum < loan.min_amount_pay) {
                    this.red_min = true
                    this.red_max = false
                } else {
                    this.red_min = false
                    this.red_max = false
                    loan.total_osz = loan.loan_balance - Number(String(loan.payment_sum));
                    loan.total_iko = loan.percent_pay + Number(String(loan.payment_sum));
                }
            },
            changeDataLoans: function(loan){
                loan.operation_type_1 = false;
                loan.operation_type_2 = true;
                loan.operation_type = 2;
                loan.default_pay = loan.total_iko;
                this.payAmount();

            },
            changeDataLoansProd: function(loan){
                loan.operation_type_1 = true;
                loan.operation_type_2 = false;
                loan.operation_type = 1;
                loan.default_pay = loan.amount;
                this.payAmount();
            },
            openPayments(index) {
                const inx = this.payments.indexOf(index);
                const ins = this.detail.indexOf(index);
                if (inx > -1) {
                    this.payments.splice(inx, 1)
                } else {
                    this.payments=[index]
                    this.operationTypes();
                    this.partial_repayment = false
                    this.renewal = true
                    this.detail.splice(ins, 1)
                }
            },
            closePayments(index) {
                const inx = this.payments.indexOf(index);
                this.payments.splice(inx, 1)
            },
            openDescription(index){
                const inx = this.description.indexOf(index);
                if (inx > -1) {
                    this.description.splice(inx, 1)
                } else {
                    this.description=[index]
                }
            },
            closeDescription(index){
                const inx = this.description.indexOf(index);
                this.description.splice(inx, 1)
            },
            openDetail(index){
                const inx = this.detail.indexOf(index);
                const ins = this.payments.indexOf(index);
                console.log(index);
                if (inx > -1) {
                    this.detail.splice(inx, 1)
                } else {
                    this.detail = [index]
                    this.description.splice(inx, 1)
                    this.payments.splice(ins, 1)
                }
            },
            closeDetail(index) {
                const inx = this.detail.indexOf(index);
                const ind = this.description.indexOf(index);
                this.detail.splice(inx, 1);
                this.description.splice(ind, 1)
            },
            getLoans() {
                this.loader = true
                this.$axios.get('/auth/loans')
                .then((response) => {
                    let $response = response.data
                    if ($response.code === 0) {
                        this.errorsServer = $response.error
                        this.loader = false
                    } else {
                        this.loans = $response.data
                        this.loader = false
                        this.gradientFunc();
                        this.descriptionLength();
                        this.payAmount();
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
            gradientFunc(){
                this.todays = moment();
                this.today = moment().format('DD.MM.YYYY');
                for(var i=0; i<this.loans.length;i++){
                    var startDate = moment(this.loans[i].start_date,"DD.MM.YYYY");
                    var guarantyTime = moment(this.loans[i].guaranty_time,"DD.MM.YYYY")
                    var loanTerm = moment(this.loans[i].loan_term,"DD.MM.YYYY")
                    var minTen = moment(this.loans[i].guaranty_time,"DD.MM.YYYY").subtract(10,'days').format('DD.MM.YYYY')
                    var date1 = moment(this.loans[i].loan_term,"DD.MM.YYYY").format('YYYY-MM-DD')
                    var date2 = moment(this.loans[i].guaranty_time,"DD.MM.YYYY").subtract(10,'days').format('YYYY-MM-DD')
                    var date3 = moment(this.loans[i].guaranty_time,"DD.MM.YYYY").format('YYYY-MM-DD')
                    var loan_bal = this.loans[i].loan_balance
                    var max_amount = this.loans[i].max_amount_pay
                    var loan_percent = this.loans[i].loan_percent
                    var percent_pay = this.loans[i].percent_pay
                    var max_days = this.loans[i].max_days_extension
                    var min_days = this.loans[i].min_days_extension
                    var min_date = moment(this.loans[i].partial_date).subtract(max_days,'days').format('YYYY-MM-DD')

                    this.loans[i].operation_type = 1
                    this.loans[i].operation_type_1 = true
                    this.loans[i].operation_type_2 = false
                    this.loans[i].min_date = min_date
                    this.loans[i].total_osz = loan_bal - max_amount
                    this.loans[i].total_iko = max_amount + percent_pay
                    this.loans[i].payment_sum = this.loans[i].max_amount_pay
                    this.loans[i].amount = percent_pay
                    this.loans[i].switch = true
                    this.loans[i].showModal = false
                    this.loans[i].consent = false
                    this.loans[i].message_null = this.loans[i].message
                    this.loans[i].amountHide = false
                    this.loans[i].count_days = max_days
                    this.loans[i].days=this.todays.diff(startDate, 'days')
                    this.loans[i].maxDays = guarantyTime.diff(startDate, 'days')

                    this.loans[i].green = moment().isSameOrBefore(loanTerm, 'day');
                    this.loans[i].yellow = moment().isAfter(date1, 'day') && moment().isBefore(date2, 'day');
                    this.loans[i].orange = moment().isAfter(date2, 'day') && moment().isBefore(date3, 'day');
                    this.loans[i].red = moment().isSameOrAfter(guarantyTime, 'day');
                    this.payAll += this.loans[i].default_pay;
                    if(this.loans[i].default_pay == null){
                        this.loans[i].switch = false
                        this.loans[i].amountHide = true
                        this.loans[i].amount = 0;
                        this.loans[i].default_pay = 0;
                        this.loans[i].loan_percent = 0;
                    }
                    if(this.op_type1 == true && this.op_type2 == false){
                        this.loans[i].operation_type_1 = true
                        this.loans[i].operation_type_2 = false
                    }
                    if(this.op_type1 == false && this.op_type2 == true){
                        this.loans[i].operation_type_1 = false
                        this.loans[i].operation_type_2 = true
                    }
                    if(this.loans[i].message!=null || this.loans[i].pay_restricted == true){
                        this.loans[i].switch = false
                        this.loans[i].amountHide = true
                    }
                    if(this.loans[i].message==null && this.loans[i].pay_restricted == true){
                        this.loans[i].switch = false
                        this.loans[i].amountHide = true
                    }
                }
            },
            openPay() {
                if(this.partial_repayment == true && this.renewal == false){
                    this.partial_repayment = false
                    this.renewal = true
                } else if (this.renewal == true && this.partial_repayment == false) {
                    this.partial_repayment = true
                    this.renewal = false
                }
            },
            nicePrice(money) {
                var nice = String(money).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ");
                return nice
            },
            formatDate (date) {
                return moment(date).format('DD.MM.YYYY')
            },
            expAmount(loan) {
                let obj = {}
                obj['loan_id'] = loan.loan_id
                this.$axios.post('/auth/calculation', obj)
                .then((response) => {
                    let $response = response.data
                    if ($response.code === 0) {
                        console.log($response.error)
                        this.errorsServer = $response.error
                    } else {
                        loan.total = $response.data
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
            dayFunc(loan,i){
                if(loan.count_days > loan.max_days_extension) {
                    loan.count_days=loan.max_days_extension
                }
                if (loan.count_days >= loan.min_days_extension) {
                    this.loans[i].amount = this.loans[i].total[loan.count_days - 1].amount
                    this.loans[i].partial_date = this.loans[i].total[loan.count_days - 1].new_term

                    var tempLoans = this.loans
                    this.loans=[];
                    this.loans=tempLoans
                }

            },
            defaultValue(loan) {
                if (loan.count_days.length == 0) {
                    loan.count_days = loan.min_days_extension
                }
                if (loan.count_days < loan.min_days_extension) {
                    loan.count_days = loan.min_days_extension
                }
                if(loan.count_days > loan.max_days_extension){
                    loan.count_days = loan.max_days_extension
                }
            },
            datepickerFunc(loan){
                let min_day = moment(loan.loan_term,"DD.MM.YYYY").add(loan.min_days_extension,'days').format('YYYY-MM-DD');
                let min_day_moment = moment(min_day,"YYYY-MM-DD").format('YYYY/MM/DD');
                let max_day = moment(loan.loan_term,"DD.MM.YYYY").add(loan.max_days_extension + 1,'days').format('YYYY-MM-DD');
                let max_day_moment = moment(max_day,"YYYY-MM-DD").format('YYYY/MM/DD');
                this.disabled = {
                    to: new Date(min_day_moment),
                    from: new Date(max_day_moment),
                }
            },
            payAmount(){
                this.payAll=0;
                for(var i=0; i<this.loans.length; i++){
                    if (this.loans[i].amountHide==false) {
                        this.payAll += this.loans[i].default_pay;
                    }
                }
            },
            payAllLoans(){
                let obj = {}
                let objArr=[]
                for(var i=0; i<this.loans.length;i++){
                    if(this.loans[i].switch == false){

                    }else {
                        obj = {};
                        obj['loan_id'] = this.loans[i].loan_id
                        obj['operation_type'] = this.loans[i].operation_type
                        obj['count_days'] = this.loans[i].count_days
                        obj['amount'] = this.loans[i].default_pay
                        obj['entered'] = this.loans[i].payment_sum
                        objArr.push(obj)
                    }
                }
                var data = {
                    "loans":objArr,
                    "place":'ЛКСайт'
                }
                this.$axios.post('/auth/regular_pay_order', data)
                .then((response) => {
                    let $response = response.data
                    if ($response.code === 0) {
                        console.log($response.error)
                        this.errorsServer = $response.error
                    } else {
                        var orderId=$response.data[0].order;
                        console.log($response.data[0])
                        this.$axios.post('/auth/req_pay', {"order_id":orderId}).then((r) => {
                            location.href = r.data.data.url;
                            this.urlAddress();
                        })
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
            bottomScroll(){
                let first = this.loans.shift();
                this.loans.push(first);
            },
            topScroll(){
                let first = this.loans.pop();
                this.loans.unshift(first);
            },
            operationTypes(){
                this.$axios.get('/operation_types')
                .then((response) => {
                    let $response = response.data
                    if ($response.code === 0) {
                        console.log($response)
                        this.errorsServer = $response.error
                    } else {
                        this.operations = $response.data
                        for(var i=0; i<this.operations.length;i++){
                            if(this.operations.length == 1){
                                if(this.operations[i].id == 1){
                                    this.partial_repayment = false
                                    this.renewal = true
                                    this.op_type1 = true
                                    this.op_type2 = false
                                }
                                if(this.operations[i].id == 2){
                                    this.partial_repayment = true
                                    this.renewal = false
                                    this.op_type1 = false
                                    this.op_type2 = true
                                }
                            }
                        }
                    }
                })
                .catch((e) => console.log(e))
            },
            clickEdit(product){
                product.message = product.user_description
                this.letter = product.letter
                this.item_code = product.item_code
            },
            charCount: function(product){
                this.letter = product.message.length;
                this.hasError = this.letter > this.maxLetter;
                this.clickable = this.hasError;
            },
            changeDescription(product){
                let obj = {}
                obj['item_code'] = this.item_code
                obj['user_description'] = product.message
                this.$axios.post('/auth/change_description', obj)
                .then((response) => {
                    let $response = response.data
                    if ($response.code === 0) {
                        console.log($response.error)
                        this.errorsServer = $response.error
                    } else {
                        product.user_description = product.message
                        product.letter = this.letter
                        if(product.user_description.length <= 0){
                            product.edit = false
                        }
                        if(product.user_description.length >= 1){
                            product.edit = true
                        }
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
            descriptionLength(){
                for(var i=0; i<this.loans.length;i++){
                    for(var j=0; j<this.loans[i].products.length;j++){
                        this.loans[i].products[j].edit = true
                        this.loans[i].products[j].letter = 0
                        this.loans[i].products[j].message = this.loans[i].products[j].user_description
                        if(this.loans[i].products[j].user_description == null){
                            this.loans[i].products[j].letter = 0;
                            this.loans[i].products[j].edit = false;
                            this.clickable = true;
                        } else {
                            this.loans[i].products[j].edit = true;
                            this.loans[i].products[j].letter = this.loans[i].products[j].user_description.length
                            this.clickable = false;
                        }
                    }
                }
            },
            urlAddress(){
                localStorage.setItem('url', this.$router.history.current.path);
            },
            getUser () {
                this.$axios.post('/auth/me')
                .then((response) => {
                    let $response = response.data
                    if ($response.code === 0) {
                        console.log($response)
                    } else {
                        this.iin = $response.data.iin
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
            checkContract(loan){
                console.log(loan)
                this.$axios.get('/contract-check?iin=' + this.iin + '&code=' + loan.loan_id, {timeout: 30000})
                .then((response) => {
                    let $response = response.data
                    if ($response.code === 0) {
                        this.cont = 2
                        this.errors = $response.error
                        $('#contract').modal('show')
                        console.log($response);
                    } else {
                        console.log($response.data.status);
                        if($response.data.status == 'checked'){
                            window.open('https://mk-zoloto-lombard.kz/api/contract-info?iin=' + this.iin + '&code=' + loan.loan_id, '_blank');
                        }
                        if($response.data.status == 'not checked'){
                            $('#contract').modal('show')
                            this.cont = 1
                        }
                    }
                })
                .catch((e) => {
                    $('#contract').modal('show')
                    this.cont = 2
                    if(e.toString().includes("timeout")) {
                        this.cont = 2
                        this.timeout = true
                    }
                    console.log(e)
                })
            },
            openPdf(loan){
                window.open('https://mk-zoloto-lombard.kz/api/contract-info?iin=' + this.iin + '&code=' + loan.loan_id, '_blank');
            },
        }
    }
</script>

<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.4s
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0
    }
</style>
