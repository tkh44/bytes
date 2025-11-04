# bytes

> A tiny and fast utility to convert bytes to and from strings.

This module is delivered as:

* **CommonJS**: [`dist/index.js`](https://unpkg.com/@tkh44/bytes/dist/index.js)
* **ES Module**: [`dist/index.mjs`](https://unpkg.com/@tkh44/bytes/dist/index.mjs)
* **UMD**: [`dist/index.min.js`](https://unpkg.com/@tkh44/bytes/dist/index.min.js)

## Install

```
$ npm install --save @tkh44/bytes
```


## Usage

```js
import { parse, format } from '@tkh44/bytes';

// string => number
parse('1kb');       //=> 1024
parse('1mb');       //=> 1048576
parse('10gb');      //=> 10737418240
parse('2.5 mb');    //=> 2621440
parse('1tb');       //=> 1099511627776
parse('5b');        //=> 5
parse('1pb');       //=> 1125899906842624
parse('100');       //=> 100
parse('-1kb');      //=> -1024
parse('-200');      //=> -200

// number => string
format(1024);              //=> '1KB'
format(2 * 1024);          //=> '2KB'
format(-3 * 1024);         //=> '-3KB'
format(parse('10 gb'));    //=> '10GB'

// number => string (long)
format(1024, true);              //=> '1 kilobyte'
format(2 * 1024, true);          //=> '2 kilobytes'
format(-3 * 1024, true);         //=> '-3 kilobytes'
format(parse('10 gb'), true);    //=> '10 gigabytes'
```


## API

### bytes.parse(input)
Returns: `Number`| `undefined`

Parses the input string, returning the number of bytes or `undefined` if the value can't be parsed successfully.

#### input
Type: `String`

The human-readable size string; eg: `10mb`, `10MB`, `10 megabytes`.


### bytes.format(bytes, long?)
Returns: `String`

Formats the byte count to a human-readable size string.

> **Important:** The output will be rounded to the nearest whole integer.

#### bytes
Type: `Number`

The number of bytes.

#### long
Type: `Boolean`<br>
Default: `false`

Whether or not the output should use the unit's long/full form; eg `kilobyte` or `kilobytes` instead of `KB`.

> **Note:** When `long`, the count and unit will be separated by a single space.<br>Also, when `long`, the unit may be pluralized; eg `1 kilobyte` vs `2 kilobytes`.


## Use Cases

Never write this again:

```js
// Before
maxBuffer: 1024 * 1024 * 10  // 10MB

// After
import { parse } from '@tkh44/bytes';
maxBuffer: parse('10MB')
```


## License

MIT © [Kye Hohenberger](https://github.com/tkh44)
