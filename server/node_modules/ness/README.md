# ness

Any value that is not `null`, `undefined` or `false` is true.

## Install
```
npm install ness
```

## Examples

Test for `true` or `false`:

```js
var ness = require('ness');
var val;

val = ness(0);
val.test();  //=> true

val = ness('');
val.test();  //=> true

val = ness(NaN);
val.test();  //=> true

val = ness(false);
val.test();  //=> false

val = ness(null);
val.test();  //=> false

val = ness(undefined);
val.test();  //=> false
```

Logical `and`:

```js
var ness = require('ness');
var val;

val = ness(false);
val.and(undefined);  //=> false

val = ness(true);
val.and(false);      //=> false

val = ness(0);
val.and(true);       //=> true
```

Logical `or`:

```js
var ness = require('ness');
var val;

val = ness(NaN);
val.or(false);          //=> true

val = ness(undefined);
val.or('trueness');     //=> true

val = ness(null);
val.or(false);          //=> false
```

Logical `not`:

```js
var ness = require('ness');
var val;

val = ness(true);
val.not();  //=> false

val = ness(false);
val.not();  //=> true
```

## LICENSE

[MIT](http://opensource.org/licenses/MIT)
