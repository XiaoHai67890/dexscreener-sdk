import { DexscreenerEntityBase } from '../DexscreenerEntityBase';
import type { DexscreenerSDK } from '../DexscreenerSDK';
import type { Control } from '../types';
import type { CommunityTakeover, CommunityTakeoverListMatch } from '../DexscreenerTypes';
declare class CommunityTakeoverEntity extends DexscreenerEntityBase<CommunityTakeover> {
    constructor(client: DexscreenerSDK, entopts: any);
    make(this: CommunityTakeoverEntity): CommunityTakeoverEntity;
    list(this: any, reqmatch?: CommunityTakeoverListMatch, ctrl?: Control): Promise<CommunityTakeoverEntity[]>;
}
export { CommunityTakeoverEntity };
