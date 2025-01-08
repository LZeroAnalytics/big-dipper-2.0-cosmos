/* eslint-disable camelcase */
import * as R from 'ramda';
import { Categories } from '../types';

class MsgPlaceOrder {
  public category: Categories;

  public type: string;

  public sender: string;

  public id: string;

  public base_denom: string;

  public quote_denom: string;

  public price: string;

  public quantity: string;

  public side: string;

  public good_till: {
    good_til_block_height: string;
    good_til_block_time: string;
  } | null;

  public time_in_force: string;

  constructor(payload: any) {
    this.category = 'dex';
    this.type = R.pathOr('', ['type'], payload);
    this.sender = R.pathOr('', ['sender'], payload.json);
    this.id = R.pathOr('', ['id'], payload.json);
    this.base_denom = R.pathOr('', ['base_denom'], payload.json);
    this.quote_denom = R.pathOr('', ['quote_denom'], payload.json);
    this.price = R.pathOr('', ['price'], payload.json);
    this.quantity = R.pathOr('', ['quantity'], payload.json);
    this.side = R.pathOr('', ['side'], payload.json);
    this.good_till = R.pathOr(null, ['good_till'], payload.json);
    this.time_in_force = R.pathOr('', ['time_in_force'], payload.json);
  }

  static fromJson(json: any) {
    return new MsgPlaceOrder({
      category: 'asset',
      type: R.pathOr('', ['@type'], json),
      sender: R.pathOr('', ['sender'], json),
      id: R.pathOr('', ['id'], json),
      base_denom: R.pathOr('', ['base_denom'], json),
      quote_denom: R.pathOr('', ['quote_denom'], json),
      price: R.pathOr('', ['price'], json),
      quantity: R.pathOr('', ['quantity'], json),
      side: R.pathOr('', ['side'], json),
      good_till: R.pathOr(null, ['good_till'], json),
      time_in_force: R.pathOr('', ['time_in_force'], json),
    });
  }
}

export default MsgPlaceOrder;
