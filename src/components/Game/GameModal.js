import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGamesQuery } from "../../queries";
import { useContracts } from "../../hooks";
import { LoadingButton, usePriorityProvider } from "../../lib";

const GameModal = ({ game }) => {
	const [selectedCell, setSelectedCell] = useState(undefined);
	const [selectedNFT, setSelectedNFT] = useState(undefined);
	const [playingMove, setPlayingMove] = useState(false);
	const [thisGame, setThisGame] = useState(undefined);
	const [images, setImages] = useState([]);
	const [joiningGame, setJoiningGame] = useState(false);
	const [endingGame, setEndingGame] = useState(false);

	const provider = usePriorityProvider();
	const signer = provider?.getSigner();

	const { erc721, handleTxError, handleTx } = useContracts();
	const [{ games, tokenImages }, updateGamesState] = useGamesQuery();

	useEffect(() => {
		if (games?.length > 0) {
			const gameObj = games.filter(
				(item) => Number(item.gameId) === Number(game)
			)[0];
			setThisGame(gameObj);
			let arr = [];
			arr[0] = tokenImages
				.filter((item) => Number(item.id) === Number(gameObj.playerOne))
				.map((item) => item.image)[0];
			arr[1] = tokenImages
				.filter((item) => Number(item.id) === Number(gameObj.playerTwo))
				.map((item) => item.image)[0];
			setImages(arr);
		}
	}, [games]);

	const playMove = () => {
		setPlayingMove(true);
		erc721
			.connect(signer)
			.playMove(game, selectedCell)
			.then(handleTx)
			.then(updateGamesState)
			.catch(handleTxError)
			.finally(() => {
				setTimeout(() => setPlayingMove(false), 300);
			});
	};

	const joinGame = () => {
		setJoiningGame(true);
		erc721
			.connect(signer)
			.joinGame(Number(game), 3)
			.then(handleTx)
			.then(updateGamesState)
			.catch(handleTxError)
			.finally(() => {
				setTimeout(() => setJoiningGame(false), 300);
			});
	};

	const endGame = () => {
		setEndingGame(true);
		erc721
			.connect(signer)
			.endGame(game, selectedNFT)
			.then(handleTx)
			.then(updateGamesState)
			.catch(handleTxError)
			.finally(() => {
				setTimeout(() => setEndingGame(false), 300);
			});
	};
	return (
		<div className='text-2xl text-white flex flex-col items-center h-screen w-full bg-base'>
			{thisGame && (
				<div className='flex flex-col w-10/12 mt-10'>
					<h2 className='textGradient font-bold text-center'>Turn</h2>
					<p className='textGradient text-center mb-5'>
						{!thisGame?.turn ? "Player one" : "Player Two"}
					</p>
					<table className='w-fit mx-auto'>
						<tbody>
							<tr>
								<td
									onClick={() => setSelectedCell(8)}
									className={`${
										Number(selectedCell) === Number(8)
											? "ring-purple-500 ring-2"
											: ""
									} border-[1px] w-28 h-28 m-1 cursor-pointer hover:ring-2 ring-purple-500 text-3xl text-center`}>
									{Number(thisGame.board[8]) === 2 ? (
										<img src={images[0]} alt='tic tac toe field 9' />
									) : Number(thisGame.board[8]) === 3 ? (
										<img src={images[1]} alt='tic tac toe field 9' />
									) : (
										""
									)}
								</td>
								<td
									onClick={() => setSelectedCell(7)}
									className={`${
										Number(selectedCell) === Number(7)
											? "ring-purple-500 ring-2"
											: ""
									} border-[1px] w-28 h-28 m-1 cursor-pointer hover:ring-2 ring-purple-500 text-3xl text-center`}>
									{Number(thisGame.board[7]) === 2 ? (
										<img src={images[0]} alt='tic tac toe field 9' />
									) : Number(thisGame.board[7]) === 3 ? (
										<img src={images[1]} alt='tic tac toe field 9' />
									) : (
										""
									)}
								</td>
								<td
									onClick={() => setSelectedCell(6)}
									className={`${
										Number(selectedCell) === Number(6)
											? "ring-purple-500 ring-2"
											: ""
									} border-[1px] w-28 h-28 m-1 cursor-pointer hover:ring-2 ring-purple-500 text-3xl text-center`}>
									{Number(thisGame.board[6]) === 2 ? (
										<img src={images[0]} alt='tic tac toe field 9' />
									) : Number(thisGame.board[6]) === 3 ? (
										<img src={images[1]} alt='tic tac toe field 9' />
									) : (
										""
									)}
								</td>
							</tr>
							<tr>
								<td
									onClick={() => setSelectedCell(5)}
									className={`${
										Number(selectedCell) === Number(5)
											? "ring-purple-500 ring-2"
											: ""
									} border-[1px] w-28 h-28 m-1 cursor-pointer hover:ring-2 ring-purple-500 text-3xl text-center`}>
									{Number(thisGame.board[5]) === 2 ? (
										<img src={images[0]} alt='tic tac toe field 9' />
									) : Number(thisGame.board[5]) === 3 ? (
										<img src={images[1]} alt='tic tac toe field 9' />
									) : (
										""
									)}
								</td>
								<td
									onClick={() => setSelectedCell(4)}
									className={`${
										Number(selectedCell) === Number(4)
											? "ring-purple-500 ring-2"
											: ""
									} border-[1px] w-28 h-28 m-1 cursor-pointer hover:ring-2 ring-purple-500 text-3xl text-center`}>
									{Number(thisGame.board[4]) === 2 ? (
										<img src={images[0]} alt='tic tac toe field 9' />
									) : Number(thisGame.board[4]) === 3 ? (
										<img src={images[1]} alt='tic tac toe field 9' />
									) : (
										""
									)}
								</td>
								<td
									onClick={() => setSelectedCell(3)}
									className={`${
										Number(selectedCell) === Number(3)
											? "ring-purple-500 ring-2"
											: ""
									} border-[1px] w-28 h-28 m-1 cursor-pointer hover:ring-2 ring-purple-500 text-3xl text-center`}>
									{Number(thisGame.board[3]) === 2 ? (
										<img src={images[0]} alt='tic tac toe field 9' />
									) : Number(thisGame.board[3]) === 3 ? (
										<img src={images[1]} alt='tic tac toe field 9' />
									) : (
										""
									)}
								</td>
							</tr>
							<tr>
								<td
									onClick={() => setSelectedCell(2)}
									className={`${
										Number(selectedCell) === Number(2)
											? "ring-purple-500 ring-2"
											: ""
									} border-[1px] w-28 h-28 m-1 cursor-pointer hover:ring-2 ring-purple-500 text-3xl text-center`}>
									{Number(thisGame.board[2]) === 2 ? (
										<img src={images[0]} alt='tic tac toe field 9' />
									) : Number(thisGame.board[2]) === 3 ? (
										<img src={images[1]} alt='tic tac toe field 9' />
									) : (
										""
									)}
								</td>
								<td
									onClick={() => setSelectedCell(1)}
									className={`${
										Number(selectedCell) === Number(1)
											? "ring-purple-500 ring-2"
											: ""
									} border-[1px] w-28 h-28 m-1 cursor-pointer hover:ring-2 ring-purple-500 text-3xl text-center`}>
									{Number(thisGame.board[1]) === 2 ? (
										<img src={images[0]} alt='tic tac toe field 9' />
									) : Number(thisGame.board[1]) === 3 ? (
										<img src={images[1]} alt='tic tac toe field 9' />
									) : (
										""
									)}
								</td>
								<td
									onClick={() => setSelectedCell(0)}
									className={`${
										Number(selectedCell) === Number(0)
											? "ring-purple-500 ring-2"
											: ""
									} border-[1px] w-28 h-28 m-1 cursor-pointer hover:ring-2 ring-purple-500 text-3xl text-center`}>
									{Number(thisGame.board[0]) === 2 ? (
										<img src={images[0]} alt='tic tac toe field 9' />
									) : Number(thisGame.board[0]) === 3 ? (
										<img src={images[1]} alt='tic tac toe field 9' />
									) : (
										""
									)}
								</td>
							</tr>
						</tbody>
					</table>

					<div className='flex flex-col w-full text-lg'>
						<p className='textGradient font-bold text-center mt-5 mb-2'>
							{thisGame?.state === 0
								? "Game is ongoing"
								: thisGame.state === 2
								? "Player One has won"
								: thisGame.state === 3
								? "Player Two has won"
								: "It's a draw"}
						</p>
						{thisGame?.state === 0 && (
							<LoadingButton
								onClick={playMove}
								loading={playingMove}
								className={`${
									selectedCell === undefined ? "btnDisabled" : "btnGradient"
								} hover:animate-gradient-x w-fit mx-auto`}>
								Play Move
							</LoadingButton>
						)}
						<div className='flex flex-row items-center w-full justify-center mt-2 text-lg'>
							<div className='flex flex-col mr-5'>
								<p className='textGradient font-bold text-center'>Player One</p>
								<p className='textGradient text-center'>
									{thisGame?.playerOne?.toString()}
								</p>
							</div>
							<div className='flex flex-col'>
								<p className='textGradient font-bold text-center'>Player Two</p>
								<p className='textGradient text-center'>
									{Number(thisGame?.playerTwo) === 0
										? "Spot open"
										: thisGame?.playerTwo?.toString()}
								</p>
							</div>
						</div>

						<div className='flex flex-col items-center textGradient mt-2'>
							<p className='text-center font-bold text-lg'>Game started at</p>
							<p className='text-center text-lg'>
								{thisGame?.timestamp.toString().split("(")[0]}
							</p>
						</div>
						<div className='flex flex-row items-center justify-center mt-5'>
							{
								<LoadingButton onClick={joinGame} className='btnGradient mr-5'>
									Join game
								</LoadingButton>
							}
							<LoadingButton className='btnGradient'>End game</LoadingButton>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default GameModal;
