import React from "react";
import { Link } from "react-router-dom";
import { WalletButton } from "../lib";

const Navigation = () => {
	return (
		<div className='w-full bg-base sticky top-0'>
			<div className='w-10/12 mx-auto h-20 flex items-center justify-between bg-base '>
				<Link
					to='/'
					className='ml-10 text-3xl font-bold cursor-pointer bg-clip-text text-transparent bg-gradient-to-br from-pink-500 via-purple-500 to-pink-500 hover:animate-gradient-x'>
					XOXO
				</Link>

				<WalletButton className='text-white p-2 z-20 ml-5 rounded-md bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 hover:animate-gradient-x text-sm sm:text-[16px] mr-5'></WalletButton>
			</div>
			<div className='h-[1px] w-full bg-white/10'></div>
		</div>
	);
};

export default Navigation;
