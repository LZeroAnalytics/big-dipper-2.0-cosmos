/* eslint-disable camelcase */
import * as R from 'ramda';
import { Categories } from '../types';

class MsgCancelOrdersByDenom {
  public category: Categories;

  public type: string;

  public sender: string;

  public account: string;

  public denom: string;

  constructor(payload: any) {
    this.category = 'dex';
    this.type = R.pathOr('', ['type'], payload);
    this.sender = R.pathOr('', ['sender'], payload.json);
    this.account = R.pathOr('', ['account'], payload.json);
    this.denom = R.pathOr('', ['denom'], payload.json);
  }

  static fromJson(json: any) {
    return new MsgCancelOrdersByDenom({
      category: 'asset',
      type: R.pathOr('', ['@type'], json),
      sender: R.pathOr('', ['sender'], json),
      account: R.pathOr('', ['account'], json),
      denom: R.pathOr('', ['denom'], json),
    });
  }
}

export default MsgCancelOrdersByDenom;
