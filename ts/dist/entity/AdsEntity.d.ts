import { DexscreenerEntityBase } from '../DexscreenerEntityBase';
import type { DexscreenerSDK } from '../DexscreenerSDK';
import type { Control } from '../types';
import type { Ads, AdsListMatch } from '../DexscreenerTypes';
declare class AdsEntity extends DexscreenerEntityBase<Ads> {
    constructor(client: DexscreenerSDK, entopts: any);
    make(this: AdsEntity): AdsEntity;
    list(this: any, reqmatch?: AdsListMatch, ctrl?: Control): Promise<AdsEntity[]>;
}
export { AdsEntity };
