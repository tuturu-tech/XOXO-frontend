import React, { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { useContracts } from "../hooks";
import { useGamesQuery } from "../queries";
import { usePriorityAccount } from "../lib";
import { usePriorityProvider } from "../lib";
import {
	BsFillArrowLeftCircleFill,
	BsFillArrowRightCircleFill,
} from "react-icons/bs";

const CreateGame = () => {
	const [selectedToken, setSelectedToken] = useState(undefined);
	const [creatingGame, setCreatingGame] = useState(false);
	const [tokens, setTokens] = useState([]);
	const [offset, setOffset] = useState(0);
	const { erc721, handleTxError, handleTx } = useContracts();
	const [{ userTokens, tokenImages }, updateGamesState] = useGamesQuery();

	const provider = usePriorityProvider();
	const account = usePriorityAccount();
	const signer = provider?.getSigner();

	const onCreateGame = () => {
		setCreatingGame(true);
		erc721
			.connect(signer)
			.createNewGame(selectedToken)
			.then(handleTx)
			.then(updateGamesState)
			.catch(handleTxError)
			.finally(() => {
				setTimeout(() => setCreatingGame(false), 300);
			});
	};

	return (
		<div className='text-2xl text-white flex flex-col items-center h-screen w-[600px] bg-base'>
			<h1 className='textGradient text-4xl font-bold mt-10'>Create game</h1>
			<div className='flex flex-col items-center'>
				<h2 className='textGradient text-3xl text-center mt-5'>Your NFTs</h2>
				<div className='grid grid-cols-4 m-5 gap-1'>
					{userTokens
						?.filter((item, index) => index >= offset && index <= offset + 8)
						?.map((token, index) => {
							return (
								<div
									key={index}
									onClick={() => setSelectedToken(token)}
									className={` ${
										selectedToken === token ? "border-purple-500" : ""
									} flex flex-col items-center border-2 border-gray-600 p-2 rounded-md hover:border-purple-500 cursor-pointer`}>
									<img
										src={
											tokenImages
												.filter((item) => item.id === token)
												.map((item) => item.image)[0]
										}
										alt='something'
										className='rounded-md'
									/>
									<p>Token ID</p>
									<p>{token}</p>
								</div>
							);
						})}
				</div>
				<div className='flex flex-row items-center gap-2 mt-5 mb-5'>
					<button
						onClick={() => setOffset((prev) => (prev > 0 ? prev - 8 : prev))}>
						<BsFillArrowLeftCircleFill className='text-purple-500 hover:scale-105 rounded-full' />
					</button>
					<button
						onClick={() =>
							setOffset((prev) =>
								prev + 8 < userTokens.length ? prev + 8 : prev
							)
						}>
						<BsFillArrowRightCircleFill className='text-purple-500 hover:scale-105 rounded-full' />
					</button>
				</div>
				<button onClick={onCreateGame} className='btnGradient'>
					Create game
				</button>
			</div>
		</div>
	);
};

export default CreateGame;
