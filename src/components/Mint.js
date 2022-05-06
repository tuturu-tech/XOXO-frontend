import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { usePriorityProvider } from "../lib";
import { useContracts, useParty } from "../hooks";
import { useMintQuery } from "../queries";
import { LoadingButton } from "../lib";

import Navigation from "./Navigation";

const Mint = () => {
	const [selected, setSelected] = useState(null);
	const [isMinting, setIsMinting] = useState(false);

	const provider = usePriorityProvider();

	const { erc721, handleTxError, handleTx } = useContracts();
	const [
		{
			owner,
			maxSupply,
			maxSupplyEach,
			supplyEach,
			totalSupply,
			isContractOwner,
			maxMint,
		},
		updateMintState,
	] = useMintQuery();

	const startParty = useParty();

	const signer = provider?.getSigner();

	let filter = erc721.filters.Transfer(
		"0x0000000000000000000000000000000000000000"
	);
	console.log("render");

	/* useEffect(() => {
		if (provider !== undefined) {
			erc721.on(filter, async () => {
				await updateMintState();
			});
		}
	}, [signer]); */

	const onMintHandler = () => {
		setIsMinting(true);
		erc721
			.connect(signer)
			.mint(1, selected)
			.then(handleTx)
			.then(startParty)
			.then(updateMintState)
			.catch(handleTxError)
			.finally(() => {
				setTimeout(() => setIsMinting(false), 300);
			});
	};

	return (
		<div className='flex flex-col items-center text-white h-screen'>
			<Navigation />
			<div className='flex flex-col items-center mt-20 h-screen'>
				<h2 className='textGradient text-4xl mb-2'>
					Please select your NFT type
				</h2>
				<p className='textGradient'>
					Choose wisely. Only one NFT can be minted per address
				</p>
				<div className='flex flex-row items-center justify-center flex-1'>
					<div className='flex flex-col items-center'>
						<button
							onClick={() => setSelected(0)}
							className={`${
								selected === 0 ? "ring-1 animate-gradient-x scale-105" : ""
							} flex items-center justify-center backgroundGradient text-6xl hover:scale-105 hover:animate-gradient-x cursor-pointer hover:ring-1 ring-white w-40 h-40 m-5`}>
							X
						</button>
						<div className='flex flex-col items-center'>
							<p className='font-bold textGradient'>Total Supply</p>
							<p className='font-bold textGradient'>
								{supplyEach?.length > 0 ? supplyEach[0].toString() : ""} /{" "}
								{maxSupplyEach ? maxSupplyEach : ""}
							</p>
						</div>
					</div>
					<div className='flex flex-col items-center'>
						<button
							onClick={() => setSelected(1)}
							className={`${
								selected === 1 ? "ring-1 animate-gradient-x scale-105" : ""
							} flex items-center justify-center backgroundGradient text-6xl hover:scale-105 hover:animate-gradient-x cursor-pointer hover:ring-1 ring-white w-40 h-40 m-5`}>
							O
						</button>
						<div className='flex flex-col items-center'>
							<p className='font-bold textGradient'>Total Supply</p>
							<p className='font-bold textGradient'>
								{supplyEach?.length > 0 ? supplyEach[1].toString() : ""} /{" "}
								{maxSupplyEach ? maxSupplyEach : ""}
							</p>
						</div>
					</div>
				</div>
				<div className='flex-1 flex flex-col items-center'>
					<LoadingButton
						loading={isMinting}
						disabled={selected !== 0 && selected !== 1}
						onClick={onMintHandler}
						className={`${
							selected !== 0 && selected !== 1
								? "hover:scale-100 btnDisabled"
								: "hover:animate-gradient-x hover:scale-105 btnGradient"
						} mt-5 `}>
						Mint
					</LoadingButton>
				</div>
			</div>
		</div>
	);
};

export default Mint;
