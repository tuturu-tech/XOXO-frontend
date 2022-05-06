import { config } from '../config';

const ETH = {
  name: 'Ether',
  symbol: 'ETH',
};

const MATIC = {
  name: 'Matic',
  symbol: 'MATIC',
};

export const CHAINS = {
  1: {
    name: 'Mainnet',
    nativeCurrency: ETH,
    urls: [
      process.env.infuraKey ? `https://mainnet.infura.io/v3/${process.env.infuraKey}` : undefined,
      process.env.alchemyKey ? `https://eth-mainnet.alchemyapi.io/v2/${process.env.alchemyKey}` : undefined,
      'https://cloudflare-eth.com',
    ].filter((url) => url !== undefined),
    blockExplorerUrl: 'https://etherscan.io',
  },
  4: {
    name: 'Rinkeby',
    nativeCurrency: ETH,
    urls: [
      process.env.infuraKey ? `https://rinkeby.infura.io/v3/${process.env.infuraKey}` : undefined,
      'https://rinkeby.infura.io',
    ].filter((url) => url !== undefined),
    blockExplorerUrl: 'https://rinkeby.etherscan.io',
  },
  42: {
    urls: [process.env.infuraKey ? `https://kovan.infura.io/v3/${process.env.infuraKey}` : undefined].filter(
      (url) => url !== undefined
    ),
    name: 'Kovan',
    nativeCurrency: ETH,
    blockExplorerUrl: 'https://kovan.etherscan.io',
  },
  // Polygon
  137: {
    urls: [
      process.env.infuraKey ? `https://polygon-mainnet.infura.io/v3/${process.env.infuraKey}` : undefined,
      'https://polygon-rpc.com',
    ].filter((url) => url !== undefined),
    name: 'Polygon Mainnet',
    nativeCurrency: MATIC,
    blockExplorerUrl: 'https://polygonscan.com',
  },
  80001: {
    urls: [process.env.infuraKey ? `https://polygon-mumbai.infura.io/v3/${process.env.infuraKey}` : undefined].filter(
      (url) => url !== undefined
    ),
    name: 'Polygon Mumbai',
    nativeCurrency: MATIC,
    blockExplorerUrl: 'https://mumbai.polygonscan.com',
  },
};

export const URLS = Object.assign(
  {},
  ...Object.entries(CHAINS).map(([chainId, { urls }]) => urls?.length && { [chainId]: urls })
);

export const RPC_URLS = Object.assign(
  {},
  ...Object.entries(CHAINS).map(([chainId, { urls }]) => urls?.length && { [chainId]: urls[0] })
);

export const BLOCK_EXPLORER_URL = Object.assign(
  {},
  ...Object.entries(CHAINS).map(
    ([chainId, { blockExplorerUrl }]) => blockExplorerUrl?.length && { [chainId]: blockExplorerUrl[0] }
  )
);

export const getBlockExplorerUrl = () => {
  return CHAINS[config.chainId].blockExplorerUrl ?? 'https://etherscan.io';
};

export const getTransactionLink = (txHash) => {
  return getBlockExplorerUrl() + '/tx/' + txHash;
};

export const getAddressLink = (address) => {
  return getBlockExplorerUrl() + '/address/' + address;
};
