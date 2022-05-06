import { getPriorityConnector, initializeConnector } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { WalletConnect } from '@web3-react/walletconnect';
import { WalletLink } from '@web3-react/walletlink';

import { RPC_URLS, URLS } from './chains';
import { config } from '../config';

// MetaMask
export const [metaMaskConnector, metaMaskHooks] = initializeConnector(
  (actions) => new MetaMask(actions, true),
  [config.chainId]
);

// WalletConnect
export const [walletConnectConnector, walletConnectHooks] = initializeConnector(
  (actions) => new WalletConnect(actions, { rpc: RPC_URLS }, false),
  Object.keys(URLS)
    .map((chainId) => Number(chainId))
    .filter((chainId) => chainId === config.chainId)
);

// WalletLink
export const [walletLinkConnector, walletLinkHooks] = initializeConnector(
  (actions) =>
    new WalletLink(
      actions,
      {
        url: RPC_URLS[config.chainId],
        appName: 'web3-react',
      },
      true
    )
);

export const getConnectorName = (connector) => {
  if (connector instanceof MetaMask) return 'MetaMask';
  if (connector instanceof WalletConnect) return 'WalletConnect';
  if (connector instanceof WalletLink) return 'WalletLink';
};

// Priority
export const {
  usePriorityWeb3React,
  usePriorityConnector,
  usePriorityIsActive,
  usePriorityProvider,
  usePriorityAccount,
  usePriorityChainId,
} = getPriorityConnector(
  [metaMaskConnector, metaMaskHooks],
  [walletConnectConnector, walletConnectHooks],
  [walletLinkConnector, walletLinkHooks]
);

export const connectMetamaskMobile = () => {
  // const dappUrl = 'metamask-auth.ilamanov.repl.co'; // TODO enter your dapp URL. For example: https://uniswap.exchange. (don't enter the "https://")
  const dappUrl = window.location.href.split('//')[1].split('/')[0]; // NOTE: not available with nextJS
  const metamaskAppDeepLink = 'https://metamask.app.link/dapp/' + dappUrl;
  // location.href = metamaskAppDeepLink;
  window.open(metamaskAppDeepLink, '_self');
};
