import chainConfigDevnet from './chain_config.devnet.json';
import chainConfigTestnet from './chain_config.testnet.json';
import chainConfigMainnet from './chain_config.mainnet.json';
import generalConfig from './general_config.json';

/**
 * Helper function to return different configs based on the same chain
 * @returns config
 */
const getChainConfig = () => {
  const chainType = process.env.NEXT_PUBLIC_CHAIN_TYPE || process.env.NEXT_PUBLIC_CHAIN_STATUS;
  if (chainType === 'devnet') {
    return chainConfigDevnet;
  }
  if (chainType === 'testnet') {
    return chainConfigTestnet;
  }
  if (chainType === 'mainnet') {
    return chainConfigMainnet;
  }

  return chainConfigDevnet;
};

const chainConfig = getChainConfig();

export {
  chainConfig,
  generalConfig,
};
