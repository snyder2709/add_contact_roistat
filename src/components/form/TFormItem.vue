<template>
	<div class="form-item">
		<label :for="id">{{ label }}</label>
		<slot></slot>
		<span v-if="error">{{ error }}</span>
	</div>
</template>

<script setup>
import { defineProps } from 'vue';
import TInputDefaults from './TInputDefault.vue';
const props = defineProps({
	label: {
		type: String,
		required: true,
	},
	error: {
		type: String,
		default: '',
	},
	id: {
		type: String,
		default: () => `input-${Math.random().toString(36).substr(2, 9)}`,
	},
});

const modelValue = defineModel();
</script>

<style scoped>
.form-item {
	margin-bottom: 1em;
	position: relative;
}
.form-item label {
	display: block;
	margin-bottom: 0.5em;
}
.form-item input {
	width: 100%;
	padding: 0.5em;
	box-sizing: border-box;
}
.form-item span {
	color: red;
	font-size: 0.875em;
}
</style>
