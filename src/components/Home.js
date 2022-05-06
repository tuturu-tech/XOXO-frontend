import React, { useState } from "react";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";
import { Modal } from "../lib";
import Rules from "./Rules";

const Home = () => {
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<div className='flex flex-col items-center text-white h-screen'>
			<Navigation />
			<div className='h-full flex flex-col justify-center items-center'>
				{modalOpen && (
					<Modal onClose={() => setModalOpen(false)}>
						<Rules />
					</Modal>
				)}
				<div className='h-fit justify-self-center mb-20'>
					<div className='text-center mb-10'>
						<h1 className='text-8xl mb-5 font-bold textGradient animate-gradient-x'>
							XOXO
						</h1>
						<h2 className='text-4xl textGradient animate-gradient-x'>
							The Blockchain Tic-Tac-Toe war game
						</h2>
					</div>
					<div className='flex flex-row justify-center'>
						<button
							onClick={() => setModalOpen(true)}
							className='btnGradient ml-5 hover:animate-gradient-x'>
							Rules
						</button>
						<Link
							to='/mint'
							className='ml-5 hover:animate-gradient-x btnGradient'>
							Mint an XO
						</Link>
						<Link
							to='/games'
							className='text-white p-2 z-20 ml-5 rounded-md bg-gradient-to-br from-pink-500 via-purple-500 to-pink-500 hover:animate-gradient-x text-sm sm:text-[16px] duration-200 ease-in-out hover:scale-105 min-w-[100px] text-center'>
							Go to Games
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
