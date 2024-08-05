<template>
  <div class="table-default">
    <div class="table-default__header">
      <span
        class="table-item"
        v-for="(item, index) in columns"
        :style="{ width: item.width }"
        :key="index"
      >
        <component v-if="item.icon" :is="item.icon" />
        {{ item.title }}
      </span>
    </div>
    <div v-if="data.length" class="table-default__body">
      <div
        class="table-default__item"
        v-for="(itemData, index) in data"
        :key="index"
      >
        <table-row :data="itemData" :columns="columns" :level="0" />
      </div>
    </div>
    <div v-else class="table-default__body_empty">список пуст</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import TableRow from "./TableRow.vue";

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
  columns: {
    type: Array,
    required: true,
  },
});
</script>

<style lang="scss">
.table-default {
  width: 800px;
  .table-item {
    text-align: left;
    padding: 13px 20px;
    overflow-wrap: break-word;
    display: flex;
    align-items: center;
    width: 100%;
    word-break: break-all;
    &:last-child {
      border-radius: 0px 16px 16px 0px;
    }
    &:first-child {
      border-radius: 16px 0px 0px 16px;
    }
  }
  .table-default__header {
    display: flex;
    justify-content: flex-start;
    font-weight: 500;
    border-radius: 16px;
    color: blue;
    background: grey;
    margin-bottom: 10px;

    span {
      display: flex;
      gap: 5px;
      align-items: center;
      transition: transform 0.2s linear;
    }
  }
  .table-default__body {
    gap: 5px;
    display: flex;
    overflow: auto;
    flex-direction: column;
    padding: 12px 0;
    width: 100%;
  }
  .table-default__body_empty {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 1.3em;
    padding: 20px 0px;
  }
  .table-default__item {
    transition: 0.3s all;
    background: #ffffff14;
    overflow: hidden;
    font-weight: 400;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    margin: 0 12px;
    border: 1px solid transparent;

    &:hover {
      border: 1px solid grey;
    }
    &:last-of-type {
      margin: 0 12px 24px 12px;
    }
    &.ischildren {
      &:nth-child(odd) {
        background: grey;
      }
    }
  }
}
</style>
