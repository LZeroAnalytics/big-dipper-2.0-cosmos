/* eslint-disable camelcase */
import * as R from 'ramda';
import { Categories } from '../types';

class MsgUpdateDEXWhitelistedDenoms {
  public category: Categories;

  public type: string;

  public sender: string;

  public denom: string;

  public whitelisted_denoms: string[];

  constructor(payload: any) {
    this.category = 'asset';
    this.type = R.pathOr('', ['type'], payload);
    this.sender = R.pathOr('', ['sender'], payload.json);
    this.denom = R.pathOr('', ['denom'], payload.json);
    this.whitelisted_denoms = R.pathOr([], ['whitelisted_denoms'], payload);
  }

  static fromJson(json: any) {
    return new MsgUpdateDEXWhitelistedDenoms({
      category: 'asset',
      type: R.pathOr('', ['@type'], json),
      sender: R.pathOr('', ['sender'], json),
      denom: R.pathOr('', ['denom'], json),
      whitelisted_denoms: R.pathOr([], ['whitelisted_denoms'], json),
    });
  }
}

export default MsgUpdateDEXWhitelistedDenoms;
