export type Link = {
  chainId: string;
  url: string;
  name: string;
};

class BigDipperNetwork {
  public logo: string;
  public name: string;
  public mainnet: Link[];
  public devnet: Link[];
  public retired: Link[];
  public other: Link[];

  constructor(payload: any) {
    this.name = payload.name;
    this.logo = payload.logo;
    this.mainnet = payload.mainnet;
    this.devnet = payload.devnet;
    this.retired = payload.retired;
    this.other = payload.other;
  }

  static fromJson(data: any) {
    const allLinks:Link[] = data?.links?.map((x) => {
      return ({
        chainId: x.chain_id,
        url: x.url,
        name: x.name,
      });
    });
    const mainnet = [];
    const devnet = [];
    const retired = [];
    const other = [];

    allLinks.forEach((x) => {
      // main
      if (x.name.toLowerCase().includes('mainnet')) {
        mainnet.push((x));
      } else if (x.name.toLowerCase().includes('devnet')) {
        devnet.push((x));
      } else if (x.name.toLowerCase().includes('retired')) {
        retired.push((x));
      } else {
        other.push(x);
      }
    });

    return new BigDipperNetwork({
      mainnet,
      devnet,
      retired,
      other,
      name: data.name,
      logo: data.logo,
    });
  }
}

export default BigDipperNetwork;
