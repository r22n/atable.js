export interface Options {
    delims?: string[];
    empty?: OnEmpty;
    keyword?: Keyword;
}
export declare type OnEmpty = "pad" | "keep";
export interface Keyword {
    take: KeywordTake;
    top?: number;
}
export declare type KeywordTake = "most" | "top";
declare const defop: Options;
export default defop;
