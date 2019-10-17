<template>
    <div class="myLastOperations valuationCapital">
                    <div v-if="loader" class="loader loader-admin">
            <img :src="require('@/assets/img/loader1.gif')" alt="">
        </div>
        <div class="title">{{$t('valuation_capital')}}</div>
        <div class="title-text">{{$t('today')}}  {{ moment().format('DD.MM.YYYY') }} {{$t('text_1')}} {{payAll}} ₸ {{$t('text_2')}}</div>
        <div class="table-responsive mb-capital">
            <table class="table-1">
                <tr><th>{{$t('title_o')}}</th><th>{{$t(img)}}</th><th>{{$t('gold_content')}}</th><th>{{$t('product_weight')}} <br> ({{$t('gram')}})</th><th>{{$t('content')}} <br> AU999 ({{$t('gram')}})</th><th>{{$t('name')}}</th><th>{{$t('description')}}</th><th v-html="$t('getting_hands')"></th> <th></th></tr>

                <tr v-for="(product, index) in products" :key="index">
                    <td>{{product.name}}</td>
                    <td><img v-img :src="product.image" alt="" class="img"></td>
                    <td>AU {{product.probe}}</td>
                    <td>{{product.weight}}</td>
                    <td>{{product.au999content}}</td>
                    <td>{{product.name}}</td>

                    <td><div class="opis"><div class="txt">{{product.description}}</div><!-- <button class="button-yellow" data-toggle="modal" data-target="#modal-edit">{{$t('edit')}}</button> --></div></td>
                    <td><span v-if="!product.amountHide">{{product.max_amount_date_issue}} ₸</span><span v-if="product.amountHide">-</span></td>
                    <td><div class="switch switch-op" @click="toggleSwitch(index)">
                        <switches v-model="product.switch" type-bold="true" ></switches>
                    </div></td>
                </tr>
                <tr v-for="(product, index) in productsLocal" :key="product.id">
                    <td>{{product.name}}</td>
                    <td></td>
                    <td>{{product.probeTitle}}</td>
                    <td>{{product.weight}}</td>
                    <td>{{product.au999content}}</td>
                    <td>{{product.name}}</td>
                    <td></td>
                    <td><span v-if="!product.amountHide">{{product.max_amount_date_issue}} ₸</span><span v-if="product.amountHide">-</span></td>
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
                <div class="opis"><div class="txt">{{product.description}}</div><!-- <button class="button-yellow" data-toggle="modal" data-target="#modal-edit">{{$t('edit')}}</button> --></div>
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
                    <div class="l2"><span v-if="!product.amountHide">{{product.max_amount_date_issue}} ₸</span><span v-if="product.amountHide">-</span></div>
                </div>
            </div>
        </div>
    </div>
    <div class="valuationCapital-foot">
        <button class="button-yellow" data-toggle="modal" data-target="#modalAdd">{{$t('add_item')}}</button>
        <div class="price"><span>{{$t('total')}}</span> <span>{{payAll}} ₸</span></div>
    </div>
    <div class="modal-edit">
        <div id="modal-edit" class="modal fade">
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
                            <button class="button-yellow" :disabled="clickable">{{$t('save')}}</button>
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
                                    <input type="text" name="input_nvi" v-model="name" :placeholder="$t('product_your_name')">
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
                                    <input type="number" name="input_w" :placeholder="0" v-model="weight">
                                </div>
                                <button class="button-orange" @click="addProduct()" data-dismiss="modal" aria-hidden="true">{{$t('add')}}</button>
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
    import Switches from 'vue-switches';
    export default {
        name: "valuationCapital",
        components: {Switches},
        data() {
            return {
                hasError: false,
                clickable: false,
                message: 'Кольцо, белое золото, маленькое, родовое, тётя Гаухар подарила на день рождения в 1983 году, Айке передарю как подрастет немножко.',
                letter: '',
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
                loader: true
            }
        },
                mounted () {
            var obj = this;
            $('#modalAdd').on('hidden.bs.modal', function () {
                obj.name = '';
                obj.weight = '';
                obj.probe = obj.probes[5].value;
            });
        },
        created() {
            this.charCount();
            this.getProducts();
            this.getProductsLocal();
            this.getLayout();
            this.payAmount();
        },
        watch:{
            'products': {
                handler: function (after, before) {
                },
                deep: true
            }
        },
        methods: {
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
            charCount: function(){
                this.letter = this.message.length;
                this.hasError = this.letter > this.maxLetter;
                this.clickable = this.hasError;
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
                    } else {
                        this.products = $response.data
                        this.loader = false
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
            }
        }
    }
</script>

<style scoped>

</style>
