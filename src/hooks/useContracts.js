import { ethers } from "ethers";
import { useTx } from "./useTx";
import { config } from "../config";
import { usePriorityProvider } from "../lib/connectors";

const { abi: erc721ABI } = require("../data/XOXO.json");

export const ERC721 = new ethers.Contract(config.erc721Address, erc721ABI);

export function useContracts() {
	const { handleTx, handleTxError, alert } = useTx();
	const provider = usePriorityProvider();

	const erc721 = ERC721.connect(provider);

	window.nft = erc721;

	return { erc721, handleTx, handleTxError, alert };
}
