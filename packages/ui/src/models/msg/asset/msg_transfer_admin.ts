/* eslint-disable camelcase */
import * as R from 'ramda';
import { Categories } from '../types';

class MsgTransferAdmin {
  public category: Categories;

  public type: string;

  public sender: string;

  public denom: string;

  public account: string;

  constructor(payload: any) {
    this.category = 'asset';
    this.type = R.pathOr('', ['type'], payload);
    this.sender = R.pathOr('', ['sender'], payload.json);
    this.denom = R.pathOr('', ['denom'], payload.json);
    this.account = R.pathOr('', ['account'], payload);
  }

  static fromJson(json: any) {
    return new MsgTransferAdmin({
      category: 'asset',
      type: R.pathOr('', ['@type'], json),
      sender: R.pathOr('', ['sender'], json),
      denom: R.pathOr('', ['denom'], json),
      account: R.pathOr('', ['account'], json),
    });
  }
}

export default MsgTransferAdmin;
