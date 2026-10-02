import { DexscreenerEntityBase } from '../DexscreenerEntityBase';
import type { DexscreenerSDK } from '../DexscreenerSDK';
import type { Control } from '../types';
import type { Order, OrderListMatch } from '../DexscreenerTypes';
declare class OrderEntity extends DexscreenerEntityBase<Order> {
    constructor(client: DexscreenerSDK, entopts: any);
    make(this: OrderEntity): OrderEntity;
    list(this: any, reqmatch?: OrderListMatch, ctrl?: Control): Promise<OrderEntity[]>;
}
export { OrderEntity };
