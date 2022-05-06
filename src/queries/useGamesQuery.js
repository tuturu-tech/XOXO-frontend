import { useContracts } from "../hooks";
import { useChainQuery } from "../hooks/useChainQuery";
import bigInt from "big-integer";

const key = "GamesState";

const initialState = {
	name: "",
	symbol: "",
	baseURI: "",
	balance: "0",
	withdrawalAddress: "",
};

function parseGames(games) {
	let parsedGames = games.map((game, index) => {
		let bitArray = bigInt(game.toString()).toString(2);
		let bitLength = bitArray.length;
		let boardArray = [...bitArray.slice(-53, -35)];
		let object = {
			gameId: index,
			playerOne: parseInt(bitArray.slice(-16), 2),
			playerTwo: parseInt(bitArray.slice(-32, -16), 2),
			turn: parseInt(bitArray.slice(-33, -32), 2),
			state: parseInt(bitArray.slice(-35, -33), 2),
			board: boardArray
				.map((_, index) => {
					let binary;
					if (index % 2 === 1 && index !== 0) {
						binary = boardArray[index] + boardArray[index - 1];
						return parseInt(binary.toString(2), 2);
					}
				})
				.filter((item) => item !== undefined)
				.reverse(),
			timestamp: new Date(parseInt(bitArray.slice(-bitLength, -53), 2) * 1000),
		};

		return object;
	});
	console.log(parsedGames);
	return parsedGames;
}

export function useGamesQuery() {
	const { erc721 } = useContracts();

	const fetchState = async () => ({
		games: parseGames(await erc721.getAllGames()),
	});

	return useChainQuery({ key, fetchState, initialState });
}
