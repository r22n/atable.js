"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const options_1 = require("./options");
function atable(src, userop) {
    init();
    work.options = Object.assign({}, work.options, userop);
    work.src = src;
    token();
    empty();
    count();
    table();
    return work.table;
}
exports.default = atable;
// impl
// state while atable running
let work;
// methods
function init() {
    work = {
        options: options_1.default,
        src: "",
        tokens: {
            src: [],
            keyword: {}
        },
        count: {},
        table: {
            bykeyword: {}
        }
    };
}
function token() {
    const delims = work.options.delims;
    const src = work.src;
    let tokens = [src];
    delims === null || delims === void 0 ? void 0 : delims.forEach(delim => {
        tokens = tokens.map(letter => letter.split(delim)).flat();
    });
    work.tokens.src = tokens;
}
function empty() {
    const option = work.options.empty;
    const tokens = work.tokens.src;
    switch (option) {
        case "pad":
            work.tokens.src = tokens.filter(x => x);
            break;
        case "keep":
        default:
            work.tokens.src = tokens;
            break;
    }
}
function count() {
    var _a;
    const tokens = work.tokens.src;
    const count = work.count;
    tokens.forEach(token => {
        count[token] ? count[token]++ : count[token] = 1;
    });
    const keyword = work.options.keyword;
    switch (keyword === null || keyword === void 0 ? void 0 : keyword.take) {
        case "most":
            {
                let [max] = tokens;
                Object.entries(count).forEach(([token, tcount]) => {
                    if (count[max] < tcount) {
                        max = token;
                    }
                });
                work.tokens.keyword = {
                    [max]: true
                };
                break;
            }
        case "top":
            {
                const top = (_a = keyword === null || keyword === void 0 ? void 0 : keyword.top) !== null && _a !== void 0 ? _a : 1;
                const tcount = Object.entries(count).sort(([atok, acount], [btok, bcount]) => acount < bcount ? 1 : -1);
                work.tokens.keyword = Object.fromEntries(tcount.filter((x, order) => order < top).map(([token]) => [token, true]));
                break;
            }
    }
}
// tabulates
function table() {
    const { src, keyword } = work.tokens;
    const result = work.table.bykeyword;
    const nokeyword = "no-keyword";
    let current = result[nokeyword] = {
        keyword: nokeyword,
        columns: [{
                keyword: nokeyword,
                values: []
            }]
    };
    for (let tok = 0, end = src.length; tok < end; tok++) {
        const token = src[tok];
        const iskey = keyword[token];
        if (iskey && result[token]) {
            current = result[token];
        }
        else if (iskey && !result[token]) {
            result[token] = current = {
                keyword: token,
                columns: []
            };
        }
        if (iskey) {
            current.columns.push({ keyword: token, values: [] });
            continue;
        }
        const head = current.columns[current.columns.length - 1];
        head.values.push(token);
    }
}
//# sourceMappingURL=core.js.map