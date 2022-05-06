import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGamesQuery } from "../../queries";
import { useContracts } from "../../hooks";
import { usePriorityProvider } from "../../lib";

import Navigation from "../Navigation";
import Tic from "../Tic";

const Game = () => {
	let { id } = useParams();
	const [game, setGame] = useState({});

	const provider = usePriorityProvider();

	const { erc721, handleTxError, handleTx } = useContracts();
	const [{ games }, updateGamesState] = useGamesQuery();

	const signer = provider?.getSigner();

	useEffect(() => {
		if (provider !== undefined && games !== undefined) {
			setGame(games?.filter((item) => Number(item.gameId) === Number(id)));
		}
	}, [games]);

	return (
		<div className='text-2xl text-white flex flex-col items-center h-screen'>
			<Navigation />
			<div className='flex flex-col w-10/12'>
				<Tic />
				{game && (
					<div className='flex flex-col w-full'>
						<p>Player One: {game[0]?.playerOne?.toString()}</p>
						<p>Player Two: {game[0]?.playerTwo}</p>
						<p>Turn: {!game[0]?.turn ? "Player one" : "Player Two"}</p>
						<p>
							Game state:{" "}
							{game[0]?.state === 0
								? "Ongoing"
								: game.state === 1
								? "Player One won"
								: game.state === 3
								? "Player Two won"
								: "It's a draw"}
						</p>
						<p>
							Game started at: {game[0]?.timestamp.toString().split("(")[0]}
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Game;
