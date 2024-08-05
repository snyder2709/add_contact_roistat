<template>
	<input ref="inputRef" :id="id" v-model="value" :value="props.value" />
</template>

<script setup>
import { ref } from 'vue';

const inputRef = ref(null);
const props = defineProps({
	value: {
		type: String,
	},
	type: {
		type: String,
		default: 'text',
	},
	id: {
		type: String,
		default: () => `input-${Math.random().toString(36).substr(2, 9)}`,
	},
});
const value = defineModel('value');
defineExpose({ inputRef });
</script>

<style>
input {
	width: 100%;
	max-width: 420px;
	padding: 15px 15px;
	border: 1px solid #d9d9d9;
	border-radius: 8px;
	outline: none;
}
</style>
