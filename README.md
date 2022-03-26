# atable.js
tabulate your free text

```
$ npm run make 
$ npm run atable out.csv in.txt [options(optional)]
```

- default arguments are
    - output-csv: "atableout.csv"
    - input-text: "atablein.txt"
    - options:    [default](#default-options)

in
```
src
feat: first version iimplementations
2 minutes ##AGO##
.gitignore
Initial commit
3 hours ##AGO##
LICENSE
Initial commit
3 hours ##AGO##
README.md
feat: setup repo
3 hours ##AGO##
package-lock.json
feat: first version iimplementations
2 minutes ##AGO##
package.json
feat: first version iimplementations
2 minutes ##AGO##
tsconfig.json
feat: first version iimplementations
2 minutes ##AGO##
```
vectorize words by most appear keyword

out
```
"no-keyword","src","feat:","first","version","iimplementations","2","minutes"
"##AGO##",".gitignore","Initial","commit","3","hours",,
"##AGO##","LICENSE","Initial","commit","3","hours",,
"##AGO##","README.md","feat:","setup","repo","3","hours",
"##AGO##","package-lock.json","feat:","first","version","iimplementations","2","minutes"
"##AGO##","package.json","feat:","first","version","iimplementations","2","minutes"
"##AGO##","tsconfig.json","feat:","first","version","iimplementations","2","minutes"
"##AGO##",,,,,,,
```

## default options

```
{
    "delims": [
        " ", "\t", "\n"
    ],
    "empty": "pad",
    "keyword": {
        "take": "most",
        "top": 1
    }
}
```

- `delims`
    - separates input.txt by its words into tokens
    - can specify more 2 length
- `empty`
    - "pad":    avoid empty tokens such as between continued keyword
    - "keep":   keep them
- `keyword.take`
    - decide first column token
    - "most":   single keyword will be first column, its most appeared in tokens
    - "top":    `keyword.top`'s appeard tokens ranking will be first

for example.

```
{
    "delims": [
        " ", "\t", "\n"
    ],
    "empty": "pad",
    "keyword": {
        "take": "top",
        "top": 2
    }
}
```

makes

```
"no-keyword","src","","","",""
"feat:","first","version","iimplementations","2","minutes"
"feat:","setup","repo","3","hours",""
"feat:","first","version","iimplementations","2","minutes"
"feat:","first","version","iimplementations","2","minutes"
"feat:","first","version","iimplementations","2","minutes"
"##AGO##",".gitignore","Initial","commit","3","hours"
"##AGO##","LICENSE","Initial","commit","3","hours"
"##AGO##","README.md","","","",""
"##AGO##","package-lock.json","","","",""
"##AGO##","package.json","","","",""
"##AGO##","tsconfig.json","","","",""
"##AGO##","","","","",""
```