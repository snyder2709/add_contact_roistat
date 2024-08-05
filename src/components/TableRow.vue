<template>
  <div
    class="table-row"
    :style="{
      marginLeft: `${level * 12}px`,
      backgroundColor: computeBackgroundColor(level),
      color: computeTextColor(level),
    }"
  >
    <div v-if="data.children" class="table-chevron">
      <ChevronRight style="width: 100%; height: 100%"></ChevronRight>
    </div>
    <div
      class="table-item"
      v-for="(item, indexCol) in columns"
      :key="indexCol"
      :class="item['class']"
      :style="{ width: item['width'] }"
    >
      <div>
        {{ deepFind(data, item.key, item.default || "") }}
      </div>
    </div>
  </div>
  <div v-if="data.children">
    <table-row
      v-for="(child, index) in data.children"
      :key="index"
      :data="child"
      :columns="columns"
      :level="level + 1"
    />
  </div>
</template>

<script setup>
import { deepFind } from "../shared/utils/deepFind.js";
import { defineProps } from "vue";
import { ChevronRight } from "lucide-vue-next";
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  level: {
    type: Number,
    required: true,
    default: 0,
  },
});
const computeTextColor = (level) => {
  const maxLevel = 10;
  const factor = Math.min(level / maxLevel, 1);
  const grayValue = Math.round(255 - factor * 255);
  return `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
};
const computeBackgroundColor = (level) => {
  const maxLevel = 10;
  const factor = Math.min(level / maxLevel, 1);
  const rgbValue = Math.round(factor * 255);
  return `rgb(${rgbValue}, ${rgbValue}, ${rgbValue})`;
};
</script>

<style scoped>
.table-chevron {
  width: 60px;
  height: 100%;
}
.table-row {
  display: flex;
  padding: 10px;
  gap: 24px;
  justify-content: space-evenly;
  align-items: center;
}
</style>
