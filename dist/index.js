"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./core");
const fs_1 = require("fs");
const CSV = require("comma-separated-values");
const [node, exec, output, input, options] = process.argv;
const dst = (0, fs_1.createWriteStream)(output !== null && output !== void 0 ? output : "atableout.csv", { encoding: "utf-8" });
const src = (0, fs_1.readFileSync)(input !== null && input !== void 0 ? input : "atablein.txt", { encoding: "utf-8" });
const opt = options ? JSON.parse((0, fs_1.readFileSync)(options, { encoding: "utf-8" })) : void 0;
const result = (0, core_1.default)(src, opt);
const cells = [];
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
//# sourceMappingURL=index.js.map