import { DexscreenerEntityBase } from '../DexscreenerEntityBase';
import type { DexscreenerSDK } from '../DexscreenerSDK';
import type { Control } from '../types';
import type { TokenProfile, TokenProfileListMatch } from '../DexscreenerTypes';
declare class TokenProfileEntity extends DexscreenerEntityBase<TokenProfile> {
    constructor(client: DexscreenerSDK, entopts: any);
    make(this: TokenProfileEntity): TokenProfileEntity;
    list(this: any, reqmatch?: TokenProfileListMatch, ctrl?: Control): Promise<TokenProfileEntity[]>;
}
export { TokenProfileEntity };
