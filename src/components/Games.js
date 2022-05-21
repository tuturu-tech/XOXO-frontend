import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import { useGamesQuery } from "../queries";
import { Modal, usePriorityProvider } from "../lib";
import { useContracts } from "../hooks";
import { LoadingButton } from "../lib";
import { Link } from "react-router-dom";
import GameModal from "./Game/GameModal";
import CreateGame from "./CreateGame";

const Games = () => {
	const provider = usePriorityProvider();
	const [modalOpen, setModalOpen] = useState(false);
	const [game, setGame] = useState(null);
	const [openGames, setOpenGames] = useState([]);
	const [activeGames, setActiveGames] = useState([]);
	const [openCreateModal, setOpenCreateModal] = useState(false);

	const { erc721, handleTxError, handleTx } = useContracts();
	const [{ games, userTokens }, updateGamesState] = useGamesQuery();

	const signer = provider?.getSigner();

	useEffect(() => {
		if (provider !== undefined && games !== undefined) {
			setOpenGames(games?.filter((item, _) => item.playerTwo === 0));
			setActiveGames(
				games.filter((item, _) => item.playerTwo !== 0 && item.state === 0)
			);
		}
	}, [games]);
	console.log(userTokens);

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
			{openCreateModal && (
				<Modal onClose={() => setOpenCreateModal(false)} className=''>
					<CreateGame />
				</Modal>
			)}
			<h1 className='textGradient font-bold text-4xl mt-10'>All games</h1>

			<div className='flex flex-row justify-between w-10/12 px-10 mt-10 h-full'>
				<div className='flex flex-col items-center border-2 border-white/50 flex-1 mx-5 rounded-md'>
					<h2 className='textGradient font-bold text-3xl text-center mt-5'>
						Open games
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
					<h2 className='textGradient font-bold text-3xl text-center mt-5'>
						Active games
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
			</div>
			<button
				onClick={() => setOpenCreateModal(true)}
				className='btnGradient my-5'>
				Create a game
			</button>
		</div>
	);
};

export default Games;
