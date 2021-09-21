# json-directory-async

Get a JSON Object of your directory tree using (promises/async await) to not block 
other code from running while your directory tree is scanned.

## Install

```bash
$ npm install json-directory-async
or
$ yarn add json-directory-async
```

## Usage

```js
const { Scanner } = require("json-directory-async");
// or
import { Scanner } from 'json-directory-async';

//Javascript

const scan = new Scanner("C://Users");
scan.scan("C://Users").then((json) => { console.log(json) });

//Typescript
import type {Documents} from'json-directory-async';

const scan = new Scanner("C://Users");
scan.scan("C://Users").then((json: Documents) => { console.log(json) });

```

You can get folder and file stat information that NodeJS provides

```js
const scan = new Scanner("C://Users",{showDepth:true,properties:['mode', 'mtime']});
```

You can use a callback to get each file and directory as it is being scanned:
```js

const { Scanner } = require("json-directory-async");

const tree = scan.scan('C://Users', {showExtension:true,showDepth:true,showType:false,properties:['dev','size']}, (item) => {
  console.log(item);
});
```


List of options

```json
//optional
{
    "showSymbolicLink": true,
    "showSize": true,
    "showType": true,
    "showExtension": true,
    "showDepth": true,
    "showName": true,
    "stats": true,
    "properties":["dev","size"]//Array of NodejS Stats from the fs module
}

```

## The tree

```json
{
   "path":"test\\tree",
   "children":[
      {
         "path":"test\\tree\\AFolder",
         "children":[
            {
               "path":"test\\tree\\AFolder\\symlink",
               "children":[
                  
               ],
               "size":0,
               "sizeFormatted":"0 B",
               "type":"folder",
               "name":"symlink"
            },
            {
               "path":"test\\tree\\AFolder\\wow.d.ts",
               "size":0,
               "sizeFormatted":"0 B",
               "extension":".ts",
               "type":"file",
               "name":"wow.d.ts"
            },
            {
               "path":"test\\tree\\AFolder\\wow.js",
               "size":15,
               "sizeFormatted":"15 B",
               "extension":".js",
               "type":"file",
               "name":"wow.js"
            },
            {
               "path":"test\\tree\\AFolder\\wow.ts",
               "size":0,
               "sizeFormatted":"0 B",
               "extension":".ts",
               "type":"file",
               "name":"wow.ts"
            },
            {
               "path":"test\\tree\\AFolder\\wowagain.txt",
               "size":0,
               "sizeFormatted":"0 B",
               "extension":".txt",
               "type":"file",
               "name":"wowagain.txt"
            }
         ],
         "size":15,
         "sizeFormatted":"15 B",
         "type":"folder",
         "name":"AFolder"
      },
      {
         "path":"test\\tree\\EmptyFolder",
         "children":[
            
         ],
         "size":0,
         "sizeFormatted":"0 B",
         "type":"folder",
         "name":"EmptyFolder"
      },
      {
         "path":"test\\tree\\symlink",
         "children":[
            
         ],
         "size":0,
         "sizeFormatted":"0 B",
         "type":"folder",
         "name":"symlink"
      }
   ],
   "size":15,
   "sizeFormatted":"15 B",
   "type":"folder",
   "name":"tree"
}

```


