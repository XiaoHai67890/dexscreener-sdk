import { DexscreenerEntityBase } from '../DexscreenerEntityBase';
import type { DexscreenerSDK } from '../DexscreenerSDK';
import type { Control } from '../types';
import type { Token, TokenListMatch } from '../DexscreenerTypes';
declare class TokenEntity extends DexscreenerEntityBase<Token> {
    constructor(client: DexscreenerSDK, entopts: any);
    make(this: TokenEntity): TokenEntity;
    list(this: any, reqmatch?: TokenListMatch, ctrl?: Control): Promise<TokenEntity[]>;
}
export { TokenEntity };
