# json-directory-async

Get a JSON Object of your directory using (promises/async await) to not block 
other code from running while your directory tree is scanned.

## Install

```bash
$ npm install json-directory-async
or
$ yarn add json-directory-async
```

## Usage

```js
const scanner = require("json-directory-async");
// or
import {Scanner} from 'json-directory-async';

const scan = new Scanner("C://Users");

scan.scan("C://Users").then((json: Documents) => { console.log(json) });

```

You can get file information that NodeJS stats would get you as well

```js
const scan = new Scanner("C://Users",properties:['mode', 'mtime']);
```

You can use a callback to get each file and directory as it is being scanned:
```js

const scanner = require("json-directory-async");

const val = scan.scan('C://Users', {showExtension:true,showDepth:true,showType:false,properties:['dev','size']}, (item) => {
  console.log(item);
});
```

## The tree

```json

```


