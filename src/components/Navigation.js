import React from "react";
import { Link } from "react-router-dom";
import { WalletButton } from "../lib";

const Navigation = ({ myGames, games }) => {
	return (
		<div className='w-full bg-base sticky top-0'>
			<div className='w-10/12 mx-auto h-20 flex items-center justify-between bg-base '>
				<Link
					to='/'
					className='ml-10 text-3xl font-bold cursor-pointer bg-clip-text text-transparent bg-gradient-to-br from-pink-500 via-purple-500 to-pink-500 hover:animate-gradient-x'>
					XOXO
				</Link>
				<div className='flex flex-row items-center'>
					{games && (
						<Link
							to='/games'
							className='text-3xl cursor-pointer btnGradient hover:animate-gradient-x'>
							Games
						</Link>
					)}
					{myGames && (
						<Link
							to='/my-games'
							className='ml-5 text-3xl cursor-pointer btnGradient hover:animate-gradient-x'>
							My Games
						</Link>
					)}
					<WalletButton className='text-white p-2 z-20 ml-5 hover:scale-105 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 hover:animate-gradient-x text-sm sm:text-[16px] mr-5'></WalletButton>
				</div>
			</div>
			<div className='h-[1px] w-full bg-white/10'></div>
		</div>
	);
};

export default Navigation;
