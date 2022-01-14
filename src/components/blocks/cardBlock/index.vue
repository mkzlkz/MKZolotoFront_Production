<template>
  <div class="card-block" v-if="cardList">
    <own-select
      v-model="selectedCard"
      :options="cardList"
      :placeholder="$t('card_empty')"
      @remove="cardRemove">
    </own-select>
    <button
      type="button"
      class="button-yellow"
      @click="registerCard">
      {{ $t('add_payment_card') }}
    </button>
  </div>
</template>

<script>
import OwnSelect from '../ui-kit/OwnSelect'
import { host } from '../../../main'

export default {
  name: 'CardBlock',
  components: { OwnSelect },
  model: {
    prop: 'stateValue',
    event: 'change'
  },
  props: {
    stateValue: {
      type: [Object]
    }
  },
  data: () => ({ cardList: null }),
  created () {
    this.getCardList()
  },
  computed: {
    selectedCard: {
      get () {
        return this.stateValue
      },
      set (value) {
        this.$emit('change', value)
      }
    }
  },
  methods: {
    async getCardList () {
      const { data } = await this.$axios.get('/auth/card/list')
      const list = data.data
      if (list.length !== 0) {
        const arr = list.map(i => ({ label: i.card_hash, value: i.id })).sort((a, b) => b.value - a.value)
        this.cardList = arr
        this.selectedCard = arr[0]
      } else {
        this.cardList = []
      }
    },
    async registerCard () {
      const { data } = await this.$axios.post('/auth/card/registration')
      if (data.code !== 1) {
        return
      }
      window.location.replace(`${host}/api/card-registration?data=${data.data}`)
    },
    cardRemove (cardID) {
      this.axios.post('/auth/card/remove', { card_id: cardID })
      this.cardList = this.cardList.filter(i => i.value !== cardID)
      if (this.selectedCard.value !== undefined && this.selectedCard.value === cardID) {
        this.selectedCard = this.cardList[0]
      }
    }
  }
}
</script>

<style scoped>
.card-block {
  padding: 35px 24px 16px;
  background: #E7EBEE;
  box-shadow: 0 2px 12px rgba(0,0,0,0.2);
}
.button-yellow {
  margin: 16px 0 0;
  height: auto;
  font-family: FranklinGothicBook, sans-serif;
  font-size: 14px;
  width: 100%;
}
</style>
