<template>
  <div class="own-select">
    <div class="input-data">
      <input
        :value="stateValue[labelKey] ? stateValue[labelKey] : ''"
        :readonly="true"
        :placeholder="placeholder"
        @focus="optionsShow(true)"
        @blur="optionsShow(false)"
      />
      <div
        :class="['arrow', { active: showOptions }]"
        @click="optionsShow(!showOptions)"
      ></div>
    </div>
    <transition name="slide-fade">
      <div v-show="showOptions" class="options">
        <div
          v-for="(item, index) in options"
          :key="index"
          :class="[
            'options__item',
            { active: item[valueKey] === thisModel[valueKey] },
          ]"
          @click="
            () => {
              thisModel = item;
              showOptions = false;
            }
          ">
          <span v-html="item[labelKey]"></span>
          <button type="button" @click="() => removeClick(item[valueKey])">
            <img :src="require('./trash.svg')">
          </button>
        </div>
      </div>
    </transition>
  </div>

</template>

<script>
export default {
  name: 'OwnSelect',
  model: {
    prop: 'stateValue',
    event: 'change'
  },
  props: {
    stateValue: {
      type: [Object]
    },
    options: {
      type: Array,
      required: true
    },
    placeholder: {
      type: [String, Number]
    },
    labelKey: {
      type: String,
      default () {
        return 'label'
      },
    },
    valueKey: {
      type: String,
      default () {
        return 'value'
      }
    }
  },
  data: () => ({
    showOptions: false
  }),
  computed: {
    thisModel: {
      get () {
        return this.stateValue
      },
      set (value) {
        this.$emit('change', value)
      }
    }
  },
  methods: {
    optionsShow (bool = false) {
      setTimeout(() => (this.showOptions = bool), 250)
    },
    removeClick (cardID) {
      if (confirm(this.$t('confirm_card_remove'))) {
        this.$emit('remove', cardID)
      }
    }
  }

}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
.own-select {
  width: 100%;
  position: relative;
}
.own-select .input-data {
  display: grid;
  grid-template-columns: 1fr 29px;
  grid-template-rows: 24px;
}
.own-select .input-data input {
  width: 100%;
  border: none;
  font-family: FranklinGothicDemi, sans-serif;
  font-size: 12px;
  color: #000000;
  padding: 8px 5px;
}
.own-select .input-data .arrow {
  background: url("./arrow.svg") 100% 100% no-repeat, #DEDEDE;
  background-position: center;
  transition: all .5s;
  cursor: pointer;
}
.own-select .input-data .arrow.active {
  transform: rotateX(180deg);
}
.options {
  overflow: auto;
  position: absolute;
  box-shadow: 0 2px 12px rgba(0,0,0,0.2);
  background: #fff;
  width: 100%;
  transition: ease-out 220ms;
  z-index: 100;
  min-width: 200px;
}
.options .options__item {
  border-top: solid 1px #EFEFEF;
  padding: 5px 8px;
  font-family: FranklinGothicBook, sans-serif;
  font-size: 12px;
  color: #000000;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.options .options__item:hover {
  background: #EFEFEF;
}
.options .options__item.active {
  font-family: FranklinGothicDemi, sans-serif;
}

.options .options__item button {
  border: none;
  background: transparent;
}
</style>
