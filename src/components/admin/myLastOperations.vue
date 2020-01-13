<template>
    <div class="myLastOperations">
        <div v-if="loader" class="loader loader-admin">
            <img :src="require('@/assets/img/loader1.gif')" alt="">
        </div>
        <div class="errorsServer" v-if="errorsServer">
            {{errorsServer}}
        </div>
        <div v-if="!errorsServer">
            <div class="title">{{$t('my_last_operations')}}</div>
            <div class="textOperation" v-if="operations.length<1">
                <div>{{$t('text_operation')}}</div>
            </div>
            <div class="table-responsive mb-oper" v-if="operations.length>0">
                <table class="table-1">
                    <tr><th>{{$t('order_number')}}</th><th>{{$t('date_and_time')}}</th><th>{{$t('place_operation')}}</th><th>{{$t('operation')}}</th><th>{{$t('security_ticket')}}</th><th>{{$t('transaction_amount')}}</th><th>{{$t('status')}}</th><th>{{$t('receipt')}}</th></tr>

                    <tr v-for="(operation, index) in operations" :key="index">
                        <td>{{operation.order}}</td>
                        <td>{{ moment(operation.date).format('DD.MM.YYYY  HH:mm') }}</td>
                        <td><span>{{operation.place}}</span></td>
                        <td><span v-for="loan in operation.loans">{{loan.operation_type}}</span></td>
                        <td><span v-for="loan in operation.loans" v-html="$options.filters.subStr(loan.loan_id)"></span> <span class="it it-w" v-if="operation.loans.length > 1">{{$t('total_amount')}}</span></td>
                        <td><span v-for="loan in operation.loans">{{loan.amount}} ₸</span> <span class="it" v-if="operation.loans.length > 1" style="text-align: left;">{{operation.sum}} ₸</span></td>
                        <td><span class="green" v-if="operation.success === true">{{operation.status}}</span><span class="red" v-if="operation.success === false">{{operation.status}}</span></td>
                        <td><a :href="operation.pdf" target="_blank" class="kvi" v-if="operation.success === true">{{$t('receipt')}}</a></td>
                    </tr>
                </table>
            </div>
            <div class="myLastOperations-mobile" v-if="operations.length>0">
                <div class="mo" v-for="(operation, index) in operations" :key="index">
                    <div class="mo-title">
                        <div class="mo-t"><span>{{$t('order_number')}}</span>{{operation.order}}</div>
                        <a :href="operation.pdf" target="_blank" class="kvi" v-if="operation.success === true">{{$t('receipt')}}</a>
                    </div>
                    <div class="mo-content" v-for="loan in operation.loans">
                        <div class="dflex">
                            <div class="l1">{{$t('date_and_time')}}</div>
                            <div class="l2">{{ moment(loan.date).format('DD.MM.YYYY  HH:mm') }}</div>
                        </div>
                        <div class="dflex">
                            <div class="l1">{{$t('place_operation')}}</div>
                            <div class="l2">{{operation.place}}</div>
                        </div>
                        <div class="dflex">
                            <div class="l1">{{$t('operation')}}</div>
                            <div class="l2">{{loan.operation_type}}</div>
                        </div>
                        <div class="dflex">
                            <div class="l1">{{$t('security_ticket')}}</div>
                            <div class="l2">{{loan.loan_id}}</div>
                        </div>
                        <div class="dflex">
                            <div class="l1">{{$t('transaction_amount')}}</div>
                            <div class="l2">{{loan.amount}} ₸</div>
                        </div>
                    </div>
                    <div class="mo-down">
                        <div class="dflex" v-if="operation.loans.length > 1">
                            <div class="l1 bold">{{$t('total_amount')}}</div>
                            <div class="l2 bold">{{operation.sum}} ₸</div>
                        </div>
                        <div class="dflex">
                            <div class="l1">{{$t('status')}}</div>
                            <div class="l2"><span class="green" v-if="operation.success === true">{{operation.status}}</span><span class="red" v-if="operation.success === false">{{operation.status}}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "myLastOperations",
        data () {
            return{
                operations:'',
                sum: 0,
                loader: true,
                errorsServer: ''
            }
        },
        created(){
            this.getOperations();
        },
        filters:{
            subStr: function(loan_id) {
                var loan_string = String(loan_id)
                return loan_string = loan_string.substring(0,8) + loan_string.substring(8).bold();
            }
        },
        methods: {
            getOperations () {
                this.$axios.get('/auth/operations')
                .then((response) => {
                    let $response = response.data
                    if ($response.code === 0) {
                        console.log($response)
                        this.errorsServer = $response.error
                        this.loader = false
                    } else {
                        this.operations = $response.data
                        this.loader = false
                        for(let i = 0; i < this.operations.length; i += 1) {
                            this.operations[i].sum = 0;
                            for (let j = 0; j < this.operations[i].loans.length; j += 1) {
                                this.operations[i].sum += this.operations[i].loans[j].amount;
                            }
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
            }
        }
    }
</script>

<style scoped>

</style>
