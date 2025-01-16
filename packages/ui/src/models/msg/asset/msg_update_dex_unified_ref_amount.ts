/* eslint-disable camelcase */
import * as R from 'ramda';
import { Categories } from '../types';

class MsgUpdateDEXUnifiedRefAmount {
  public category: Categories;

  public type: string;

  public json: any;

  public sender: string;

  public denom: string;

  public unified_ref_amount: string;

  constructor(payload: any) {
    this.category = 'asset';
    this.json = R.pathOr({}, ['json'], payload);
    this.type = R.pathOr('', ['type'], payload);
    this.sender = R.pathOr('', ['sender'], payload);
    this.denom = R.pathOr('', ['denom'], payload);
    this.unified_ref_amount = R.pathOr('', ['unified_ref_amount'], payload);
  }

  static fromJson(json: any) {
    return new MsgUpdateDEXUnifiedRefAmount({
      category: 'asset',
      json,
      type: R.pathOr('', ['@type'], json),
      sender: R.pathOr('', ['sender'], json),
      denom: R.pathOr('', ['denom'], json),
      unified_ref_amount: R.pathOr('', ['unified_ref_amount'], json),
    });
  }
}

export default MsgUpdateDEXUnifiedRefAmount;
