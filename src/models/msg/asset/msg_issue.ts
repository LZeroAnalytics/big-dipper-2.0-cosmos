/* eslint-disable camelcase */
import { Categories } from '../types';

class MsgIssue {
  public category: Categories;
  public type: string;
  public issuer: string;
  public symbol: string;
  public subunit: string;
  public features: any[];
  public burn_rate: string;
  public precision: number;
  public description: string;
  public initial_amount: string;
  public send_commission_rate: string;
  public json: any;

  constructor(payload: any) {
    this.category = 'asset';
    this.type = payload.type;
    this.issuer = payload.issuer;
    this.symbol = payload.symbol;
    this.subunit = payload.subunit;
    this.features = payload.features;
    this.burn_rate = payload.burn_rate;
    this.precision = payload.precision;
    this.description = payload.description;
    this.initial_amount = payload.initial_amount;
    this.send_commission_rate = payload.send_commission_rate;
    this.json = payload.json;
  }

  static fromJson(json:any) {
    return new MsgIssue({
      json,
      type: json['@type'],
      issuer: json.issuer,
      symbol: json.symbol,
      subunit: json.subunit,
      features: json.features,
      burn_rate: json.burn_rate,
      precision: json.precision,
      description: json.description,
      initial_amount: json.initial_amount,
    });
  }
}

export default MsgIssue;
