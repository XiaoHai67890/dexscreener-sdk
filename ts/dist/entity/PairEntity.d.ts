import { DexscreenerEntityBase } from '../DexscreenerEntityBase';
import type { DexscreenerSDK } from '../DexscreenerSDK';
import type { Control } from '../types';
import type { Pair, PairLoadMatch } from '../DexscreenerTypes';
declare class PairEntity extends DexscreenerEntityBase<Pair> {
    constructor(client: DexscreenerSDK, entopts: any);
    make(this: PairEntity): PairEntity;
    load(this: any, reqmatch?: PairLoadMatch, ctrl?: Control): Promise<PairEntity>;
}
export { PairEntity };
