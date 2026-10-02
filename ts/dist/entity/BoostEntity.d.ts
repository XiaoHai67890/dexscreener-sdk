import { DexscreenerEntityBase } from '../DexscreenerEntityBase';
import type { DexscreenerSDK } from '../DexscreenerSDK';
import type { Control } from '../types';
import type { Boost, BoostListMatch } from '../DexscreenerTypes';
declare class BoostEntity extends DexscreenerEntityBase<Boost> {
    constructor(client: DexscreenerSDK, entopts: any);
    make(this: BoostEntity): BoostEntity;
    list(this: any, reqmatch?: BoostListMatch, ctrl?: Control): Promise<BoostEntity[]>;
}
export { BoostEntity };
