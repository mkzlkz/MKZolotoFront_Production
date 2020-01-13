<template>
  <div class="ExpressExtensionPage ex-margin">
    <div v-if="loader" class="loader loader-admin">
      <img :src="require('@/assets/img/loader1.gif')" alt="">
    </div>
    <div class="slider-extension">
      <div class="extension extension-ex">
        <div class="modal-header modal-header-ex">
          <div class="modal-title">{{ $t('check_contract3') }}</div>
        </div>
        <div class="form-width">
          <div class="form-1">
            <p>{{ $t('iin') }}</p>
            <input type="tel" name="input_ei" :placeholder="$t('enter_iin')" v-mask="'############'" v-model="iin">
          </div>
          <div class="form-1">
            <p>{{ $t('number_zb') }}</p>
            <input type="text" name="input_ez" :placeholder="$t('enter_zb')" maxlength="16" v-model="code" >
          </div>
          <button :class="(this.iin!='' && this.code!='' && this.iin.length==12) ? 'button-orange':'button-orange disabled'" @click="contractCheck()" >{{ $t('verify') }}</button>
        </div>
         <div class="img"><img :src="require('@/assets/img/ex1.png')" alt=""></div>
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
                  <button class="button-orange button-orange-ex" @click="openPdf()" >{{ $t('read_and_agree') }}</button>
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
</template>

<script>
  export default {
    name: 'checkContract',
    data(){
      return {
        loader: false,
        cont: 1,
        iin: '',
        code: '',
        errors: '',
        timeout: ''
      }
    },
    mounted () {
      var obj = this;
      $('#contract').on('hidden.bs.modal', function () {
        obj.cont = 1;
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
              this.cont = 2
              this.errors = $response.error
              $('#contract').modal('show')
              console.log($response);
            } else {
              console.log($response.data.status);
              if($response.data.status == 'checked'){
                window.open('http://mk-backend.mars.studio/api/contract-info?iin=' + this.iin + '&code=' + this.code, '_blank');
              }
              if($response.data.status == 'not checked'){
                $('#contract').modal('show')
                this.cont = 1
              }
            }
            this.loader = false
          })
          .catch((e) => {
            $('#contract').modal('show')
            this.cont = 2
            this.loader = false
            if(e.toString().includes("timeout")) {
              this.cont = 2
              this.timeout = true
            }
            console.log(e)
          })
      },
      openPdf(){
        window.open('http://mk-backend.mars.studio/api/contract-info?iin=' + this.iin + '&code=' + this.code, '_blank');
      }
    }
  }
</script>

<style scoped>

</style>
