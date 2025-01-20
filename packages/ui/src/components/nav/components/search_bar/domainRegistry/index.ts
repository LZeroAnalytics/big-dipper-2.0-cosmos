/* eslint-disable no-shadow */
/* eslint-disable max-classes-per-file */
import { bech32 } from 'bech32';
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';

export const serviceID = 'bdd';

const rpcUrls = {
  mainnet: 'https://full-node.mainnet-1.coreum.dev:26657',
  testnet: 'https://full-node.testnet-1.coreum.dev:26657',
  devnet: 'https://full-node.devnet-1.coreum.dev:26657',
};

/**
 * Types of errors
 */
export enum MatchaErrorType {
  NETWORK = 'network',
  NOT_FOUND = 'not-found',
  UNREGISTERED_SERVICE = 'unregistered-service',
  DUPLICATE_SERVICE = 'duplicate-service',
  INVALID_ADDRESS = 'invalid-address',
}

/**
 * Custom error class
 */
export class MatchaError extends Error {
  public type: MatchaErrorType;

  constructor(message: string, errorType: MatchaErrorType) {
    super(message);
    this.name = 'MatchaError';
    this.type = errorType;
  }
}

export type Addr = {
  prefix: string | null;
  words: number[] | null;
};

export type Network = 'mainnet' | 'testnet' | 'devnet';

export type AllowedTopLevelDomains = {
  icns?: string[];
  ibcDomains?: string[];
  archIds?: string[];
  stargazeNames?: string[];
  spaceIds?: string[];
  sns?: string[];
  bdd?: string[];
};

export type rpcUrls = Record<Network, string>;

export type RpcURLs = {
  icns?: rpcUrls;
  ibcDomains?: rpcUrls;
  archIds?: rpcUrls;
  stargazeNames?: rpcUrls;
  spaceIds?: rpcUrls;
  sns?: rpcUrls;
  bdd?: rpcUrls;
};

class CosmWasmClientHandler {
  private static clients: { [key: string]: CosmWasmClient } = {};

  static getClient = async (rpcUrl: string) => {
    // eslint-disable-next-line no-underscore-dangle
    let _client = this.clients[rpcUrl];

    if (_client === undefined) {
      _client = await CosmWasmClient.connect(rpcUrl);
      this.clients[rpcUrl] = _client;
    }
    return _client;
  };
}
/**
 * What a NameService class needs to implement
 */
export abstract class NameService {
  /**
   * The unique identifier of the name service
   */
  abstract serviceID: string;

  /**
   * The chain on which the name service is deployed
   */
  abstract chain: string | string[];

  /**
   * The contract address of the name service
   */
  abstract contractAddress:
    | {
        [key in Network]: string;
      }
    | Record<string, { [key in Network]: string }>;

  /**
   * @param name Resolve this name into an address
   */
  abstract resolve(
    name: string,
    network: Network,
    options?: {
      allowedTopLevelDomains?: AllowedTopLevelDomains;
      rpcUrls?: RpcURLs;
    }
  ): Promise<string>;

  /**
   * @param address Lookup this address and returns primary name
   */
  abstract lookup(
    address: string,
    network: Network,
    options?: {
      rpcUrls?: RpcURLs;
    }
  ): Promise<string>;

  /**
   * @param network The network to use
   */
  // eslint-disable-next-line class-methods-use-this
  public getCosmWasmClient(rpcUrl: string): Promise<CosmWasmClient> {
    return CosmWasmClientHandler.getClient(rpcUrl);
  }
}

export class BDD extends NameService {
  serviceID = serviceID;

  chain = 'coreum';

  contractAddress = {
    mainnet: 'core1z22n0xy004sxm5w9fms48exwpl3vwqxd890nt8ve0kwjj048tgqstlqf6f',
    testnet: 'testcore1uwe9yemth6gr58tm56sx3u37t0c5rhmk963fjt480y4nz3cfxers9fn2kh',
    devnet: '',
  };

  async resolve(name: string, network: Network): Promise<string> {
    const client = await this.getCosmWasmClient(rpcUrls[network]);

    try {
      const result = await client.queryContractSmart(this.contractAddress[network], {
        resolve: {
          name,
        },
      });

      if (!result) {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND);
      }
      return result;
    } catch (err) {
      throw new MatchaError('', MatchaErrorType.NOT_FOUND);
    }
  }

  async lookup(
    address: string,
    network: Network,
    options?: {
      rpcUrls?: RpcURLs;
    }
  ): Promise<string> {
    const client = await this.getCosmWasmClient(
      options?.rpcUrls?.[serviceID]?.[network] ?? rpcUrls[network]
    );

    const addr: Addr = {
      prefix: null,
      words: null,
    };
    try {
      const { prefix, words } = bech32.decode(address);
      addr.prefix = prefix;
      addr.words = words;
    } catch (e) {
      throw new MatchaError('', MatchaErrorType.INVALID_ADDRESS);
    }

    const prefix = network === 'mainnet' ? 'core' : 'testcore';
    const coreAddress = bech32.encode(prefix, addr.words);
    try {
      const res = await client?.queryContractSmart(this.contractAddress[network], {
        primary: {
          address: coreAddress,
        },
      });
      if (!res) {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND);
      }
      return res;
    } catch (e) {
      console.error(e);
      throw new MatchaError('', MatchaErrorType.NOT_FOUND);
    }
  }
}
