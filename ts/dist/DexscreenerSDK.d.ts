import { AdsEntity } from './entity/AdsEntity';
import { BoostEntity } from './entity/BoostEntity';
import { CommunityTakeoverEntity } from './entity/CommunityTakeoverEntity';
import { OrderEntity } from './entity/OrderEntity';
import { PairEntity } from './entity/PairEntity';
import { SearchEntity } from './entity/SearchEntity';
import { TokenEntity } from './entity/TokenEntity';
import { TokenProfileEntity } from './entity/TokenProfileEntity';
import { TokensPairEntity } from './entity/TokensPairEntity';
export type * from './DexscreenerTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { DexscreenerEntityBase } from './DexscreenerEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class DexscreenerSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    } | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    } | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Ads(entopts?: Record<string, any>): AdsEntity;
    Boost(entopts?: Record<string, any>): BoostEntity;
    CommunityTakeover(entopts?: Record<string, any>): CommunityTakeoverEntity;
    Order(entopts?: Record<string, any>): OrderEntity;
    Pair(entopts?: Record<string, any>): PairEntity;
    Search(entopts?: Record<string, any>): SearchEntity;
    Token(entopts?: Record<string, any>): TokenEntity;
    TokenProfile(entopts?: Record<string, any>): TokenProfileEntity;
    TokensPair(entopts?: Record<string, any>): TokensPairEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): DexscreenerSDK;
    tester(testopts?: any, sdkopts?: any): DexscreenerSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof DexscreenerSDK;
export { stdutil, config, BaseFeature, DexscreenerEntityBase, DexscreenerSDK, SDK, };
