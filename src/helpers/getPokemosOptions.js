import pokemonApi from '@/api/pokemonApi';

const getPokemon = () => {
	const pokemonArr = Array.from(Array(646));
	return pokemonArr.map((_, index) => index + 1);
};

const getPokemosOptions = async () => {
	const mixedPokemon = getPokemon().sort(() => Math.random() - 0.5);
	const pokemonName = await getPokemosName(mixedPokemon.splice(0, 4));
	return pokemonName;
};

const getPokemosName = async ([a, b, c, d] = []) => {
	const promisesArr = [
		pokemonApi.get(`/${a}`),
		pokemonApi.get(`/${b}`),
		pokemonApi.get(`/${c}`),
		pokemonApi.get(`/${d}`)
	];
	const [p1, p2, p3, p4] = await Promise.all(promisesArr);
	const resultado = [
		{
			name: p1.data.name,
			id: p1.data.id
		},
		{ name: p2.data.name, id: p2.data.id },
		{ name: p3.data.name, id: p3.data.id },
		{ name: p4.data.name, id: p4.data.id }
	];
	return resultado;
};

export default getPokemosOptions;
