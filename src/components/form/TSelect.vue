<template>
  <div class="t-select" :style="props.select_style_wp">
    <ChevronRight
      class="t-select__chevron"
      :class="{ chevron_active: isShow }"
      :style="props.icon_style"
      @click.stop="toggleOptions"
      @blur.stop="hideOptions"
    />
    <t-input-default
      ref="inputRef"
      v-bind="$attrs"
      v-model:value="value[props.customLabel]"
      class="t-select__input"
      placeholder="Выберите руководителя"
      @focus.stop="showOptions"
      @blur.stop="hideOptions"
    ></t-input-default>
  </div>
  <transition name="slide-fade">
    <div v-if="isShow" class="t-select__options" id="select_options">
      <div
        class="t-select__option_item"
        id="select_options_item"
        v-for="(item, index) in optionsRef"
        :key="index"
        @mousedown.prevent="handleSelectOption(item)"
      >
        <span>{{ item[props.customValue] }}</span>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { defineModel, ref, watch } from "vue";
import TInputDefault from "./TInputDefault.vue";
import { ChevronRight } from "lucide-vue-next";
import { deepFind } from "./../../shared/utils/deepFind.js";

defineOptions({
  inheritAttrs: false,
});
const props = defineProps({
  options: {
    type: Array,
    default: [],
  },
  select_style_wp: {
    type: String,
    default: "",
  },
  customValue: {
    type: String,
    default: "value",
  },
  customLabel: {
    type: String,
    default: "label",
  },
  country_code: {
    type: Boolean,
    default: false,
  },
  icon_style: {
    type: String,
    default: "",
  },
});

const inputRef = ref(null);
const isShow = ref(false);
const optionsRef = ref(props.options);

const value = defineModel("value", {
  required: true,
  default: { label: "Не выбрано", value: "" },
});

const showOptions = () => {
  isShow.value = true;
};
const toggleOptions = () => {
  if (isShow.value) {
    inputRef.value.$refs.inputRef.blur();
  } else {
    inputRef.value.$refs.inputRef.focus();
  }
};
const hideOptions = () => {
  setTimeout(() => {
    optionsRef.value = props.options;
    inputRef.value.$refs.inputRef.blur();
    isShow.value = false;
  }, 200);
};

const handleSelectOption = (item) => {
  value.value = item;
  hideOptions();
};
</script>

<style lang="scss" scoped>
@media (prefers-color-scheme: dark) {
  #select_options {
    color: var(--dark-scheme-color);
    background-color: var(--dark-scheme-bg-color);
    border-color: var(--dark-scheme-color);
    overflow-y: scroll;
    overflow-x: hidden;
    max-height: 40vh;
  }
  #select_options_item:hover {
    color: var(--dark-scheme-color);
    background-color: var(--dark-scheme-bg-color-hover);
    font-size: 1.1em;
  }
}
@media (prefers-color-scheme: light) {
  #select_options {
    color: var(--white-scheme-color);
    background-color: var(--white-scheme-bg-color);
    border-color: var(--white-scheme-color);
    overflow-y: scroll;
    overflow-x: hidden;
    max-height: 40vh;
  }
  #select_options_item:hover {
    color: var(--dark-scheme-color);
    background-color: var(--dark-scheme-bg-color-hover);
    font-size: 1.1em;
  }
}
.t-select {
  position: relative;
  display: flex;
  align-items: center;
  &__input_wrapper {
    position: relative;
  }
  &__input {
    padding-left: 60px;
  }
  &__chevron {
    position: absolute;
    height: 97%;
    left: 0;
    width: 15%;
    top: 50%;
    z-index: 10;
    transform: translateY(-50%) rotate(-90deg) scale(0.7);
    transition: all 0.3s ease-out;
    cursor: pointer;
  }

  &__options {
    position: absolute;
    border: 1px solid;
    border-radius: 6px;
    top: 110%;
    left: 0;
    width: 100%;
    min-width: 320px;
    z-index: 15;
  }

  &__option_item {
    padding: 10px 15px;
    transition: all 0.2s ease-out;
    cursor: pointer;
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  opacity: 0;
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-5px);
  opacity: 0;
}
.chevron_active {
  transition: all 0.3s ease-out;
  transform: translateY(-50%) rotate(90deg) scale(0.7);
}
</style>
