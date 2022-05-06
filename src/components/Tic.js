import React, { useState } from "react";
import Cell from "./Game/Cell.js";

const Tic = () => {
	const [turn, setTurn] = useState("x");
	const [cells, setCells] = useState(Array(9).fill(""));
	const [winner, setWinner] = useState(null);

	const checkForWinner = (squares) => {
		const combos = {
			across: [
				[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8],
			],
			down: [
				[0, 3, 6],
				[1, 4, 7],
				[2, 5, 8],
			],
			diagonal: [
				[0, 4, 8],
				[2, 4, 6],
			],
		};

		const filledSpots = squares.filter(
			(square) => square === 1 || square === 3
		);
		if (filledSpots.length === 9) {
			setWinner("draw");
			setTurn("x");
		}

		for (let combo in combos) {
			combos[combo].forEach((pattern) => {
				if (
					squares[pattern[0]] === 0 ||
					squares[pattern[1]] === 0 ||
					squares[pattern[2]] === 0
				) {
				} else if (
					squares[pattern[0]] === squares[pattern[1]] &&
					squares[pattern[1]] === squares[pattern[2]]
				) {
					setWinner(squares[pattern[0]]);
					setTurn("x");
				}
			});
		}
	};

	const handleClick = (num) => {
		if (cells[num] !== "") {
			alert("already clicked");
			return;
		}
		if (winner) {
			alert("Game is over, please restart the game");
			return;
		}
		let squares = [...cells];
		if (turn === "x") {
			setTurn("o");
			squares[num] = 1;
		} else {
			setTurn("x");
			squares[num] = 3;
		}
		checkForWinner(squares);
		setCells(squares);
	};

	return (
		<div className='flex flex-col items-center justify-center'>
			<table className='w-fit mx-auto'>
				<tbody>
					<tr>
						<Cell handleClick={() => handleClick(0)} num={0} cells={cells} />
						<Cell handleClick={() => handleClick(1)} num={1} cells={cells} />
						<Cell handleClick={() => handleClick(2)} num={2} cells={cells} />
					</tr>
					<tr>
						<Cell handleClick={() => handleClick(3)} num={3} cells={cells} />
						<Cell handleClick={() => handleClick(4)} num={4} cells={cells} />
						<Cell handleClick={() => handleClick(5)} num={5} cells={cells} />
					</tr>
					<tr>
						<Cell handleClick={() => handleClick(6)} num={6} cells={cells} />
						<Cell handleClick={() => handleClick(7)} num={7} cells={cells} />
						<Cell handleClick={() => handleClick(8)} num={8} cells={cells} />
					</tr>
				</tbody>
			</table>
			{winner && (
				<>
					<p className='p-2'>
						{winner === "x" || winner === "o"
							? `${winner} is the winner`
							: "It's a draw!"}
					</p>
					<button
						className='p-2 bg-black/50 text-white w-fit rounded-md hover:scale-105'
						onClick={() => {
							setCells(Array(9).fill(""));
							setWinner(null);
						}}>
						Restart game
					</button>
				</>
			)}
		</div>
	);
};

export default Tic;
