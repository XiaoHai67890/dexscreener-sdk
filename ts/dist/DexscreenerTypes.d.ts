export interface Ads {
    chainId?: string;
    date?: string;
    durationHours?: number;
    impressions?: number;
    tokenAddress?: string;
    type?: string;
    url?: string;
}
export interface AdsListMatch {
    chainId?: string;
    date?: string;
    durationHours?: number;
    impressions?: number;
    tokenAddress?: string;
    type?: string;
    url?: string;
}
export interface Boost {
    label?: string;
    type?: string;
    url?: string;
}
export interface BoostListMatch {
    label?: string;
    type?: string;
    url?: string;
}
export interface CommunityTakeover {
    chainId?: string;
    claimDate?: string;
    description?: string;
    header?: string;
    icon?: string;
    links?: any[];
    tokenAddress?: string;
    url?: string;
}
export interface CommunityTakeoverListMatch {
    chainId?: string;
    claimDate?: string;
    description?: string;
    header?: string;
    icon?: string;
    links?: any[];
    tokenAddress?: string;
    url?: string;
}
export interface Order {
    paymentTimestamp?: number;
    status?: string;
    type?: string;
}
export interface OrderListMatch {
    chain_id: string;
    token_address: string;
}
export interface Pair {
    id?: string;
    pairs?: any[];
    schemaVersion?: string;
}
export interface PairLoadMatch {
    chain_id: string;
    pair_id: string;
}
export interface Search {
    baseToken?: Record<string, any>;
    boosts?: Record<string, any>;
    chainId?: string;
    dexId?: string;
    fdv?: number;
    info?: Record<string, any>;
    labels?: any[];
    liquidity?: Record<string, any>;
    marketCap?: number;
    pairAddress?: string;
    pairCreatedAt?: number;
    priceChange?: Record<string, any>;
    priceNative?: string;
    priceUsd?: string;
    quoteToken?: Record<string, any>;
    txns?: Record<string, any>;
    url?: string;
    volume?: Record<string, any>;
}
export interface SearchListMatch {
    q: string;
}
export interface Token {
    baseToken?: Record<string, any>;
    boosts?: Record<string, any>;
    chainId?: string;
    dexId?: string;
    fdv?: number;
    info?: Record<string, any>;
    labels?: any[];
    liquidity?: Record<string, any>;
    marketCap?: number;
    pairAddress?: string;
    pairCreatedAt?: number;
    priceChange?: Record<string, any>;
    priceNative?: string;
    priceUsd?: string;
    quoteToken?: Record<string, any>;
    txns?: Record<string, any>;
    url?: string;
    volume?: Record<string, any>;
}
export interface TokenListMatch {
    chain_id: string;
    token_address: string;
}
export interface TokenProfile {
    label?: string;
    type?: string;
    url?: string;
}
export interface TokenProfileListMatch {
    label?: string;
    type?: string;
    url?: string;
}
export interface TokensPair {
    baseToken?: Record<string, any>;
    boosts?: Record<string, any>;
    chainId?: string;
    dexId?: string;
    fdv?: number;
    info?: Record<string, any>;
    labels?: any[];
    liquidity?: Record<string, any>;
    marketCap?: number;
    pairAddress?: string;
    pairCreatedAt?: number;
    priceChange?: Record<string, any>;
    priceNative?: string;
    priceUsd?: string;
    quoteToken?: Record<string, any>;
    txns?: Record<string, any>;
    url?: string;
    volume?: Record<string, any>;
}
export interface TokensPairListMatch {
    chain_id: string;
    token_address: string;
}
