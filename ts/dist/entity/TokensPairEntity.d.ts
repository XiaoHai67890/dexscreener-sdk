import { DexscreenerEntityBase } from '../DexscreenerEntityBase';
import type { DexscreenerSDK } from '../DexscreenerSDK';
import type { Control } from '../types';
import type { TokensPair, TokensPairListMatch } from '../DexscreenerTypes';
declare class TokensPairEntity extends DexscreenerEntityBase<TokensPair> {
    constructor(client: DexscreenerSDK, entopts: any);
    make(this: TokensPairEntity): TokensPairEntity;
    list(this: any, reqmatch?: TokensPairListMatch, ctrl?: Control): Promise<TokensPairEntity[]>;
}
export { TokensPairEntity };
