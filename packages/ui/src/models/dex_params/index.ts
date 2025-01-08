import * as R from 'ramda';

class DexParams {
  public order_reserve: {
    denom: string;
    amount: string;
  };

  public price_tick_exponent: number;

  public max_orders_per_denom: number;

  public default_unified_ref_amount: string;

  constructor(payload: object) {
    this.order_reserve = R.pathOr({ denom: '', amount: '' }, ['order_reserve'], payload);
    this.price_tick_exponent = R.pathOr(0, ['price_tick_exponent'], payload);
    this.max_orders_per_denom = R.pathOr(0, ['max_orders_per_denom'], payload);
    this.default_unified_ref_amount = R.pathOr('', ['default_unified_ref_amount'], payload);
  }

  static fromJson(data: object): DexParams {
    return {
      order_reserve: R.pathOr({ denom: '', amount: '' }, ['order_reserve'], data),
      price_tick_exponent: R.pathOr(0, ['price_tick_exponent'], data),
      max_orders_per_denom: R.pathOr(0, ['max_orders_per_denom'], data),
      default_unified_ref_amount: R.pathOr('', ['default_unified_ref_amount'], data),
    };
  }
}

export default DexParams;
