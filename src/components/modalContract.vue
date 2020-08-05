<template>
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
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><img :src="require('@/assets/img/icon/close-mb.svg')" alt=""></button>
                        <div class="modal-title">{{ $t('check_contract3') }}</div>
                      </div>
                      <form @submit.prevent="contractCheck">
                        <div class="form-1">
                          <p>{{ $t('login_t') }}</p>
                          <input type="tel" :placeholder="$t('login_placeholder')" v-mask="'############'" v-model="iin">
                        </div>
                        <div class="form-1">
                          <p>{{ $t('contract_code') }}</p>
                          <!-- <input type="text" :placeholder="$t('enter_contract_code')" maxlength="16" v-model="code" > -->
                          <input type="text" :placeholder="$t('enter_contract_code')" v-mask="'XXXXXXXXXXXXXXXX'" v-model="code" class="text-up">
                        </div>
                        <div class="text mt-30">{{$t('login_text')}}</div>
                        <button :class="(this.iin!='' && this.code!='' && this.iin.length==12) ? 'button-orange':'button-orange disabled'">{{ $t('verify') }}</button>
                      </form>
                      <div class="img"><img :src="require('@/assets/img/ex.png')" alt=""></div>
                    </div>

                    <div class="extension" v-if="cont === 2">
                      <div v-if="loader" class="loader">
                        <img :src="require('@/assets/img/loader1.gif')" alt="">
                      </div>
                      <div class="modal-header modal-header-contract">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><img :src="require('@/assets/img/icon/close-mb.svg')" alt=""></button>
                        <div class="modal-title">{{ $t('confirmation') }}</div>
                      </div>
                      <div class="text text-c">{{$t('contract_text2')}}</div>
                      <button class="button-orange" @click="openPdf()" >{{ $t('read_and_agree') }}</button>
                      <div class="img"><img :src="require('@/assets/img/ex.png')" alt=""></div>
                    </div>

                    <div class="extension" v-if="cont === 3">
                      <div v-if="loader" class="loader">
                        <img :src="require('@/assets/img/loader1.gif')" alt="">
                      </div>
                      <div class="modal-header modal-header-contract">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><img :src="require('@/assets/img/icon/close-mb.svg')" alt=""></button>
                        <h1 class="modal-title">{{ $t('something_went_wrong') }}</h1>
                      </div>
                      <div class="text" v-if="errors">{{errors}}</div>
                      <div v-if="timeout" class="text">{{ $t('service_unavailable') }}</div>
                      <div class="forgot-password" @click="clickSteps(1)"><— {{ $t('back') }}</div>
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
  export default {
    name: 'modalContract',
    data () {
          return {
            loader: false,
            cont: 1,
            iin: '',
            code: '',
            errors: '',
            timeout: false
          }
        },
        mounted () {
          var obj = this;
          $('#contract').on('hidden.bs.modal', function () {
            obj.cont = 1;
            obj.iin = '';
            obj.code = '';
            obj.errors = '';
            obj.timeout = false;
            obj.loader = false;
          });
        },
        methods: {
          contractCheck(){
            this.loader = true
              this.$axios.get('/contract-check?iin=' + this.iin + '&code=' + this.code, {timeout: 30000})
              .then((response) => {
                let $response = response.data
                if ($response.code === 0) {
                  this.loader = false
                  this.cont = 3
                  this.errors = $response.error
                } else {
                  if($response.data.status == 'checked'){
                    window.open('https://mk-zoloto-lombard.kz/api/contract-info?iin=' + this.iin + '&code=' + this.code, '_blank');
                  }
                  if($response.data.status == 'not checked'){
                    this.cont = 2
                  }
                }
                this.loader = false
              })
              .catch((e) => {
                this.cont = 3
                this.loader = false
                if(e.toString().includes("timeout")) {
                  this.cont = 3
                  this.timeout = true
                }
                console.log(e)
              })
          },
          openPdf(){
            window.open('https://mk-zoloto-lombard.kz/api/contract-info?iin=' + this.iin + '&code=' + this.code, '_blank');
          },
          clickSteps(index){
            if (index == 1){
              this.cont = 1
            }
          }
        }
  }
</script>

<style scoped>

</style>
