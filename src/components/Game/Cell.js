import React from "react";

const Cell = ({ handleClick, cells, num }) => {
	return (
		<td
			onClick={handleClick}
			className='border-[1px] w-28 h-28 m-1 cursor-pointer hover:ring-1 ring-black text-3xl text-center'>
			{cells[num]}
		</td>
	);
};

export default Cell;
