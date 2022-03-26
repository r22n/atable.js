import { Options } from "./options";
export interface Tabulated {
    bykeyword: {
        [keyword in string]: Columns;
    };
}
export interface Columns {
    keyword: string;
    columns: Column[];
}
export interface Column {
    keyword: string;
    values: string[];
}
export default function atable(src: string, userop?: Options): Tabulated;
