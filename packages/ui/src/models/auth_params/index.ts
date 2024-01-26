import * as R from 'ramda';

class AuthParams {
  public txSigLimit: number;

  public maxMemoCharacters: number;

  public txSizeCostPerByte: number;

  public sigVerifyCostEd25519: number;

  public sigVerifyCostSecp256k1: number;

  constructor(payload: object) {
    this.txSigLimit = R.pathOr(0, ['txSigLimit'], payload);
    this.maxMemoCharacters = R.pathOr(0, ['maxMemoCharacters'], payload);
    this.txSizeCostPerByte = R.pathOr(0, ['txSizeCostPerByte'], payload);
    this.sigVerifyCostEd25519 = R.pathOr(0, ['sigVerifyCostEd25519'], payload);
    this.sigVerifyCostSecp256k1 = R.pathOr(0, ['sigVerifyCostSecp256k1'], payload);
  }

  static fromJson(data: object): AuthParams {
    return {
      txSigLimit: R.pathOr(0, ['tx_sig_limit'], data),
      maxMemoCharacters: R.pathOr(0, ['max_memo_characters'], data),
      txSizeCostPerByte: R.pathOr(0, ['tx_size_cost_per_byte'], data),
      sigVerifyCostEd25519: R.pathOr(0, ['sig_verify_cost_ed25519'], data),
      sigVerifyCostSecp256k1: R.pathOr(0, ['sig_verify_cost_secp256k1'], data),
    };
  }
}

export default AuthParams;
