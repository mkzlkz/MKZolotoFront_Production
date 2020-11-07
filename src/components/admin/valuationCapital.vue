<template>
    <div class="myLastOperations valuationCapital">
        <div v-if="loader" class="loader loader-admin">
            <img :src="require('@/assets/img/loader1.gif')" alt="">
        </div>
                <div class="errorsServer" v-if="errorsServer">
            {{errorsServer}}
        </div>
        <div v-if="!errorsServer">
        <div class="title">{{$t('valuation_capital')}}</div>
        <div class="title-text">{{$t('today')}}  {{ moment().format('DD.MM.YYYY') }} {{$t('text_1')}} {{payAll}} ₸ {{$t('text_2')}}</div>
        <div class="table-responsive mb-capital" v-if="products.length>0 || productsLocal.length>0">
            <table class="table-1">
                <tr><th>{{$t('title_o')}}</th><th>{{$t('img')}}</th><th>{{$t('gold_content')}}</th><th>{{$t('product_weight')}} <br> ({{$t('gram')}})</th><th>{{$t('content')}} <br> AU999 ({{$t('gram')}})</th><th>{{$t('name')}}</th><th>{{$t('description')}}</th><th v-html="$t('getting_hands')"></th> <th></th></tr>

                <tr v-for="(product, index) in products" :key="index">
                    <td><span>{{product.name}}</span></td>
                    <td><img v-img :src="product.image" alt="" class="img"></td>
                    <td>AU {{product.probe}}</td>
                    <td>{{product.weight}}</td>
                    <td>{{product.au999content}}</td>
                    <td>{{product.description}}</td>

                    <td><div class="opis"><div class="txt" v-if="product.edit">{{product.user_description}}</div><div class="txt" v-if="!product.edit">-----</div><button class="button-yellow" data-toggle="modal" data-target="#modalEdit" @click="clickEdit(index)"><span v-if="product.edit">{{$t('edit')}}</span> <span v-if="!product.edit">{{$t('add_description')}}</span></button></div> </td>
                    <td><span v-if="!product.amountHide">{{product.max_amount_date_issue}} ₸</span><span v-if="product.amountHide">-</span></td>
                    <td><div class="switch switch-op" @click="toggleSwitch(index)">
                        <switches v-model="product.switch" type-bold="true" ></switches>
                    </div></td>
                </tr>
                <tr v-for="(product, index) in productsLocal" :key="product.id">
                    <td><span>{{product.name}}</span></td>
                    <td></td>
                    <td>{{product.probeTitle}}</td>
                    <td>{{roundingNumbers(product.weight)}}</td>
                    <td>{{product.au999content}}</td>
                    <td></td>
                    <td></td>
                    <td><span v-if="!product.amountHide">{{roundingNumbers_none(product.max_amount_date_issue)}} ₸</span><span v-if="product.amountHide">-</span></td>
                    <td> <div class="switch switch-op" @click="toggleSwitch2(index)">
                        <switches v-model="product.switch" type-bold="true" ></switches>
                    </div>
                </td>
            </tr>

        </table>
    </div>
    <div class="valuationCapital-mobile">
        <div class="vc" v-for="(product, index) in products" :key="index">
            <div class="vc-title">
                <div class="vc-img">
                    <img v-img :src="product.image" alt="" class="img">
                </div>
                <div class="switch switch-op" @click="toggleSwitch(index)">
                    <switches v-model="product.switch" type-bold="true" ></switches>
                </div>
            </div>
            <div class="vc-desc">
                <div class="opis"><div class="txt" v-if="product.edit">{{product.user_description}}</div><div class="txt" v-if="!product.edit">-----</div><button class="button-yellow" data-toggle="modal" data-target="#modalEdit" @click="clickEdit(index)"><span v-if="product.edit">{{$t('edit')}}</span> <span v-if="!product.edit">{{$t('add_description')}}</span></button></div>
            </div>
            <div class="vc-content">
                <div class="dflex">
                    <div class="l1">{{$t('title_o')}}</div>
                    <div class="l2">{{product.name}}</div>
                </div>
                <div class="dflex">
                    <div class="l1">{{$t('gold_content')}}</div>
                    <div class="l2">AU {{product.probe}}</div>
                </div>
                <div class="dflex">
                    <div class="l1">{{$t('product_weight')}} <br> ({{$t('gram')}})</div>
                    <div class="l2">{{product.weight}}</div>
                </div>
                <div class="dflex">
                    <div class="l1" v-html="$t('getting_hands')"></div>
                    <div class="l2"><span v-if="!product.amountHide">{{product.max_amount_date_issue}} ₸</span><span v-if="product.amountHide">-</span></div>
                </div>
            </div>
        </div>

        <div class="vc" v-for="(product, index) in productsLocal" :key="product.id">
            <div class="vc-title vc-title-local">
                <div class="switch switch-op" @click="toggleSwitch2(index)">
                    <switches v-model="product.switch" type-bold="true" ></switches>
                </div>
            </div>
            <div class="vc-content">
                <div class="dflex">
                    <div class="l1">{{$t('title_o')}}</div>
                    <div class="l2">{{product.name}}</div>
                </div>
                <div class="dflex">
                    <div class="l1">{{$t('gold_content')}}</div>
                    <div class="l2">{{product.probeTitle}}</div>
                </div>
                <div class="dflex">
                    <div class="l1">{{$t('product_weight')}} <br> ({{$t('gram')}})</div>
                    <div class="l2">{{product.weight}}</div>
                </div>
                <div class="dflex">
                    <div class="l1" v-html="$t('getting_hands')"></div>
                    <div class="l2"><span v-if="!product.amountHide">{{roundingNumbers_none(product.max_amount_date_issue)}} ₸</span><span v-if="product.amountHide">-</span></div>
                </div>
            </div>
        </div>
    </div>
    <div class="valuationCapital-foot">
        <button class="button-yellow" data-toggle="modal" data-target="#modalAdd">{{$t('add_item')}}</button>
        <div class="price" v-if="products.length>0 || productsLocal.length>0"><span>{{$t('total')}}</span> <span>{{roundingNumbers_none(payAll)}} ₸</span></div>
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
                        <textarea class="textarea" v-model='message' @keyup="charCount()" v-bind:class="{'text-danger': hasError }" :placeholder="$t('product_description')"></textarea>
                        <div class="modal-foot">
                            <div class="dflex"><div v-bind:class="{'text-danger': hasError }">{{ letter }}</div>/{{ maxLetter }}</div>
                            <button class="button-yellow" :disabled="clickable" data-dismiss="modal" aria-hidden="true" @click="changeDescription">{{$t('save')}}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal-extension modal-auth">
        <div id="modalAdd" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="extension">
                            <div class="tab-1">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><img :src="require('@/assets/img/icon/close-mb.svg')" alt=""></button>
                                    <div class="modal-title">{{$t('add_item_2')}}</div>
                                </div>
                                <div class="form-1">
                                    <p>{{$t('product_name')}}</p>
                                    <input type="text" name="input_nvi" maxlength="50" v-model="name" :placeholder="$t('product_your_name')">
                                </div>
                                <div class="form-1">
                                    <p>{{$t('gold_content')}}</p>
                                    <div class="select-border" name="" id="">
                                        <select v-model="probe">
                                            <option v-for="(probe, index) in probes" :key="probe.id" :value="probe.value">{{ probe.key }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-1">
                                    <p>{{$t('product_weight')}} ({{$t('gram')}})</p>
                                    <input placeholder="0" @blur="saveEdit" v-on:keydown="getkey" v-on:input="getkey" ref="inWeight" v-model="weight" id="currencyTextBox">

                                    <div v-if="showAnsver" class="weight-1">
                                        {{ $t('gold_weight_exceed') }} {{maxWeight}} {{ $t('gram_text') }}
                                    </div>
                                </div>
                                <button :class="(this.name!='' && this.weight!='') ? 'button-orange':'button-orange disabled'" @click="addProduct()" data-dismiss="modal" aria-hidden="true">{{$t('add')}}</button>
                            </div>
                            <div class="img"><img :src="require('@/assets/img/ex.png')" alt=""></div>
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
    import Switches from 'vue-switches';
    export default {
        name: "valuationCapital",
        components: {Switches},
        data() {
            return {
                hasError: false,
                noclick: false,
                clickable: false,
                message: '',
                item_code: '',
                letter: 0,
                maxLetter: 250,
                products: [],
                productsLocal: [],
                payAll: 0,
                payAll1: 0,
                payAll2: 0,
                name: '',
                weight: '',
                probe: '',
                probes: [],
                switch: false,
                loader: true,
                edit: true,
                showAnsver: false,
                maxWeight: 2000,
                errorsServer: ''
            }
        },
        mounted () {
                          $.fn.inputFilter = function(inputFilter) {
    return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  };
  $("#currencyTextBox").inputFilter(function(value) {
  return /^-?\d*[.]?\d{0,2}$/.test(value); });
            var obj = this;
            $('#modalAdd').on('hidden.bs.modal', function () {
                obj.name = '';
                obj.weight = '';
                obj.probe = obj.probes[5].value;
            });
            $('#modalEdit').on('hidden.bs.modal', function () {
                obj.noclick = false;
                obj.hasError = false;
                obj.clickable = false;
                obj.getProducts();
            });
        },
        created() {
            this.getProducts();
            this.getProductsLocal();
            this.getLayout();
            this.payAmount();
        },
        watch:{
            weight: function (newWeight, oldWeight) {
                if (String(newWeight[0]) == '0' ) {
                    this.weight=oldWeight
                }
                if (String(newWeight[0]) == '.' ) {
                    this.weight=oldWeight
                }
                if (newWeight == parseFloat(newWeight).toFixed(3)) {
                    this.weight = oldWeight
                }
                if (newWeight > this.maxWeight) {
                    this.showAnsver = true
                    this.weight = oldWeight
                }
            },
            'products': {
                handler: function (after, before) {
                },
                deep: true
            }
        },
        methods: {
            roundingNumbers(number) {
                var rounding = Number(number).toFixed(2);
                return rounding
            },
            roundingNumbers_none(number) {
                var rounding = Number(number).toFixed(0);
                return rounding
            },
            toggleSwitch: function(i) {
                this.products[i].switch = !this.products[i].switch
                this.products[i].amountHide = !this.products[i].amountHide
                var tempProducts = this.products;
                this.products = [];
                this.products = tempProducts;
                this.payAmount();
            },
            toggleSwitch2: function(i) {
                this.productsLocal[i].switch = !this.productsLocal[i].switch
                this.productsLocal[i].amountHide = !this.productsLocal[i].amountHide
                var tempProductsLocal = this.productsLocal
                this.productsLocal = []
                this.productsLocal = tempProductsLocal
                this.payAmount();
            },
            getProductsLocal () {
                this.productsLocal = JSON.parse(localStorage.getItem("products"));
                if (!this.productsLocal) {
                    this.productsLocal=[];
                }
            },
            getLayout () {
                this.$axios.get('/probes')
                .then((response) => {
                    let $response = response.data
                    if ($response.code === 0) {
                        console.log($response)
                        this.errorsServer = $response.error
                        this.loader = false
                    } else {
                        this.probes = $response.data;
                        this.probe = this.probes[5].value
                    }
                }).catch((e) => console.log(e))
            },
            getProducts () {
                this.$axios.get('/auth/products')
                .then((response) => {
                    let $response = response.data
                    if ($response.code === 0) {
                        console.log($response)
                        this.errorsServer = $response.error
                        this.loader = false
                    } else {
                        this.products = $response.data
                        this.loader = false
                        this.descriptionLength();
                        for(var i=0; i<this.products.length;i++){
                            this.products[i].switch = true
                            this.products[i].amountHide = false
                            this.payAll += this.products[i].max_amount_date_issue;
                            this.payAmount();
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
            addProduct(){
                var products = [];
                var max_amount_date_issue = this.weight * this.probe
                var probeTitle = "";
                var obj = this;

                this.probes.map(function(item,key){
                    if (item.value==obj.probe) {
                        obj.probeTitle=item.key;
                    }
                })
                this.productsLocal.push({"name": this.name, "weight": this.weight, "probeTitle":this.probeTitle,"probe":this.probe, "max_amount_date_issue":max_amount_date_issue, "switch":true,"amountHide":false})
                localStorage.setItem("products", JSON.stringify(this.productsLocal));
                var retrievedData = localStorage.getItem("products");
                var products2 = JSON.parse(retrievedData);
                this.payAmount();

            },
            payAmount(){
                this.payAll1=0;
                this.payAll2=0;
                for(var i=0; i<this.products.length; i++){
                    if (this.products[i].amountHide==false) {
                        this.payAll1 += this.products[i].max_amount_date_issue;
                    }
                }
                for(var i=0; i<this.productsLocal.length; i++){
                    if (this.productsLocal[i].amountHide==false) {
                        this.payAll2 += this.productsLocal[i].max_amount_date_issue;
                    }
                }
                this.payAll = 0
                this.payAll = this.payAll1 + this.payAll2
            },
            clickEdit(index){
                this.message = this.products[index].user_description
                this.letter = this.products[index].letter
                this.item_code = this.products[index].item_code
            },
            charCount: function(){
                this.letter = this.message.length;
                this.hasError = this.letter > this.maxLetter;
                // this.noclick = this.letter < 1;
                this.clickable = this.hasError;
            },
            changeDescription(){
                let obj = {}
                obj['item_code'] = this.item_code
                obj['user_description'] = this.message
                this.$axios.post('/auth/change_description', obj)
                .then((response) => {
                    let $response = response.data
                    if ($response.code === 0) {
                        console.log($response.error)
                        this.errorsServer = $response.error
                        this.loader = false
                    } else {
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
            descriptionLength(){
                for(var i=0; i<this.products.length; i++){
                    this.products[i].edit = true
                    this.products[i].letter = 0
                    if(this.products[i].user_description == null){
                        this.products[i].letter = 0;
                        this.products[i].edit = false;
                        this.clickable = true;
                    } else {
                        this.products[i].edit = true;
                        this.products[i].letter = this.products[i].user_description.length;
                        this.clickable = false;
                    }
                }
            },
            getAnsver() {
                if (this.weight.length > 0) {
                    this.showAnsver = false
                } else {
                    this.showAnsver = true
                }
            },
            saveEdit(e) {
                this.showAnsver = false
            },
            getkey(evt) {
                evt = (evt) ? evt : window.event;
                var charCode = (evt.which) ? evt.which : evt.keyCode;
                if ( (this.weight.length == 0 && charCode == 48) || (charCode == 96 && this.weight.length == 0) || (charCode == 190 && this.weight.length == 0)) {
                    evt.preventDefault()
                }
                if (charCode == 46 || charCode == 8 && this.showAnsver == true) {
                    this.showAnsver = false
                }
                if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 190 && charCode !== 188 && charCode != 110) {
                    if (charCode >= 96 && charCode <= 105) {

                    }else{
                        evt.preventDefault();
                    }
                } else {
                    if (charCode == 188 || charCode == 190 || charCode ==110) {
                        evt.preventDefault()
                        if (this.weight.length == 0) {
                            evt.preventDefault()
                        }
                        if (this.weight.split(".").length < 2 && this.weight.length != 0) {
                            this.weight = this.weight + "."
                        }
                    } else {
                        return true;
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
