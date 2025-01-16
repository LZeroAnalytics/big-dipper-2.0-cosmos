/* eslint-disable camelcase */
import * as R from 'ramda';
import { Categories } from '../types';

class MsgCancelOrder {
  public category: Categories;

  public type: string;

  public sender: string;

  public id: string;

  public json: any;

  constructor(payload: any) {
    this.category = 'dex';
    this.json = R.pathOr({}, ['json'], payload);
    this.type = R.pathOr('', ['type'], payload);
    this.sender = R.pathOr('', ['sender'], payload);
    this.id = R.pathOr('', ['id'], payload);
  }

  static fromJson(json: any) {
    return new MsgCancelOrder({
      category: 'dex',
      json,
      type: R.pathOr('', ['@type'], json),
      sender: R.pathOr('', ['sender'], json),
      id: R.pathOr('', ['id'], json),
    });
  }
}

export default MsgCancelOrder;
