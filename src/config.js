const { _contractConfig: configOverrides } = window;

export const config = {
	maxSupply: 3000,
	maxSupplyEach: 1500,
	purchaseLimit: 1,
	erc721Address: "0x27246704E9aF1d95AEf09CfD72Ff7a0115673c11",
	chainId: 4,
	validChainname: "Rinkeby Testnet",
	...configOverrides,
};
