<template>
	<h1 v-if="!pokemon">Esperre mientras carga el juego 😃...</h1>
	<div v-else="pokemon">
		<h1>Quien es ese Pokemon</h1>
		<PokemonPicture
			:pokemonId="pokemon.id"
			:showPokemon="showPokemon"
		/>
		<PokemonOptions :pokemons="pokemonArr" @selection="checkAnswer" />
	</div>
</template>

<script>
import PokemonPicture from '@/components/PokemonPicture.vue';
import PokemonOptions from '@/components/PokemonOptions.vue';
import getPokemon from '@/helpers/getPokemosOptions';

export default {
	components: {
		PokemonPicture,
		PokemonOptions
	},
	data() {
		return {
			pokemonArr: [],
			pokemon: null,
			showPokemon: false
		};
	},
	methods: {
		async mixedPokemonArr() {
			this.pokemonArr = await getPokemon();

			const randomIndex = Math.floor(
				Math.random() * this.pokemonArr.length
			);
			this.pokemon = this.pokemonArr[randomIndex];
		},
		checkAnswer(pokemonId) {
			if (pokemonId === this.pokemon.id) {
				this.showPokemon = true;
			}
		}
	},
	mounted() {
		this.mixedPokemonArr();
	}
};
</script>
