<template>
	<h2>Tu puntaje es {{ contador }}</h2>
	<h3 v-if="contador < 1">😢</h3>
	<h3 v-else-if="contador < 10">😃</h3>
	<h3 v-else-if="contador < 20">😲</h3>
	<h3 v-else-if="contador < 30">😍</h3>
</template>

<script>
export default {
	props: {
		contador: {
			type: Number,
			required: true,
			default: 0
		}
	}
};
</script>
