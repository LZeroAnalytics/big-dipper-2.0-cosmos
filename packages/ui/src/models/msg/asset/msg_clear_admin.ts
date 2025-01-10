/* eslint-disable camelcase */
import * as R from 'ramda';
import { Categories } from '../types';

class MsgClearAdmin {
  public category: Categories;

  public type: string;

  public sender: string;

  public denom: string;

  constructor(payload: any) {
    this.category = 'asset';
    this.type = R.pathOr('', ['type'], payload);
    this.sender = R.pathOr('', ['sender'], payload);
    this.denom = R.pathOr('', ['denom'], payload);
  }

  static fromJson(json: any) {
    return new MsgClearAdmin({
      category: 'asset',
      type: R.pathOr('', ['@type'], json),
      sender: R.pathOr('', ['sender'], json),
      denom: R.pathOr('', ['denom'], json),
    });
  }
}

export default MsgClearAdmin;
