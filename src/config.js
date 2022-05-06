const { _contractConfig: configOverrides } = window;

export const config = {
	maxSupply: 3000,
	maxSupplyEach: 1500,
	purchaseLimit: 1,
	erc721Address: "0xA76B21bcE509F3aE9158b4Fb86c5eEf2E4D5995A",
	chainId: 4,
	validChainname: "Rinkeby Testnet",
	...configOverrides,
};
