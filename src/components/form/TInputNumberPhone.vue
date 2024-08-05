<template>
  <div class="input__number-phone">
    <t-select
      select_style_wp="position: absolute; top: 50%; transform: translateY(-50%); left: 5px; z-index: 0; background: transparent; max-width:95px;"
      style="
        border: none;
        border-right: 1px solid;
        border-radius: 0;
        padding: 10px 10px 10px 40px;
      "
      icon_style="width: 35%;"
      type="country_code"
      v-model:value="valueCode"
      customValue="name"
      customLabel="code"
      :options="country_code"
      country_code
    />
    <input
      class="country_input"
      v-model="value"
      v-bind="$attrs"
      :id="props.id"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";
import TInputDefault from "./TInputDefault.vue";
import country_code from "./../../shared/country_code/country_code.js";
defineOptions({
  inheritAttrs: false,
});
const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  mask: {
    type: String,
    default: "+7 (___) ___-__-__",
  },
  id: {
    type: String,
    default: () => `input-${Math.random().toString(36).substr(2, 9)}`,
  },
});

const valueCode = ref({
  dial_code: "+7",
  code: "RU",
  name: "Russian Federation",
});
const maskRef = ref(props.mask);

const [value, valueModifiers] = defineModel("value", {
  set(value) {
    if (!props.mask) return value;
    let i = 0;
    let oldValue = value;
    const val = value.replace(/\D/g, "");

    const countryCodePattern = new RegExp(`[_\\d]`);
    value = maskRef.value.replace(/./g, (a, index) => {
      if (/\d/.test(a) && val[i] != a) return a;
      if (countryCodePattern.test(a) && i < val.length) {
        return val.charAt(i++);
      } else if (i >= val.length) {
        return "";
      } else {
        return a;
      }
    });

    return value;
  },
});

watch(
  valueCode,
  () => {
    const maskParts = props.mask.split(" ");
    if (maskParts.length > 0) {
      maskParts[0] = valueCode.value.dial_code;
      maskRef.value = maskParts.join(" ");
    }
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
.input__number-phone {
  position: relative;
  display: flex;
  align-items: center;
  .country_input {
    padding-left: 110px;
    width: 100%;
  }
}
</style>
