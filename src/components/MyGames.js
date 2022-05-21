import React, { useState, useEffect } from "react";
import { usePriorityProvider, usePriorityAccount } from "../lib";
import { useContracts } from "../hooks";
import { useGamesQuery } from "../queries";
import Navigation from "./Navigation";
import { Modal } from "../lib";
import GameModal from "./Game/GameModal";

const MyGames = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [game, setGame] = useState(null);
	const [openGames, setOpenGames] = useState([]);
	const [activeGames, setActiveGames] = useState([]);
	const [finishedGames, setFinishedGames] = useState([]);

	const { erc721, handleTxError, handleTx } = useContracts();
	const [{ games, userTokens }, updateGamesState] = useGamesQuery();

	const provider = usePriorityProvider();
	const account = usePriorityAccount();
	const signer = provider?.getSigner();

	useEffect(() => {
		if (provider !== undefined && games !== undefined) {
			setOpenGames(
				games?.filter(
					(item, _) =>
						item.playerTwo === 0 && userTokens.includes(Number(item.playerOne))
				)
			);
			setActiveGames(
				games.filter(
					(item, _) =>
						item.playerTwo !== 0 &&
						item.state === 0 &&
						(userTokens.includes(Number(item.playerOne)) ||
							userTokens.includes(Number(item.playerTwo)))
				)
			);
			setFinishedGames(
				games.filter(
					(item) =>
						item.state !== 0 &&
						(userTokens.includes(Number(item.playerTwo)) ||
							userTokens.includes(Number(item.playerOne)))
				)
			);
		}
	}, [games, userTokens]);

	return (
		<div className='flex flex-col items-center text-white h-screen'>
			<Navigation
				myGames={provider !== undefined}
				games={provider !== undefined}
			/>
			{modalOpen && (
				<Modal onClose={() => setModalOpen(false)} className=''>
					<GameModal game={game} />
				</Modal>
			)}
			<h1 className='textGradient font-bold text-4xl mt-10'>My games</h1>
			<div className='flex flex-row justify-between w-10/12 px-10 mt-10 h-full'>
				<div className='flex flex-col items-center border-2 border-white/50 flex-1 mx-5 rounded-md'>
					<h2 className='textGradient font-bold text-3xl text-center mt-5 mb-5'>
						Active
					</h2>
					{activeGames?.map((game, index) => (
						<button
							onClick={() => {
								setModalOpen(true);
								setGame(game.gameId);
							}}
							className='btnGradient mt-2'
							key={index}>
							Game: {game.gameId}
						</button>
					))}
				</div>
				<div className='flex flex-col items-center border-2 border-white/50 flex-1 mx-5 rounded-md'>
					<h2 className='textGradient font-bold text-3xl text-center mt-5 mb-5'>
						Open
					</h2>
					{openGames?.map((game, index) => (
						<button
							onClick={() => {
								setModalOpen(true);
								setGame(game.gameId);
							}}
							className='btnGradient mt-2'
							key={index}>
							Game: {game.gameId}
						</button>
					))}
				</div>
				<div className='flex flex-col items-center border-2 border-white/50 flex-1 mx-5 rounded-md'>
					<h2 className='textGradient font-bold text-3xl text-center mt-5 mb-5'>
						Finished
					</h2>
					{finishedGames?.map((game, index) => (
						<button
							onClick={() => {
								setModalOpen(true);
								setGame(game.gameId);
							}}
							className='btnGradient mt-2'
							key={index}>
							Game: {game.gameId}
						</button>
					))}
				</div>
			</div>
			<button className='btnGradient my-5'>Create a game</button>
		</div>
	);
};

export default MyGames;
