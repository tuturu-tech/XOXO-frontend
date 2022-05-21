import { useContracts } from "../hooks";
import { useChainQuery } from "../hooks/useChainQuery";
import { usePriorityAccount } from "../lib";
import bigInt from "big-integer";

const key = "GamesState";

const initialState = {
	name: "",
	symbol: "",
	baseURI: "",
	balance: "0",
	withdrawalAddress: "",
};

function parseGames(games, erc721) {
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

function getImages(totalSupply, erc721) {
	let tokens = [...Array(totalSupply).keys()].map((x) => ++x);
	let promises = tokens.map((item) =>
		erc721.getImage(item).then((result) => result)
	);
	return Promise.all(promises).then((result) =>
		result.map((item, index) => {
			return {
				id: index + 1,
				image: item,
			};
		})
	);
}

export function useGamesQuery() {
	const { erc721 } = useContracts();
	const account = usePriorityAccount();

	const fetchState = async () => {
		const games = parseGames(await erc721.getAllGames(), erc721);
		const userTokens = account
			? (await erc721.tokenIdsOf(account, 2)).map((item) => Number(item))
			: [];
		const totalSupply = Number(await erc721.totalSupply());
		const tokenImages =
			totalSupply !== 0 ? await getImages(totalSupply, erc721) : [];

		return {
			games,
			userTokens,
			tokenImages,
		};
	};

	return useChainQuery({ key, fetchState, initialState });
}
