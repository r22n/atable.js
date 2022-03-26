export interface Options {
    delims?: string[];
    empty?: OnEmpty;
    keyword?: Keyword;
}

export type OnEmpty = "pad" | "keep";

export interface Keyword {
    take: KeywordTake;
    top?: number;
}

export type KeywordTake = "most" | "top";

const defop: Options = {
    delims: [
        " ", "\t", "\n"
    ],
    empty: "pad",
    keyword: {
        take: "most",
        top: 1
    }
};
export default defop;
