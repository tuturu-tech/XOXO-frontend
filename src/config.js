const { _contractConfig: configOverrides } = window;

export const config = {
	maxSupply: 3000,
	maxSupplyEach: 1500,
	purchaseLimit: 1,
	erc721Address: "0x26716C3800DD7c015F4958fd0aac28a6B792124D",
	chainId: 4,
	validChainname: "Rinkeby Testnet",
	...configOverrides,
};
