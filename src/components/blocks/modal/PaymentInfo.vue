<template>
  <div class="modal-extension">
    <div id="modalExtension" class="modal fade show" :style="{ opacity: 1 }">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <div class="slider-extension">
              <div class="extension">
                <div v-if="success">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="$emit('close')">
                      <img :src="require('@/assets/img/icon/close-mb.svg')" alt="">
                    </button>
                    <h1 class="modal-title">{{ $t('loan_successfully_extended') }}</h1>
                  </div>
                  <div class="text">{{ $t('super') }}</div>
                  <a v-if="Idreceipt" :href="`https://mk-backend.mars.studio/api/pdf_generate?id=${this.Idreceipt}`" target="_blank" class="link">{{ $t('view_receipt') }}</a>
                  <div class="img pr-20"><img :src="require('@/assets/img/ex3.png')" alt=""></div>
                </div>
                <div v-else>
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="$emit('close')">
                      <img :src="require('@/assets/img/icon/close-mb.svg')" alt="">
                    </button>
                    <h1 class="modal-title">{{ $t('something_went_wrong') }}</h1>
                  </div>
                  <div class="text" v-html="$t('express_text3')"></div>
                  <div class="img pr-20"><img :src="require('@/assets/img/ex4.png')" alt=""></div>
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
  name: 'PaymentInfo',
  props: {
    Idreceipt: {
      default () {
        return null
      }
    },
    success: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
