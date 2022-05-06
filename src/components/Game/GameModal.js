import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGamesQuery } from "../../queries";
import { useContracts } from "../../hooks";
import { usePriorityProvider } from "../../lib";

import Navigation from "../Navigation";
import Tic from "../Tic";

const GameModal = ({ game }) => {
	const provider = usePriorityProvider();

	const { erc721, handleTxError, handleTx } = useContracts();
	const [{ games }, updateGamesState] = useGamesQuery();

	return (
		<div className='text-2xl text-white flex flex-col items-center h-screen bg-base'>
			{game && (
				<div className='flex flex-col w-10/12 mt-10'>
					<h2 className='textGradient font-bold text-center'>Turn</h2>
					<p className='textGradient text-center mb-5'>
						{!game?.turn ? "Player one" : "Player Two"}
					</p>
					<Tic />

					<div className='flex flex-col w-full'>
						<p className='textGradient font-bold text-center mt-5'>
							{game?.state === 0
								? "Game is ongoing"
								: game.state === 1
								? "Player One has won"
								: game.state === 3
								? "Player Two has won"
								: "It's a draw"}
						</p>
						<div className='flex flex-row items-center w-full justify-center mt-2'>
							<div className='flex flex-col mr-5'>
								<p className='textGradient font-bold text-center'>Player One</p>
								<p className='textGradient text-center'>
									{game?.playerOne?.toString()}
								</p>
							</div>
							<div className='flex flex-col'>
								<p className='textGradient font-bold text-center'>Player Two</p>
								<p className='textGradient text-center'>
									{Number(game?.playerTwo) === 0
										? "Spot open"
										: game?.playerTwo?.toString()}
								</p>
							</div>
						</div>

						<div className='flex flex-col items-center textGradient mt-2'>
							<p className='text-center font-bold'>Game started at</p>
							<p className='text-center'>
								{game?.timestamp.toString().split("(")[0]}
							</p>
						</div>
						<div className='flex flex-row items-center justify-center mt-5'>
							{<button className='btnGradient mr-5'>Join game</button>}
							<button className='btnGradient'>End game</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default GameModal;
