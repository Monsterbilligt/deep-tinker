# deep-tinker
A few tools to get, set and flatten deep object properties in Javascript.

## Install

`npm install Monsterbilligt/deep-tinker`

## Usage

Generally, do the following:

```js

import deep from 'deep-tinker'

deep.getDeep(obj, path)

deep.setDeep(obj, path, value)

deep.flatten(obj)

```

Example:

```js

const obj = {
  foo: [
    {
      bar: 'baz'
    }
  ]
}

const nextObj = deep.setDeep(obj, 'foo[0].bar', 'foo')

console.log(nextObj)

/*
  Logs:
  {
    foo: [
      {
        bar: 'foo'
      }
    ]
  }
*/

```
