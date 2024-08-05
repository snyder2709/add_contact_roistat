<template>
	<button id="button" class="t-btn"><slot></slot></button>
</template>

<script setup></script>

<style lang="scss" scoped>
@media (prefers-color-scheme: dark) {
	#button {
		color: var(--dark-scheme-color);
		background-color: var(--dark-scheme-bg-color);
		border-color: var(--dark-scheme-color);
		max-width: 320px;
	}
	#button:hover {
		color: var(--dark-scheme-color);
		background-color: var(--dark-scheme-bg-color-hover);
	}
}
@media (prefers-color-scheme: light) {
	#button {
		color: var(--white-scheme-color);
		background-color: var(--white-scheme-bg-color);
		border-color: var(--white-scheme-color);
	}
	#button:hover {
		color: var(--white-scheme-color);
		background-color: var(--white-scheme-bg-color-hover);
		font-size: 1.1em;
	}
}
.t-btn {
	border: 1px solid;
	border-radius: 16px;
	padding: 10px 30px;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
