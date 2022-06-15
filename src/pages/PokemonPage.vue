<template>
	<h1 v-if="!pokemon">Esperre mientras carga el juego 😃...</h1>
	<div v-else="pokemon">
		<h1>Quien es ese Pokemon</h1>
		<PokemonPicture
			:pokemonId="pokemon.id"
			:showPokemon="showPokemon"
		/>
		<PokemonOptions :pokemons="pokemonArr" @selection="checkAnswer" />
		<PokemonContador :contador="contador" />
	</div>
</template>

<script>
import PokemonPicture from '@/components/PokemonPicture.vue';
import PokemonOptions from '@/components/PokemonOptions.vue';
import PokemonContador from '@/components/PokemonContador.vue';
import getPokemon from '@/helpers/getPokemosOptions';
import swal from 'sweetalert';

export default {
	components: {
		PokemonPicture,
		PokemonOptions,
		PokemonContador
	},
	data() {
		return {
			pokemonArr: [],
			pokemon: null,
			showPokemon: false,
			contador: 0
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
			const esCorrecto = pokemonId === this.pokemon.id;
			if (!esCorrecto) {
				swal(
					'Opcion incorrecta',
					`Tu puntaje es de ${this.contador}`,
					'error'
				);
				this.contador = 0;
				return;
			}
			this.showPokemon = true;
			this.contador++;
			swal('Opcion correcta', 'felicidades', 'success');
			setTimeout(() => {
				this.newGame();
			}, 2000);
		},
		newGame() {
			this.showPokemon = false;
			this.pokemonArr = [];
			this.mixedPokemonArr();
		}
	},
	mounted() {
		this.mixedPokemonArr();
	}
};
</script>
