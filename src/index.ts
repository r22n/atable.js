import atable from "./core";
import { createWriteStream, readFileSync } from "fs";
import * as CSV from "comma-separated-values";

const [node, exec, output, input, options] = process.argv;

const dst = createWriteStream(output ?? "atableout.csv", { encoding: "utf-8" });
const src = readFileSync(input ?? "atablein.txt", { encoding: "utf-8" });
const opt = options ? JSON.parse(readFileSync(options, { encoding: "utf-8" })) : void 0;

const result = atable(src, opt);

const cells: string[][] = [];
const keys = Object.values(result.bykeyword);
keys.forEach(({ keyword, columns }) => {
    columns.forEach(({ keyword, values }) => {
        cells.push([
            keyword,
            ...values
        ]);
    });
});

const normalize = Math.max(...cells.map(cell => cell.length));
cells.forEach(cell => {
    for (let add = normalize - cell.length; add; add--) {
        cell.push("");
    }
});

dst.write(new CSV(cells, { cast: false }).encode());
