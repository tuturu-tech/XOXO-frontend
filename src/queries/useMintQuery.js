import { useChainQuery, useContracts } from "../hooks";
import { usePriorityAccount } from "../lib/connectors";
import { config } from "../config";

const key = "MintState";

export function useMintQuery() {
	const { erc721 } = useContracts();
	const account = usePriorityAccount();

	const fetchState = async () => {
		const owner = await erc721.owner();
		const totalSupply = await erc721.totalSupply();
		const supplyEach = await erc721.totalSupplyXandO();
		const maxSupply = config.maxSupply;
		const maxMint = config.maxMint;
		const maxSupplyEach = config.maxSupplyEach;

		const isContractOwner =
			account && owner && account.toLowerCase() === owner.toLowerCase();

		return {
			owner,
			maxSupply,
			maxSupplyEach,
			supplyEach,
			totalSupply,
			isContractOwner,
			maxMint,
		};
	};
	return useChainQuery({ key, fetchState });
}
