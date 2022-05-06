import React from "react";

const Rules = () => {
	return (
		<div className='bg-base/80 flex flex-col p-10 items-center rounded-xl'>
			<h2 className='text-5xl  textGradient mb-10 animate-gradient-x'>Rules</h2>
			<ol className='textGradient text-xl'>
				<li className='mb-3'>
					1. To be able to play the game you have to hold at least one NFT,
					either an X type or an O type
				</li>
				<li className='mb-3'>
					2. Anyone can create a game lobby, as long as they hold one NFT.
				</li>
				<li className='mb-3'>
					3. Anyone that holds the opposite type of NFT, and is not already
					playing with it, can join a game.
				</li>
				<li className='mb-3'>
					4. NFTs that are inside of a game are locked, and cannot be
					transferred until the game is over.
				</li>
				<li className='mb-3'>
					5. Once a game is over the losing NFT turns into the type of the
					winning NFT.
				</li>
				<li className='mb-3'>
					6. If the game was a draw, no change is made to the NFTs.
				</li>
				<li className='mb-3'>
					7. If a game does not come to a conclusion due to player inactivity or
					some other reason, the game can be forcibly ended by either player
					after the lockup period is over. The lockup period is currently 24
					hours
				</li>
				<li className='mb-3'>
					8. Once 90% of NFTs are converted to either X or O, the holders of the
					winning type will unlock a secret reward.
				</li>
			</ol>
		</div>
	);
};

export default Rules;
